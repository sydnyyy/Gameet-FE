import { Slider, SliderProps } from "@heroui/react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";

interface SlidersProps extends Omit<SliderProps, "onChange" | "value" | "errorMessage"> {
  name: string;
  rules?: RegisterOptions;
}

export default function Sliders({ name, rules, defaultValue, ...props }: SlidersProps) {
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
    <Slider
      {...props}
      {...field}
      value={field.value ?? ""}
      onChange={field.onChange}
      errorMessage={error?.message}
      step={10}
      classNames={{
        label: "text-lg font-semibold",
      }}
    />
  );
}
