import { useForm } from "react-hook-form";
import { apiRequest } from "@/app/api/apiRequest";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEmailVerify } from "../../auth/useEmailVerify";
import { EmailVerifyType } from "@/constants/auth/EmailVerifyType";

export interface SignUpFormData {
  email: string;
  authCode: string;
  password: string;
  passwordCheck: string;
}

export function useSignUpForm() {
  const router = useRouter();
  const methods = useForm<SignUpFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 회원가입
  const signUpMutation = useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      const { email, password } = formData;
      return await apiRequest(
        "/users/auth/sign-up/user",
        "POST",
        {
          email,
          password,
        },
        { skipAuth: true },
      );
    },
    onSuccess: () => {
      console.log("회원가입 성공:");
      router.push("/login");
    },
    onError: (error: any) => {
      console.log("회원가입 실패:", error);
    },
  });

  const { isEmailSend, isEmailVerify, sendCode, verifyCode } = useEmailVerify({
    email: methods.watch("email"),
    code: methods.watch("authCode"),
    watch: methods.watch,
    setError: methods.setError,
    clearErrors: methods.clearErrors,
  });

  const onSubmit = (formData: SignUpFormData) => {
    signUpMutation.mutate(formData);
  };

  return {
    methods,
    onSubmit,
    isEmailSend,
    isEmailVerify,
    signUpError: signUpMutation.error,
    isSignUpLoading: signUpMutation.isPending,
    sendEmailAuth: () => sendCode(EmailVerifyType.SIGN_UP),
    verifyEmailAuth: () => verifyCode(EmailVerifyType.SIGN_UP),
  };
}
