"use client";

import FormLayout from "@/components/form/FormLayout";
import { useProfileForm } from "@/hooks/pages/profile/useProfileForm";
import GameInfoForm from "./GameInfoForm";
import UserInfoForm from "./UserInfoForm";

export default function ProfileForm() {
  const profileForm = useProfileForm();
  const { step, methods } = profileForm;

  return (
    <FormLayout methods={methods}>
      {step === 1 && <UserInfoForm {...profileForm} />}
      {step === 2 && <GameInfoForm {...profileForm} />}
    </FormLayout>
  );
}
