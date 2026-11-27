/** Convert a local Rwandan number (07xxxxxxxx) to international digits (2507xxxxxxxx). */
export function toInternational(local) {
  const digits = String(local).replace(/\D/g, '')
  if (digits.startsWith('250')) return digits
  return '250' + digits.replace(/^0/, '')
}

/** Human-readable form: +250 792 428 612 */
export function formatInternational(local) {
  const d = toInternational(local)
  return `+${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}`
}

/** wa.me link that opens a chat, optionally with a prefilled message. */
export function whatsappLink(local, text) {
  const base = `https://wa.me/${toInternational(local)}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
