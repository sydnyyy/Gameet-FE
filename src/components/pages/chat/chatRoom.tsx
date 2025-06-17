"use client";

import MannerEvaluationForm from "@/components/pages/mannerEvaluation/mannerEvaluationForm";
import { useModal } from "@/hooks/modal/useModal";
import { useChatRoom } from "@/hooks/pages/chat/useChatRoom";
import { ChatRoomProps } from "@/types/chat";
import { useState } from "react";
import GameInfoFields from "../profile/gameInfoFields";
import ReportForm from "../report/reportForm";
import ChatInputArea from "./chatInputArea";
import ChatMessages from "./chatMessages";

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
    methods,
    codeOptions,
  } = useChatRoom(matchRoomId);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const report = useModal();
  const mannerEvaluation = useModal();

  return (
    <>
      <div className="p-4">
        {showProfileModal ? (
          <div className="w-full flex justify-center p-4">
            <div className="w-full max-w-2xl bg-[#2e2e2e] p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-semibold">상대방 게임 정보</h2>
                <button
                  className="text-sm text-gray-400 hover:text-white font-semibold"
                  onClick={() => setShowProfileModal(false)}
                >
                  닫기
                </button>
              </div>
              <GameInfoFields methods={methods} codeOptions={codeOptions} readOnly />
            </div>
          </div>
        ) : (
          <>
            <ChatMessages
              messages={messages}
              participantInfo={participantInfo}
              bottomRef={bottomRef}
              methods={methods}
              codeOptions={codeOptions}
              setShowProfileModal={setShowProfileModal}
            />
            {matchRoomId !== null && (
              <ChatInputArea
                matchRoomId={matchRoomId}
                input={input}
                setInput={setInput}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
                handleSend={handleSend}
                handleMatchEnd={handleMatchEnd}
                participantId={participantInfo?.other_match_participant_info.match_participant_id!}
                token={token!}
                handleReportModalOpen={report.onOpen}
              />
            )}
          </>
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
