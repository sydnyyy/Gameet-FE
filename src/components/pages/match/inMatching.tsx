import LoadingSpinner from "@/components/pages/match/loadingSpinners";
import InMatchingStatus from "./inMatchingStatus";
import { useMatchQueue } from "@/hooks/pages/match/useMatchStatus";

export default function InMatching() {
  const { data: matchStatusData } = useMatchQueue();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-24">
      <h1 className="sr-only">매칭 화면</h1>
      <LoadingSpinner initialElapsedTime={matchStatusData?.elapsed_time || 0} />
      <InMatchingStatus />
    </div>
  );
}
