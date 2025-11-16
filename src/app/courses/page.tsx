import Link from 'next/link'
import { courses } from '@/config/profile'

export default function Courses() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">课程</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map(c => (
          <Link key={c.slug} href={`/courses/${c.slug}`} className="surface">
            <h3 className="font-mono text-lg">{c.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{c.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}