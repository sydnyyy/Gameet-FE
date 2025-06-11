import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const router = useRouter();
  const { token, clearToken, _hasHydrated } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (_hasHydrated) {
      setIsLogin(!!token);
    } else {
      setIsLogin(false);
    }
  }, [_hasHydrated, token]);

  // 로그아웃
  const logout = () => {
    clearToken();
    router.push("/");
  };

  return { isLogin, token, logout };
}
