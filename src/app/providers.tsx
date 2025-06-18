"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useNotifySocket from "@/hooks/common/useNotifySocket";
import useAutoLogin from "@/hooks/auth/useAutoLogin";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import useMatchToast from "@/hooks/toast/useMatchToast";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // 전역 실행 훅(로그인 상태 유지, 소켓 연결, Toast 전역에 띄우기)
  function AppSetup() {
    useAutoLogin();
    useNotifySocket();
    useMatchToast();
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider className="flex flex-col flex-1 min-h-0 pt-[80px]">
        <AppSetup />
        <ToastProvider />
        {children}
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
