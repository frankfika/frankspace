import Link from 'next/link'

export default function Consult() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">Consult</h2>
      <p className="text-zinc-300">商务合作、顾问与购课咨询，请通过以下方式联系：</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="mailto:hello@example.com" className="card">邮箱</Link>
        <Link href="/follow" className="card">私域 / 订阅</Link>
      </div>
    </section>
  )
}