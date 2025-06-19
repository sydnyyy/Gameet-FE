"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { usePathname } from "next/navigation";
import { fetchUnreadCount } from "./fetchUnreadCount";

export const useChatNotificationHandler = () => {
  const pathname = usePathname();
  const { userProfileId } = useAuthStore();
  const { setUnreadCount, myMatchParticipantId, increment } = useChatStore();

  const handleChatNotification = async (payload: { sender_id: number }) => {
    if (!myMatchParticipantId) return;

    const senderId = payload.sender_id;
    if (senderId === myMatchParticipantId || pathname.startsWith("/match")) return;

    increment();
    await fetchUnreadCount(userProfileId, setUnreadCount);
  };

  return { handleChatNotification };
};
