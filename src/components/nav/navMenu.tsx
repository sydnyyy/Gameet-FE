"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();

  // 현재 탭 확인 후 스타일 적용
  const isActive = (path: string) =>
    pathname === path
      ? "text-white underline decoration-white decoration-2 underline-offset-8"
      : "text-primary-gray";

  return (
    <nav>
      <ul className="flex gap-20">
        <li className={isActive("/")}>
          <Link href="/">메인</Link>
        </li>
        <li className={isActive("/match")}>
          <Link href="/match">매칭하기</Link>
        </li>
        <li className={isActive("/profile")}>
          <Link href="/profile">프로필(임시)</Link>
        </li>
      </ul>
    </nav>
  );
}
