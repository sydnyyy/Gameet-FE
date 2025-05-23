import { useAuthStore } from "@/store/authStore";
import axios, { AxiosRequestConfig } from "axios";
import { useState, useCallback } from "react";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 토큰 가져오기
  const { accessToken } = useAuthStore();

  const request = useCallback(
    async (path: string, method: ApiMethod, body?: any, config?: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios({
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          url: path,
          method,
          data: body,
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...config?.headers,
          },
          ...config,
        });

        console.log("요청 완료:", res);
        setData(res.data);
        return res;
      } catch (err: any) {
        setError(err?.response?.data?.message || "에러가 발생했습니다.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, error, loading, request };
}
