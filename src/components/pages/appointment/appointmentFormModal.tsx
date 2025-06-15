"use client";

import { apiRequest } from "@/app/api/apiRequest";
import { getStompClient } from "@/app/api/socket";
import Buttons from "@/components/common/button/Buttons";
import BaseDateTimePicker from "@/components/common/input/BaseDatePicker";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  matchRoomId: number;
  participantId: number;
  token: string;
  closeAction: () => void;
}

interface FormValues {
  appointment: string;
}

export default function AppointmentFormModal({
  matchRoomId,
  participantId,
  token,
  closeAction,
}: Props) {
  const methods = useForm<{ appointment: string }>({
    defaultValues: { appointment: "" },
  });

  const onSubmit = async ({ appointment }: FormValues) => {
    if (!appointment) {
      alert("약속 시간을 선택해주세요.");
      return;
    }

    try {
      await apiRequest("/match/match-appointment", "POST", {
        match_room_id: matchRoomId,
        match_appointment_time: appointment,
      });

      const client = getStompClient();
      if (client) {
        const appointmentMessage = {
          matchParticipantId: participantId,
          messageType: "APPOINTMENT" as const,
          content: `${appointment}에 약속이 설정되었습니다.`,
        };

        client.send("/app/chat.send", { Authorization: token }, JSON.stringify(appointmentMessage));
      }

      alert("약속 시간이 설정되었습니다.");
      closeAction();
    } catch (error) {
      console.error("약속 설정 실패:", error);
      alert("약속 설정에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#403a45] rounded-xl p-6 w-96">
        <h1 className="text-lg font-semibold text-white mb-4">약속 시간 설정</h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <BaseDateTimePicker
              name="appointment"
              rules={{ required: "약속 시간을 선택해주세요" }}
            />

            <div className="flex justify-end mt-4 gap-2">
              <Buttons type="button" onClick={closeAction}>
                취소
              </Buttons>
              <Buttons type="submit">확인</Buttons>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
