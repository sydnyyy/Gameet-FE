import { apiRequest } from "@/app/api/apiRequest";
import { useEffect, useState } from "react";

export interface CodeOptions {
  [key: string]: Record<string, string>;
}

export const useMatchingCodeOptions = () => {
  const [options, setOptions] = useState<CodeOptions | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await apiRequest<CodeOptions>("/common/code?codeGroup=MATCH_CONDITION", "GET");
        setOptions(res.data);
      } catch (err) {
        console.error("매칭 코드 불러오기 실패", err);
      }
    };

    fetchCodes();
  }, []);

  return options;
};
