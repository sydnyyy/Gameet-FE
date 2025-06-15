"use client";
import FormLayout from "@/components/form/formLayout";
import { useFindPasswordForm } from "@/hooks/pages/findPassword/useFindPasswordForm";
import EmailVerifyFormPart from "@/components/pages/findPassword/emailVerifyFormPart";
import ResetPasswordFormPart from "@/components/pages/findPassword/resetPasswordFormPart";

export default function FindPasswordForm() {
  const findPasswordForm = useFindPasswordForm();
  const { methods, onSubmit, resetPasswordError, step } = findPasswordForm;

  return (
    <FormLayout methods={methods} onSubmit={onSubmit} error={resetPasswordError}>
      {step === 1 && <EmailVerifyFormPart {...findPasswordForm} />}
      {step === 2 && <ResetPasswordFormPart {...findPasswordForm} />}
    </FormLayout>
  );
}
