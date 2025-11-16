import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "陈放 · 官方网站",
  description: "OpenCSG 产品与战略负责人，AI 与 Web3 课程分享。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased bg-background text-foreground font-sans`}>
        <div className="bg-radial" />
        <header className="container">
          <div className="flex items-center justify-between py-6">
            <Link href="/" className="text-sm font-medium">Chen Fang</Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <nav className="flex items-center gap-4">
                <Link href="/about" className="nav-link">About</Link>
                <Link href="/writing" className="nav-link">Writing</Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="container pb-16">{children}</main>
        <footer className="container border-t py-8 text-sm text-muted border-border">
          <p className="font-mono">© {new Date().getFullYear()} Chen Fang · All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
