"use client";
import { connectSocket, getStompClient } from "@/app/api/socket";
import { useMatchNotificationHandler } from "@/hooks/pages/match/useMatchNotification";
import { useAuthStore } from "@/store/useAuthStore";
import { Client, IMessage } from "@stomp/stompjs";
import { useEffect, useRef } from "react";

export default function NotificationSocket() {
  const token = useAuthStore(state => state.token);
  const _hasHydrated = useAuthStore(state => state._hasHydrated);
  const { handleMatchNotification } = useMatchNotificationHandler();
  const isSocketConnected = useRef(false);
  const clientRef = useRef<Client | null>(null);

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
      let client: any = null;
      try {
        if (!client || !client.active) {
          console.log("WebSocket 연결 시도");
          client = await connectSocket();
          console.log("WebSocket 연결 완료");
        } else {
          client = getStompClient();
          console.log("기존 WebSocket 연결 재사용.");
        }

        clientRef.current = client;

        client.subscribe(
          "/user/queue/notify",
          (msg: IMessage) => {
            console.log("구독 수신");
            try {
              const notificationData = JSON.parse(msg.body);
              console.log("개인 알림 수신:", notificationData);
              handleMatchNotification(notificationData);
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
        console.log("WebSocket 클린업: 연결 해제");
        clientRef.current.deactivate();
      }
      clientRef.current = null;
      isSocketConnected.current = false;
    };
  }, [token, _hasHydrated, handleMatchNotification]);

  if (!token || !_hasHydrated) return null;

  return null;
}
