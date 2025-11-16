import Link from 'next/link'
import { projects } from '@/config/profile'

export default function Lab() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">Lab</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map(p => (
          <Link key={p.title} href={p.link} className="card">
            <div className="flex items-center justify-between">
              <span className="font-mono">{p.title}</span>
              <span className="text-xs text-zinc-500">{p.note}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}