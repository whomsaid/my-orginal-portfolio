import { useEffect, useState } from 'react'

const TZ = 'Africa/Kigali'

/** Intl doesn't ship Kinyarwanda everywhere; fall back gracefully. */
function resolveLocale(lang) {
  const wanted = { en: 'en-GB', fr: 'fr-FR', rw: 'rw-RW' }[lang] || 'en-GB'
  try {
    return Intl.DateTimeFormat.supportedLocalesOf([wanted]).length ? wanted : 'en-GB'
  } catch {
    return 'en-GB'
  }
}

/**
 * Live Rwanda time. Always formatted in Africa/Kigali regardless of the
 * visitor's own timezone, ticking once per second, aligned to the second.
 */
export function useKigaliClock(lang = 'en') {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let interval
    const align = setTimeout(() => {
      setNow(new Date())
      interval = setInterval(() => setNow(new Date()), 1000)
    }, 1000 - (Date.now() % 1000))
    return () => {
      clearTimeout(align)
      clearInterval(interval)
    }
  }, [])

  const locale = resolveLocale(lang)
  const time = new Intl.DateTimeFormat(locale, { timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(now)
  const date = new Intl.DateTimeFormat(locale, { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now)
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', hourCycle: 'h23' }).format(now))

  return { now, time, date, hour, timezone: TZ, offset: 'UTC+02:00' }
}
