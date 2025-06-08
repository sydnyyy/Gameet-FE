"use client";
import { Pulse } from "basic-loading";
import { useState, useEffect, useRef } from "react";

interface LoadingSpinnerProps {
  initialElapsedTime?: number | null;
}

export default function LoadingSpinner({ initialElapsedTime = 0 }: LoadingSpinnerProps) {
  const [seconds, setSeconds] = useState<number>(initialElapsedTime ?? 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 시작
  useEffect(() => {
    setSeconds(initialElapsedTime ?? 0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds + 1;
        if (newSeconds >= 60) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          console.log("매칭 타이머 1분 초과");

          return 60;
        }
        return newSeconds;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [initialElapsedTime]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const option = {
    size: 250,
    color: "rgba(123, 65, 194, 0.616)",
  };

  return (
    <Pulse option={option}>
      <div className="text-4xl font-semibold">{formatTime(seconds)}</div>
    </Pulse>
  );
}
