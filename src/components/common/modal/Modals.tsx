import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps as HeroModalProps,
} from "@heroui/react";
import clsx from "clsx";

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
  const baseModalClassName = "bg-[#303030] py-5 px-4";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(baseModalClassName, className)}
      {...props}
    >
      <ModalContent>
        {headerText && <ModalHeader>{headerText}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
