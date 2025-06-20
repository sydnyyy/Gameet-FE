"use client";
import GameInfoFields from "../profile/GameInfoFields";
import Sliders from "@/components/common/slider/Sliders";
import { GameInfoFormProps } from "@/types/profile";
import { useFormContext } from "react-hook-form";

export default function MatchFormFields({ methods, codeOptions }: GameInfoFormProps) {
  useFormContext();

  return (
    <>
      <GameInfoFields methods={methods} codeOptions={codeOptions} />
      <Sliders name="min_manner_score" label="매너 점수 최소치" defaultValue={50} />
    </>
  );
}
