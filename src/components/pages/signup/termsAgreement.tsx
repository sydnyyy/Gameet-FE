import { Checkbox, CheckboxGroup } from "@heroui/react";

export default function TermsArgreement() {
  return (
    <CheckboxGroup
      className="flex flex-col items-start w-full my-5 text-primary-gray"
      classNames={{
        base: "w-full",
        wrapper: "w-full",
      }}
    >
      <Checkbox>모두 동의합니다</Checkbox>
      <hr className="w-full border-primary-gray opacity-80" />
      <Checkbox>[필수] 이용약관 동의</Checkbox>
      <Checkbox>[필수] 개인정보 수집 및 이용동의</Checkbox>
      <Checkbox>[필수] 개인정보 처리 위탁동의</Checkbox>
      <Checkbox>[선택] 광고성 정보 수신 동의</Checkbox>
    </CheckboxGroup>
  );
}
