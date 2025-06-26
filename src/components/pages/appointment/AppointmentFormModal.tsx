"use client";

import { apiRequest } from "@/app/api/apiRequest";
import { connectSocket } from "@/app/api/socket";
import Buttons from "@/components/common/button/Buttons";
import BaseDateTimePicker from "@/components/common/input/BaseDatePicker";
import Modals from "@/components/common/modal/Modals"; // ← 이 부분 주의
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  matchRoomId: number;
  participantId: number;
  token: string;
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  appointment: string;
}

export default function AppointmentFormModal({
  matchRoomId,
  participantId,
  token,
  isOpen,
  onClose,
}: Props) {
  const methods = useForm<FormValues>({
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

      const client = await connectSocket();
      if (client) {
        const appointmentMessage = {
          matchParticipantId: participantId,
          messageType: "APPOINTMENT" as const,
          content: `${appointment}에 약속이 설정되었습니다.`,
        };

        client.send("/app/chat.send", { Authorization: token }, JSON.stringify(appointmentMessage));
      }

      onClose();
    } catch (error) {
      const err = error as { message?: string };
      const msg = err?.message || "약속 설정에 실패했습니다.";

      alert(msg);
    }
  };

  return (
    <Modals isOpen={isOpen} onClose={onClose} headerText="약속 시간 설정" className="w-96">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <BaseDateTimePicker
            name="appointment"
            rules={{
              required: "약속 시간을 선택해주세요.",
              validate: (value: string) => {
                const [hourStr, minuteStr] = value.split(":");
                const now = new Date();
                const selected = new Date(now);
                selected.setHours(Number(hourStr), Number(minuteStr), 0, 0);

                return selected > now || "현재 이후의 시간을 선택해주세요.";
              },
            }}
          />

          <div className="flex justify-end mt-4 gap-2">
            <Buttons type="submit">확인</Buttons>
          </div>
        </form>
      </FormProvider>
    </Modals>
  );
}
