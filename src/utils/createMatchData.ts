import { StartMatchType } from "@/types/match";

export const createMatchData = (formValues: StartMatchType): StartMatchType => {
  return {
    preferred_genres: formValues.preferred_genres,
    game_platforms: formValues.game_platforms,
    play_style: formValues.play_style,
    game_skill_level: formValues.game_skill_level,
    is_adult_match_allowed: formValues.is_adult_match_allowed,
    is_voice: formValues.is_voice,
    min_manner_score: formValues.min_manner_score ?? 50,
  };
};
