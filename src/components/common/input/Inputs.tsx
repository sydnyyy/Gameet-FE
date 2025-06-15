import { Input } from "@heroui/react";

export interface InputProps {
  size?: "sm" | "md" | "lg";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  width?: string;
  height?: string;
  label?: React.ReactNode;
  type: "text" | "email" | "url" | "password" | "tel" | "search" | "file";
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
  required?: boolean;
  validate?: (value: string) => void | true | null | undefined;
  defaultValue?: string;
  value?: string;
  minLength?: number;
  maxLength?: number;
}

export default function Inputs({
  size = "md",
  className,
  onChange,
  width,
  height,
  label,
  type,
  description,
  placeholder,
  disabled = false,
  errorMessage,
  readOnly = false,
  required = false,
  defaultValue,
  value,
  minLength,
  maxLength,
}: InputProps) {
  // 기본 사이즈 틀
  const sizeStyles = {
    sm: { width: "200px", height: "36px" },
    md: { width: "300px", height: "40px" },
    lg: { width: "400px", height: "48px" },
  };

  return (
    <div
      // width, height 값이 있는 경우 우선 적용
      style={{ width: width ?? sizeStyles[size].width, height: height ?? sizeStyles[size].height }}
      className={className}
    >
      <Input
        size={size}
        description={description}
        label={label}
        type={type}
        isDisabled={disabled}
        placeholder={placeholder}
        errorMessage={errorMessage}
        readOnly={readOnly}
        isRequired={required}
        minLength={minLength}
        maxLength={maxLength}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
