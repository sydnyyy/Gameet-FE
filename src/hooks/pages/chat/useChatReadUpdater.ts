import { apiRequest } from "@/app/api/apiRequest";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { fetchUnreadCount } from "./fetchUnreadCount";

export function useChatReadUpdater() {
  const pathname = usePathname();
  const userProfileId = useAuthStore(state => state.userProfileId);
  const myMatchParticipantId = useChatStore(state => state.myMatchParticipantId);
  const setUnreadCount = useChatStore(state => state.setUnreadCount);

  useEffect(() => {
    const updateLastRead = async () => {
      if (!myMatchParticipantId) return;

      try {
        await apiRequest(`/chat/read/${myMatchParticipantId}`, "PATCH");
        await fetchUnreadCount(userProfileId, setUnreadCount);
        console.log("마지막으로 읽은 시간 갱신 완료");
      } catch (error) {
        console.error("마지막으로 읽은 시간 갱신 실패", error);
      }
    };

    if (pathname.startsWith("/match")) {
      updateLastRead();
    }
  }, [pathname, myMatchParticipantId]);
}
