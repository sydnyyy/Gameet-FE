import React from "react";
import { ModalProps as HeroModalProps, useDisclosure } from "@heroui/react";
import Modals from "@/components/common/modal/Modals";

interface ModalsProps extends Omit<HeroModalProps, "isOpen" | "onClose"> {
  children: React.ReactNode;
  headerText?: string;
  className?: string;
  close?: (() => void) | null | undefined;
}

export function useModal() {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure;

  const Modal = ({ children, headerText, className, close, ...props }: ModalsProps) => {
    const handleClose = () => {
      if (close === null) {
        return;
      } else if (typeof close === "function") {
        close();
      } else {
        onClose();
      }
    };

    return (
      <Modals
        isOpen={isOpen}
        onClose={handleClose}
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