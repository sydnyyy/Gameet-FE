import { MatchStatusType } from "@/types/match";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { matchQueryKeys } from "./useMatchStatus";

export const useMatchNotificationHandler = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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
      console.log("캐시 업데이트:", newMatchStatus);

      if (status === "COMPLETED") {
        router.push("/");
      }

      // if (notificationData.match_status === "MATCHED" && notificationData.match_room_id) {
      //   router.push(`/chat/${notificationData.match_room_id}`);
      // }
    }
  };

  return { handleMatchNotification };
};
