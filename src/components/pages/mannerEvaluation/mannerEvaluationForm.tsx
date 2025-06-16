"use client";

import FormLayout from "@/components/form/formLayout";
import Buttons from "@/components/common/button/Buttons";
import BaseSelect from "@/components/common/select/baseSelect";
import { selectValid } from "@/utils/validations";
import { useMannerEvaluationForm } from "@/hooks/pages/mannerEvaluation/useMannerEvaluationForm";

export default function MannerEvaluationForm({
  closeAction,
  matchRoomId,
}: {
  closeAction: () => void;
  matchRoomId: number | null;
}) {
  const { methods, onSubmit, mannerEvaluationError, codeOptions, ConfirmModal } =
    useMannerEvaluationForm({
      closeAction,
      matchRoomId,
    });

  return (
    <>
      <FormLayout methods={methods} onSubmit={onSubmit} error={mannerEvaluationError}>
        <h1>상대방의 매너를 평가해주세요.</h1>
        <BaseSelect
          name="manner_evaluation"
          className="mt-5"
          label="매너 평가"
          rules={selectValid}
          selectionMode="single"
          data={codeOptions?.MANNER_EVALUATION ?? {}}
        />
        <Buttons type="submit" className="h-[48px] text-md mt-5">
          확인
        </Buttons>
      </FormLayout>
      <ConfirmModal />
    </>
  );
}
