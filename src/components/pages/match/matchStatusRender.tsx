"use client";
import { useMatchQueue } from "@/hooks/pages/match/useMatchStatus";
import InMatching from "./inMatching";
import MatchForm from "./matchForm";

export default function MatchStatusRender() {
  const { data: data, isError, error } = useMatchQueue();

  if (isError) {
    console.error(error);
    return <p>매칭 상태 조회 실패</p>;
  }

  switch (data?.match_status) {
    case "SEARCHING":
      return <InMatching />;
    // case "MATCHED":
    //   return <Chat />;
    case "NONE":
      return <MatchForm />;
    case "FAILED":
      return <p>매칭에 실패했습니다.</p>;
    default:
      console.warn("알 수 없는 매칭 상태:", data?.match_status);
      return null;
  }
}
