import { ChatPayload, ParticipantInfo } from "@/types/chat";
import { RefObject } from "react";

interface ChatMessagesProps {
  messages: ChatPayload[];
  participantInfo: ParticipantInfo | null;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({ messages, participantInfo, bottomRef }: ChatMessagesProps) {
  return (
    <div
      className="w-[700px] max-w-full rounded-2xl h-[450px] overflow-y-auto mb-4 p-4"
      style={{ backgroundColor: "#403a45", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
    >
      {messages.map((msg, idx) => {
        const myId = participantInfo?.match_participant_id;
        if (!myId) return null;

        const isMine = msg.matchParticipantId === myId;
        const time = msg.sendAt ? new Date(msg.sendAt).toLocaleTimeString() : "";

        if ((msg.messageType === "ENTER" || msg.messageType === "QUIT") && isMine) return null;

        if (
          msg.messageType === "ENTER" ||
          msg.messageType === "QUIT" ||
          msg.messageType === "APPOINTMENT"
        ) {
          return (
            <div key={idx} className="w-full flex justify-center my-2">
              <span className="text-xs text-gray-400 bg-[#2a2a2a] px-3 py-1 rounded-full">
                {msg.content}
              </span>
            </div>
          );
        }

        return (
          <div
            key={idx}
            className={`mb-2 flex ${isMine ? "justify-end" : "justify-start"} items-end gap-1`}
          >
            {isMine && time && <span className="text-xs text-gray-400 mb-0.5">{time}</span>}
            <div
              className={`max-w-[60%] p-3 rounded-lg text-sm break-words relative ${
                isMine
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-[#2e2e2e] text-primary rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
            {!isMine && time && <span className="text-xs text-gray-400 mb-0.5">{time}</span>}
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
