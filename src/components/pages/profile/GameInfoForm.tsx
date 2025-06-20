"use client";

import Buttons from "@/components/common/button/Buttons";
import { GameInfoFormProps } from "@/types/profile";
import GameInfoFields from "./GameInfoFields";

export default function GameInfoForm({
  methods,
  codeOptions,
  setStep,
  handleSubmit,
}: GameInfoFormProps) {
  if (!handleSubmit) {
    throw new Error("GameInfoForm에는 handleSubmit이 반드시 필요합니다.");
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">내 게임 정보를 알려주세요</h2>

      <GameInfoFields {...{ methods, codeOptions, handleSubmit }} />

      <div className="flex justify-between mt-6">
        <Buttons
          type="button"
          className="bg-white bg-opacity-30 text-white"
          onClick={() => setStep?.(1)}
        >
          이전
        </Buttons>

        <Buttons type="button" onClick={methods.handleSubmit(handleSubmit)}>
          완료
        </Buttons>
      </div>
    </>
  );
}
