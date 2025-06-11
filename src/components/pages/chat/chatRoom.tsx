"use client";

import { apiRequest } from "@/app/api/apiRequest";
import { connectSocket, getStompClient } from "@/app/api/socket";
import Buttons from "@/components/common/button/Buttons";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

export default function ChatRoom({ matchRoomId }: ChatRoomProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [messages, setMessages] = useState<ChatPayload[]>([]);
  const [input, setInput] = useState("");
  const { token, userProfileId } = useAuthStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [matchParticipantId, setMatchParticipantId] = useState<number | null>(null);

  useEffect(() => {
    if (matchRoomId) {
      const fetchParticipants = async () => {
        try {
          const opponent = await apiRequest<number[]>(
            `/chat/opponent/${matchRoomId}/${userProfileId!}`,
            "GET",
          );
          console.log("✅ ~ 참가자 userProfileIds:", opponent.data);

          const participantId = await apiRequest<number>(
            `/chat/participantId/${matchRoomId}`,
            "GET",
          );
          setMatchParticipantId(participantId.data);
        } catch (err) {
          console.error("참가자 정보 조회 실패:", err);
        }
      };

      fetchParticipants();
    }
  }, [matchRoomId]);

  useEffect(() => {
    const setupSocket = async () => {
      const client = getStompClient() ?? (await connectSocket());

      // 구독
      client.subscribe(
        `/topic/chat.room.${matchRoomId}`,
        msg => {
          const body: ChatPayload = JSON.parse(msg.body);
          console.log("✅ ~ 받은 메시지:", body);
          setMessages(prev => [...prev, body]);
        },
        { Authorization: token! },
      );
    };

    setupSocket();
  }, [matchRoomId, token]);

  // 스크롤 자동 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const client = getStompClient();
    if (!client || !input.trim() || matchParticipantId === null) return;

    const msg: ChatMessage = {
      matchParticipantId,
      messageType: "TALK",
      content: input,
    };
    console.log("✅ ~ 전송 메시지:", JSON.stringify(msg));
    client.send("/app/chat.send", { Authorization: token! }, JSON.stringify(msg));
    setInput("");
  };

  return (
    <div className="p-4">
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
