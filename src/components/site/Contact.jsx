import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { formatInternational, whatsappLink } from '../../lib/whatsapp.js'
import { WhatsAppIcon } from '../ui/BrandIcons.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import SocialLinks from './SocialLinks.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const LIMITS = { name: 120, email: 160, subject: 160, message: 4000 }

/** Same rules the backend applies (milestone 4) — keep them in sync. */
export function validateContact(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'name'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'email'
  if (v.subject.trim().length < 3) e.subject = 'subject'
  if (v.message.trim().length < 10) e.message = 'message'
  return e
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-danger" role="alert">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (err) =>
  `w-full rounded-xl border bg-bg-2/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/15 ${err ? 'border-danger/70' : 'border-line-strong'}`

export default function Contact({ contact, profile, socials }) {
  const { t } = useI18n()
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [line, setLine] = useState(0)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value.slice(0, LIMITS[k]) }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
    setSent(false)
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus()
      return
    }
    const text = `${values.subject.trim()}\n\n${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
    window.open(whatsappLink(contact.whatsapp[line], text), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const err = (k) => (errors[k] ? t(`contact.errors.${k}`) : null)

  return (
    <section id="contact" className="relative py-20 md:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="contact-heading">
          <SectionHeading index="07" eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.subtitle')} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid content-start gap-4">
            <Reveal className="glass glow-border flex items-center gap-4 rounded-3xl p-5">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue/25 to-cyan/15 text-blue">
                <MapPin size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">{t('contact.location')}</p>
                <p className="mt-0.5 font-semibold text-ink">{profile.location.city}, {profile.location.country}</p>
              </div>
            </Reveal>

            {contact.whatsapp.map((num, i) => (
              <Reveal key={num} delay={0.06 * (i + 1)}>
                <a
                  href={whatsappLink(num)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glow-border group flex items-center gap-4 rounded-3xl p-5 transition hover:-translate-y-0.5"
                  aria-label={`${t('contact.chat')} — ${formatInternational(num)}`}
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#25d366]/15 text-[#25d366]">
                    <WhatsAppIcon width={22} height={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">{t('contact.whatsapp')} · {t('contact.line')} {i + 1}</p>
                    <p className="mt-0.5 font-mono font-semibold tabular-nums text-ink">{formatInternational(num)}</p>
                  </div>
                  <span className="hidden rounded-xl border border-line px-3 py-2 text-xs font-semibold text-ink transition group-hover:border-[#25d366]/50 group-hover:text-[#25d366] sm:block">
                    {t('contact.chat')}
                  </span>
                </a>
              </Reveal>
            ))}

            {contact.email && (
              <Reveal delay={0.2}>
                <a href={`mailto:${contact.email}`} className="glass glow-border flex items-center gap-4 rounded-3xl p-5">
                  <span className="grid size-12 place-items-center rounded-2xl bg-violet/15 text-violet">
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <p className="font-semibold text-ink">{contact.email}</p>
                </a>
              </Reveal>
            )}

            {socials.length > 0 && (
              <Reveal delay={0.25} className="glass rounded-3xl p-5">
                <SocialLinks socials={socials} />
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={submit} noValidate className="glass glow-border rounded-3xl p-6 md:p-8" aria-describedby="cf-note">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="cf-name" label={t('contact.form.name')} error={err('name')}>
                  <input id="cf-name" name="name" autoComplete="name" value={values.name} onChange={set('name')} placeholder={t('contact.form.namePh')} className={inputCls(errors.name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-error' : undefined} required />
                </Field>
                <Field id="cf-email" label={t('contact.form.email')} error={err('email')}>
                  <input id="cf-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder={t('contact.form.emailPh')} className={inputCls(errors.email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-error' : undefined} required />
                </Field>
              </div>
              <div className="mt-5">
                <Field id="cf-subject" label={t('contact.form.subject')} error={err('subject')}>
                  <input id="cf-subject" name="subject" value={values.subject} onChange={set('subject')} placeholder={t('contact.form.subjectPh')} className={inputCls(errors.subject)} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'cf-subject-error' : undefined} required />
                </Field>
              </div>
              <div className="mt-5">
                <Field id="cf-message" label={t('contact.form.message')} error={err('message')}>
                  <textarea id="cf-message" name="message" rows={5} value={values.message} onChange={set('message')} placeholder={t('contact.form.messagePh')} className={`${inputCls(errors.message)} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-error' : undefined} required />
                </Field>
                <p className="mt-1 text-right font-mono text-[0.65rem] text-muted">{values.message.length}/{LIMITS.message}</p>
              </div>

              <fieldset className="mt-4">
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{t('contact.form.sendVia')}</legend>
                <div className="flex flex-wrap gap-2">
                  {contact.whatsapp.map((num, i) => (
                    <label key={num} className={`cursor-pointer rounded-xl border px-3 py-2 font-mono text-xs transition ${line === i ? 'border-blue/60 bg-blue/10 text-ink' : 'border-line text-muted hover:text-ink'}`}>
                      <input type="radio" name="line" className="sr-only" checked={line === i} onChange={() => setLine(i)} />
                      {formatInternational(num)}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p id="cf-note" className="flex items-center gap-2 text-xs text-muted">
                  <WhatsAppIcon width={14} height={14} className="text-[#25d366]" />
                  {t('contact.form.note')}
                </p>
                <button type="submit" className="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:brightness-110 active:scale-[0.98]">
                  {t('contact.form.submit')}
                  <Send size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 flex items-center gap-2 rounded-xl border border-ok/30 bg-ok/10 px-4 py-3 text-sm text-ok" role="status">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {t('contact.form.success')}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
