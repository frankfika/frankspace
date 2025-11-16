import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
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
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased bg-background text-foreground font-mono`}>
        <div className="bg-radial" />
        <header className="container flex items-center justify-between py-6">
          <Link href="/" className="text-sm">Chen Fang</Link>
          <nav className="flex items-center gap-4">
            <Link href="/about" className="nav-link">关于</Link>
            <Link href="/courses" className="nav-link">课程</Link>
            <Link href="/links" className="nav-link">平台</Link>
            <Link href="/follow" className="nav-link">Follow</Link>
            <Link href="/lab" className="nav-link">Lab</Link>
            <Link href="/talks" className="nav-link">Talks</Link>
            <Link href="/consult" className="nav-link">Consult</Link>
          </nav>
        </header>
        <main className="container pb-16">{children}</main>
        <footer className="container border-t py-8 text-sm text-zinc-500" style={{ borderColor: 'var(--border)' }}>
          <p className="font-mono">© {new Date().getFullYear()} Chen Fang · All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
