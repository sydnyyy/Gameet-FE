import { apiRequest } from "@/app/api/apiRequest";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";
import { useCommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { ProfileFormType } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function useReadOnlyProfileForm(userProfileId: number | string) {
  const methods = useForm<ProfileFormType>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      age: undefined,
      show_age: true,
      gender: "N",
      game_platforms: [],
      preferred_genres: [],
      play_style: "",
      game_skill_level: "",
      is_voice: true,
      is_adult_match_allowed: true,
      min_manner_score: 50,
    },
  });

  const codeOptions = useCommonCodeOptions(CommonCodeGroup.MATCH_CONDITION);

  const { data, isPending, error } = useQuery<ProfileFormType>({
    queryKey: ["userProfile", userProfileId],
    queryFn: async () => {
      const res = await apiRequest<ProfileFormType>(`/users/profile/${userProfileId}`, "GET");
      return res.data;
    },
    enabled: !!userProfileId,
  });

  useEffect(() => {
    if (data && !isPending) {
      methods.reset(data);
    }
  }, [data, isPending, methods]);

  return {
    methods,
    codeOptions,
    isLoading: isPending,
    error,
  };
}
