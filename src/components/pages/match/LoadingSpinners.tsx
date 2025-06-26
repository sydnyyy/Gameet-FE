"use client";
import { Pulse } from "basic-loading";
import { useState, useEffect, useRef, useMemo } from "react";

interface LoadingSpinnerProps {
  initialElapsedTime?: number;
}

export default function LoadingSpinner({ initialElapsedTime = 0 }: LoadingSpinnerProps) {
  const [seconds, setSeconds] = useState<number>(initialElapsedTime ?? 0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [initialElapsedTime]);

  const startTimer = () => {
    setSeconds(initialElapsedTime);
    stopTimer();

    intervalRef.current = window.setInterval(() => {
      setSeconds(prev => {
        const next = prev + 1;
        if (next === 60) stopTimer();
        return next;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const option = useMemo(
    () => ({
      size: 250,
      color: "rgba(123, 65, 194, 0.616)",
    }),
    [],
  );

  return (
    <Pulse option={option}>
      <div className="text-4xl font-semibold">{formatTime(seconds)}</div>
    </Pulse>
  );
}
