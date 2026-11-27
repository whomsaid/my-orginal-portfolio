export default function EmptyState({ icon: IconCmp, title, body, children, className = '' }) {
  return (
    <div className={`glass glow-border relative overflow-hidden rounded-3xl px-6 py-12 text-center md:py-16 ${className}`}>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        {IconCmp && (
          <div className="mb-5 grid size-14 place-items-center rounded-2xl border border-line-strong bg-gradient-to-br from-blue/15 to-violet/15 text-blue">
            <IconCmp size={24} aria-hidden="true" />
          </div>
        )}
        <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
        {body && <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>}
        {children}
      </div>
    </div>
  )
}
