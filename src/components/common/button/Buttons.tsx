"use client";
import { Button } from "@heroui/react";
import { useState } from "react";

export interface ButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "solid" | "light" | "flat" | "ghost" | "shadow" | "faded" | "bordered";
  children: React.ReactNode;
  color?: string;
  width?: string;
  height?: string;
  textColor?: string;
  onClick?: () => void;
  isLoading?: boolean;
  type: "submit" | "button";
}

export default function Buttons({
  size = "md",
  className,
  variant = "solid",
  children,
  color = "bg-primary",
  width,
  height,
  onClick,
  type = "button",
  textColor = "text-white",
  isLoading = false,
}: ButtonProps) {
  const handleButton = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      disableRipple
      className={`${color} ${textColor} ${className}`}
      variant={variant}
      style={{ width, height }}
      onPress={handleButton}
      type={type}
      isLoading={isLoading}
      size={size}
    >
      {children}
    </Button>
  );
}
