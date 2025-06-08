import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps as HeroModalProps,
} from "@heroui/react";

interface ModalsProps extends Omit<HeroModalProps, "isOpen" | "onClose"> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  headerText?: string;
  className?: string;
}

export default function Modals({
  children,
  isOpen,
  onClose,
  headerText,
  className,
  ...props
}: ModalsProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className} {...props}>
      <ModalContent>
        {headerText && <ModalHeader>{headerText}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}