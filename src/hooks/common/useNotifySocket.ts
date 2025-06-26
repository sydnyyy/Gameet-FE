"use client";
import { connectSocket } from "@/app/api/socket";
import { fetchUnreadCount } from "@/hooks/pages/chat/fetchUnreadCount";
import { useChatNotification } from "@/hooks/pages/chat/useChatNotification";
import { useMatchNotification } from "@/hooks/pages/match/useMatchNotification";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { Client, IMessage } from "@stomp/stompjs";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useChatReadUpdater } from "../pages/chat/useChatReadUpdater";

export default function useNotifySocket() {
  const pathname = usePathname();
  const token = useAuthStore(state => state.token);
  const userProfileId = useAuthStore(state => state.userProfileId);
  const _hasHydrated = useAuthStore(state => state._hasHydrated);

  const { handleMatchNotification } = useMatchNotification();
  const { handleChatNotification } = useChatNotification();

  const setUnreadCount = useChatStore(state => state.setUnreadCount);
  const hasFetchedUnreadCount = useRef(false);

  const isSocketConnected = useRef(false);
  const clientRef = useRef<Client | null>(null);

  // 채팅방 진입 시 읽음 처리
  useChatReadUpdater();

  useEffect(() => {
    // 연결 조건 확인
    if (!_hasHydrated || !token || isSocketConnected.current) {
      // 소켓이 이미 연결 중인 경우 기존 연결 해제
      if ((!_hasHydrated || !token) && clientRef.current && clientRef.current.active) {
        clientRef.current.deactivate();
        clientRef.current = null;
        isSocketConnected.current = false;
      }
      return;
    }

    const subNotification = async () => {
      isSocketConnected.current = true;
      try {
        const client = await connectSocket();
        clientRef.current = client;

        client.subscribe(
          "/user/queue/notify",
          async (msg: IMessage) => {
            try {
              const notificationData = JSON.parse(msg.body);

              if (notificationData.message_type === "CHAT") {
                await handleChatNotification(notificationData);
              } else {
                handleMatchNotification(notificationData);
              }
            } catch (e) {
              console.error("메시지 파싱 실패:", e);
            }
          },
          {
            Authorization: token,
          },
        );
      } catch (e) {
        console.error("소켓 혹은 구독 실패:", e);
      }
    };

    subNotification();
    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
      }
      clientRef.current = null;
      isSocketConnected.current = false;
      hasFetchedUnreadCount.current = false;
    };
  }, [token, _hasHydrated, pathname, handleMatchNotification, handleChatNotification]);

  useEffect(() => {
    // 로그인 직후 1회 안 읽은 채팅 개수 불러오기
    if (!userProfileId) return;

    hasFetchedUnreadCount.current = false;

    const fetchIfNeeded = async () => {
      if (!hasFetchedUnreadCount.current) {
        hasFetchedUnreadCount.current = true;
        await fetchUnreadCount(userProfileId, setUnreadCount);
      }
    };

    fetchIfNeeded();
  }, [userProfileId, setUnreadCount]);

  if (!token || !_hasHydrated) return null;
}
