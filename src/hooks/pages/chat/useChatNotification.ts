"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { fetchUnreadCount } from "./fetchUnreadCount";

export const useChatNotification = () => {
  const pathname = usePathname();
  const userProfileId = useAuthStore(state => state.userProfileId);
  const myMatchParticipantId = useChatStore(state => state.myMatchParticipantId);
  const setUnreadCount = useChatStore(state => state.setUnreadCount);
  const isFetchingRef = useRef(false);

  const handleChatNotification = async (payload: { sender_id: number }) => {
    if (!myMatchParticipantId || payload.sender_id === myMatchParticipantId) return;
    if (pathname.startsWith("/match") || isFetchingRef.current) return;
    // 중복 방지
    if (isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;
      await fetchUnreadCount(userProfileId, setUnreadCount);
    } catch (error) {
      console.error("알림 처리 중 unreadCount fetch 실패", error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  return { handleChatNotification };
};
