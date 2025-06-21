"use client";

import { apiRequest } from "@/app/api/apiRequest";

export async function fetchUnreadCount(
  userProfileId: number | null,
  setUnreadCount: (count: number) => void,
) {
  if (!userProfileId) return;
  try {
    const res = await apiRequest<number>(`/chat/unread-count/${userProfileId}`, "GET");
    setUnreadCount(res.data);
    console.log("안 읽은 채팅 개수 받아옴:", res.data);
  } catch (error) {
    console.error("안 읽은 채팅 개수 가져오기 실패", error);
  }
}
