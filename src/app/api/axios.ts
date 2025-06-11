import { useAuthStore } from "@/store/useAuthStore";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터 => accessToken 자동 추가
axiosInstance.interceptors.request.use(config => {
  const { token, _hasHydrated } = useAuthStore.getState();
  if (_hasHydrated && token) {
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

    // skipAuth 값이 true인 경우 재발급 X
    if (originReq.skipAuth) {
      return Promise.reject(error);
    }

    // accessToken 만료 시 재시도
    if (error.response?.status === 401 && !originReq._retry) {
      originReq._retry = true;
      try {
        const refreshRes = await await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/token/refresh`,
          {
            withCredentials: true,
          },
        );

        const newToken = refreshRes.headers.authorization;

        if (newToken) {
          setToken(newToken);

          // 기존 요청 재시도
          if (originReq.headers && typeof originReq.headers === "object") {
            originReq.headers.Authorization = newToken;
          } else {
            originReq.headers = { Authorization: newToken };
          }
          return axiosInstance(originReq);
        }
      } catch (reissueError) {
        // 재발급 실패 시 토큰 초기화
        clearToken();
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(handleAxiosError(reissueError as AxiosError));
      }
    }

    return Promise.reject(handleAxiosError(error));
  },
);

export default axiosInstance;
