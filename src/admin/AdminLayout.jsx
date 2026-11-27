import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Menu, Moon, Sun, X } from 'lucide-react'
import { usePortfolio } from '../data/usePortfolio.js'
import { useTheme } from '../lib/ThemeProvider.jsx'
import Monogram from '../components/ui/Monogram.jsx'
import { ADMIN_NAV } from './nav.js'

function Sidebar({ onNavigate, name }) {
  const navigate = useNavigate()
  return (
    <div className="flex h-full flex-col">
      <Link to="/admin/overview" onClick={onNavigate} className="flex items-center gap-3 px-3 pb-6 pt-1">
        <Monogram size={38} />
        <span>
          <span className="block font-display text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink">{name}</span>
          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-blue">Control Center</span>
        </span>
      </Link>
      <nav aria-label="Dashboard" className="no-scrollbar -mx-1 flex-1 overflow-y-auto px-1">
        <ul className="space-y-0.5">
          {ADMIN_NAV.map(({ slug, label, icon: I }) =>
            slug === 'logout' ? (
              <li key={slug} className="mt-3 border-t border-line pt-3">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.()
                    navigate('/admin/login')
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-danger/10 hover:text-danger"
                >
                  <I size={17} aria-hidden="true" />
                  {label}
                </button>
              </li>
            ) : (
              <li key={slug}>
                <NavLink
                  to={`/admin/${slug}`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-gradient-to-r from-blue/15 to-violet/10 text-ink' : 'text-muted hover:bg-surface hover:text-ink'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-blue to-violet shadow-[0_0_10px_var(--blue)]" aria-hidden="true" />}
                      <I size={17} className={isActive ? 'text-blue' : ''} aria-hidden="true" />
                      <span className="truncate">{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  )
}

export default function AdminLayout() {
  const { data } = usePortfolio()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Working copy for this preview: dashboard edits update the screens immediately.
  // Milestone 3 replaces this with the authenticated admin API.
  const [projects, setProjects] = useState(() => data.projects.map((p, i) => ({ ...p, order: i })))
  const store = useMemo(() => ({ data, projects, setProjects }), [data, projects])

  useEffect(() => {
    document.title = 'Dashboard — Hakizimana Xavine'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    return () => robots.remove()
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <div className="min-h-svh bg-bg text-ink">
      <div className="pointer-events-none fixed inset-0 -z-0" aria-hidden="true">
        <div className="absolute -left-40 -top-40 size-[30rem] rounded-full bg-blue/10 blur-[130px]" />
        <div className="absolute -right-40 top-1/3 size-[28rem] rounded-full bg-violet/10 blur-[130px]" />
      </div>

      <aside className="glass fixed inset-y-3 left-3 z-30 hidden w-64 rounded-3xl p-4 lg:block">
        <Sidebar name={data.profile.fullName} />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close menu" />
            <motion.aside
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              className="glass absolute inset-y-3 left-3 w-72 rounded-3xl p-4 !bg-surface-strong"
            >
              <button type="button" onClick={() => setOpen(false)} className="absolute right-3 top-3 grid size-9 place-items-center rounded-xl border border-line" aria-label="Close menu">
                <X size={16} aria-hidden="true" />
              </button>
              <Sidebar name={data.profile.fullName} onNavigate={() => setOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative lg:pl-[17.5rem]">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-bg/75 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-xl border border-line lg:hidden" aria-label="Open menu">
              <Menu size={18} aria-hidden="true" />
            </button>
            <span className="hidden items-center gap-2 rounded-full border border-warn/30 bg-warn/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-warn sm:inline-flex">
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" /> Preview workspace
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggle} className="grid size-10 place-items-center rounded-xl border border-line transition hover:bg-surface" aria-label="Switch theme">
              {theme === 'dark' ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
            </button>
            <Link to="/" target="_blank" className="inline-flex h-10 items-center gap-2 rounded-xl border border-line px-3 text-sm font-medium transition hover:bg-surface">
              <ExternalLink size={15} aria-hidden="true" />
              <span className="hidden sm:inline">View site</span>
            </Link>
          </div>
        </header>

        <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Outlet context={store} />
        </main>
      </div>
    </div>
  )
}
