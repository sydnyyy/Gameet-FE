"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useNotifySocket from "@/hooks/common/useNotifySocket";
import useAutoLogin from "@/hooks/auth/useAutoLogin";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  function NotifySocketAndAutoLogin() {
    useAutoLogin();
    useNotifySocket();
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider className="flex flex-col flex-1 min-h-0 pt-[80px]">
        <NotifySocketAndAutoLogin />
        {children}
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
