export default function Avatar({ name }: { name: string }) {
  const initial = name?.trim()?.[0] ?? 'C'
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <span className="text-sm">{initial}</span>
      </div>
      <span className="text-sm text-zinc-600">{name}</span>
    </div>
  )
}