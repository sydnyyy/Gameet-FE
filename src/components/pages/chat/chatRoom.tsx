"use client";

import { useChatRoom } from "@/hooks/pages/chat/useChatRoom";
import { ChatRoomProps } from "@/types/chat";
import ChatInputArea from "./chatInputArea";
import ChatMessages from "./chatMessages";

export default function ChatRoom({ matchRoomId }: ChatRoomProps) {
  const {
    messages,
    input,
    handleSend,
    handleMatchEnd,
    showOptions,
    setShowOptions,
    setInput,
    bottomRef,
    participantInfo,
    token,
  } = useChatRoom(matchRoomId);

  return (
    <div className="p-4">
      <ChatMessages messages={messages} participantInfo={participantInfo} bottomRef={bottomRef} />
      {matchRoomId !== null && (
        <ChatInputArea
          matchRoomId={matchRoomId}
          input={input}
          setInput={setInput}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          handleSend={handleSend}
          handleMatchEnd={handleMatchEnd}
          participantId={participantInfo?.match_participant_id!}
          token={token!}
        />
      )}
    </div>
  );
}
