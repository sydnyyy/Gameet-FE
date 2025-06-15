import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import { authCodeValid, emailValid } from "@/utils/validations";

interface EmailAuthSectionProps {
  isEmailSend: boolean;
  isEmailVerify: boolean;
  sendEmailAuth: () => void;
  verifyEmailAuth: () => void;
}
export default function EmailAuthSection({
  isEmailSend,
  isEmailVerify,
  sendEmailAuth,
  verifyEmailAuth,
}: EmailAuthSectionProps) {
  return (
    <>
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
    </>
  );
}
