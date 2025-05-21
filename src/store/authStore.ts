import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (accessToken: string, refreshToken: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      setToken: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearToken: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storge",
    },
  ),
);
