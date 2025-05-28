export interface CombinedFormData {
  email: string;
  nickname: string;
  age: number;
  show_age: boolean;
  gender: "M" | "F" | "N";
  platforms: string[];
  preferred_genres: string[];
  play_style: string;
  game_skill_level: string;
  is_adult_match_allowed: boolean;
  is_voice: boolean;
}
