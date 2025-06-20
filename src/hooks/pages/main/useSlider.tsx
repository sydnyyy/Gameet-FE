"use client";
import { useEffect, useState } from "react";

export function useSlider<T>(items: T[], time: number) {
  const [current, setCurrent] = useState(0);

  // 자동 아이템 슬라이더 함수
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, time);

    return () => clearInterval(interval);
  }, [items.length, time]);
  return { current, items };
}
