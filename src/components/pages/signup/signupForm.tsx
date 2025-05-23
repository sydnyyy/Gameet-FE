"use client";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import { authCodeValid, emailValid, passwordCheckValid, passwordValid } from "@/utils/validations";
import TermsArgreement from "./termsAgreement";
import { useSignUpForm } from "@/hooks/pages/signUp/useSignUpForm";
import FormLayout from "@/components/form/formLayout";

export default function SignUpForm() {
  const { methods, onSubmit, error, handleSendEmailAuth, handleVerifyEmailAuth } = useSignUpForm(); // 회원가입, 이메일 인증 함수

  const password = methods.watch("password");

  return (
    <FormLayout methods={methods} onSubmit={onSubmit} error={error}>
      <div className="flex gap-2">
        <Inputs name="email" type="email" label="이메일" rules={emailValid} />
        <Buttons type="button" className="h-[48px] my-1" onClick={handleSendEmailAuth}>
          인증하기
        </Buttons>
      </div>

      <div className="flex gap-2">
        <Inputs
          name="authCode"
          label="인증번호"
          type="numeric"
          inputMode="numeric"
          rules={authCodeValid}
        />
        <Buttons type="button" className="h-[48px] my-1" onClick={handleVerifyEmailAuth}>
          인증 확인
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
      <Buttons type="submit" size="lg" isDisabled={!methods.formState.isValid}>
        회원가입
      </Buttons>
      {error && <p className="text-red-500">{error}</p>}
    </FormLayout>
  );
}
