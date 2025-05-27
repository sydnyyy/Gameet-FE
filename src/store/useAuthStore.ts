import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      setToken: token => set({ token }),
      clearToken: () => set({ token: null }),
      rememberMe: false,
      setRememberMe: value => set({ rememberMe: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
