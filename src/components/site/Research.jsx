import { Calendar, FlaskConical } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Reveal from '../ui/Reveal.jsx'
import { cdn } from '../../lib/image.js'

export default function Research({ entries }) {
  const { t, p, lang } = useI18n()
  const topics = t('research.topics')

  return (
    <section id="research" className="relative py-20 md:py-28" aria-labelledby="research-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="research-heading">
          <SectionHeading index="05" eyebrow={t('research.eyebrow')} title={t('research.title')} subtitle={t('research.subtitle')} />
        </div>
        {entries.length === 0 ? (
          <Reveal>
            <EmptyState icon={FlaskConical} title={t('research.emptyTitle')} body={t('research.emptyBody')}>
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {Array.isArray(topics) &&
                  topics.map((topic) => (
                    <li key={topic} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">{topic}</li>
                  ))}
              </ul>
            </EmptyState>
          </Reveal>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry, i) => (
              <Reveal as="article" key={entry.id} delay={(i % 3) * 0.08} className="glass glow-border group overflow-hidden rounded-3xl">
                <div className="aspect-[16/9] overflow-hidden bg-bg-2">
                  {entry.coverUrl && <img src={cdn(entry.coverUrl, 700)} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between font-mono text-[0.68rem] text-muted">
                    <span className="text-blue">{p(entry.category)}</span>
                    {entry.publishedAt && (
                      <time dateTime={entry.publishedAt} className="flex items-center gap-1.5">
                        <Calendar size={12} aria-hidden="true" />
                        {new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'medium' }).format(new Date(entry.publishedAt))}
                      </time>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">{p(entry.title)}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p(entry.description)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
