"use client";

import { useChatStore } from "@/store/useChatStore";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const useChatNotificationHandler = () => {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const myParticipantId = useChatStore(state => state.myMatchParticipantId);
  const increment = useChatStore(state => state.increment);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const handleChatNotification = (payload: any) => {
    const currentPath = pathname;
    const senderId = payload.sender_id;

    if (senderId !== myParticipantId && !currentPath.startsWith("/match")) {
      increment();
    }
  };

  return { handleChatNotification };
};
