import { useI18n } from '../../i18n/I18nProvider.jsx'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

function SkillChip({ skill }) {
  const { t, p } = useI18n()
  return (
    <li className="group/chip flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink transition hover:border-blue/40" title={skill.description ? p(skill.description) : undefined}>
      {skill.iconUrl ? <img src={skill.iconUrl} alt="" className="size-4" loading="lazy" /> : <span className="size-1.5 rounded-full bg-blue" aria-hidden="true" />}
      {skill.name}
      {skill.level && <span className="font-mono text-[0.6rem] uppercase text-muted">{t(`skills.level.${skill.level}`)}</span>}
    </li>
  )
}

export default function Skills({ categories }) {
  const { t, p } = useI18n()
  return (
    <section id="skills" className="relative py-20 md:py-28" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="skills-heading">
          <SectionHeading index="02" eyebrow={t('skills.eyebrow')} title={t('skills.title')} subtitle={t('skills.subtitle')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.key}
              delay={(i % 4) * 0.06}
              className={`glass glow-border group relative overflow-hidden rounded-3xl p-6 ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''} ${i === 6 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl border border-line-strong bg-gradient-to-br from-blue/20 to-violet/20 text-blue transition duration-500 group-hover:text-violet">
                  <Icon name={cat.icon} size={20} />
                </span>
                <span className="font-mono text-[0.65rem] text-muted">{String(cat.skills.length).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-5 font-display text-[0.95rem] font-semibold text-ink">{p(cat.name)}</h3>
              {cat.skills.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <SkillChip key={s.name} skill={s} />
                  ))}
                </ul>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-line-strong px-3 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-1.5 w-10 rounded-full bg-line-strong" />
                    <span className="h-1.5 w-6 rounded-full bg-line-strong" />
                    <span className="h-1.5 w-14 rounded-full bg-line-strong" />
                  </div>
                  <p className="mt-2.5 text-xs text-muted">{t('skills.empty')}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
