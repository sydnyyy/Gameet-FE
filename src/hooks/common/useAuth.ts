import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const { token, clearToken } = useAuthStore();

  const isLogin = !!token;

  // 로그아웃
  const logout = () => {
    clearToken();
    router.push("/");
  };

  return { isLogin, token, logout };
}
