"use client";

import { apiRequest } from "@/app/api/apiRequest";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import FormLayout from "@/components/form/formLayout";
import { useMatchingCodeOptions } from "@/hooks/pages/code/useMatchingCodeOptions";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

export default function ProfileForm() {
  const router = useRouter();
  const { email } = useAuthStore.getState();
  const [step, setStep] = useState(1);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const methods = useForm<CombinedFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      age: 0,
      show_age: true,
      gender: "N",
      platforms: [],
      preferred_genres: [],
      play_style: "",
      game_skill_level: "",
      is_adult_match_allowed: false,
      is_voice: false,
    },
  });

  const showAge = methods.watch("show_age");

  useEffect(() => {
    methods.setValue("email", email ?? "");
  }, [email]);

  const codeOptions = useMatchingCodeOptions();
  if (!codeOptions) return <div>Loading...</div>;
  const platforms = Object.entries(codeOptions.GAME_PLATFORM);
  const preferred_genres = Object.entries(codeOptions.PREFERRED_GENRE);
  const play_style = Object.entries(codeOptions.PLAY_STYLE);
  const game_skill_level = Object.entries(codeOptions.GAME_SKILL_LEVEL);
  

  const handleNicknameCheck = async () => {
    const nickname = methods.getValues("nickname");
    if (!nickname) {
      alert("닉네임을 입력해주세요");
      return;
    }

    try {
      const res = await apiRequest<{ available: boolean }>(
        `/users/profile/nickname-available?nickname=${encodeURIComponent(nickname)}`,
        "GET"
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
  };

  const toggleGenre = (genre: CombinedFormData["preferred_genres"][number]) => {
    const current = methods.getValues("preferred_genres");
    if (current.includes(genre)) {
      methods.setValue("preferred_genres", current.filter((g) => g !== genre));
    } else {
      methods.setValue("preferred_genres", [...current, genre]);
    }
  };

  const handleSubmit = async (data: CombinedFormData) => {
    try {
      await apiRequest<{ available: boolean }>(
        `/users/profile`,
        "POST",
        data
      );
      router.push("/");
    } catch (error: any) {
      alert(error.request.responseText);
    }
  };

  return (
    <FormLayout methods={methods} onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-4">프로필 정보를 입력하세요</h2>
          <Inputs name="email" label="이메일" disabled />
          <div className="flex gap-2">
            <Inputs {...methods.register("nickname")} name="nickname" label="닉네임" />
            <Buttons type="button" className="h-[48px] my-1" onClick={handleNicknameCheck}>
              중복확인
            </Buttons>
          </div>

          <div className="flex gap-2">
            <Inputs {...methods.register("age")} name="age" label="나이" type="number"/>
            <Buttons
              type="button"
              className={`h-[48px] my-1 ${!showAge ? "bg-black text-white" : ""}`}
              onClick={() => {
                methods.setValue("show_age", !showAge);
              }}
            >
              ✓ 비공개
            </Buttons>
          </div>

          <label className="text-sm">성별</label>
          <div className="flex gap-2">
            {["M", "F", "N"].map((g) => (
              <button
                key={g}
                type="button"
                className={`border rounded px-4 py-2 text-sm ${
                  methods.watch("gender") === g ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => methods.setValue("gender", g as "M" | "F" | "N")}
              >
                {g === "M" ? "남성" : g === "F" ? "여성" : "비공개"}
              </button>
            ))}
          </div>

          <Buttons type="button"
            isDisabled={!nicknameChecked}
            onClick={() => setStep(2)}
          >
            다음
          </Buttons>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-4">내 게임 정보를 알려주세요</h2>

          <label className="text-sm">플랫폼</label>
          <div className="flex gap-2 mb-2">
            {platforms.map(([key, label]) => {
              const selected = methods.watch("platforms") || [];
              const isActive = selected.includes(key);

              return (
                <button
                  key={key}
                  type="button"
                  className={`border rounded px-4 py-2 text-sm ${isActive ? "bg-gray-500 text-white" : ""}`}
                  onClick={() => {
                    const updated = isActive
                      ? selected.filter((item) => item !== key)
                      : [...selected, key];
                    methods.setValue("platforms", updated);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <label className="text-sm">선호 장르</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {preferred_genres.map(([key, label]) => {
              const selected = methods.watch("preferred_genres") || [];
              const isActive = selected.includes(key);

              return (
                <button
                  key={key}
                  type="button"
                  className={`border rounded px-4 py-2 text-sm ${isActive ? "bg-gray-500 text-white" : ""}`}
                  onClick={() => {
                    const updated = isActive
                      ? selected.filter((item) => item !== key)
                      : [...selected, key];
                    methods.setValue("preferred_genres", updated);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <label className="text-sm">플레이 스타일</label>
          <div className="flex gap-2 mb-2">
            {play_style.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`border rounded px-4 py-2 text-sm ${
                  methods.watch("play_style") === key ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => methods.setValue("play_style", key)}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="text-sm">게임 실력</label>
          <div className="flex gap-2 mb-2">
            {game_skill_level.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`border rounded px-4 py-2 text-sm ${
                  methods.watch("game_skill_level") === key ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => methods.setValue("game_skill_level", key)}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="text-sm">마이크 사용 가능 여부</label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              className={`border rounded px-4 py-2 text-sm ${
                methods.watch("is_voice") === true ? "bg-gray-500 text-white" : ""
              }`}
              onClick={() => methods.setValue("is_voice", true)}
            >
              가능
            </button>
            <button
              type="button"
              className={`border rounded px-4 py-2 text-sm ${
                methods.watch("is_voice") === false ? "bg-gray-500 text-white" : ""
              }`}
              onClick={() => methods.setValue("is_voice", false)}
            >
              불가능
            </button>
          </div>

          <label className="text-sm">매칭 상대 미성년 여부</label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              className={`border rounded px-4 py-2 text-sm ${
                methods.watch("is_adult_match_allowed") === true ? "bg-gray-500 text-white" : ""
              }`}
              onClick={() => methods.setValue("is_adult_match_allowed", true)}
            >
              가능
            </button>
            <button
              type="button"
              className={`border rounded px-4 py-2 text-sm ${
                methods.watch("is_adult_match_allowed") === false ? "bg-gray-500 text-white" : ""
              }`}
              onClick={() => methods.setValue("is_adult_match_allowed", false)}
            >
              불가능
            </button>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 border rounded"
              onClick={() => setStep(1)}
            >
              이전
            </button>
            <Buttons type="submit">완료</Buttons>
          </div>
        </>
      )}
    </FormLayout>
  );
}