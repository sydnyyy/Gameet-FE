"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { apiRequest } from "@/app/api/apiRequest";

export default function AutoLogin() {
  const { setToken, clearToken, _hasHydrated, rememberMe, token } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated || !rememberMe || !token) {
      return;
    }

    async function checkRefreshToken() {
      const { rememberMe } = useAuthStore.getState();
      if (!rememberMe) return;
      try {
        const res = await apiRequest("/users/auth/token/refresh", "POST", {}, { skipAuth: true });
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
