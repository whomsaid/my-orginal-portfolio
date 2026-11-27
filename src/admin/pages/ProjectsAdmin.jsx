import { useCallback, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUp, ExternalLink, ImagePlus, Pencil, Plus, Star, Trash2, X } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { Button, Card, ConfirmDialog, inputCls, Label, Notice, PageHeader, Toggle } from '../ui.jsx'
import { cdn } from '../../lib/image.js'

const STATUSES = [
  { value: 'live', label: 'Live' },
  { value: 'in_development', label: 'In Development' },
  { value: 'completed', label: 'Completed' },
  { value: 'unavailable', label: 'Unavailable' },
]
const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'rw', label: 'Kinyarwanda' },
  { code: 'fr', label: 'Français' },
]

const blank = () => ({
  id: `new-${Date.now()}`,
  name: '',
  category: { en: '', rw: '', fr: '' },
  description: { en: '', rw: '', fr: '' },
  features: [],
  technologies: [],
  url: '',
  githubUrl: '',
  status: 'in_development',
  featured: false,
  screenshots: [],
  health: null,
  createdAt: null,
  updatedAt: null,
})

const isUrl = (v) => {
  if (!v) return true
  try {
    const u = new URL(v)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

function validate(p) {
  const e = {}
  if (p.name.trim().length < 2) e.name = 'Project name is required.'
  if (p.description.en.trim().length < 10) e.description = 'Add an English description of at least 10 characters.'
  if (!isUrl(p.url)) e.url = 'Enter a full URL starting with https://'
  if (!isUrl(p.githubUrl)) e.githubUrl = 'Enter a full URL starting with https://'
  return e
}

function TechInput({ value, onChange }) {
  const [draft, setDraft] = useState('')
  const add = () => {
    const v = draft.trim()
    if (v && !value.includes(v)) onChange([...value, v])
    setDraft('')
  }
  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-1.5 !py-2`}>
      {value.map((tech) => (
        <span key={tech} className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2 py-1 font-mono text-xs">
          {tech}
          <button type="button" onClick={() => onChange(value.filter((t) => t !== tech))} aria-label={`Remove ${tech}`} className="text-muted hover:text-danger">
            <X size={12} aria-hidden="true" />
          </button>
        </span>
      ))}
      <input
        id="pe-tech"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            add()
          } else if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1))
        }}
        onBlur={add}
        placeholder={value.length ? '' : 'Type a technology and press Enter'}
        className="min-w-[8rem] flex-1 bg-transparent py-1 text-sm outline-none"
      />
    </div>
  )
}

function Editor({ initial, onSave, onClose }) {
  const [p, setP] = useState(() => ({ ...initial, url: initial.url || '', githubUrl: initial.githubUrl || '' }))
  const [lang, setLang] = useState('en')
  const [errors, setErrors] = useState({})
  const set = (k, v) => setP((x) => ({ ...x, [k]: v }))
  const setLocal = (k, v) => setP((x) => ({ ...x, [k]: { ...x[k], [lang]: v } }))

  const save = (e) => {
    e.preventDefault()
    const found = validate(p)
    setErrors(found)
    if (Object.keys(found).length) return
    onSave({ ...p, name: p.name.trim(), url: p.url.trim() || null, githubUrl: p.githubUrl.trim() || null, updatedAt: new Date().toISOString(), createdAt: p.createdAt || new Date().toISOString() })
  }

  return (
    <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={onClose} aria-label="Close editor" />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 36 }}
        className="glass absolute inset-y-0 right-0 flex w-full max-w-xl flex-col !bg-surface-strong sm:inset-y-3 sm:right-3 sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 id="editor-title" className="font-display text-lg font-semibold">{initial.name ? `Edit ${initial.name}` : 'New project'}</h2>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-xl border border-line" aria-label="Close editor">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={save} noValidate className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div>
            <Label htmlFor="pe-name">Project name</Label>
            <input id="pe-name" value={p.name} onChange={(e) => set('name', e.target.value)} className={inputCls} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
          </div>

          <div>
            <div className="mb-2 flex gap-1 rounded-xl border border-line p-1" role="tablist" aria-label="Content language">
              {LANGS.map((l) => (
                <button key={l.code} type="button" role="tab" aria-selected={lang === l.code} onClick={() => setLang(l.code)} className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${lang === l.code ? 'bg-blue/15 text-ink' : 'text-muted hover:text-ink'}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pe-category">Category</Label>
                <input id="pe-category" value={p.category[lang] || ''} onChange={(e) => setLocal('category', e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label htmlFor="pe-desc" hint={lang !== 'en' ? 'Falls back to English when empty' : undefined}>Description</Label>
                <textarea id="pe-desc" rows={4} value={p.description[lang] || ''} onChange={(e) => setLocal('description', e.target.value)} className={`${inputCls} resize-y`} aria-invalid={!!errors.description} />
                {errors.description && <p className="mt-1 text-xs text-danger">{errors.description}</p>}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="pe-tech">Technologies</Label>
            <TechInput value={p.technologies} onChange={(v) => set('technologies', v)} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pe-url">Project URL</Label>
              <input id="pe-url" type="url" value={p.url} onChange={(e) => set('url', e.target.value)} placeholder="https://" className={inputCls} aria-invalid={!!errors.url} />
              {errors.url && <p className="mt-1 text-xs text-danger">{errors.url}</p>}
            </div>
            <div>
              <Label htmlFor="pe-gh" hint="Optional">GitHub URL</Label>
              <input id="pe-gh" type="url" value={p.githubUrl} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/…" className={inputCls} aria-invalid={!!errors.githubUrl} />
              {errors.githubUrl && <p className="mt-1 text-xs text-danger">{errors.githubUrl}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pe-status">Development status</Label>
              <select id="pe-status" value={p.status} onChange={(e) => set('status', e.target.value)} className={inputCls}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-muted">Your status always takes priority over automatic checks.</p>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-line px-4 py-3 sm:mt-6 sm:self-start">
              <span className="text-sm font-medium">Featured project</span>
              <Toggle checked={p.featured} onChange={(v) => set('featured', v)} label="Featured project" />
            </div>
          </div>
        </form>
        <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={save}>Save project</Button>
        </div>
      </motion.aside>
    </motion.div>
  )
}

export default function ProjectsAdmin() {
  const { projects, setProjects } = useOutletContext()
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const sorted = [...projects].sort((a, b) => a.order - b.order)

  const update = (id, patch) => setProjects((list) => list.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p)))
  const move = (index, dir) => {
    const target = sorted[index + dir]
    const current = sorted[index]
    if (!target) return
    setProjects((list) => list.map((p) => (p.id === current.id ? { ...p, order: target.order } : p.id === target.id ? { ...p, order: current.order } : p)))
  }
  const save = (project) => {
    setProjects((list) => (list.some((p) => p.id === project.id) ? list.map((p) => (p.id === project.id ? project : p)) : [...list, { ...project, order: Math.max(-1, ...list.map((p) => p.order)) + 1 }]))
    setEditing(null)
  }
  const cancelDelete = useCallback(() => setDeleting(null), [])

  return (
    <>
      <PageHeader
        title="Projects"
        description="Create, edit, reorder and feature the projects shown on your portfolio."
        actions={
          <Button variant="primary" onClick={() => setEditing(blank())}>
            <Plus size={16} aria-hidden="true" /> New project
          </Button>
        }
      />
      <Notice>Edits in this preview workspace update the dashboard right away. Publishing them to the live site arrives with secure sign-in and the database.</Notice>

      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {sorted.map((p, i) => (
            <motion.li key={p.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4 md:w-[22rem] md:shrink-0">
                  <div className="flex flex-col gap-1">
                    <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="grid size-7 place-items-center rounded-lg border border-line text-muted transition hover:text-ink disabled:opacity-30" aria-label={`Move ${p.name} up`}>
                      <ArrowUp size={13} aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => move(i, 1)} disabled={i === sorted.length - 1} className="grid size-7 place-items-center rounded-lg border border-line text-muted transition hover:text-ink disabled:opacity-30" aria-label={`Move ${p.name} down`}>
                      <ArrowDown size={13} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-bg-2">
                    {p.screenshots[0] ? <img src={cdn(p.screenshots[0].url, 200)} alt="" className="size-full object-cover" /> : <ImagePlus size={18} className="text-muted" aria-hidden="true" />}
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate font-semibold text-ink">
                      {p.name}
                      {p.featured && <Star size={13} className="shrink-0 fill-violet text-violet" aria-label="Featured" />}
                    </p>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 truncate font-mono text-xs text-muted hover:text-blue">
                        {p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    ) : (
                      <p className="font-mono text-xs text-muted">No URL yet</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-3">
                  <label className="sr-only" htmlFor={`status-${p.id}`}>Status for {p.name}</label>
                  <select id={`status-${p.id}`} value={p.status} onChange={(e) => update(p.id, { status: e.target.value })} className={`${inputCls} !w-auto !py-2`}>
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <StatusBadge status={p.status} />
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <Toggle checked={p.featured} onChange={(v) => update(p.id, { featured: v })} label={`Feature ${p.name}`} /> Featured
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link to={`/admin/project-images?project=${p.id}`} className="grid size-10 place-items-center rounded-xl border border-line text-muted transition hover:text-ink" aria-label={`Manage images for ${p.name}`}>
                    <ImagePlus size={16} aria-hidden="true" />
                  </Link>
                  <Button onClick={() => setEditing(p)} aria-label={`Edit ${p.name}`}>
                    <Pencil size={15} aria-hidden="true" /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => setDeleting(p)} aria-label={`Delete ${p.name}`}>
                    <Trash2 size={15} aria-hidden="true" />
                  </Button>
                </div>
              </Card>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {sorted.length === 0 && (
        <Card className="p-10 text-center">
          <p className="font-display font-semibold">No projects yet</p>
          <p className="mt-1 text-sm text-muted">Create your first project to show it on the portfolio.</p>
        </Card>
      )}

      <AnimatePresence>{editing && <Editor key={editing.id} initial={editing} onSave={save} onClose={() => setEditing(null)} />}</AnimatePresence>

      <ConfirmDialog
        open={!!deleting}
        title={`Delete ${deleting?.name}?`}
        body="The project and its screenshots will be removed from your portfolio. This cannot be undone."
        confirmLabel="Delete project"
        onCancel={cancelDelete}
        onConfirm={() => {
          setProjects((list) => list.filter((p) => p.id !== deleting.id))
          setDeleting(null)
        }}
      />
    </>
  )
}
