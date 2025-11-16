import Link from "next/link";
import { profile, courses, testimonials } from "@/config/profile";

export default function Home() {
  return (
    <section className="space-y-12">
      <div className="space-y-3">
        <h1 className="hero-title">{profile.name}</h1>
        <p className="muted">{profile.title}</p>
        <p className="text-zinc-300 leading-7">{profile.bio}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/consult" className="link">购课 / 咨询</Link>
          <Link href="/follow" className="link">订阅更新</Link>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">课程</h2>
        <div>
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="list-item">
              <span>{c.title}</span>
              <span className="muted">→</span>
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
