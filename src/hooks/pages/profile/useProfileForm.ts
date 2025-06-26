"use client";
import { apiRequest } from "@/app/api/apiRequest";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";
import { useCommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { useAuthStore } from "@/store/useAuthStore";
import { ProfileFormType } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useProfileForm(defaultOverrides = {}) {
  const { email, role } = useAuthStore.getState();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [nicknameState, setNicknameState] = useState({
    checked: false,
    original: "",
  });

  const methods = useForm<ProfileFormType>({
    mode: "onChange",
    defaultValues: {
      email: email ?? "",
      nickname: "",
      password: "",
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
      ...defaultOverrides,
    },
  });

  const { setUserProfileId } = useAuthStore.getState();
  const codeOptions = useCommonCodeOptions(CommonCodeGroup.MATCH_CONDITION);

  // 기존 프로필 데이터 가져오기
  const {
    data,
    error,
    isPending: isProfileLoading,
  } = useQuery<ProfileFormType, Error>({
    queryKey: ["userProfile", email],
    queryFn: async () => {
      const res = await apiRequest<ProfileFormType>(`/users/profile`, "GET");
      if (res.data?.user_id) {
        setUserProfileId(res.data.user_id);
      }
      return res.data;
    },
    enabled: role !== "GUEST",
    refetchOnWindowFocus: false,
  });

  // 닉네임 변경 감지
  const nicknameRegister = methods.register("nickname", {
    onChange: e => {
      const value = e.target.value.trim();
      methods.setValue("nickname", value, { shouldValidate: true });

      setNicknameState(prev => ({
        ...prev,
        checked: value === prev.original,
      }));
    },
  });

  useEffect(() => {
    if (data && !isProfileLoading) {
      methods.reset(data);
      setNicknameState({
        checked: true,
        original: data.nickname,
      });
    }
  }, [isProfileLoading, data, methods]);

  useEffect(() => {
    if (error) {
      const msg = error.message || "프로필 데이터 불러오기 실패";
      alert(msg);
    }
  }, [error]);

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = useCallback(async () => {
    const nickname = methods.getValues("nickname").trim();
    if (!nickname) return alert("닉네임을 입력해주세요.");

    try {
      const res = await apiRequest<{ available: boolean }>(
        `/users/profile/nickname-available?nickname=${encodeURIComponent(nickname)}`,
        "GET",
      );
      if (res.data) {
        setNicknameState(prev => ({ ...prev, checked: true }));
        alert("사용 가능한 닉네임입니다.");
      } else {
        setNicknameState(prev => ({ ...prev, checked: false }));
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch {
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  }, [methods]);

  // 프로필 제출 핸들러
  const handleSubmit = async (data: ProfileFormType) => {
    const { confirm_password, password, ...rest } = data;
    const payload = password ? { ...rest, password } : rest;

    try {
      const method = role === "GUEST" ? "POST" : "PUT";
      const res = await apiRequest(`/users/profile`, method, payload);
      const newToken = res.headers?.authorization;
      if (newToken) {
        useAuthStore.getState().setToken(newToken);
      }

      alert(role === "GUEST" ? "프로필 생성이 완료되었습니다." : "프로필 수정이 완료되었습니다.");
      router.push("/");
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || "오류가 발생했습니다.";
      alert(msg);
    }
  };

  // 필드 watch 값들
  const watched = {
    showAge: methods.watch("show_age"),
    age: methods.watch("age"),
    gender: methods.watch("gender"),
    game_platforms: methods.watch("game_platforms") || [],
    preferredGenres: methods.watch("preferred_genres") || [],
    playStyle: methods.watch("play_style") || "",
    gameSkillLevel: methods.watch("game_skill_level") || "",
    isVoice: methods.watch("is_voice") ?? true,
    isAdultMatchAllowed: methods.watch("is_adult_match_allowed") ?? true,
  };

  return {
    methods,
    step,
    setStep,
    nicknameChecked: nicknameState.checked,
    nicknameRegister,
    codeOptions,
    role,
    router,
    handleNicknameCheck,
    handleSubmit,
    ...watched,
  };
}
