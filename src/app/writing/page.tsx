import Link from 'next/link'
import { writing } from '@/config/profile'

export default function Writing() {
  return (
    <section className="space-y-6">
      <h2 className="section-title">Writing</h2>
      <div>
        {writing.map(w => (
          <Link key={w.title} href={w.url} className="list-item" target="_blank" rel="noopener noreferrer">
            <span className="text-sm">{w.title}</span>
            <span className="text-xs muted">{w.date}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}