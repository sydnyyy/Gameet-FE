import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  setToken: (token: string) => void;
  setEmail: (email: string | null) => void;
  clearToken: () => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      email: null,
      setToken: token => set({ token }),
      clearToken: () => set({ token: null, email: null }),
      setEmail: email => set({ email }),
      rememberMe: false,
      setRememberMe: value => set({ rememberMe: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
