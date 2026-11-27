import { ArrowRight } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function Services({ services }) {
  const { t, p } = useI18n()
  return (
    <section id="services" className="relative py-20 md:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div id="services-heading">
              <SectionHeading index="04" eyebrow={t('services.eyebrow')} title={t('services.title')} subtitle={t('services.subtitle')} />
            </div>
            <Reveal delay={0.1} className="-mt-6">
              <a href="#contact" className="btn-primary group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:brightness-110">
                {t('services.cta')}
                <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal as="li" key={s.key} delay={(i % 2) * 0.08} className={`glass glow-border group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 ${i === services.length - 1 && services.length % 2 ? 'sm:col-span-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line-strong bg-gradient-to-br from-blue/15 to-violet/20 text-blue transition duration-500 group-hover:-rotate-6 group-hover:text-violet">
                    <Icon name={s.icon} size={21} />
                  </span>
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-ink">{p(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p(s.description)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
