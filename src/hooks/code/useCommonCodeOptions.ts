import { apiRequest } from "@/app/api/apiRequest";
import { useEffect, useState } from "react";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";

export interface CommonCodeOptions {
  GAME_PLATFORM: Record<string, string>;
  PREFERRED_GENRE: Record<string, string>;
  PLAY_STYLE: Record<string, string>;
  GAME_SKILL_LEVEL: Record<string, string>;
  REPORT_REASON: Record<string, string>;
  MANNER_EVALUATION: Record<string, string>;
}

export const useCommonCodeOptions = (codeGroup: CommonCodeGroup) => {
  const [options, setOptions] = useState<CommonCodeOptions | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await apiRequest<Record<string, Record<string, string>>>(
          `/common/code?codeGroup=${codeGroup}`,
          "GET",
        );

        const data = res.data;

        const mapped: CommonCodeOptions = {
          GAME_PLATFORM: data["GAME_PLATFORM"] ?? {},
          PREFERRED_GENRE: data["PREFERRED_GENRE"] ?? {},
          PLAY_STYLE: data["PLAY_STYLE"] ?? {},
          GAME_SKILL_LEVEL: data["GAME_SKILL_LEVEL"] ?? {},
          REPORT_REASON: data["REPORT_REASON"] ?? {},
          MANNER_EVALUATION: data["MANNER_EVALUATION"] ?? {},
        };

        setOptions(mapped);
      } catch (err) {
        console.error("공통 코드 불러오기 실패", err);
      }
    };

    fetchCodes();
  }, [codeGroup]);

  return options;
};
