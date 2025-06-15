"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/api/apiRequest";
import { useCommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";
import { useConfirm } from "@/hooks/confirm/useConfirm";

export interface MannerEvaluationFormData {
  manner_evaluation: string;
}

export function useMannerEvaluationForm({
  closeAction,
  matchRoomId,
}: {
  closeAction: () => void;
  matchRoomId: number | null;
}) {
  const methods = useForm<MannerEvaluationFormData>({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      manner_evaluation: "",
    },
  });

  const codeOptions = useCommonCodeOptions(CommonCodeGroup.MANNER_EVALUATION);

  const { ConfirmModal, confirm } = useConfirm();

  const mannerEvaluationMutation = useMutation({
    mutationFn: async (formData: MannerEvaluationFormData) => {
      const { manner_evaluation } = formData;
      return await apiRequest("/match/manner-evaluation", "POST", {
        manner_evaluation,
        match_room_id: matchRoomId,
      });
    },
    onSuccess: () => {
      alert("매너 평가 완료");
      console.log("매너 평가 성공");
      closeAction();
    },
    onError: (error: any) => {
      console.error("매너 평가 실패:", error);
    },
  });
  const onSubmit = async (formData: MannerEvaluationFormData) => {
    let confirmOptions: { headerText: string; message: string };
    if (formData.manner_evaluation === "NONE") {
      confirmOptions = {
        headerText: "❓평가 미작성 확인",
        message: "평가를 작성하지 않고 넘어가시겠습니까?",
      };
    } else {
      confirmOptions = {
        headerText: "🌟매너 평가 확인",
        message: "이 사용자의 매너를 평가하시겠습니까?",
      };
    }
    const ok = await confirm(confirmOptions);

    if (ok) {
      mannerEvaluationMutation.mutate(formData);
    }
  };

  return {
    methods,
    onSubmit,
    mannerEvaluationError: mannerEvaluationMutation.error,
    codeOptions,
    ConfirmModal,
  };
}
