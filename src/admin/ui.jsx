import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Info } from 'lucide-react'

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-[1.7rem]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Card({ className = '', children, ...rest }) {
  return (
    <div className={`glass rounded-2xl ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function Button({ variant = 'secondary', className = '', children, ...rest }) {
  const styles = {
    primary: 'btn-primary hover:brightness-110',
    secondary: 'border border-line-strong bg-surface text-ink hover:border-blue/50 hover:bg-blue/10',
    danger: 'border border-danger/40 bg-danger/10 text-danger hover:bg-danger/20',
    ghost: 'text-muted hover:bg-surface hover:text-ink',
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition ${checked ? 'border-blue/60 bg-gradient-to-r from-blue to-violet' : 'border-line-strong bg-bg-2'}`}
    >
      <span className={`absolute top-0.5 size-[1.15rem] rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[1.3rem]' : 'translate-x-0.5'}`} />
    </button>
  )
}

export function Notice({ children, tone = 'info' }) {
  const I = tone === 'warn' ? AlertTriangle : Info
  return (
    <div className={`mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${tone === 'warn' ? 'border-warn/30 bg-warn/10 text-warn' : 'border-blue/30 bg-blue/10 text-ink'}`}>
      <I size={17} className={`mt-0.5 shrink-0 ${tone === 'warn' ? '' : 'text-blue'}`} aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export const inputCls =
  'w-full rounded-xl border border-line-strong bg-bg-2/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/15'

export function Label({ htmlFor, children, hint }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between text-xs font-semibold uppercase tracking-wider text-muted">
      {children}
      {hint && <span className="font-normal normal-case tracking-normal">{hint}</span>}
    </label>
  )
}

/** Confirmation before destructive actions. */
export function ConfirmDialog({ open, title, body, confirmLabel = 'Delete', onConfirm, onCancel }) {
  const cancelRef = useRef(null)
  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onCancel} aria-label="Cancel" />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-body"
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            className="glass relative w-full max-w-md rounded-2xl p-6 !bg-surface-strong"
          >
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-danger/15 text-danger">
                <AlertTriangle size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 id="confirm-title" className="font-display text-base font-semibold text-ink">{title}</h2>
                <p id="confirm-body" className="mt-1.5 text-sm text-muted">{body}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button ref={cancelRef} onClick={onCancel}>Cancel</Button>
              <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
