import { ChatPayload, ParticipantInfo } from "@/types/chat";
import { ProfileFormType } from "@/types/profile";
import Image from "next/image";
import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";

interface ChatMessagesProps {
  messages: ChatPayload[];
  participantInfo: ParticipantInfo | null;
  bottomRef: RefObject<HTMLDivElement | null>;
  methods: UseFormReturn<ProfileFormType>;
  codeOptions: any;
  setShowProfileModal: (show: boolean) => void;
}

export default function ChatMessages({
  messages,
  participantInfo,
  bottomRef,
  setShowProfileModal,
}: ChatMessagesProps) {
  return (
    <div
      className="w-[700px] max-w-full rounded-2xl h-[600px] overflow-y-auto mb-4 p-4"
      style={{ backgroundColor: "#403a45", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
    >
      {messages.map((msg, idx) => {
        const myId = participantInfo?.my_match_participant_info.match_participant_id;
        if (!myId) return null;

        const isMine = msg.matchParticipantId !== myId;
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
            {!isMine && (
              <div
                className="w-8 h-8 rounded-full overflow-hidden mr-2 cursor-pointer"
                onClick={() => setShowProfileModal(true)}
              >
                <Image
                  src="/images/games/profile.jpg"
                  alt="상대방 프로필"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {isMine && time && <span className="text-xs text-gray-400 mb-0.5">{time}</span>}
            <div
              className={`max-w-[60%] p-3 rounded-lg text-sm break-words relative ${
                isMine
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-[#2e2e2e] text-white rounded-bl-none"
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
