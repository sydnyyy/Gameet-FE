"use client";
import { Button, ButtonProps } from "@heroui/react";
import { useState } from "react";

export interface ButtonsProps extends Omit<ButtonProps, "onPress"> {
  className?: string;
  bgColor?: string;
  width?: string;
  height?: string;
  textColor?: string;
  onClick?: () => void;
}

export default function Buttons({
  children,
  onClick,
  bgColor = "bg-primary",
  textColor = "text-white",
  width,
  height,
  className,
  ...props
}: ButtonsProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      {...props}
      className={`${bgColor} ${textColor} ${className} font-semibold`}
      style={{ width, height }}
      onPress={handleClick}
    >
      {children}
    </Button>
  );
}
