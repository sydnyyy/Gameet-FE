import { useAuthStore } from "@/store/useAuthStore";
import { CompatClient, Frame, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { apiRequest } from "./apiRequest";

// websocket Token 발급
async function getWsToken(): Promise<boolean> {
  const { token } = useAuthStore.getState();
  if (!token) {
    return false;
  }
  try {
    await apiRequest("users/auth/token/websocket", "GET");
    return true;
  } catch (error) {
    return false;
  }
}

// 딜레이 유틸
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 웹소켓 연결
export const connectSocket = async (maxRetries = 3, retryDelay = 1000): Promise<CompatClient> => {
  const { token } = useAuthStore.getState();

  const isWsTokenValid = await getWsToken();
  if (!isWsTokenValid) {
    throw new Error("웹소켓 연결을 위한 토큰 발급/갱신 실패");
  }

  let attempt = 0;
  while (attempt < maxRetries) {
    attempt++;
    // console.log(`웹소켓 연결 시도 (${attempt}/${maxRetries})`);

    try {
      const client = await new Promise<CompatClient>((resolve, reject) => {
        const sockJs = new SockJS("https://gameet.store/ws", null, {
          withCredentials: true,
        } as any);
        const tempClient = Stomp.over(sockJs);

        // 배포 환경에서 로그 제거
        if (process.env.NODE_ENV === "production") {
          tempClient.debug = () => {};
        } else {
          tempClient.debug = console.log;
        }

        tempClient.connect(
          { Authorization: token || "" },
          () => {
            resolve(tempClient);
          },
          (error: Frame) => {
            console.warn("웹소켓 연결 실패 (CompatClient):", error);
            reject(new Error(error.headers["message"] || "STOMP 연결 에러"));
          },
        );
      });

      return client;
    } catch (e) {
      if (attempt < maxRetries) {
        await delay(retryDelay);
      } else {
        throw e;
      }
    }
  }
  throw new Error("웹소켓 연결 실패 (알 수 없는 이유)");
};

// webSocket 연결 해제
export const disconnectSocket = (client: CompatClient | null) => {
  if (client && client.connected) {
    client.disconnect(() => {});
  }
};
