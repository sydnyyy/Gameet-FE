"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/api/apiRequest";
import { useCommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";

export interface ReportFormData {
  report_reasons: string[];
}

export function useReportForm({ closeAction }: { closeAction: () => void }) {
  const methods = useForm<ReportFormData>({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      report_reasons: [],
    },
  });

  const codeOptions = useCommonCodeOptions(CommonCodeGroup.REPORT_REASON);

  const reportMutation = useMutation({
    mutationFn: async (formData: ReportFormData) => {
      const { report_reasons } = formData;
      return await apiRequest("/match/report", "POST", {
        report_reasons,
      });
    },
    onSuccess: () => {
      alert("신고 완료");
      console.log("신고 성공");
      closeAction();
    },
    onError: (error: any) => {
      console.error("신고 실패:", error);
    },
  });
  const onSubmit = (formData: ReportFormData) => {
    reportMutation.mutate(formData);
  };

  return {
    methods,
    onSubmit,
    reportError: reportMutation.error,
    codeOptions,
  };
}
