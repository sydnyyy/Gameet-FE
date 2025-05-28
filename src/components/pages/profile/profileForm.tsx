"use client";

import { apiRequest } from "@/app/api/apiRequest";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import FormLayout from "@/components/form/formLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { CombinedFormData } from "@/types/profile";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GameInfoForm from "./GameInfoForm";

const GENDERS = [
  { value: "M", label: "남성" },
  { value: "F", label: "여성" },
  { value: "N", label: "비공개" },
] as const;

export default function ProfileForm() {
  const { email, role } = useAuthStore.getState();

  const [step, setStep] = useState(1);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const methods = useForm<CombinedFormData>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      age: undefined,
      show_age: true,
      gender: "N",
      platforms: [],
      preferred_genres: [],
      play_style: "",
      game_skill_level: "",
      is_adult_match_allowed: false,
      is_voice: false,
      email: email ?? "",
    },
  });

  const showAge = methods.watch("show_age");
  const age = methods.watch("age");

  useEffect(() => {
    if (email) methods.setValue("email", email);
  }, [email, methods]);

  const handleNicknameCheck = useCallback(async () => {
    const nickname = methods.getValues("nickname").trim();

    if (!nickname) {
      alert("닉네임을 입력해주세요");
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

  const handleNextStep = () => {
    if (!nicknameChecked) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }

    if (age === undefined || age === null || age < 1) {
      alert("나이는 1 이상이어야 합니다.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (data: CombinedFormData) => {
    try {
      const method = role === "GUEST" ? "POST" : "PUT";
      await apiRequest(`/users/profile`, method, data);
      alert(role === "GUEST" ? "프로필 생성이 완료되었습니다." : "프로필 수정이 완료되었습니다.");
    } catch (error: any) {
      alert(error?.request?.responseText || "오류가 발생했습니다.");
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
            <Inputs
              {...methods.register("age")}
              name="age"
              label="나이"
              type="number"
              defaultValue=""
            />
            <Buttons
              type="button"
              className={`h-[48px] my-1 ${!showAge ? "bg-black text-white" : ""}`}
              onClick={() => methods.setValue("show_age", !showAge)}
            >
              ✓ 비공개
            </Buttons>
          </div>

          <label className="text-sm mb-1 block">성별</label>
          <div className="flex gap-2 mb-6">
            {GENDERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`border rounded px-4 py-2 text-sm ${
                  methods.watch("gender") === value ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => methods.setValue("gender", value)}
              >
                {label}
              </button>
            ))}
          </div>

          <Buttons type="button" isDisabled={!nicknameChecked} onClick={handleNextStep}>
            다음
          </Buttons>
        </>
      )}

      {step === 2 && <GameInfoForm methods={methods} onBack={() => setStep(1)} />}
    </FormLayout>
  );
}
