"use client";
import { connectSocket, getStompClient } from "@/app/api/socket";
import { useMatchNotificationHandler } from "@/hooks/pages/match/useMatchNotification";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function NotificationSocket() {
  const token = useAuthStore(state => state.token);
  const { handleMatchNotification } = useMatchNotificationHandler();

  useEffect(() => {
    if (!token) return;
    const subNotification = async () => {
      let client = getStompClient();
      try {
        if (!client || !client.active) {
          console.log("WebSocket 연결 시도");
          client = await connectSocket();
          console.log("WebSocket 연결 완료");
        }
        console.log("구독 시도합니다");

        client.subscribe(
          "/user/queue/notify",
          msg => {
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
  }, [token]);

  if (!token) return null;

  return <></>;
}
