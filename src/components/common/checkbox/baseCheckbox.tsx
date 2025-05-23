import { Checkbox, CheckboxProps } from "@heroui/react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";

interface BaseCheckboxProps
  extends Omit<CheckboxProps, "onChange" | "checked" | "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: boolean;
}

export default function BaseCheckbox({
  name,
  rules,
  defaultValue = false,
  ...props
}: BaseCheckboxProps) {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <Checkbox
      {...props}
      checked={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={!!error}
    />
  );
}
