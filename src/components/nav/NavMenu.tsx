"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import { useChatStore } from "@/store/useChatStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "../common/badge/Badge";

export default function NavMenu() {
  const pathname = usePathname();
  const { isLogin } = useAuth();
  const unreadCount = useChatStore(state => state.unreadCount);

  // 현재 탭 확인 후 스타일 적용
  const isActive = (path: string) =>
    pathname === path
      ? "text-white underline decoration-white decoration-2 underline-offset-8"
      : "text-primary-gray";

  return (
    <nav>
      <ul className="flex gap-20">
        <li className={`relative ${isActive("/match")}`}>
          <Link href="/match" className={isActive("/match")}>
            매칭하기
            {pathname !== "/match" && unreadCount > 0 && <Badge count={unreadCount} />}
          </Link>
        </li>
        {isLogin && (
          <li className={isActive("/profile")}>
            <Link href="/profile">마이페이지</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
