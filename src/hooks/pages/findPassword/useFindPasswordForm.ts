import { useForm } from "react-hook-form";
import { useEmailVerify } from "@/hooks/auth/useEmailVerify";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/api/apiRequest";
import { useRouter } from "next/navigation";
import { EmailVerifyType } from "@/constants/auth/EmailVerifyType";
import { useEffect, useState } from "react";

export interface FindPasswordFormData {
  email: string;
  authCode: string;
  password: string;
  passwordCheck: string;
}

export function useFindPasswordForm() {
  const router = useRouter();
  const methods = useForm<FindPasswordFormData>({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      authCode: "",
      password: "",
      passwordCheck: "",
    },
  });
  const [step, setStep] = useState(1);
  const [token, setToken] = useState();

  const resetPasswordMutation = useMutation({
    mutationFn: async (formData: FindPasswordFormData) => {
      const { email, password } = formData;
      return await apiRequest(
        "/users/auth/password-reset",
        "POST",
        {
          email,
          new_password: password,
        },
        {
          skipAuth: true,
          headers: {
            ...(token ? { "password-reset-token": token } : {}),
          },
        },
      );
    },
    onSuccess: () => {
      console.log("비밀번호 재설정 성공");
      router.push("/login");
    },
    onError: (error: any) => {
      console.error("비밀번호 재설정 실패:", error);
    },
  });

  const { isEmailSend, isEmailVerify, sendCode, verifyCode, isSending } = useEmailVerify({
    email: methods.watch("email"),
    code: methods.watch("authCode"),
    watch: methods.watch,
    setError: methods.setError,
    clearErrors: methods.clearErrors,
  });

  useEffect(() => {
    if (isEmailVerify) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [isEmailVerify]);

  const verifyEmailAuth = () =>
    verifyCode(EmailVerifyType.RESET_PASSWORD, {
      onSuccess: ({ headers }) => {
        setToken(headers["password-reset-token"]);
      },
    });

  const onSubmit = (formData: FindPasswordFormData) => {
    resetPasswordMutation.mutate(formData);
  };

  return {
    methods,
    onSubmit,
    isEmailSend,
    isEmailVerify,
    isSending,
    step,
    resetPasswordError: resetPasswordMutation.error,
    sendEmailAuth: () => sendCode(EmailVerifyType.RESET_PASSWORD),
    verifyEmailAuth,
  };
}
