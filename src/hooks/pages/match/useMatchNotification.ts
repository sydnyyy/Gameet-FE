import { useQueryClient } from "@tanstack/react-query";
import { matchQueryKeys } from "./useMatchStatus";
import { MatchStatusType } from "@/types/match";
import { useMatchStatusStore } from "@/store/useMatchStatus";

export const useMatchNotification = () => {
  const queryClient = useQueryClient();
  const { setStatus } = useMatchStatusStore();

  // 매칭 알림 메시지 관리
  const handleMatchNotification = (notificationData: MatchStatusType) => {
    const status = notificationData.match_status;
    if (status === "MATCHED" || status === "FAILED" || status === "COMPLETED") {
      const newMatchStatus: MatchStatusType = {
        match_status: notificationData.match_status,
        match_room_id: notificationData.match_room_id,
        elapsed_time: null,
      };

      queryClient.setQueryData(matchQueryKeys.status(), newMatchStatus);
      setStatus(newMatchStatus);
    }
  };

  return { handleMatchNotification };
};
