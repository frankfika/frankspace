import Link from "next/link";
import { profile, courses, testimonials } from "@/config/profile";

export default function Home() {
  return (
    <section className="space-y-12">
      <div className="space-y-3">
        <h1 className="hero-title">{profile.name}</h1>
        <p className="muted">{profile.title}</p>
        <p className="text-zinc-300 leading-7">{profile.bio}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/consult" className="btn">购课 / 咨询</Link>
          <Link href="/follow" className="btn">订阅更新</Link>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">课程</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="surface">
              <h3 className="font-mono text-lg">{c.title}</h3>
              <p className="mt-2 text-sm muted">{c.summary}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">评价</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <div key={t.quote} className="surface">
              <p className="text-sm">{t.quote}</p>
              <p className="mt-2 text-xs muted">{t.by}</p>
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
