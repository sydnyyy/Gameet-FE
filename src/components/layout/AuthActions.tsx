"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import Link from "next/link";

export default function AuthActions() {
  const { isLogin, logout } = useAuth();
  return isLogin ? <button onClick={logout}>로그아웃</button> : <Link href="/login">로그인</Link>;
}
