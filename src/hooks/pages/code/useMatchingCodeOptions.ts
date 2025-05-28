import { apiRequest } from "@/app/api/apiRequest";
import { useEffect, useState } from "react";

export interface MatchingCodeOptions {
  GAME_PLATFORM: Record<string, string>;
  PREFERRED_GENRE: Record<string, string>;
  PLAY_STYLE: Record<string, string>;
  GAME_SKILL_LEVEL: Record<string, string>;
}

export const useMatchingCodeOptions = () => {
  const [options, setOptions] = useState<MatchingCodeOptions | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await apiRequest<Record<string, Record<string, string>>>(
          "/common/code?codeGroup=MATCH_CONDITION",
          "GET",
        );

        const data = res.data;

        const mapped: MatchingCodeOptions = {
          GAME_PLATFORM: data["GAME_PLATFORM"] ?? {},
          PREFERRED_GENRE: data["PREFERRED_GENRE"] ?? {},
          PLAY_STYLE: data["PLAY_STYLE"] ?? {},
          GAME_SKILL_LEVEL: data["GAME_SKILL_LEVEL"] ?? {},
        };

        setOptions(mapped);
      } catch (err) {
        console.error("매칭 코드 불러오기 실패", err);
      }
    };

    fetchCodes();
  }, []);

  return options;
};
