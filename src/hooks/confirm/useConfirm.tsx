"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/modal/useModal";
import Buttons from "@/components/common/button/Buttons";

interface ConfirmOptions {
  headerText: string;
  message: string;
}

export function useConfirm() {
  const { Modal, onOpen, onClose } = useModal();
  const [options, setOptions] = useState<ConfirmOptions>();
  const [resolver, setResolver] = useState<((result: boolean) => void) | null>(null);

  const confirm = ({ headerText, message }: ConfirmOptions) => {
    return new Promise(resolve => {
      setOptions({ headerText, message });
      setResolver(() => resolve);
      onOpen();
    });
  };

  const cleanup = () => {
    setResolver(null);
    onClose();
  };

  const handleConfirm = () => {
    resolver?.(true);
    cleanup();
  };

  const handleCancel = () => {
    resolver?.(false);
    cleanup();
  };

  const ConfirmModal = ({ ...props }) => {
    return (
      <Modal
        headerText={options?.headerText}
        className="text-center"
        placement="top"
        hideCloseButton={true}
        close={null}
        {...props}
      >
        {options?.message}
        <div className="flex justify-center gap-10">
          <Buttons type="button" className="h-[48px] w-[240px] my-3" onClick={handleConfirm}>
            확인
          </Buttons>
          <Buttons
            type="button"
            className="h-[48px] w-[240px] my-3 bg-[#a391ba21] bg-opacity-70"
            onClick={handleCancel}
          >
            취소
          </Buttons>
        </div>
      </Modal>
    );
  };

  return { ConfirmModal, confirm };
}