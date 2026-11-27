import { motion } from 'framer-motion'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import Icon from '../ui/Icon.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

const ACCENTS = [
  'from-blue/30 to-cyan/10 text-blue',
  'from-violet/30 to-blue/10 text-violet',
  'from-cyan/25 to-violet/15 text-cyan',
]

export default function Identity({ identities }) {
  const { t, p } = useI18n()
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="identity-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="identity-title">
          <SectionHeading eyebrow={t('identity.eyebrow')} title={t('identity.title')} subtitle={t('identity.subtitle')} align="center" />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {identities.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.1} className={i === 1 ? 'md:translate-y-8' : ''}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="glass glow-border group relative h-full overflow-hidden rounded-3xl p-7 md:p-8"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br from-blue/20 to-violet/20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" aria-hidden="true" />
                <div className="flex items-start justify-between">
                  <div className={`grid size-14 place-items-center rounded-2xl border border-line-strong bg-gradient-to-br ${ACCENTS[i % 3]} transition duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon name={item.icon} size={26} />
                  </div>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold uppercase tracking-wide text-ink">{p(item.title)}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p(item.description)}</p>
                <div className="mt-7 h-px w-full bg-gradient-to-r from-blue/50 via-violet/40 to-transparent opacity-40 transition duration-500 group-hover:opacity-100" aria-hidden="true" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
