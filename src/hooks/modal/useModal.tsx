import React from "react";
import { useDisclosure } from "@heroui/react";
import Modals from "@/components/common/modal/Modals";

export function useModal() {
  const disclosure = useDisclosure();
  const { onOpen } = disclosure;

  const Modal = ({ children, headerText }: { children: React.ReactNode; headerText?: string }) => {
    return (
      <Modals headerText={headerText} {...disclosure}>
        {children}
      </Modals>
    );
  };

  return { onOpen, Modal };
}