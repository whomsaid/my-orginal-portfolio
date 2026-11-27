import { Award, BookOpen, GraduationCap, Library, Wrench } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Reveal from '../ui/Reveal.jsx'

const KIND_ICONS = { education: GraduationCap, certification: Award, course: BookOpen, training: Wrench, achievement: Library }

export default function Education({ items }) {
  const { t, p } = useI18n()
  const kinds = Object.keys(KIND_ICONS)

  return (
    <section id="education" className="relative py-20 md:py-28" aria-labelledby="education-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="education-heading">
          <SectionHeading index="06" eyebrow={t('education.eyebrow')} title={t('education.title')} subtitle={t('education.subtitle')} />
        </div>
        {items.length === 0 ? (
          <Reveal>
            <EmptyState icon={GraduationCap} title={t('education.emptyTitle')} body={t('education.emptyBody')}>
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {kinds.map((k) => {
                  const I = KIND_ICONS[k]
                  return (
                    <li key={k} className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
                      <I size={12} aria-hidden="true" /> {t(`education.kinds.${k}`)}
                    </li>
                  )
                })}
              </ul>
            </EmptyState>
          </Reveal>
        ) : (
          <ol className="relative space-y-5 border-l border-line-strong pl-6 md:pl-10">
            {items.map((item, i) => {
              const I = KIND_ICONS[item.kind] || GraduationCap
              return (
                <Reveal as="li" key={item.id} delay={i * 0.06} className="relative">
                  <span className="absolute -left-[2.05rem] top-6 grid size-8 place-items-center rounded-full border border-line-strong bg-bg-2 text-blue md:-left-[3.05rem]">
                    <I size={14} aria-hidden="true" />
                  </span>
                  <div className="glass glow-border rounded-2xl p-5 md:p-6">
                    <p className="font-mono text-[0.68rem] uppercase tracking-wider text-blue">{t(`education.kinds.${item.kind}`)}</p>
                    <h3 className="mt-2 font-display text-base font-semibold text-ink">{p(item.title)}</h3>
                    {item.institution && <p className="text-sm text-muted">{item.institution}</p>}
                    {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{p(item.description)}</p>}
                  </div>
                </Reveal>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
