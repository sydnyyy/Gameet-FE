import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터 => accessToken 자동 추가
axiosInstance.interceptors.request.use(config => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// 응답 인터셉터 => accessToken 만료 및 갱신
axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originReq = error.config;
    const { setToken, clearToken } = useAuthStore.getState();

    // accessToken 만료 시 재시도
    if (error.response?.status === 401 && !originReq._retry) {
      originReq._retry = true;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/token/refresh`,
          {},
        );

        const newToken = res.headers.authorization;

        if (newToken) {
          setToken(newToken);

          // 기존 요청 재시도
          originReq.headers.Authorization = newToken;
          return axiosInstance(originReq);
        }
      } catch (reissueError) {
        // 재발급 실패 시 토큰 초기화
        clearToken();
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
