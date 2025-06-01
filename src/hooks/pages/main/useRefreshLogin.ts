"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import axiosInstance from "@/app/api/axios";

export default function AutoLogin() {
  const { setToken, clearToken } = useAuthStore();

  useEffect(() => {
    async function checkRefreshToken() {
      try {
        const res = await axiosInstance.post("/users/auth/token/refresh", { skipAuth: true });
        const newToken = res.headers.authorization;
        if (newToken) {
          setToken(newToken);
        }
      } catch (error) {
        clearToken();
      }
    }
    checkRefreshToken();
  }, [setToken, clearToken]);

  return null;
}
