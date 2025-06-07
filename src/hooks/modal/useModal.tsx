import React from "react";
import { ModalProps as HeroModalProps, useDisclosure } from "@heroui/react";
import Modals from "@/components/common/modal/Modals";

interface ModalsProps extends Omit<HeroModalProps, "isOpen" | "onClose"> {
  children: React.ReactNode;
  headerText?: string;
  className?: string;
}

export function useModal() {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure;

  const Modal = ({ children, headerText, className, ...props }: ModalsProps) => {
    return (
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        headerText={headerText}
        className={className}
        {...props}
      >
        {children}
      </Modals>
    );
  };

  return { onOpen, onClose, Modal };
}