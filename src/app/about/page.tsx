import { profile, timeline } from '@/config/profile'

export default function About() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <h2 className="section-title">关于我</h2>
        <p className="muted">{profile.bio}</p>
        <div className="flex flex-wrap gap-2">
          {profile.focuses.map(f => (<span key={f} className="pill">{f}</span>))}
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">经历</h3>
        <div>
          {timeline.map(t => (
            <div key={t.year} className="list-item">
              <span>{t.year}</span>
              <span className="text-xs muted">{t.items.join(' / ')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}