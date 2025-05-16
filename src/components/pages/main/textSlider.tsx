"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useSlider } from "@/hooks/useSlider";

export default function TextSlider() {
  const gameGenres = [
    "RPG",
    "FPS",
    "MOBA",
    "공포 게임",
    "스팀 게임",
    "레이싱 게임",
    "스포츠 게임",
    "어드벤쳐",
  ];

  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);

  const { current, items } = useSlider(gameGenres, 5000);

  // 현재 텍스트의 너비 측정
  useEffect(() => {
    const currentRef = textRef.current[current];
    if (currentRef) {
      setTextWidth(currentRef.offsetWidth);
    }
  }, [current]);

  return (
    <div className="flex items-center text-4xl font-semibold">
      {/* 슬라이딩 텍스트 박스 */}
      <div
        className="h-[48px] overflow-hidden transition-all duration-500"
        style={{ width: textWidth ? `${textWidth}px` : "auto" }}
      >
        {/* 슬라이딩 효과 */}
        <div
          className="flex flex-col items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${current * 48}px)` }}
        >
          {items.map((genre, idx) => (
            <span
              key={genre}
              ref={el => {
                textRef.current[idx] = el;
              }}
              className={clsx(
                "h-[48px] flex items-center justify-center",
                "text-white underline decoration-white decoration-3 underline-offset-8",
                "whitespace-nowrap",
              )}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* 고정 텍스트 */}
      <span className="ml-2">친구를 찾고 있어요</span>
    </div>
  );
}
