import { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, FolderKanban, Maximize2, Star } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import StatusBadge, { resolveStatus } from '../ui/StatusBadge.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import ScreenshotFrame from './ScreenshotFrame.jsx'
import ProjectModal from './ProjectModal.jsx'

function ProjectCard({ project, index, onOpen }) {
  const { t, p } = useI18n()
  const status = resolveStatus(project)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass glow-border group flex flex-col overflow-hidden rounded-3xl p-3 sm:p-4"
    >
      <button type="button" onClick={onOpen} className="relative block text-left" aria-label={`${t('projects.viewDetails')}: ${project.name}`}>
        <ScreenshotFrame shot={project.screenshots[0]} url={project.url} title={t('projects.noScreenshot')} hint={t('projects.noScreenshotHint')} />
        <span className="absolute right-3 top-12 grid size-9 place-items-center rounded-xl border border-line-strong bg-surface-strong text-ink opacity-0 transition group-hover:opacity-100" aria-hidden="true">
          <Maximize2 size={15} />
        </span>
      </button>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5 sm:px-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={status} />
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-violet/30 bg-violet/10 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-violet">
              <Star size={11} aria-hidden="true" /> {t('projects.featured')}
            </span>
          )}
          <span className="ml-auto font-mono text-[0.68rem] text-muted">{p(project.category)}</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">{project.name}</h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{p(project.description)}</p>
        {project.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t('projects.technologies')}>
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.7rem] text-ink">{tech}</li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:brightness-110">
              {t('projects.viewProject')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          <button type="button" onClick={onOpen} className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-blue/50 hover:bg-blue/10">
            {t('projects.viewDetails')}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects({ projects }) {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)

  const statuses = useMemo(() => ['all', ...new Set(projects.map(resolveStatus))], [projects])
  const visible = useMemo(() => {
    const list = filter === 'all' ? projects : projects.filter((pr) => resolveStatus(pr) === filter)
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [projects, filter])
  const open = projects.find((pr) => pr.id === openId)
  const close = useCallback(() => setOpenId(null), [])

  return (
    <section id="projects" className="relative py-20 md:py-28" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="projects-heading">
            <SectionHeading index="03" eyebrow={t('projects.eyebrow')} title={t('projects.title')} subtitle={t('projects.subtitle')} />
          </div>
          {statuses.length > 2 && (
            <div className="no-scrollbar -mt-6 mb-12 flex gap-2 overflow-x-auto md:mb-16 md:mt-0" role="group" aria-label="Filter projects">
              {statuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter(s)}
                  aria-pressed={filter === s}
                  className={`shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition ${filter === s ? 'border-blue/50 bg-blue/15 text-ink' : 'border-line text-muted hover:text-ink'}`}
                >
                  {s === 'all' ? t('projects.all') : t(`projects.status.${s}`)}
                </button>
              ))}
            </div>
          )}
        </div>

        {projects.length === 0 ? (
          <EmptyState icon={FolderKanban} title={t('projects.empty')} />
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onOpen={() => setOpenId(project.id)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {createPortal(<AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={close} />}</AnimatePresence>, document.body)}
    </section>
  )
}
