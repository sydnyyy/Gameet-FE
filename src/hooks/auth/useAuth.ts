import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { WS_TOKEN_KEY, CLIENT_ID_KEY } from "@/constants/auth/storageKeys";
import { apiRequest } from "@/app/api/apiRequest";

export function useAuth() {
  const router = useRouter();
  const { token, clearToken, _hasHydrated } = useAuthStore();
  const resetChatStore = useChatStore(state => state.reset);

  const isLogin = useMemo(() => {
    return _hasHydrated && !!token;
  }, [_hasHydrated, token]);

  // 로그아웃
  const logout = async () => {
    try {
      await apiRequest("/users/auth/logout", "POST");
    } catch (error) {
      console.error("서버 로그아웃 실패", error);
    } finally {
      clearToken();
      resetChatStore();

      localStorage.removeItem(CLIENT_ID_KEY);
      sessionStorage.removeItem(WS_TOKEN_KEY);

      router.push("/");
    }
  };

  return { isLogin, token, logout };
}
