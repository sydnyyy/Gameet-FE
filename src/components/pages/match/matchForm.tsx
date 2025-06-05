"use client";
import FormLayout from "@/components/form/formLayout";
import { useProfileForm } from "@/hooks/pages/profile/useProfileForm";
import GameInfoFields from "../profile/gameInfoFields";
import { useMatchStore } from "@/store/useMatchStore";
import Buttons from "@/components/common/button/Buttons";
import { useStartMatch } from "@/hooks/pages/match/useMatchStatus";
import Sliders from "@/components/common/slider/Sliders";

export default function MatchForm() {
  const profileForm = useProfileForm({
    min_manner_score: 50,
  });
  const { methods } = profileForm;
  const { setMatchForm } = useMatchStore();
  const startMatch = useStartMatch();

  // 전역 store에 매칭 조건 값 저장 및 매칭 시작
  const handleSaveSetMatch = methods.handleSubmit(formValues => {
    setMatchForm(formValues);
    console.log("저장 완료:", formValues);
    startMatch.mutate(formValues);
  });

  return (
    <FormLayout methods={methods}>
      <h1 className="text-start">✔ 매칭 조건 설정</h1>
      <GameInfoFields {...profileForm} />
      <Sliders name="min_manner_score" label="매너 점수" />
      <Buttons size="lg" type="button" children="매칭 시작하기" onClick={handleSaveSetMatch} />
    </FormLayout>
  );
}
