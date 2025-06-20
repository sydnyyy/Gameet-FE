import Inputs from "@/components/common/input/Inputs";
import { authCodeValid, emailValid } from "@/utils/validations";
import Buttons from "@/components/common/button/Buttons";
import { UseFormReturn } from "react-hook-form";
import { FindPasswordFormData } from "@/hooks/pages/findPassword/useFindPasswordForm";

export interface EmailVerifyFormProps {
  methods: UseFormReturn<FindPasswordFormData>;
  isEmailSend: boolean;
  isSending: boolean;
  sendEmailAuth: () => void;
  verifyEmailAuth: () => void;
}

export default function EmailVerifyFormPart({
  methods,
  isEmailSend,
  isSending,
  sendEmailAuth,
  verifyEmailAuth,
}: EmailVerifyFormProps) {
  return (
    <>
      <div className="flex gap-2">
        <Inputs
          name="email"
          type="email"
          label="이메일"
          rules={emailValid}
          isDisabled={isSending}
        />
        <Buttons
          type="button"
          className="h-[48px] my-1"
          onClick={sendEmailAuth}
          isDisabled={isSending}
        >
          {isSending ? "전송 중..." : isEmailSend ? "재요청" : "인증요청"}
        </Buttons>
      </div>

      <Inputs name="authCode" label="인증번호" type="string" rules={authCodeValid} />
      <Buttons
        type="button"
        className="h-[48px] text-md"
        isDisabled={!isEmailSend || !methods.formState.isValid}
        onClick={verifyEmailAuth}
      >
        다음
      </Buttons>
    </>
  );
}