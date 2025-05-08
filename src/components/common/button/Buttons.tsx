"use client";
import { Button } from "@heroui/react";
import { useState } from "react";

export interface ButtonProps {
  color: string;
  width: string;
  height: string;
  content: string;
  changeColor?: string;
  textColor?: string;
  onClick: () => void;
  isLoading?: boolean;
  type: "submit" | "button";
}

export default function Buttons({
  color,
  width,
  height,
  content,
  onClick,
  textColor = "text-white",
}: ButtonProps) {
  const bgColor = `bg-${color}-500`;

  const handleButton = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      disableRipple
      className={`${bgColor} ${textColor}`}
      style={{ width, height }}
      onPress={handleButton}
      children={<>{content}</>}
    />
  );
}
