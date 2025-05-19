"use client";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import {
  authCodeValid,
  emailValid,
  nicknameValid,
  passwordCheckValid,
  passwordValid,
} from "@/utils/validations";
import { useForm, FormProvider } from "react-hook-form";
import TermsArgreement from "./termsAgreement";

export default function SignUpForm() {
  const methods = useForm({
    mode: "onBlur", // 유효성 검사 onBlur 모드
  });

  // 비밀번호 입력 값(비밀번호 확인에서 사용)
  const password = methods.watch("password");

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => console.log(data))}
        className="flex flex-col flex-1 gap-3 w-full h-full max-w-md p-10 justify-center"
      >
        <div className="flex gap-2">
          <Inputs name="email" type="email" label="이메일" rules={emailValid} />
          <Buttons type="button" className="h-[48px] my-1">
            인증하기
          </Buttons>
        </div>

        <div className="flex gap-2">
          <Inputs
            name="text"
            label="인증번호"
            type="numeric"
            inputMode="numeric"
            rules={authCodeValid}
          />
          <Buttons type="button" className="h-[48px] my-1">
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

        <Inputs name="nickname" label="닉네임" type="password" rules={nicknameValid} />

        {/* 약관 동의 */}
        <TermsArgreement />
        <Buttons type="submit" size="lg">
          회원가입
        </Buttons>
      </form>
    </FormProvider>
  );
}
