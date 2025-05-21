"use client";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import FormLayout from "@/components/form/formLayout";
import { useLoginForm } from "@/hooks/pages/login/useLoginForm";
import { emailValid } from "@/utils/validations";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import Link from "next/link";

export default function LoginForm() {
  const { methods, onLogin, error } = useLoginForm();

  return (
    <FormLayout methods={methods} onSubmit={onLogin} error={error}>
      <Inputs name="email" type="email" label="이메일" rules={emailValid} />
      <Inputs
        name="password"
        type="password"
        label="비밀번호"
        rules={{ required: "비밀번호를 입력하세요" }}
      />
      <CheckboxGroup>
        <div className="flex gap-5">
          <Checkbox value="rememberMe">로그인 상태 유지</Checkbox>
          <Checkbox value="saveUserId">아이디 저장</Checkbox>
        </div>
      </CheckboxGroup>

      <Buttons type="submit" className="h-[48px] text-md">
        로그인
      </Buttons>

      <div className="flex justify-center gap-5 items-center text-primary-gray my-3">
        <Link href="/find-password">비밀번호 찾기</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </FormLayout>
  );
}
