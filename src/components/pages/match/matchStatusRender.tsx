"use client";
import { useModal } from "@/hooks/modal/useModal";
import { useMatchQueue } from "@/hooks/pages/match/useMatchStatus";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ChatRoom from "../chat/chatRoom";
import InMatching from "./inMatching";
import MatchForm from "./matchForm";

export default function MatchStatusRender() {
  const { token, _hasHydrated } = useAuthStore();
  const { data, isError, error } = useMatchQueue();
  const router = useRouter();
  const { onOpen, Modal } = useModal();

  // 비로그인 상태인 경우 로그인 페이지로 이동
  useEffect(() => {
    if (_hasHydrated && !token) {
      router.replace("/login");
      console.log(token);
    }
  }, [token, router, _hasHydrated]);

  // 매칭 실패 시 실패 알림 모달 열기
  useEffect(() => {
    if (isError || data?.match_status === "FAILED") {
      onOpen();
    }
  }, [isError, data?.match_status, onOpen]);

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
    case "MATCHED":
      return <ChatRoom matchRoomId={data.match_room_id} />;
    default:
      return <MatchForm />;
  }
}
