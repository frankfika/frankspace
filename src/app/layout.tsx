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
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased bg-background text-foreground`}>
        <div className="bg-radial" />
        <div className="container grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 py-10">
          <aside className="space-y-6 sticky top-10 self-start">
            <Link href="/" className="font-mono text-xl">Chen Fang</Link>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="nav-link">关于</Link>
              <Link href="/courses" className="nav-link">课程</Link>
              <Link href="/links" className="nav-link">平台</Link>
              <Link href="/follow" className="nav-link">Follow</Link>
              <Link href="/lab" className="nav-link">Lab</Link>
              <Link href="/talks" className="nav-link">Talks</Link>
              <Link href="/consult" className="nav-link">Consult</Link>
            </nav>
          </aside>
          <main className="pb-16">{children}</main>
        </div>
        <footer className="container border-t py-8 text-sm text-zinc-500" style={{ borderColor: 'var(--border)' }}>
          <p className="font-mono">© {new Date().getFullYear()} Chen Fang · All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
