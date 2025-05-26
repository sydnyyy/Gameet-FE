import { Input, InputProps as HeroInputProps } from "@heroui/react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";
import React from "react";

interface InputsProps
  extends Omit<HeroInputProps, "onChange" | "value" | "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions;
  type?: string;
}

export default function Inputs({ name, rules, defaultValue, type, ...props }: InputsProps) {
  // 연결된 상위 Form에서 control 객체 가져오기
  const { control } = useFormContext();

  // useController 호출 및 인자 전달 후 field 객체 생성
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  // numeric input의 경우 숫자만 필터링
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = type === "numeric" ? value.replace(/\D/g, "") : value;
    field.onChange(filtered);
  };

  return (
    <Input
      {...props}
      {...field}
      type={type}
      value={field.value ?? ""}
      onChange={handleChange}
      onBlur={field.onBlur}
      isInvalid={!!error}
      errorMessage={error?.message}
      classNames={{
        errorMessage: "text-sm",
      }}
    />
  );
}
