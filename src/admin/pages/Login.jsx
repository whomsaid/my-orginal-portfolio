import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck } from 'lucide-react'
import BackgroundFX from '../../components/site/BackgroundFX.jsx'
import Monogram from '../../components/ui/Monogram.jsx'
import { inputCls, Label } from '../ui.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(false)

  useEffect(() => {
    document.title = 'Sign in — Dashboard'
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError('Enter the administrator email address.')
    if (password.length < 8) return setError('Passwords are at least 8 characters.')
    setError('')
    setNotice(true)
  }

  return (
    <main className="relative grid min-h-svh place-items-center px-4 py-10">
      <BackgroundFX />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass glow-border relative z-[2] w-full max-w-md rounded-3xl p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <Monogram size={44} />
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-ink">Control Center</p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">Hakizimana Xavine</p>
          </div>
        </div>

        <h1 className="mt-8 font-display text-2xl font-semibold text-ink">Administrator sign in</h1>
        <p className="mt-1.5 text-sm text-muted">Private access to manage portfolio content.</p>

        <form onSubmit={submit} noValidate className="mt-7 space-y-5">
          <div>
            <Label htmlFor="login-email">Email</Label>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input id="login-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} pl-10`} />
            </div>
          </div>
          <div>
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input id="login-password" type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputCls} px-10`} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-ink" aria-label={show ? 'Hide password' : 'Show password'}>
                {show ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-danger" role="alert">{error}</p>}
          <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition hover:brightness-110">
            <KeyRound size={16} aria-hidden="true" /> Sign in
          </button>
        </form>

        {notice && (
          <div className="mt-5 rounded-2xl border border-blue/30 bg-blue/10 p-4 text-sm text-ink" role="status">
            Secure sign-in (hashed passwords, sessions, rate limiting) connects with the backend milestone. Until then you can explore the dashboard preview.
            <Link to="/admin/overview" className="mt-3 flex items-center gap-1.5 font-semibold text-blue">
              Open dashboard preview <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        )}

        <p className="mt-7 flex items-center gap-2 border-t border-line pt-5 text-xs text-muted">
          <ShieldCheck size={14} className="text-ok" aria-hidden="true" />
          There is no public registration. The administrator account is created through a private setup step.
        </p>
      </motion.div>
    </main>
  )
}
