import { apiRequest } from "@/app/api/apiRequest";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { FindPasswordFormData } from "./useFindPasswordForm";

export function useResetPasswordMutation(token?: string) {
  const router = useRouter();

  return useMutation({
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
          headers: token ? { "password-reset-token": token } : {},
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
}
