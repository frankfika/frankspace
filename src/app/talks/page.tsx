import Link from 'next/link'
import { talks } from '@/config/profile'

export default function Talks() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">Talks</h2>
      <div className="space-y-3">
        {talks.map(t => (
          <Link key={t.title} href={t.link} className="surface">
            <div className="flex items-center justify-between">
              <span className="font-mono">{t.title}</span>
              <span className="text-xs text-zinc-500">{t.where}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}