import { apiRequest } from "@/app/api/apiRequest";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormData } from "./useLoginForm";

interface LoginResponse {
  role: string;
  user_id: number;
}

export const useLoginMutation = () => {
  const router = useRouter();
  const { setToken, setEmail, setRole, setUserProfileId, rememberMe, setRememberMe } =
    useAuthStore();

  return useMutation({
    mutationFn: async (formData: LoginFormData) => {
      const { saveId, ...data } = formData;
      const res = await apiRequest<LoginResponse>("/users/auth/login", "POST", data, {
        skipAuth: true,
      });
      return { res, saveId, email: formData.email, rememberMe };
    },
    onSuccess: ({ res, saveId, email, rememberMe }) => {
      const token = res.headers.authorization;
      const userRole = res.data?.role;
      const userId = res.data?.user_id;

      setRememberMe(rememberMe);
      setEmail(email);

      // 아이디 저장인 경우 로컬 스토리지에 저장
      saveId && email ? localStorage.setItem("saveId", email) : localStorage.removeItem("saveId");

      if (token) {
        setToken(token);
        setRole(userRole);
        setUserProfileId(userId);

        router.push(userRole === "GUEST" ? "/profile" : "/");
      } else {
        console.warn("토큰 받기 실패");
      }
    },
  });
};
