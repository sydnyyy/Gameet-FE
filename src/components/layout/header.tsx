import Logo from "@/../public/icons/Gameet-Logo.svg";
import Link from "next/link";
import NavMenu from "../nav/navMenu";

export default function Header() {
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 w-full h-[80px] bg-surface font-bold text-[18px] px-[60px] box-border">
      <div>
        <Logo width={45} height={45} />
      </div>
      <NavMenu />
      <div>
        <Link href="/login">로그인</Link>
      </div>
    </header>
  );
}
