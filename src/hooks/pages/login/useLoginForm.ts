"use client";
import { apiRequest } from "@/app/api/apiRequest";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  saveId?: boolean;
}

export function useLoginForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const methods = useForm<LoginFormData>({
    mode: "onChange",
  });

  // 지난 로그인 때 아이디 저장한 경우 불러오기
  useEffect(() => {
    const saveId = localStorage.getItem("saveId");
    methods.reset({
      email: saveId || "",
      rememberMe: false,
      saveId: !!saveId,
    });
    setMounted(true);
  }, [methods]);

  const { setToken, setEmail, rememberMe, setRememberMe } = useAuthStore();

  // 로그인
  const loginMutation = useMutation({
    mutationFn: async (formData: LoginFormData) => {
      // req에 saveId 제외
      const { saveId, ...data } = formData;
      type LoginResponse = {
        role: "GUEST" | "USER" | "ADMIN";
      };
      const res = await apiRequest<LoginResponse>("/users/auth/login", "POST", data);
      return { res, saveId, email: formData.email, rememberMe };
    },
    onSuccess: ({ res, saveId, email, rememberMe }) => {
      console.log("로그인 완료:", res);
      const token = res.headers.authorization;
      setRememberMe(rememberMe);

      // 아이디 저장인 경우 로컬 스토리지에 저장
      saveId && email ? localStorage.setItem("saveId", email) : localStorage.removeItem("saveId");

      if (token) {
        setToken(token);
        setEmail(email);
        const userRole = res.data?.role;

        if (userRole === "GUEST") {
          router.push("/profile");
        } else {
          router.push("/");
        }
      } else {
        console.warn("토큰 받기 실패");
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data || "알 수 없는 오류 발생";
      console.log("로그인 실패:", errorMessage);
    },
  });

  const onLogin = async (formData: LoginFormData) => {
    loginMutation.mutate(formData);
  };

  return {
    methods,
    onLogin,
    mounted,
    error: loginMutation.error,
    isLoading: loginMutation.isPending,
  };
}
