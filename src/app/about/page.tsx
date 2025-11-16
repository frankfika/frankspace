import { profile, timeline } from '@/config/profile'

export default function About() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <h2 className="section-title">About</h2>
        <p className="text-foreground leading-relaxed">{profile.bio}</p>
        <div className="flex flex-wrap gap-2">
          {profile.focuses.map(f => (<span key={f} className="pill bg-accent-light text-accent border-accent/20">{f}</span>))}
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Experience</h3>
        <div className="space-y-4">
          {timeline.map(t => (
            <div key={t.year} className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted">{t.year}</span>
                <div className="h-px bg-border flex-1"></div>
              </div>
              <div className="text-sm text-foreground">{t.items.join(' · ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="surface p-6 space-y-3">
        <h3 className="font-medium">Get in touch</h3>
        <p className="text-sm muted leading-relaxed">
          欢迎通过邮件交流产品、技术相关话题。
        </p>
        <a href="mailto:chenfang@example.com" className="text-sm text-accent hover:underline">
          chenfang@example.com
        </a>
      </div>
    </section>
  )
}