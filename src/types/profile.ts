import { MatchingCodeOptions } from "@/hooks/pages/code/useMatchingCodeOptions";
import { UseFormReturn } from "react-hook-form";

export interface ProfileFormType {
  user_id?: number;
  email: string;
  password?: string;
  confirm_password?: string;
  nickname: string;
  age: number;
  show_age: boolean;
  gender: "M" | "F" | "N";
  game_platforms: string[];
  preferred_genres: string[];
  play_style: string;
  game_skill_level: string;
  is_adult_match_allowed: boolean;
  is_voice: boolean;
  min_manner_score?: number;
}

export interface UserInfoFormProps {
  methods: UseFormReturn<ProfileFormType>;
  setStep: (step: number) => void;
  nicknameChecked: boolean;
  handleNicknameCheck: () => void;
  role: string | null;
}

export interface GameInfoFormProps {
  methods: UseFormReturn<ProfileFormType>;
  codeOptions: MatchingCodeOptions | null;
  setStep?: (step: number) => void;
  handleSubmit: (data: ProfileFormType) => void;
}
