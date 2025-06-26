"use client";

import Buttons from "@/components/common/button/Buttons";
import ToggleButton from "@/components/common/button/ToggleButton";
import Inputs from "@/components/common/input/Inputs";
import { UserInfoFormProps } from "@/types/profile";
import { ageValid, nicknameValid, passwordCheckValid, passwordValid } from "@/utils/validations";

const GENDERS = [
  { value: "M", label: "남성" },
  { value: "F", label: "여성" },
  { value: "N", label: "비공개" },
] as const;

export default function UserInfoForm({
  methods,
  setStep,
  nicknameChecked,
  handleNicknameCheck,
  role,
}: UserInfoFormProps) {
  const watchedShowAge = methods.watch("show_age");
  const watchedAge = methods.watch("age");
  const watchedGender = methods.watch("gender");

  // 다음 단계로 이동
  const handleNextStep = () => {
    const password = methods.getValues("password");
    const confirmPassword = methods.getValues("confirm_password");

    if (!nicknameChecked) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }

    if (watchedAge === undefined || watchedAge === null || watchedAge < 12) {
      alert("나이는 12세 이상이어야 합니다.");
      return;
    }

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
    }

    setStep(2);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">프로필 정보를 입력하세요</h2>
      <Inputs name="email" label="이메일" disabled />

      {role !== "GUEST" && (
        <>
          <Inputs
            {...methods.register("password")}
            name="password"
            label="새 비밀번호"
            type="password"
            rules={passwordValid}
          />
          <Inputs
            {...methods.register("confirm_password")}
            name="confirm_password"
            label="새 비밀번호 확인"
            type="password"
            rules={passwordCheckValid(() => methods.getValues("password"))}
          />
        </>
      )}

      <div className="flex gap-2">
        <Inputs
          {...methods.register("nickname")}
          name="nickname"
          label="닉네임"
          rules={nicknameValid}
        />
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
          rules={ageValid}
        />
        <Buttons
          type="button"
          className={`h-[48px] my-1 ${!watchedShowAge ? "border bg-transparent text-white" : ""}`}
          onClick={() => methods.setValue("show_age", !watchedShowAge)}
        >
          ✓ 비공개
        </Buttons>
      </div>

      <label className="text-sm mb-1 block">성별</label>
      <div className="flex gap-2 mb-6">
        {GENDERS.map(({ value, label }) => (
          <ToggleButton
            key={value}
            isActive={watchedGender === value}
            onClick={() => methods.setValue("gender", value)}
          >
            {label}
          </ToggleButton>
        ))}
      </div>

      <Buttons type="button" isDisabled={!nicknameChecked} onClick={handleNextStep}>
        다음
      </Buttons>
    </>
  );
}
