import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
  userProfileId: number | null;
  setToken: (token: string) => void;
  setEmail: (email: string | null) => void;
  setRole: (role: string | null) => void;
  setUserProfileId: (id: number | null) => void;
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
      userProfileId: null,
      setToken: token => set({ token }),
      setEmail: email => set({ email }),
      setRole: role => set({ role }),
      setUserProfileId: id => set({ userProfileId: id }),
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
