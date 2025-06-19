"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { usePathname } from "next/navigation";
import { fetchUnreadCount } from "./fetchUnreadCount";

export const useChatNotification = () => {
  const pathname = usePathname();
  const { userProfileId } = useAuthStore();
  const { setUnreadCount, myMatchParticipantId } = useChatStore();

  const handleChatNotification = async (payload: { sender_id: number }) => {
    if (!myMatchParticipantId || payload.sender_id === myMatchParticipantId) return;

    // 채팅방이 아닐 때만 안 읽은 개수 갱신
    if (!pathname.startsWith("/match")) {
      await fetchUnreadCount(userProfileId, setUnreadCount);
    }
  };

  return { handleChatNotification };
};
