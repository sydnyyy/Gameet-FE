import { useAuthStore } from "@/store/useAuthStore";
import { CompatClient, Frame, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { apiRequest } from "./apiRequest";

let stompClient: CompatClient | null = null;
// websocket Token 발급 여부
let hasWsToken = false;

// websocket Token 발급
async function getWsToken(): Promise<boolean> {
  const { token } = useAuthStore.getState();
  if (!token) {
    return false;
  }
  if (hasWsToken && stompClient?.connected) {
    return true;
  }
  try {
    await apiRequest("users/auth/token/websocket", "GET");
    console.log("웹소켓 토큰 발급 성공");
    hasWsToken = true;
    return true;
  } catch (error) {
    console.log("웹소켓 토큰 발급 실패");
    hasWsToken = false;
    return false;
  }
}

// 딜레이 유틸
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 웹소켓 연결 (재시도 포함)
export const connectSocket = async (maxRetries = 3, retryDelay = 1000): Promise<CompatClient> => {
  const { token } = useAuthStore.getState();

  if (stompClient?.connected) {
    return stompClient;
  }
  const isWsToken = await getWsToken();
  if (!isWsToken) {
    throw new Error("웹소켓 토큰 발급 실패");
  }

  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    console.log(`웹소켓 연결 시도 (${attempt}/${maxRetries})`);

    try {
      const client = await new Promise<CompatClient>((resolve, reject) => {
        const tempClient = Stomp.over(() => new SockJS("http://localhost:8080/ws"));
        stompClient = tempClient;

        tempClient.connect(
          { Authorization: token || "" },
          () => {
            console.log("웹소켓 연결 성공");
            resolve(tempClient);
          },
          (error: Frame) => {
            console.warn("웹소켓 연결 실패:", error);
            reject(new Error("웹소켓 연결 실패"));
          },
        );
      });

      return client;
    } catch (e) {
      console.log(`웹소켓 연결 실패 (${attempt}회차). 재시도 대기...`);
      if (attempt < maxRetries) {
        await delay(retryDelay);
      } else {
        console.error("웹소켓 연결 재시도 모두 실패");
        stompClient = null;
        hasWsToken = false;
        throw e;
      }
    }
  }

  throw new Error("웹소켓 연결 실패 (예외 처리 누락)");
};

// webSocket 연결 해제
export const disconnectSocket = () => {
  if (stompClient?.connected) {
    stompClient.disconnect(() => {
      console.log("웹소켓 연결 해제");
    });
  }
  stompClient = null;
  hasWsToken = false;
};
