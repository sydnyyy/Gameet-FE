import { useForm } from "react-hook-form";
import { apiRequest } from "@/app/api/apiRequest";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

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

  const email = methods.watch("email");
  const code = methods.watch("authCode");

  // 회원가입
  const signUpMutation = useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      const { email, password } = formData;
      return await apiRequest("/users/auth/sign-up/user", "POST", {
        email,
        password,
      });
    },
    onSuccess: () => {
      console.log("회원가입 성공:");
      router.push("/login");
    },
    onError: (error: any) => {
      console.log("회원가입 실패:", error);
    },
  });

  // 이메일 인증 함수
  const sendEmailAuthMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/users/auth/sign-up/send-code", "POST", { email });
    },
    onSuccess: () => {
      console.log("인증번호 전송 성공");
    },
    onError: (error: any) => {
      console.log("인증번호 전송 실패", error);
    },
  });

  // 이메일 인증 코드 확인
  const verifyEmailAuthMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/users/auth/sign-up/verify-code", "POST", { email, code });
    },
    onSuccess: () => {
      console.log("인증번호 확인 성공");
    },
    onError: (e: any) => {
      console.log("인증번호 확인 실패", e?.response?.data || e.message);
    },
  });

  const onSubmit = (formData: SignUpFormData) => {
    signUpMutation.mutate(formData);
  };

  return {
    methods,
    onSubmit,
    signUpError: signUpMutation.error,
    isSignUpLoading: signUpMutation.isPending,
    sendEmailAuth: sendEmailAuthMutation.mutate,
    verifyEmailAuth: verifyEmailAuthMutation.mutate,
  };
}
