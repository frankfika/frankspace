import Link from 'next/link'
import { profile } from '@/config/profile'

export default function Follow() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">Follow / 订阅</h2>
      <p className="muted">选择常用平台关注我，获取课程更新与活动通知。</p>
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