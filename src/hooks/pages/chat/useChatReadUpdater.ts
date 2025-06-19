import { apiRequest } from "@/app/api/apiRequest";
import { useChatStore } from "@/store/useChatStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useChatReadUpdater() {
  const pathname = usePathname();
  const { myMatchParticipantId } = useChatStore();

  useEffect(() => {
    const updateLastRead = async () => {
      if (!myMatchParticipantId) return;

      try {
        await apiRequest(`/chat/read/${myMatchParticipantId}`, "PATCH");
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
