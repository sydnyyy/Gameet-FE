import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/common/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "겜밋 | GAMEET",
  description: "게임 장르와 스타일만으로 나와 맞는 게임 친구를 찾아 보세요!",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="dark min-h-screen flex flex-col">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
