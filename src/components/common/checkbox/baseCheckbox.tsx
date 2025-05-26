import { Checkbox, CheckboxProps } from "@heroui/react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";

interface BaseCheckboxProps
  extends Omit<CheckboxProps, "onChange" | "checked" | "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions;
}

export default function BaseCheckbox({ name, rules, ...props }: BaseCheckboxProps) {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <Checkbox
      {...props}
      checked={field.value}
      defaultSelected={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={!!error}
    />
  );
}
