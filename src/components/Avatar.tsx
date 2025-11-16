export default function Avatar({ name }: { name: string }) {
  const initial = name?.trim()?.[0] ?? 'C'
  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-full border-2 border-accent bg-gradient-to-br from-accent-light to-surface flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-sm">
        <span className="text-base font-semibold text-accent">{initial}</span>
      </div>
      <span className="text-sm text-muted">{name}</span>
    </div>
  )
}