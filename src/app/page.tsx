import Buttons from "@/components/common/button/Buttons";
import GameSlider from "@/components/pages/main/GameSlider";
import TextSlider from "@/components/pages/main/TextSlider";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center box-border">
      <GameSlider />
      <TextSlider />
      <Link href="/match">
        <Buttons width="250px" height="70px" size="lg" className="text-[28px] font-bold my-16">
          매칭하기
        </Buttons>
      </Link>
    </div>
  );
}
