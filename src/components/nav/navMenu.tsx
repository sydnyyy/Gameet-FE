"use client";
import { useAuth } from "@/hooks/common/useAuth";
import { useModal } from "@/hooks/modal/useModal";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();
  const { isLogin } = useAuth();
  const router = useRouter();
  const { onOpen, Modal } = useModal();

  // 현재 탭 확인 후 스타일 적용
  const isActive = (path: string) =>
    pathname === path
      ? "text-white underline decoration-white decoration-2 underline-offset-8"
      : "text-primary-gray";

  const handleMatchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLogin) {
      onOpen();
      router.push("/login?redirect=/match");
    } else {
      router.push("/match");
    }
  };

  return (
    <nav>
      <ul className="flex gap-20">
        <li className={isActive("/match")}>
          <button onClick={handleMatchClick} className={isActive("/match")}>
            매칭하기
          </button>
        </li>
        {isLogin && (
          <li className={isActive("/profile")}>
            <Link href="/profile">마이페이지</Link>
          </li>
        )}
      </ul>

      <Modal headerText="💡 알림" children="로그인이 필요합니다." />
    </nav>
  );
}
