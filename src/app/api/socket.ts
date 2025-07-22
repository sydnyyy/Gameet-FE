import { useAuthStore } from "@/store/useAuthStore";
import { CompatClient, Frame, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { apiRequest } from "./apiRequest";
import { v4 as uuidv4 } from "uuid";
import { WS_TOKEN_KEY, CLIENT_ID_KEY } from "@/constants/auth/storageKeys";

// client ID GET (client -> Chrome, Safari...)
function getClientId(): string {
  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId = uuidv4().slice(0, 8);
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  return clientId;
}


// websocket Token 발급 or 재사용
async function getWsToken(): Promise<string | null> {
  const cachedToken = sessionStorage.getItem(WS_TOKEN_KEY);
  if (cachedToken) {
    return cachedToken;
  }

  const { token } = useAuthStore.getState();
  if (!token) {
    return null;
  }

  try {
    const res = await apiRequest("users/auth/token/websocket", "GET");
    // @ts-ignore
    // return res.data.webSocketToken ?? null;
    const newToken = res.data.webSocketToken ?? null;
    if (newToken) {
      sessionStorage.setItem(WS_TOKEN_KEY, newToken);
    }
    return newToken;
  } catch (error) {
    return null;
  }
}

// 딜레이 유틸
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 웹소켓 연결
export const connectSocket = async (maxRetries = 3, retryDelay = 1000): Promise<CompatClient> => {
  const { token } = useAuthStore.getState();

  const webSocketToken = await getWsToken();
  if (!webSocketToken) {
    throw new Error("웹소켓 연결을 위한 토큰 발급/갱신 실패");
  }

  const clientId = getClientId();

  let attempt = 0;
  while (attempt < maxRetries) {
    attempt++;
    // console.log(`웹소켓 연결 시도 (${attempt}/${maxRetries})`);

    try {
      const client = await new Promise<CompatClient>((resolve, reject) => {
        // 쿠키 적용 금지
        // const sockJs = new SockJS("http://localhost:8080/ws", null, {  // "https://gameet.store/ws"
        //   withCredentials: true,
        // } as any);

        // @ts-ignore
        const sockJs = new SockJS(`http://localhost:8080/ws?websocket_token=${webSocketToken}&client_id=${clientId}`); // "https://gameet.store/ws"
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
