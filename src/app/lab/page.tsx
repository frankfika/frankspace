import Link from 'next/link'
import { projects } from '@/config/profile'

export default function Lab() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">Lab</h2>
      <div>
        {projects.map(p => (
          <Link key={p.title} href={p.link} className="list-item">
            <span>{p.title}</span>
            <span className="text-xs muted">{p.note}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}