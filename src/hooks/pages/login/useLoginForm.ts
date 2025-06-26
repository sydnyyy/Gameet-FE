"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "./useLoginMutation";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  saveId?: boolean;
}

export function useLoginForm() {
  const [mounted, setMounted] = useState(false);
  const methods = useForm<LoginFormData>({
    mode: "onChange",
  });
  const loginMutation = useLoginMutation();

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

  const onLogin = async (formData: LoginFormData) => {
    loginMutation.mutate(formData, {
      onError: (error: any) => {
        methods.setError("root", {
          type: "server",
          message: error.message || "로그인에 실패했습니다.",
        });
      },
    });
  };

  return {
    methods,
    onLogin,
    mounted,
    error: loginMutation.error?.message,
    isLoading: loginMutation.isPending,
  };
}
