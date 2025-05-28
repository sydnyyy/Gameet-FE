import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
  setToken: (token: string) => void;
  setEmail: (email: string | null) => void;
  setRole: (role: string | null) => void;
  clearToken: () => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      email: null,
      role: null,
      setToken: token => set({ token }),
      setEmail: email => set({ email }),
      setRole: role => set({ role }),
      clearToken: () => set({ token: null, email: null }),
      rememberMe: false,
      setRememberMe: value => set({ rememberMe: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
