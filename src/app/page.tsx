import Buttons from "@/components/common/button/Buttons";
import GameSlider from "@/components/pages/main/gameSlider";
import TextSlider from "@/components/pages/main/textSlider";

export default function Home() {
  return (
    <div className="flex flex-col items-center box-border">
      <GameSlider />
      <TextSlider />
      <Buttons
        children="매칭하기"
        width="250px"
        height="70px"
        size="lg"
        type="button"
        className="text-[28px] font-bold my-16"
      />
    </div>
  );
}
