"use client";
import { useMatchQueue } from "@/hooks/pages/match/useMatchStatus";
import InMatching from "./inMatching";
import MatchForm from "./matchForm";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useModal } from "@/hooks/modal/useModal";
import { useAuth } from "@/hooks/common/useAuth";
import RequireLoginModal from "@/components/auth/RequireLoginModal";

export default function MatchStatusRender() {
  const { token, _hasHydrated } = useAuthStore();
  const { isLogin } = useAuth();
  const { data, isError, error } = useMatchQueue(isLogin);
  const { onOpen, Modal } = useModal();

  // 매칭 실패 시 실패 알림 모달 열기
  useEffect(() => {
    if (isError || data?.match_status === "FAILED") {
      onOpen();
    }
  }, [isError, data?.match_status, onOpen]);

  if (!isLogin) {
    return <RequireLoginModal />;
  }

  if (!_hasHydrated || !token) {
    return null;
  }

  if (isError) {
    console.error(error);
    return (
      <>
        <Modal headerText="💡 알림" children="매칭 에러. 다시 시도해 주세요." />
        <MatchForm />
      </>
    );
  }

  switch (data?.match_status) {
    case "SEARCHING":
      return <InMatching />;
    case "CANCEL":
      return <MatchForm />;
    case "FAILED":
      return (
        <>
          <Modal headerText="💡 알림" children="매칭에 실패했습니다. 다시 시도해 주세요." />
          <MatchForm />
        </>
      );
    // case "MATCHED":
    //   return <Chat />;
    default:
      return <MatchForm />;
  }
}
