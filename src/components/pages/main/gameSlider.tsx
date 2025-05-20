"use client";
import Image from "next/image";
import clsx from "clsx";
import { useSlider } from "@/hooks/pages/main/useSlider";

interface GameImageProps {
  src: string;
  alt: string;
  variant: "prev" | "current" | "next";
}

function GameImage({ src, alt, variant }: GameImageProps) {
  return (
    <div
      className={clsx(
        // 공통 스타일
        "rounded-2xl overflow-hidden shadow-[0px_4px_4px_10px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-in-out",
        {
          prev: "absolute left-1/2 top-1/2 -translate-x-[150%] -translate-y-1/2 w-[600px] h-[300px] z-10 opacity-60",
          current: "relative z-20 w-[700px] h-[350px]",
          next: "absolute left-1/2 top-1/2 translate-x-[50%] -translate-y-1/2 w-[600px] h-[300px] z-10 opacity-60",
        }[variant],
      )}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

interface GameImage {
  name: string;
  src: string;
}

export default function GameSlider() {
  const gameImages: GameImage[] = [
    { name: "Among Us", src: "/images/games/amongus.jpg" },
    { name: "Battleground", src: "/images/games/battleground.jpg" },
    { name: "MineCraft", src: "/images/games/minecraft.jpg" },
    { name: "Over Watch2", src: "/images/games/overwatch.png" },
    { name: "League of Legends", src: "/images/games/leagueoflegends.jpg" },
  ];

  const { current, items } = useSlider(gameImages, 5000);

  const getIndex = (offset: number) => (current + offset + gameImages.length) % gameImages.length;

  return (
    <div className="relative flex items-center justify-center my-24 h-[350px]">
      <GameImage src={items[getIndex(-1)].src} alt={items[getIndex(-1)].name} variant="prev" />
      <GameImage src={items[current].src} alt={items[current].name} variant="current" />
      <GameImage src={items[getIndex(1)].src} alt={items[getIndex(1)].name} variant="next" />
    </div>
  );
}
