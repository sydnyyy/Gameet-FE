import Buttons from "@/components/common/button/Buttons";
import { useCancelMatch } from "@/hooks/pages/match/useMatchStatus";
import { useMatchStore } from "@/store/useMatchStore";

export default function InMatchingStatus() {
  const { game_platforms, preferred_genres } = useMatchStore();
  const cancelMatch = useCancelMatch();

  return (
    <div className="flex flex-col items-center gap-10">
      <ul className="flex gap-4">
        {[...(game_platforms ?? []), ...(preferred_genres ?? [])].map((item, idx) => (
          <li
            className="bg-[#a391ba21] bg-opacity-70 px-4 py-1 rounded-3xl font-semibold text-white"
            key={idx}
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="text-xl font-semibold">조건에 맞는 게이머를 매칭 중입니다.</p>

      <Buttons type="button" size="lg" children="매칭 취소" onClick={() => cancelMatch.mutate()} />
    </div>
  );
}
