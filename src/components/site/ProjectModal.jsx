import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowUpRight, Check, X } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { GithubIcon } from '../ui/BrandIcons.jsx'
import StatusBadge, { resolveStatus } from '../ui/StatusBadge.jsx'
import ScreenshotFrame from './ScreenshotFrame.jsx'
import { cdn } from '../../lib/image.js'

function formatWhen(iso, lang) {
  if (!iso) return null
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: 'Africa/Kigali', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
}

export default function ProjectModal({ project, onClose }) {
  const { t, p, lang } = useI18n()
  const [active, setActive] = useState(0)
  const closeRef = useRef(null)
  const status = resolveStatus(project)
  const shots = project.screenshots
  const features = project.features?.map((f) => p(f)).filter(Boolean) || []

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && shots.length > 1) setActive((a) => (a + 1) % shots.length)
      if (e.key === 'ArrowLeft' && shots.length > 1) setActive((a) => (a - 1 + shots.length) % shots.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [onClose, shots.length])

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} aria-label={t('projects.close')} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="glass relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-3xl !bg-surface-strong sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-surface-strong/90 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <h2 id="project-modal-title" className="truncate font-display text-lg font-semibold text-ink sm:text-xl">{project.name}</h2>
            <StatusBadge status={status} />
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-ink transition hover:bg-surface" aria-label={t('projects.close')}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <ScreenshotFrame shot={shots[active]} url={project.url} title={t('projects.noScreenshot')} hint={t('projects.noScreenshotHint')} width={1600} eager />
            {shots.length > 1 && (
              <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto" role="tablist" aria-label={t('projects.gallery')}>
                {shots.map((s, i) => (
                  <button
                    key={s.url}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${i === active ? 'border-blue' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={cdn(s.url, 200)} alt={s.alt || `${project.name} screenshot ${i + 1}`} loading="lazy" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-7">
            <div>
              <p className="eyebrow">{p(project.category)}</p>
              <h3 className="mt-3 font-display text-sm font-semibold uppercase tracking-wider text-ink">{t('projects.overview')}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p(project.description)}</p>
            </div>

            {features.length > 0 && (
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">{t('projects.features')}</h3>
                <ul className="mt-3 space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">{t('projects.technologies')}</h3>
              {project.technologies.length ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="rounded-lg border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink">{tech}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted">{t('projects.techPending')}</p>
              )}
            </div>

            {project.health?.checkedAt && (
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-xs text-muted">
                <Activity size={16} className="mt-0.5 text-blue" aria-hidden="true" />
                <div>
                  <p>{t('projects.lastChecked')}: <span className="text-ink">{formatWhen(project.health.checkedAt, lang)}</span></p>
                  {project.health.lastUpAt && <p className="mt-1">{t('projects.lastUp')}: <span className="text-ink">{formatWhen(project.health.lastUpAt, lang)}</span></p>}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">{t('projects.links')}</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:brightness-110">
                    {t('projects.viewProject')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition hover:bg-surface">
                    <GithubIcon width={16} height={16} />
                    {t('projects.source')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
