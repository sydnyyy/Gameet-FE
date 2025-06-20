"use client";
import RequireLoginModal from "@/components/auth/RequireLoginModal";
import MatchStatusRender from "@/components/pages/match/MatchStatusRender";
import { useAuth } from "@/hooks/auth/useAuth";

export default function Match() {
  const { isLogin } = useAuth();

  return (
    <main className="flex flex-1  flex-col items-center gap-8">
      {isLogin ? <MatchStatusRender /> : <RequireLoginModal />}
    </main>
  );
}
