'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      el.style.transform = `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={ref} className="fixed pointer-events-none top-0 left-0 h-80 w-80 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.6), transparent 60%)' }} />
  )
}