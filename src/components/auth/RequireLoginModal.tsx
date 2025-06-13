"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useModal } from "@/hooks/modal/useModal";
import { useRouter } from "next/navigation";
import Buttons from "../common/button/Buttons";

export default function RequireLoginModal() {
  const { isLogin } = useAuth();
  const { onOpen, onClose, Modal } = useModal();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      onOpen();
    }
  }, [isLogin, onOpen]);

  if (isLogin) return null;

  const handleGoLogin = () => {
    onClose();
    router.push("/login?redirect=" + encodeURIComponent(window.location.pathname));
  };

  return (
    <Modal headerText="💡 알림">
      로그인이 필요합니다.
      <Buttons onClick={handleGoLogin}>로그인</Buttons>
    </Modal>
  );
}
