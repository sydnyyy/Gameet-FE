"use client";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import { authCodeValid, emailValid, passwordCheckValid, passwordValid } from "@/utils/validations";
import TermsArgreement from "./termsAgreement";
import { useSignUpForm } from "@/hooks/pages/signUp/useSignUpForm";
import FormLayout from "@/components/form/formLayout";

export default function SignUpForm() {
  const {
    methods,
    onSubmit,
    isEmailSend,
    isEmailVerify,
    signUpError,
    sendEmailAuth,
    verifyEmailAuth,
  } = useSignUpForm(); // 회원가입 폼 함수 가져오기

  const password = methods.watch("password");
  const { errors, isValid } = methods.formState;

  return (
    <FormLayout methods={methods} onSubmit={onSubmit} error={signUpError}>
      <div className="flex gap-2">
        <Inputs name="email" type="email" label="이메일" rules={emailValid} />
        <Buttons type="button" className="h-[48px] my-1" onClick={sendEmailAuth}>
          {isEmailSend ? "재요청" : "인증하기"}
        </Buttons>
      </div>

      <div className="flex gap-2">
        <Inputs name="authCode" label="인증번호" type="string" rules={authCodeValid} />
        <Buttons
          type="button"
          className="h-[48px] my-1"
          onClick={verifyEmailAuth}
          isDisabled={!!isEmailVerify}
        >
          {isEmailVerify ? "인증 완료" : "인증 확인"}
        </Buttons>
      </div>

      <Inputs name="password" label="비밀번호" type="password" rules={passwordValid} />
      <Inputs
        name="passwordCheck"
        label="비밀번호 확인"
        type="password"
        rules={passwordCheckValid(() => password)}
      />

      {/* 약관 동의 */}
      <TermsArgreement />

      <Buttons
        type="submit"
        size="lg"
        isDisabled={!isValid || Object.keys(errors).length > 0 || !isEmailSend || !isEmailVerify}
      >
        회원가입
      </Buttons>
      {signUpError && <p className="text-red-500">{signUpError}</p>}
    </FormLayout>
  );
}
