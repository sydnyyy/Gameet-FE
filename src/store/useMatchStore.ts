import { create } from "zustand";
import { ProfileFormType } from "@/types/profile";

interface MatchStoreType {
  game_platforms: string[];
  preferred_genres: string[];
  setMatchForm: (
    formData: Partial<Pick<ProfileFormType, "game_platforms" | "preferred_genres">>,
  ) => void;
  resetMatchForm: () => void;
}

export const useMatchStore = create<MatchStoreType>(set => ({
  game_platforms: [],
  preferred_genres: [],
  setMatchForm: formData =>
    set(state => ({
      ...state,
      ...formData,
    })),
  resetMatchForm: () =>
    set({
      game_platforms: [],
      preferred_genres: [],
    }),
}));
