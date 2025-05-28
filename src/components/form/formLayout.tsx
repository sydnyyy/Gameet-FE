"use client";
import { ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormLayoutProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  children: ReactNode;
  error?: string | null;
}

export default function FormLayout<T extends FieldValues>({
  methods,
  onSubmit,
  children,
}: FormLayoutProps<T>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
        className="flex flex-col gap-3 w-full max-w-md p-12 justify-center"
      >
        {children}
      </form>
    </FormProvider>
  );
}
