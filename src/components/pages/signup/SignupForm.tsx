"use client";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import { passwordCheckValid, passwordValid } from "@/utils/validations";
import TermsArgreement from "./TermsAgreement";
import { useSignUpForm } from "@/hooks/pages/signUp/useSignUpForm";
import FormLayout from "@/components/form/FormLayout";
import EmailAuthSection from "./EmailAuthSection";
import { useModal } from "@/hooks/modal/useModal";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const handleSignUpSuccess = () => {
    onOpen();
  };

  const {
    methods,
    onSubmit,
    isEmailSend,
    isEmailVerify,
    signUpError,
    sendEmailAuth,
    verifyEmailAuth,
  } = useSignUpForm(handleSignUpSuccess);

  const { onOpen, Modal } = useModal();
  const router = useRouter();
  const password = methods.watch("password");
  const { errors, isValid } = methods.formState;

  const isSubmitDisabled =
    !isValid || Object.keys(errors).length > 0 || !isEmailSend || !isEmailVerify;

  return (
    <>
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

        <Buttons type="submit" size="lg" isDisabled={isSubmitDisabled}>
          회원가입
        </Buttons>
        {signUpError && <p className="text-red-500">{signUpError}</p>}
      </FormLayout>

      <Modal
        headerText="💡 알림"
        close={() => {
          router.push("/login");
        }}
      >
        <div className="mb-4">회원가입이 완료되었습니다.</div>
        <Buttons onClick={() => router.push("/login")}>로그인</Buttons>
      </Modal>
    </>
  );
}
