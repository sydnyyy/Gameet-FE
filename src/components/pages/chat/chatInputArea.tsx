import Buttons from "@/components/common/button/Buttons";
import { Input } from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";
import AppointmentFormModal from "../appointment/appointmentFormModal";

interface ChatInputAreaProps {
  matchRoomId: number;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  showOptions: boolean;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  handleSend: () => void;
  handleMatchEnd: () => void;
  participantId: number;
  token: string;
  handleReportModalOpen: () => void;
}

export default function ChatInputArea({
  matchRoomId,
  input,
  setInput,
  showOptions,
  setShowOptions,
  handleSend,
  handleMatchEnd,
  participantId,
  token,
  handleReportModalOpen,
}: ChatInputAreaProps) {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  return (
    <div className="w-[700px] max-w-full flex items-end gap-2 relative">
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => setShowOptions(prev => !prev)}
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-md text-xl font-bold select-none text-white"
          style={{ backgroundColor: "#403a45", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
        >
          +
        </button>
        {showOptions && (
          <div className="absolute bottom-full mb-2 flex flex-col z-10">
            {[
              {
                label: "약속 설정",
                onClick: () => setShowAppointmentForm(true),
              },
              { label: "신고", onClick: () => alert("신고") },
              { label: "매칭 종료", onClick: handleMatchEnd },
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
      {showAppointmentForm && (
        <AppointmentFormModal
          matchRoomId={matchRoomId}
          participantId={participantId}
          token={token}
          closeAction={() => setShowAppointmentForm(false)}
        />
      )}
    </div>
  );
}
