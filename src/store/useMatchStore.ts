import { create } from "zustand";
import { ProfileFormType } from "@/types/profile";

interface MatchStoreType extends Partial<ProfileFormType> {
  setMatchForm: (formData: Partial<ProfileFormType>) => void;
  resetMatchForm: () => void;
}
export const useMatchStore = create<MatchStoreType>(set => ({
  game_platforms: [],
  preferred_genres: [],
  play_style: "",
  game_skill_level: "",
  is_voice: true,
  is_adult_match_allowed: true,
  setMatchForm: formData => set(state => ({ ...state, ...formData })),
  resetMatchForm: () =>
    set({
      game_platforms: [],
      preferred_genres: [],
      play_style: "",
      game_skill_level: "",
      is_voice: true,
      is_adult_match_allowed: true,
    }),
}));
