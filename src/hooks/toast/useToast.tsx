import { useCallback } from "react";
import { addToast } from "@heroui/toast";
import { cn } from "@heroui/react";

interface UseToastArgs {
  title: string;
  description: string;
  timeout?: number;
  buttonContent?: React.ReactNode;
}

export default function useToast() {
  const showToast = useCallback(
    ({ title, description, timeout = 5000, buttonContent, ...props }: UseToastArgs) => {
      addToast({
        title: title,
        description: description,
        timeout: timeout,
        classNames: {
          base: cn([
            "bg-black shadow-sm",
            "border border-l-8 rounded-md rounded-l-none",
            "flex flex-col items-start",
            "border-primary dark:border-primary-100 border-l-primary",
          ]),
          title: "text-lg font-bold",
          description: "text-md font-semibold",
          icon: "w-6 h-6 fill-current",
        },
        ...props,
        endContent: buttonContent ? (
          <div className="w-full flex flex-center my-2 gap-5">{buttonContent}</div>
        ) : undefined,
      });
    },
    [],
  );

  return showToast;
}
