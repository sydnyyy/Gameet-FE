"use client";

import { useChatRoom } from "@/hooks/pages/chat/useChatRoom";
import { ChatRoomProps } from "@/types/chat";
import ChatInputArea from "./chatInputArea";
import ChatMessages from "./chatMessages";
import { useModal } from "@/hooks/modal/useModal";
import ReportForm from "../report/reportForm";
import MannerEvaluationForm from "@/components/pages/mannerEvaluation/mannerEvaluationForm";

export default function ChatRoom({ matchRoomId, matchStatus }: ChatRoomProps) {
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

  const report = useModal();
  const mannerEvaluation = useModal();

  return (
    <>
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
            handleReportModalOpen={report.onOpen}
          />
        )}
      </div>
      <report.Modal>
        <ReportForm matchRoomId={matchRoomId} closeAction={report.onClose} />
      </report.Modal>
      {matchStatus === "COMPLETED" && (
        <mannerEvaluation.Modal isOpen={true} hideCloseButton={true} close={null}>
          <MannerEvaluationForm matchRoomId={matchRoomId} closeAction={mannerEvaluation.onClose} />
        </mannerEvaluation.Modal>
      )}
    </>
  );
}
