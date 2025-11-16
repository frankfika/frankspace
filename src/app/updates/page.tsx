import Link from 'next/link'
import { updates } from '@/config/profile'

export default function Updates() {
  return (
    <section className="space-y-6">
      <h2 className="section-title">更新</h2>
      <div>
        {updates.map(u => (
          <Link key={u.title} href={u.link} className="list-item">
            <span className="text-sm">{u.title}</span>
            <span className="text-xs muted">{u.date}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}