'use client'
import { useRef } from 'react'

export default function InteractiveCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y / rect.height) - 0.5) * -6
    const ry = ((x / rect.width) - 0.5) * 6
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`card transition-transform duration-200 ${className}`}>{children}</div>
  )
}