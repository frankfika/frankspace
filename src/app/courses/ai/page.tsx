import Link from 'next/link'
import { courses } from '@/config/profile'

export default function AI() {
  const c = courses.find(x => x.slug === 'ai')!
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-mono text-2xl">{c.title}</h2>
        <p className="muted">{c.summary}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-mono text-xl">纲要</h3>
        <ol className="list-decimal pl-5 muted space-y-1">
          {c.lessons.map(l => <li key={l}>{l}</li>)}
        </ol>
      </div>
      <div className="flex gap-2">
        <Link href="/consult" className="pill">咨询</Link>
        <Link href="/follow" className="pill">订阅更新</Link>
      </div>
    </section>
  )
}