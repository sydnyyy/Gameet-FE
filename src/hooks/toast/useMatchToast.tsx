"use client";
import Buttons from "@/components/common/button/Buttons";
import { useEffect } from "react";
import { useMatchStatusStore } from "@/store/useMatchStatus";
import useToast from "../toast/useToast";
import { useRouter } from "next/navigation";

export default function useMatchToast() {
  const { status, clearStatus } = useMatchStatusStore();
  const showToast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (status?.match_status === "MATCHED" && status.match_room_id) {
      showToast({
        title: "매칭 완료!",
        description: "매칭이 완료되었습니다.",
        buttonContent: (
          <Buttons
            children="채팅방으로 이동"
            size="sm"
            onClick={() => router.push(`chat/${status.match_room_id}`)}
          />
        ),
      });

      clearStatus();
    }
  }, [status, clearStatus]);
}
