import { useAuthStore } from "@/store/useAuthStore";
import { Client } from "@stomp/stompjs";
import { apiRequest } from "./apiRequest";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;
// websocket Token 발급 여부
let hasWsToken = false;

// websocket Token 발급
async function getWsToken(): Promise<boolean> {
  const { token } = useAuthStore.getState();
  if (!token) {
    return false;
  }
  if (hasWsToken && stompClient && stompClient.active) {
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

// webSocket 연결
export const connectSocket = async (): Promise<Client> => {
  const { token } = useAuthStore.getState();
  if (stompClient && stompClient.active) {
    return stompClient;
  }
  const isWsToken = await getWsToken();
  if (!isWsToken) {
    throw new Error("웹소켓 토큰 발급 실패");
  }

  return new Promise<Client>(resolve => {
    stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws") as WebSocket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: token || "",
      },

      onConnect: () => {
        console.log("웹소켓 연결 성공");
        resolve(stompClient as Client);
      },
      onStompError: frame => {
        console.log("웹소켓 연결 실패:", frame);
      },
    });

    stompClient.activate();
  });
};

// webSocket 연결 해제
export const disconnectSocket = () => {
  if (stompClient && stompClient.active) {
    stompClient.deactivate();
    stompClient = null;
    hasWsToken = false;
    console.log("웹소켓 연결 해제");
  }
};

export const getStompClient = (): Client | null => {
  return stompClient;
};
