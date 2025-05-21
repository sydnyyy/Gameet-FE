"use client";
import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
}

export function useLoginForm() {
  const router = useRouter();
  const methods = useForm<LoginFormData>({
    mode: "onChange",
  });

  const { request, error } = useApi();
  const setToken = useAuthStore(state => state.setToken);

  const onLogin = async (formData: LoginFormData) => {
    try {
      const res = await request("/users/auth/login", "POST", formData);
      console.log("토큰:", res.headers.authorization);
      const accessToken = res.headers.authorization;
      const refreshToken = res.headers.refresh;

      if (accessToken && refreshToken) {
        setToken(accessToken, refreshToken);
        console.log("로그인 성공");
        // router.push("/");
      }
    } catch (e) {
      console.log("로그인 실패:", e);
    }
  };

  return { methods, onLogin, error };
}
