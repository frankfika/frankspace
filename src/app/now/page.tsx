import { now } from '@/config/profile'

export default function Now() {
  return (
    <section className="space-y-6">
      <h2 className="section-title">Now</h2>
      <ul className="list-disc pl-5 text-sm">
        {now.map(n => (<li key={n} className="muted">{n}</li>))}
      </ul>
    </section>
  )
}