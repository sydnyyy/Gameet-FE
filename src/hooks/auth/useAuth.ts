import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function useAuth() {
  const router = useRouter();
  const { token, clearToken, _hasHydrated } = useAuthStore();
  const resetChatStore = useChatStore(state => state.reset);

  const isLogin = useMemo(() => {
    return _hasHydrated && !!token;
  }, [_hasHydrated, token]);

  // 로그아웃
  const logout = () => {
    clearToken();
    resetChatStore();
    router.push("/");
  };

  return { isLogin, token, logout };
}
