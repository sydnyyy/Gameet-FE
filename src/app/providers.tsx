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

  function NotifySocketAndAutoLogin() {
    useAutoLogin();
    useNotifySocket();
    useMatchToast();
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider className="flex flex-col flex-1 min-h-0 pt-[80px]">
        <NotifySocketAndAutoLogin />
        <ToastProvider />
        {children}
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
