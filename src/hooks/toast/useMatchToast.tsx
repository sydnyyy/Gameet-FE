"use client";
import Buttons from "@/components/common/button/Buttons";
import { useEffect, useRef } from "react";
import { useMatchStatusStore } from "@/store/useMatchStatus";
import useToast from "../toast/useToast";
import { usePathname, useRouter } from "next/navigation";

export default function useMatchToast() {
  const { status, clearStatus } = useMatchStatusStore();
  const showToast = useToast();
  const router = useRouter();
  const pathname = usePathname();

  // Toast 중복 방지
  const hasShownToastRef = useRef(false);
  // 매칭 페이지에서 MATCHED 상태를 본 경우 비활성화
  const hasSeenMatchedRef = useRef(false);

  useEffect(() => {
    if (pathname === "/match" && status?.match_status === "MATCHED") {
      hasSeenMatchedRef.current = true;
      return;
    }

    if (
      pathname !== "/match" &&
      status?.match_status === "MATCHED" &&
      status.match_room_id &&
      !hasSeenMatchedRef.current &&
      !hasShownToastRef.current
    ) {
      hasShownToastRef.current = true;

      showToast({
        title: "매칭 완료!",
        description: "매칭이 완료되었습니다.",
        buttonContent: (
          <Buttons size="sm" onClick={() => router.push("/match")}>
            채팅방으로 이동
          </Buttons>
        ),
      });

      clearStatus();
    }
  }, [router, showToast, status, pathname, clearStatus]);
}
