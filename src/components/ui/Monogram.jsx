export default function Monogram({ text = 'HX', size = 40 }) {
  return (
    <span
      className="relative grid shrink-0 place-items-center rounded-xl border border-line-strong bg-bg-2 font-display text-[0.8rem] font-bold tracking-tight"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue/25 via-transparent to-violet/30" />
      <span className="text-gradient relative">{text}</span>
    </span>
  )
}
