import Link from 'next/link'
import { courses } from '@/config/profile'

export default function Web3() {
  const c = courses.find(x => x.slug === 'web3')!
  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h2 className="font-mono text-2xl">{c.title}</h2>
        <p className="muted">{c.summary}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="surface">
          <h3 className="font-mono">一对一</h3>
          <p className="mt-2 muted text-sm">链上应用与投资实战</p>
        </div>
        <div className="surface">
          <h3 className="font-mono">班课</h3>
          <p className="mt-2 muted text-sm">模块化体系 + 作业反馈</p>
        </div>
        <div className="surface">
          <h3 className="font-mono">企业内训</h3>
          <p className="mt-2 muted text-sm">合规与风控专题</p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-mono text-xl">纲要</h3>
        <ol className="list-decimal pl-5 muted space-y-1">
          {c.lessons.map(l => <li key={l}>{l}</li>)}
        </ol>
      </div>
      <div>
        <Link href={c.buyUrl} className="btn">购课 / 咨询</Link>
      </div>
    </section>
  )
}