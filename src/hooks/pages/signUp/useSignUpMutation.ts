import { apiRequest } from "@/app/api/apiRequest";
import { SignUpFormData } from "./useSignUpForm";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: async ({ email, password }: SignUpFormData) => {
      return await apiRequest(
        "/users/auth/sign-up/user",
        "POST",
        { email, password },
        {
          skipAuth: true,
        },
      );
    },
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      console.error("회원가입 실패:", error);
    },
  });
};
