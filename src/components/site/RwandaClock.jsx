import { Clock } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { useKigaliClock } from '../../hooks/useKigaliClock.js'

export default function RwandaClock({ className = '' }) {
  const { t, lang } = useI18n()
  const { now, time, date, hour, offset } = useKigaliClock(lang)
  const isDay = hour >= 6 && hour < 18
  const [hh, mm, ss] = time.split(':')

  return (
    <div className={`glass glow-border rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          <Clock size={13} className="text-blue" aria-hidden="true" />
          {t('hero.rwandaTime')}
        </p>
        <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.6rem] text-muted">{offset}</span>
      </div>
      <p className="mt-2 font-mono text-[1.65rem] font-semibold tabular-nums leading-none text-ink" aria-live="off">
        <time dateTime={now.toISOString()}>
          {hh}
          <span className="text-blue">:</span>
          {mm}
          <span className="text-violet">:</span>
          <span className="text-muted">{ss}</span>
        </time>
      </p>
      <p className="mt-1.5 flex items-center gap-2 text-xs capitalize text-muted">
        <span className={`size-1.5 rounded-full ${isDay ? 'bg-warn' : 'bg-violet'}`} aria-hidden="true" />
        {date}
      </p>
    </div>
  )
}
