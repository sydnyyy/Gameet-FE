import { Select, SelectItem, SelectProps as HeroSelectProps } from "@heroui/react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";
import React from "react";

interface BaseSelectProps extends Omit<HeroSelectProps, "onChange" | "children"> {
  name: string;
  rules?: RegisterOptions;
  data: Record<string, string>;
  width?: string;
  height?: string;
  className?: string;
}

export default function BaseSelect({
  name,
  rules,
  data,
  width,
  height,
  className,
  ...props
}: BaseSelectProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.selectionMode === "multiple") {
      field.onChange(Array.from(e.target.value.split(",")));
    } else {
      field.onChange(e.target.value);
    }
  };

  return (
    <Select
      {...props}
      {...field}
      onChange={handleChange}
      isInvalid={!!error}
      style={{ width, height }}
      errorMessage={error?.message}
      classNames={{
        errorMessage: "text-sm",
      }}
      className={className}
    >
      {Object.entries(data).map(([key, value]) => (
        <SelectItem key={key}>{value}</SelectItem>
      ))}
    </Select>
  );
}
