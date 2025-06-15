"use client";

import { ReactNode } from "react";
import Buttons from "./Buttons";
import clsx from "clsx";

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function ToggleButton({ isActive, onClick, children }: ToggleButtonProps) {
  return (
    <Buttons
      type="button"
      onClick={onClick}
      className={clsx("rounded-full transition-colors duration-150 h-8", {
        "bg-primary text-white": isActive,
        "bg-[#a391ba21] bg-opacity-70 text-white": !isActive,
      })}
    >
      {children}
    </Buttons>
  );
}
