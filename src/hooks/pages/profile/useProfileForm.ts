// src/hooks/pages/profile/useProfileForm.ts
import { apiRequest } from "@/app/api/apiRequest";
import { useMatchingCodeOptions } from "@/hooks/pages/code/useMatchingCodeOptions";
import { useAuthStore } from "@/store/useAuthStore";
import { CombinedFormData } from "@/types/profile";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export function useProfileForm() {
  const { email, role } = useAuthStore.getState();

  const [step, setStep] = useState(1);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const methods = useForm<CombinedFormData>({
    mode: "onChange",
    defaultValues: {
      email: email ?? "",
      nickname: "",
      age: undefined,
      show_age: true,
      gender: "N",
      platforms: [],
      preferred_genres: [],
      play_style: "",
      game_skill_level: "",
      is_voice: true,
      is_adult_match_allowed: true,
    },
  });

  const watchedShowAge = methods.watch("show_age");
  const watchedAge = methods.watch("age");
  const watchedGender = methods.watch("gender");

  const watchedPlatforms = methods.watch("platforms") || [];
  const watchedPreferredGenres = methods.watch("preferred_genres") || [];
  const watchedPlayStyle = methods.watch("play_style") || "";
  const watchedGameSkillLevel = methods.watch("game_skill_level") || "";
  const watchedIsVoice = methods.watch("is_voice") ?? true;
  const watchedIsAdultMatchAllowed = methods.watch("is_adult_match_allowed") ?? true;

  const codeOptions = useMatchingCodeOptions();
  const router = useRouter();

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = useCallback(async () => {
    const nickname = methods.getValues("nickname").trim();

    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const res = await apiRequest<{ available: boolean }>(
        `/users/profile/nickname-available?nickname=${encodeURIComponent(nickname)}`,
        "GET",
      );

      if (res.data) {
        setNicknameChecked(true);
        alert("사용 가능한 닉네임입니다.");
      } else {
        setNicknameChecked(false);
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch {
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  }, [methods]);

  // 프로필 제출 핸들러 (role에 따라 POST 또는 PUT 사용 - 수정 필요)
  const handleSubmit = async (data: CombinedFormData) => {
    try {
      const method = role === "GUEST" ? "POST" : "PUT";
      await apiRequest(`/users/profile`, method, data);

      alert(role === "GUEST" ? "프로필 생성이 완료되었습니다." : "프로필 수정이 완료되었습니다.");
      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  return {
    methods,
    step,
    setStep,
    nicknameChecked,
    watchedShowAge,
    watchedAge,
    watchedGender,
    watchedPlatforms,
    watchedPreferredGenres,
    watchedPlayStyle,
    watchedGameSkillLevel,
    watchedIsVoice,
    watchedIsAdultMatchAllowed,
    codeOptions,
    role,
    router,
    handleNicknameCheck,
    handleSubmit,
  };
}
