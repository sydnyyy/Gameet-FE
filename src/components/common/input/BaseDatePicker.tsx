import { Input } from "@heroui/react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";

interface BaseDateTimePickerProps {
  name: string;
  rules?: RegisterOptions;
  placeholder?: string;
  className?: string;
}

export default function BaseDateTimePicker({
  name,
  rules,
  placeholder = "시간을 선택하세요",
  className,
}: BaseDateTimePickerProps) {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  return (
    <Input
      type="time"
      {...field}
      placeholder={placeholder}
      isInvalid={!!error}
      errorMessage={error?.message}
      className={`h-12 ${className ?? ""}`}
      classNames={{
        errorMessage: "text-sm",
      }}
    />
  );
}
