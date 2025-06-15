import { ProfileFormType } from "./profile";

export interface MatchStatusType {
  match_status: "SEARCHING" | "CANCEL" | "NONE" | "MATCHED" | "FAILED";
  elapsed_time: number | null;
  match_room_id: number | null;
}

export type StartMatchType = Pick<
  ProfileFormType,
  | "preferred_genres"
  | "game_platforms"
  | "play_style"
  | "game_skill_level"
  | "is_adult_match_allowed"
  | "is_voice"
> & {
  min_manner_score?: number;
};
