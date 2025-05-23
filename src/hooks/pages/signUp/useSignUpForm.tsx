import { useForm } from "react-hook-form";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

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

  const { request, error } = useApi();
  const email = methods.watch("email");
  const code = methods.watch("authCode");

  const onSubmit = async (formData: SignUpFormData) => {
    try {
      const { email, password } = formData;
      await request("/users/auth/sign-up/user", "POST", {
        email,
        password,
      });
      console.log("회원가입 성공:");
      router.push("/login");
    } catch (e) {
      console.log("회원가입 실패:", e);
    }
  };

  const handleSendEmailAuth = async () => {
    try {
      await request("/users/auth/sign-up/send-code", "POST", { email });
      console.log("인증번호 전송 성공");
    } catch (e) {
      console.log("인증번호 전송 실패", e);
    }
  };

  const handleVerifyEmailAuth = async () => {
    try {
      await request("/users/auth/sign-up/verify-code", "POST", { email, code });
    } catch (e) {
      console.log("인증번호 확인 실패", e);
    }
  };

  return {
    methods,
    onSubmit,
    error,
    handleSendEmailAuth,
    handleVerifyEmailAuth,
  };
}
