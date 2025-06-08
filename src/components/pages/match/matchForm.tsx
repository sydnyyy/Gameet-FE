"use client";
import FormLayout from "@/components/form/formLayout";
import { useProfileForm } from "@/hooks/pages/profile/useProfileForm";
import { useMatchStore } from "@/store/useMatchStore";
import Buttons from "@/components/common/button/Buttons";
import { useStartMatch } from "@/hooks/pages/match/useMatchStatus";
import { createMatchData } from "@/utils/createMatchData";
import MatchFormFields from "./MatchFormFields";

export default function MatchForm() {
  const profileForm = useProfileForm();
  const { methods } = profileForm;
  const { setMatchForm } = useMatchStore();
  const startMatch = useStartMatch();

  // 전역 store에 매칭 조건 값 저장 및 매칭 시작
  const handleSaveSetMatch = methods.handleSubmit(formValues => {
    const matchData = createMatchData(formValues);

    const platformsGenresData = {
      game_platforms: matchData.game_platforms,
      preferred_genres: matchData.preferred_genres,
    };
    setMatchForm(platformsGenresData);
    startMatch.mutate(matchData);
  });
  return (
    <FormLayout methods={methods}>
      <h1 className="text-start">✔ 매칭 조건 설정</h1>
      <MatchFormFields methods={profileForm.methods} codeOptions={profileForm.codeOptions} />
      <Buttons size="lg" type="button" children="매칭 시작하기" onClick={handleSaveSetMatch} />
    </FormLayout>
  );
}
