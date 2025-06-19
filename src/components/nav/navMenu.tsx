"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import { useChatStore } from "@/store/useChatStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();
  const { isLogin } = useAuth();
  const { unreadCount } = useChatStore();

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
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-4 text-xs bg-red-500 text-white rounded-full px-2">
                {unreadCount}
              </span>
            )}
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
