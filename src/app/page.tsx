import Link from "next/link";
import { profile, courses, testimonials, updates } from "@/config/profile";
import Avatar from "@/components/Avatar";

export default function Home() {
  return (
    <section className="space-y-12">
      <div className="space-y-3">
        <Avatar name={profile.name} />
        <h1 className="hero-title">{profile.name}</h1>
        <p className="muted">{profile.title}</p>
        <p className="text-zinc-700 leading-7">{profile.headline}</p>
        <div className="flex flex-wrap gap-2">
          {profile.focuses.map(f => (
            <span key={f} className="pill">{f}</span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/consult" className="link">购课 / 咨询</Link>
          <Link href="/follow" className="link">订阅更新</Link>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">当前提供</h2>
        <div>
          {profile.offerings.map(o => (
            <Link key={o.key} href={o.href} className="list-item">
              <span>{o.key}</span>
              <span className="muted">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">最新更新</h2>
        <div>
          {updates.map(u => (
            <Link key={u.title} href={u.link} className="list-item">
              <span className="text-sm">{u.title}</span>
              <span className="text-xs muted">{u.date}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">评价</h2>
        <div>
          {testimonials.map(t => (
            <div key={t.quote} className="list-item">
              <span className="text-sm">{t.quote}</span>
              <span className="text-xs muted">{t.by}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">平台</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/links" className="pill">全部平台</Link>
          <Link href="/follow" className="pill">Follow / 订阅</Link>
        </div>
      </div>
    </section>
  );
}
