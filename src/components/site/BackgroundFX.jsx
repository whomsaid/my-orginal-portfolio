/** Fixed, non-interactive atmosphere layer: gradient orbs + grid + grain. */
export default function BackgroundFX() {
  return (
    <div className="noise pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--bg-2),var(--bg)_65%)]" />
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -left-40 top-[-10%] size-[38rem] rounded-full bg-blue/20 blur-[140px] dark:bg-blue/25" />
      <div className="absolute -right-40 top-[20%] size-[34rem] rounded-full bg-violet/20 blur-[150px] dark:bg-violet/25" />
      <div className="absolute bottom-[-20%] left-1/3 size-[30rem] rounded-full bg-cyan/10 blur-[160px]" />
    </div>
  )
}
