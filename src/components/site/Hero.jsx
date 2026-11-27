import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, MapPin, MessageCircle, Radar } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import RwandaClock from './RwandaClock.jsx'

const ease = [0.22, 1, 0.36, 1]

function HoloPortrait({ monogram, photoUrl, name }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      {/* rings */}
      <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-blue/30" aria-hidden="true" />
      <div className="animate-spin-rev absolute inset-[9%] rounded-full border border-violet/25" aria-hidden="true">
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-violet shadow-[0_0_18px_var(--violet)]" />
      </div>
      <div className="animate-spin-slow absolute inset-[18%] rounded-full border border-blue/20" aria-hidden="true">
        <span className="absolute -bottom-1 left-1/4 size-2 rounded-full bg-blue shadow-[0_0_14px_var(--blue)]" />
      </div>
      {/* core */}
      <div className="absolute inset-[24%] overflow-hidden rounded-full border border-line-strong bg-gradient-to-br from-blue/25 via-bg-2 to-violet/30 shadow-[0_0_80px_-10px_var(--violet)]">
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="size-full object-cover" loading="eager" />
        ) : (
          <div className="grid size-full place-items-center">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <span className="text-gradient relative font-display text-6xl font-bold tracking-tighter sm:text-7xl">{monogram}</span>
          </div>
        )}
      </div>
      {/* code chips */}
      <span className="animate-float glass absolute left-[2%] top-[18%] rounded-xl px-3 py-2 font-mono text-[0.68rem] text-blue" aria-hidden="true">
        {'<build />'}
      </span>
      <span className="animate-float glass absolute bottom-[14%] right-[0%] rounded-xl px-3 py-2 font-mono text-[0.68rem] text-violet [animation-delay:-3s]" aria-hidden="true">
        {'solve(problem)'}
      </span>
      <span className="animate-float glass absolute right-[8%] top-[6%] rounded-xl px-3 py-2 font-mono text-[0.68rem] text-cyan [animation-delay:-1.5s]" aria-hidden="true">
        {'innovate()'}
      </span>
    </div>
  )
}

export default function Hero({ profile, focusProject }) {
  const { t, p } = useI18n()
  const reduce = useReducedMotion()
  const [first, ...rest] = profile.fullName.toUpperCase().split(' ')
  const anim = (delay) => (reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease } })
  const available = profile.availability?.available

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center pb-16 pt-28 md:pt-32" aria-labelledby="hero-title">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.div {...anim(0)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 backdrop-blur">
            <span className={`pulse-dot size-2 rounded-full ${available ? 'bg-ok text-ok' : 'bg-warn text-warn after:hidden'}`} aria-hidden="true" />
            <span className="text-xs font-medium text-ink">{available ? p(profile.availability.label) : t('hero.unavailable')}</span>
          </motion.div>

          <motion.p {...anim(0.08)} className="font-mono text-sm text-muted">
            <span className="text-blue">~/</span> {t('hero.greeting')}
          </motion.p>

          <h1 id="hero-title" className="mt-3 font-display font-bold leading-[0.95] tracking-tight">
            <motion.span {...anim(0.15)} className="block text-[clamp(1.8rem,9vw,2.6rem)] sm:text-[3.4rem] xl:text-[4.4rem] text-ink">
              {first}
            </motion.span>
            <motion.span {...anim(0.25)} className="text-gradient block text-[clamp(1.8rem,9vw,2.6rem)] sm:text-[3.4rem] xl:text-[4.4rem] drop-shadow-[0_0_30px_color-mix(in_oklab,var(--violet)_35%,transparent)]">
              {rest.join(' ')}
            </motion.span>
          </h1>

          <motion.p {...anim(0.35)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[0.95rem] font-medium text-ink sm:text-lg">
            {profile.roles.map((role, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="h-4 w-px bg-gradient-to-b from-blue to-violet" aria-hidden="true" />}
                {p(role)}
              </span>
            ))}
          </motion.p>

          <motion.p {...anim(0.45)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            “{p(profile.tagline)}”
          </motion.p>

          <motion.div {...anim(0.55)} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:brightness-110 active:scale-[0.98]">
              {t('hero.viewProjects')}
              <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur transition hover:border-blue/60 hover:bg-blue/10 active:scale-[0.98]">
              <MessageCircle size={16} aria-hidden="true" />
              {t('hero.contactMe')}
            </a>
            {profile.cvUrl && (
              <a href={profile.cvUrl} download className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-ink underline-offset-4 transition hover:text-blue hover:underline">
                <Download size={16} aria-hidden="true" />
                {t('hero.downloadCv')}
              </a>
            )}
          </motion.div>
        </div>

        <div className="relative">
          <motion.div initial={reduce ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease }}>
            <HoloPortrait monogram={profile.monogram} photoUrl={profile.photoUrl} name={profile.fullName} />
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:absolute lg:-bottom-6 lg:-left-16 lg:mt-0 lg:w-[19rem] lg:grid-cols-1">
            <motion.div initial={reduce ? false : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.7, ease }}>
              <RwandaClock />
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease }}
              className="glass glow-border flex items-center gap-3 rounded-2xl p-4 sm:col-span-1 lg:hidden"
            >
              <LocationInner t={t} profile={profile} />
            </motion.div>
            {focusProject && (
              <motion.a
                href="#projects"
                initial={reduce ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease }}
                className="glass glow-border flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet/25 to-blue/20 text-violet">
                  <Radar size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">{t('hero.status')}</span>
                  <span className="block truncate text-sm font-semibold text-ink">
                    {focusProject.status === 'in_development' ? t('hero.building') : t('hero.shipped')} · {focusProject.name}
                  </span>
                </span>
              </motion.a>
            )}
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="glass glow-border absolute -right-4 top-4 hidden items-center gap-3 rounded-2xl p-4 lg:flex"
          >
            <LocationInner t={t} profile={profile} />
          </motion.div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-ink md:flex" aria-label={t('hero.scroll')}>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
        <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}

function LocationInner({ t, profile }) {
  return (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue/25 to-cyan/15 text-blue">
        <MapPin size={18} aria-hidden="true" />
      </span>
      <span>
        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">{t('hero.location')}</span>
        <span className="block text-sm font-semibold text-ink">
          {profile.location.city}, {profile.location.country}
        </span>
      </span>
    </>
  )
}
