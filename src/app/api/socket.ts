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
  if (hasWsToken && stompClient && stompClient.connected) {
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
export const connectSocket = async (): Promise<CompatClient> => {
  const { token } = useAuthStore.getState();
  if (stompClient && stompClient.connected) {
    return stompClient;
  }
  const isWsToken = await getWsToken();
  if (!isWsToken) {
    throw new Error("웹소켓 토큰 발급 실패");
  }

  return new Promise<CompatClient>((resolve, reject) => {
    stompClient = Stomp.over(() => new SockJS("http://localhost:8080/ws"));
    stompClient.connect(
      { Authorization: token || "" },
      () => {
        console.log("웹소켓 연결 성공");
        resolve(stompClient!);
      },
      (error: Frame) => {
        console.log("웹소켓 연결 실패:", error);
        stompClient = null;
        reject(new Error("웹소켓 연결 실패"));
      },
    );
  });
};

// webSocket 연결 해제
export const disconnectSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => {
      console.log("웹소켓 연결 해제");
    });
    stompClient = null;
    hasWsToken = false;
  }
};

// stompClient 반환
export const getStompClient = (): CompatClient | null => {
  if (stompClient?.connected) {
    return stompClient;
  }
  return null;
};
