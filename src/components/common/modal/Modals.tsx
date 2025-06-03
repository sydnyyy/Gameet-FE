import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

interface ModalsProps {
  isOpen: boolean;
  onClose: () => void;
  headerText?: string;
  children: React.ReactNode;
}

export default function Modals({ isOpen, onClose, headerText, children }: ModalsProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {headerText && <ModalHeader>{headerText}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}