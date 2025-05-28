import Logo from "@/../public/icons/Gameet-Logo.svg";
import NavMenu from "../nav/navMenu";
import AuthActions from "./authActions";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 w-full h-[80px] bg-surface font-bold text-[18px] px-[60px] box-border">
      <div>
        <Link href={"/"}>
          <Logo width={45} height={45} />
        </Link>
      </div>
      <NavMenu />
      <div>
        <AuthActions />
      </div>
    </header>
  );
}
