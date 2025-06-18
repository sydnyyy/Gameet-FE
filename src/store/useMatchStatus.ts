import { MatchStatusType } from "@/types/match";
import { create } from "zustand";

interface MatchStatusStore {
  status: MatchStatusType | null;
  setStatus: (data: MatchStatusType) => void;
  clearStatus: () => void;
}

export const useMatchStatusStore = create<MatchStatusStore>(set => ({
  status: null,
  setStatus: data => set({ status: data }),
  clearStatus: () => set({ status: null }),
}));
