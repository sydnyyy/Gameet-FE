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
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
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
      clearToken: () => set({ token: null, email: null, userProfileId: null }),
      _hasHydrated: false,
      setHasHydrated: state => set({ _hasHydrated: state }),
      rememberMe: false,
      setRememberMe: value => set({ rememberMe: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
