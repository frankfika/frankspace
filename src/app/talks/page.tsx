import Link from 'next/link'
import { talks } from '@/config/profile'

export default function Talks() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">Talks</h2>
      <div>
        {talks.map(t => (
          <Link key={t.title} href={t.link} className="list-item">
            <span>{t.title}</span>
            <span className="text-xs muted">{t.where}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}