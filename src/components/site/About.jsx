import { Globe2, MapPin, Target, User } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function About({ about, profile }) {
  const { t, p } = useI18n()
  const facts = [
    { icon: User, label: t('about.name'), value: profile.fullName },
    { icon: Target, label: t('about.role'), value: p(profile.title) },
    { icon: MapPin, label: t('about.location'), value: `${profile.location.city}, ${profile.location.country}` },
    { icon: Globe2, label: t('about.timezone'), value: 'Africa/Kigali · CAT' },
  ]

  return (
    <section id="about" className="relative py-20 md:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="about-heading">
          <SectionHeading index="01" eyebrow={t('about.eyebrow')} title={t('about.title')} />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="glass glow-border rounded-3xl p-7 md:p-10">
            <div className="space-y-5 text-base leading-relaxed text-ink/90 md:text-[1.05rem]">
              {about.paragraphs.map((para, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-ink md:text-xl' : 'text-muted'}>
                  {p(para)}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-line bg-gradient-to-br from-blue/10 to-violet/10 p-5">
              <p className="eyebrow !text-violet">{t('about.goals')}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{p(about.goals)}</p>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.1} className="glass glow-border rounded-3xl p-6 md:p-7">
              <dl className="grid grid-cols-2 gap-5">
                {facts.map(({ icon: I, label, value }) => (
                  <div key={label}>
                    <dt className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                      <I size={13} className="text-blue" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.2} className="glass glow-border rounded-3xl p-6 md:p-7">
              <p className="eyebrow">{t('about.interests')}</p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {about.interests.map((it) => (
                  <li key={it.icon} className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 transition hover:border-blue/40">
                    <span className="grid size-9 place-items-center rounded-xl bg-blue/10 text-blue transition group-hover:bg-violet/15 group-hover:text-violet">
                      <Icon name={it.icon} size={17} />
                    </span>
                    <span className="text-sm font-medium text-ink">{p(it.label)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
