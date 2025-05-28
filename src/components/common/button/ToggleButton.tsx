"use client";

import { ReactNode } from "react";

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function ToggleButton({ isActive, onClick, children }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border rounded px-4 py-2 text-sm transition-colors duration-150 ${
        isActive ? "bg-primary text-white" : "bg-transparent-200 text-white"
      }`}
    >
      {children}
    </button>
  );
}
