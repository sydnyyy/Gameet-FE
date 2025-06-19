"use client";

import { useReportForm } from "@/hooks/pages/report/useReportForm";
import FormLayout from "@/components/form/formLayout";
import Buttons from "@/components/common/button/Buttons";
import BaseSelect from "@/components/common/select/baseSelect";
import { selectValid } from "@/utils/validations";

export default function ReportForm({
  closeAction,
  matchRoomId,
  setIsReportedAction,
}: {
  closeAction: () => void;
  matchRoomId: number | null;
  setIsReportedAction: (isReported: boolean) => void;
}) {
  const { methods, onSubmit, reportError, codeOptions, ConfirmModal } = useReportForm({
    closeAction,
    matchRoomId,
    setIsReportedAction,
  });

  return (
    <>
      <FormLayout methods={methods} onSubmit={onSubmit} error={reportError}>
        <h1>신고 사유를 선택해주세요.</h1>
        <BaseSelect
          name="report_reasons"
          className="mt-5"
          label="신고 사유"
          rules={selectValid}
          selectionMode="multiple"
          data={codeOptions?.REPORT_REASON ?? {}}
        />
        <Buttons type="submit" className="h-[48px] text-md mt-5">
          확인
        </Buttons>
      </FormLayout>
      <ConfirmModal />
    </>
  );
}
