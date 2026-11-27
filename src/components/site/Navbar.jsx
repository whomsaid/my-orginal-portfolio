import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Globe, Menu, Moon, Sun, X } from 'lucide-react'
import { useI18n, dictionaries, languages } from '../../i18n/I18nProvider.jsx'
import { useTheme } from '../../lib/ThemeProvider.jsx'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import Monogram from '../ui/Monogram.jsx'

export const SECTIONS = ['home', 'about', 'skills', 'projects', 'services', 'research', 'education', 'contact']

function LanguageMenu() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        className="flex h-10 items-center gap-1.5 rounded-xl border border-line px-3 font-mono text-xs font-medium text-ink transition hover:border-line-strong hover:bg-surface"
      >
        <Globe size={15} aria-hidden="true" />
        {dictionaries[lang].meta.short}
        <ChevronDown size={13} className={`transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t('nav.language')}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="glass absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl p-1.5 !bg-surface-strong"
          >
            {languages.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang === code}
                  onClick={() => {
                    setLang(code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-blue/10 ${lang === code ? 'text-ink' : 'text-muted'}`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-[0.65rem] text-blue">{dictionaries[code].meta.short}</span>
                    {dictionaries[code].meta.label}
                  </span>
                  {lang === code && <Check size={14} className="text-blue" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function ThemeSwitch() {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('nav.theme')}
      aria-pressed={!dark}
      className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-line text-ink transition hover:border-line-strong hover:bg-surface"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.2 }}
        >
          {dark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Navbar({ name, monogram }) {
  const { t } = useI18n()
  const active = useActiveSection(SECTIONS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue focus:px-4 focus:py-2 focus:text-white">
        {t('nav.skip')}
      </a>
      <div className={`transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-300 sm:px-5 ${scrolled ? 'glass mx-3 h-16 xl:mx-auto' : 'h-16 border border-transparent'}`}
        >
          <a href="#home" className="flex items-center gap-3" aria-label={`${name} — ${t('nav.home')}`}>
            <Monogram text={monogram} />
            <span className="hidden font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink sm:block lg:hidden xl:block">
              {name}
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative rounded-lg px-2.5 py-2 text-[0.84rem] font-medium transition xl:px-3 ${active === id ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {t(`nav.${id}`)}
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue to-violet shadow-[0_0_12px_var(--blue)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageMenu />
            <ThemeSwitch />
            <button
              type="button"
              className="grid size-10 place-items-center rounded-xl border border-line text-ink lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={t('nav.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label={t('nav.closeMenu')} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="glass absolute right-3 top-3 bottom-3 flex w-[min(20rem,calc(100%-1.5rem))] flex-col rounded-3xl p-5 !bg-surface-strong"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <Monogram text={monogram} size={36} />
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.12em]">{name}</span>
                </span>
                <button type="button" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-xl border border-line" aria-label={t('nav.closeMenu')}>
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {SECTIONS.map((id, i) => (
                  <motion.li key={id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium transition ${active === id ? 'bg-gradient-to-r from-blue/15 to-violet/15 text-ink' : 'text-muted hover:bg-surface hover:text-ink'}`}
                    >
                      {t(`nav.${id}`)}
                      <span className="font-mono text-[0.65rem] text-muted">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
