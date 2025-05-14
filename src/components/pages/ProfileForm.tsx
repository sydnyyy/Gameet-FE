"use client";
import GamePreferenceForm from "@/components/pages/GamePreferenceForm";
import { useProfileForm } from "@/store/useProfileForm";
import { useState } from "react";

export default function ProfileForm() {
  const { email, nickname, age, isAgePublic, gender, setField } = useProfileForm();
  const [step, setStep] = useState(1);  // 화면 전환을 위한 상태

  if (step === 2) {
    return <GamePreferenceForm />;
  }

  return (
    <section className="flex flex-col gap-4 w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">프로필 정보를 입력해주세요</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setField("email", e.target.value)}
        className="border rounded px-4 py-2"
      />
      <div className="flex items-center gap-2">
        <input
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setField("nickname", e.target.value)}
          className="border rounded px-4 py-2 flex-1"
        />
        <button
          // onClick={handleCheckDuplicateNickname}
          className="px-3 py-2 bg-gray-800 text-white rounded"
        >
          중복확인
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="나이"
          value={age}
          onChange={(e) => setField("age", e.target.value)}
          className="border rounded px-4 py-2 flex-1"
        />
        <label>
          <input
            type="checkbox"
            checked={isAgePublic}
            onChange={() => setField("isAgePublic", !isAgePublic)}
          />{" "}
          비공개
        </label>
      </div>
      <div className="flex gap-2">
        {["남성", "여성", "비공개"].map((g) => (
          <button
            key={g}
            className={`px-3 py-1 rounded border ${gender === g ? "bg-black text-white" : ""}`}
            onClick={() => setField("gender", g as any)}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-2 bg-black text-white rounded"
        >
          다음
        </button>
      </div>
    </section>
  );
}
