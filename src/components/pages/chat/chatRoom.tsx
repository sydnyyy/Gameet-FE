"use client";

import { apiRequest } from "@/app/api/apiRequest";
import { connectSocket, getStompClient } from "@/app/api/socket";
import Buttons from "@/components/common/button/Buttons";
import { useChatOpponent } from "@/hooks/pages/chat/useChatOpponent";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  matchParticipantId: number;
  messageType: "TALK" | "ENTER" | "QUIT" | "APPOINTMENT";
  content: string;
}

interface ChatPayload {
  nickname: string;
  matchParticipantId: number;
  content: string;
  messageType: string;
  sendAt: string;
}

interface Props {
  matchRoomId: number;
  matchParticipantId: number;
  nickname: string;
  userProfileId: number;
}

interface Message {
  nickname: string;
  content: string;
  matchParticipantId: number;
  sendAt: string;
  messageType: string;
}

export default function ChatRoom({
  matchRoomId,
  matchParticipantId,
  nickname,
  userProfileId,
}: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { token } = useAuthStore();
  const clientRef = useRef<ReturnType<typeof getStompClient>>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { opponent, isLoading, error } = useChatOpponent({
    roomId: matchRoomId,
    myProfileId: userProfileId!,
  });

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await apiRequest<ChatPayload[]>(
        `/api/chat/messages?roomId=${matchRoomId}`,
        "GET",
      );
      setMessages(
        res.data.map(msg => ({
          nickname: msg.nickname,
          content: msg.content,
          matchParticipantId: msg.matchParticipantId,
          sendAt: msg.sendAt,
          messageType: msg.messageType,
        })),
      );
    };
    fetchMessages();
  }, [matchRoomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const setupSocket = async () => {
      try {
        const client = await connectSocket();
        clientRef.current = client;

        const enterMsg: ChatMessage = {
          matchParticipantId,
          messageType: "ENTER",
          content: `${nickname}님이 입장하셨습니다.`,
        };
        client.send(
          "/app/chat.send",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(enterMsg),
        );

        // 채팅 구독
        client.subscribe(
          `/topic/chat.room.${matchRoomId}`,
          msg => {
            const body: ChatPayload = JSON.parse(msg.body);
            setMessages(prev => [...prev, body]);
          },
          { Authorization: token! },
        );

        client.subscribe("/user/queue/errors", msg => {
          alert(`오류: ${JSON.parse(msg.body).message}`);
        });
      } catch (e) {
        console.error("WebSocket 연결 실패:", e);
      }
    };

    setupSocket();

    return () => {
      const client = clientRef.current;
      if (client?.connected) {
        const quitMsg: ChatMessage = {
          matchParticipantId,
          messageType: "QUIT",
          content: `${nickname}님이 퇴장하셨습니다.`,
        };
        client.send(
          "/app/chat.send",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(quitMsg),
        );
      }
    };
  }, [matchRoomId, matchParticipantId, nickname, token]);

  const handleSend = () => {
    const client = clientRef.current;
    if (!client?.connected || !input.trim()) return;

    const msg: ChatMessage = {
      matchParticipantId,
      messageType: "TALK",
      content: input,
    };

    client.send("/app/chat.send", { Authorization: `Bearer ${token}` }, JSON.stringify(msg));
    setInput("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{opponent?.nickname}님과의 채팅</h2>
      <div className="w-[700px] max-w-full border-2 border-black rounded-2xl h-[450px] overflow-y-auto mb-4 p-4 bg-transparent shadow-sm">
        {messages.map((msg, idx) => {
          const isMine = msg.matchParticipantId === matchParticipantId;
          const time = new Date(msg.sendAt).toLocaleTimeString();

          return (
            <div key={idx} className={`mb-2 flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[60%] p-3 rounded-lg text-sm break-words relative ${
                  msg.messageType !== "TALK"
                    ? "text-gray-400 text-center"
                    : isMine
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-[#2e2e2e] text-primary rounded-bl-none"
                }`}
              >
                {msg.content}
                {msg.messageType === "TALK" && (
                  <div className="text-xs text-gray-300 text-right mt-1">{time}</div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="w-[700px] max-w-full flex items-end gap-2 relative">
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => setShowOptions(prev => !prev)}
            className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-md text-xl font-bold select-none text-black"
            type="button"
          >
            +
          </button>
          {showOptions && (
            <div className="absolute bottom-full mb-2 flex flex-col z-10">
              {[
                { label: "약속 설정", onClick: () => alert("약속 설정") },
                { label: "신고", onClick: () => alert("신고") },
                { label: "매칭 종료", onClick: () => alert("매칭 종료") },
              ].map(({ label, onClick }) => (
                <button
                  key={label}
                  type="button"
                  className="w-32 bg-[#353238] text-white px-4 py-2 rounded shadow hover:bg-[#4a4645]"
                  onClick={() => {
                    onClick();
                    setShowOptions(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-grow"
        />
        <Buttons onClick={handleSend}>전송</Buttons>
      </div>
    </div>
  );
}
