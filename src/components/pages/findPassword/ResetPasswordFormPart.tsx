import { UseFormReturn } from "react-hook-form";
import { FindPasswordFormData } from "@/hooks/pages/findPassword/useFindPasswordForm";
import Inputs from "@/components/common/input/Inputs";
import { passwordCheckValid, passwordValid } from "@/utils/validations";
import Buttons from "@/components/common/button/Buttons";

export interface ResetPasswordFormProps {
  isEmailSend: boolean;
  isEmailVerify: boolean;
  sendEmailAuth: () => void;
  verifyEmailAuth: () => void;
  methods: UseFormReturn<FindPasswordFormData>;
}

export default function ResetPasswordFormPart({ methods, isEmailVerify }: ResetPasswordFormProps) {
  const password = methods.watch("password");

  return (
    <>
      <Inputs name="password" label="비밀번호" type="password" rules={passwordValid} />
      <Inputs
        name="passwordCheck"
        label="비밀번호 확인"
        type="password"
        rules={passwordCheckValid(() => password)}
      />

      <Buttons
        type="submit"
        className="h-[48px] text-md"
        isDisabled={!isEmailVerify || !methods.formState.isValid}
      >
        비밀번호 재설정
      </Buttons>
    </>
  );
}