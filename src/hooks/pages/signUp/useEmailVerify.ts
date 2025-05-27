import { apiRequest } from "@/app/api/apiRequest";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UseFormClearErrors, UseFormSetError, UseFormWatch } from "react-hook-form";

export function useEmailVerify({
  email,
  code,
  watch,
  setError,
  clearErrors,
}: {
  email: string;
  code: string;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
}) {
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isEmailVerify, setIsEmailVerify] = useState(false);

  // 이메일 필드 값 변경 시 인증 상태 초기화
  useEffect(() => {
    setIsEmailSend(false);
    setIsEmailVerify(false);
  }, [email]);

  // 이메일 인증 코드 전송
  const sendCode = useMutation({
    mutationFn: async () => {
      return await apiRequest(
        "/users/auth/sign-up/send-code",
        "POST",
        { email },
        { skipAuth: true },
      );
    },
    onSuccess: () => {
      console.log("인증번호 전송 성공");
      setIsEmailSend(true);
      clearErrors("email");
    },
    onError: (error: any) => {
      console.log("인증번호 전송 실패", error?.response?.data || error.message);
      setError("email", { type: "server", message: error?.response?.data || error.message });
    },
  });

  // 인증 코드 확인
  const verifyCode = useMutation({
    mutationFn: async () => {
      return await apiRequest(
        "/users/auth/sign-up/verify-code",
        "POST",
        { email, code },
        { skipAuth: true },
      );
    },
    onSuccess: () => {
      console.log("인증번호 전송 성공");
      setIsEmailVerify(true);
      clearErrors("authCode");
    },
    onError: (error: any) => {
      console.log("인증번호 전송 실패", error);
      setError("authCode", { type: "server", message: error?.response?.data || error.message });
    },
  });

  // email 필드 값 변경되면 인증 상태 초기화
  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === "email") {
        setIsEmailSend(false);
        setIsEmailVerify(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    isEmailSend,
    isEmailVerify,
    sendCode: sendCode.mutate,
    verifyCode: verifyCode.mutate,
    isSending: sendCode.isPending,
    isVerifying: verifyCode.isPending,
  };
}
