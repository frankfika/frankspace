import { profile } from '@/config/profile'

export default function About() {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-2xl">关于</h2>
      <div className="space-y-3">
        <p className="text-zinc-300">{profile.bio}</p>
        <ul className="list-disc pl-5 text-zinc-400">
          <li>OpenCSG 产品与战略负责人、董事长助理</li>
          <li>斯德哥尔摩经济学院硕士</li>
          <li>深耕 AI，曾担任董事会秘书、投资总监、全栈工程师</li>
        </ul>
      </div>
    </section>
  )
}