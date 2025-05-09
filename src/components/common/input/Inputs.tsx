import { Input } from "@heroui/react";

export interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  width: string;
  height: string;
  label: React.ReactNode;
  type: "text" | "email" | "url" | "password" | "tel" | "search" | "file";
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: boolean;
  readOnly?: boolean;
}

export default function Inputs({
  children,
  width,
  height,
  label,
  type,
  description,
  placeholder,
  disabled,
  errorMessage,
  readOnly = false,
}: InputProps) {
  return (
    <Input
      className="max-w-xs"
      style={{ width, height }}
      description={description}
      label={label}
      type={type}
      children={children}
      disabled={disabled}
      placeholder={placeholder}
      errorMessage={errorMessage}
      readOnly={readOnly}
    />
  );
}
