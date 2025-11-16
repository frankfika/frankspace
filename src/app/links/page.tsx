import Link from 'next/link'
import { profile } from '@/config/profile'

export default function Links() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">平台</h2>
      <div className="flex flex-wrap gap-2">
        {profile.socials.map(s => (
          <Link key={s.key} href={s.url} className="pill" target="_blank" rel="noopener noreferrer">
            {s.key}
          </Link>
        ))}
      </div>
    </section>
  )
}