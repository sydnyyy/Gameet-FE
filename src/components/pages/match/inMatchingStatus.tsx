import Buttons from "@/components/common/button/Buttons";

export default function InMatchingStatus() {
  return (
    <div className="flex flex-col items-center gap-10">
      <p className="text-xl font-semibold">조건에 맞는 게이머를 매칭 중입니다.</p>
      <Buttons type="button" size="lg" children="매칭 취소" />
    </div>
  );
}
