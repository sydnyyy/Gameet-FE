"use client";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import { passwordCheckValid, passwordValid } from "@/utils/validations";
import TermsArgreement from "./termsAgreement";
import { useSignUpForm } from "@/hooks/pages/signUp/useSignUpForm";
import FormLayout from "@/components/form/formLayout";
import EmailAuthSection from "./EmailAuthSection";

export default function SignUpForm() {
  const {
    methods,
    onSubmit,
    isEmailSend,
    isEmailVerify,
    signUpError,
    sendEmailAuth,
    verifyEmailAuth,
  } = useSignUpForm();

  const password = methods.watch("password");
  const { errors, isValid } = methods.formState;

  const isSubmitDisabled =
    !isValid || Object.keys(errors).length > 0 || !isEmailSend || !isEmailVerify;

  return (
    <FormLayout methods={methods} onSubmit={onSubmit} error={signUpError}>
      <EmailAuthSection
        isEmailSend={isEmailSend}
        isEmailVerify={isEmailVerify}
        sendEmailAuth={sendEmailAuth}
        verifyEmailAuth={verifyEmailAuth}
      />

      <Inputs name="password" label="비밀번호" type="password" rules={passwordValid} />
      <Inputs
        name="passwordCheck"
        label="비밀번호 확인"
        type="password"
        rules={passwordCheckValid(() => password)}
      />

      {/* 약관 동의 */}
      <TermsArgreement />

      <Buttons type="submit" size="lg" isDisabled={isSubmitDisabled} children="회원가입" />
      {signUpError && <p className="text-red-500">{signUpError}</p>}
    </FormLayout>
  );
}
