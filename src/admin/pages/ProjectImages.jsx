import { useCallback, useRef, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ImagePlus, RefreshCw, Star, Trash2, Upload, X } from 'lucide-react'
import { Button, Card, ConfirmDialog, inputCls, Label, Notice, PageHeader } from '../ui.jsx'

const TYPES = ['image/jpeg', 'image/png', 'image/webp']
const EXT = /\.(jpe?g|png|webp)$/i
const MAX_MB = 5

/** Client-side checks; the upload API repeats them (including magic-byte sniffing). */
function check(file) {
  if (!TYPES.includes(file.type) || !EXT.test(file.name)) return 'Only JPG, JPEG, PNG and WebP images are allowed.'
  if (file.size > MAX_MB * 1024 * 1024) return `Images must be ${MAX_MB} MB or smaller (this one is ${(file.size / 1048576).toFixed(1)} MB).`
  return null
}

const toPending = (file) => ({ id: `${file.name}-${file.size}-${file.lastModified}`, file, url: URL.createObjectURL(file), alt: '' })

export default function ProjectImages() {
  const { projects, setProjects } = useOutletContext()
  const [params, setParams] = useSearchParams()
  const projectId = params.get('project') || projects[0]?.id
  const project = projects.find((p) => p.id === projectId)
  const [pending, setPending] = useState([])
  const [rejected, setRejected] = useState([])
  const [drag, setDrag] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const inputRef = useRef(null)
  const replaceRef = useRef(null)
  const [replacing, setReplacing] = useState(null)

  const addFiles = (files) => {
    const ok = []
    const bad = []
    Array.from(files).forEach((f) => {
      const err = check(f)
      if (err) bad.push({ name: f.name, err })
      else ok.push(toPending(f))
    })
    setRejected(bad)
    setPending((p) => [...p, ...ok.filter((n) => !p.some((x) => x.id === n.id))])
  }

  const patchShots = (fn) => setProjects((list) => list.map((p) => (p.id === projectId ? { ...p, screenshots: fn(p.screenshots), updatedAt: new Date().toISOString() } : p)))

  const saveAll = () => {
    patchShots((shots) => [...shots, ...pending.map((x) => ({ url: x.url, alt: x.alt.trim() || `${project.name} screenshot` }))])
    setPending([])
  }

  const onReplace = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || replacing == null) return
    const err = check(file)
    if (err) return setRejected([{ name: file.name, err }])
    const url = URL.createObjectURL(file)
    patchShots((shots) => shots.map((s, i) => (i === replacing ? { ...s, url } : s)))
    setReplacing(null)
  }

  const cancelDelete = useCallback(() => setDeleting(null), [])

  if (!project) {
    return (
      <>
        <PageHeader title="Project Images" />
        <Card className="p-10 text-center text-muted">Create a project first, then upload its screenshots here.</Card>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Project Images" description="Upload real screenshots of your work. The first image is the main screenshot on the project card." />
      <Notice>Images you add in this preview workspace show in the dashboard right away. Permanent storage and publishing to the live site arrive with the upload API.</Notice>

      <div className="mb-6 max-w-sm">
        <Label htmlFor="img-project">Project</Label>
        <select id="img-project" value={projectId} onChange={(e) => { setParams({ project: e.target.value }); setPending([]); setRejected([]) }} className={inputCls}>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files) }}
        className={`glass relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-12 text-center transition ${drag ? 'border-blue bg-blue/10' : 'border-line-strong'}`}
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue/20 to-violet/20 text-blue">
          <Upload size={24} aria-hidden="true" />
        </span>
        <p className="mt-4 font-display font-semibold">Drop screenshots here</p>
        <p className="mt-1 text-sm text-muted">JPG, JPEG, PNG or WebP · up to {MAX_MB} MB each · multiple files allowed</p>
        <Button variant="primary" className="mt-5" onClick={() => inputRef.current?.click()}>
          <ImagePlus size={16} aria-hidden="true" /> Choose from computer
        </Button>
        <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} aria-label="Choose screenshots" />
      </div>

      {rejected.length > 0 && (
        <div className="mt-4 space-y-2" role="alert">
          {rejected.map((r) => (
            <p key={r.name} className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">
              <AlertTriangle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span><strong className="font-semibold">{r.name}:</strong> {r.err}</span>
            </p>
          ))}
        </div>
      )}

      <AnimatePresence>
        {pending.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8" aria-labelledby="pending-title">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="pending-title" className="font-display text-base font-semibold">Preview · {pending.length} ready to save</h2>
              <div className="flex gap-2">
                <Button onClick={() => setPending([])}>Discard</Button>
                <Button variant="primary" onClick={saveAll}>Save to {project.name}</Button>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pending.map((x) => (
                <li key={x.id}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[16/10] bg-bg-2">
                      <img src={x.url} alt="" className="size-full object-cover object-top" />
                      <button type="button" onClick={() => setPending((p) => p.filter((y) => y.id !== x.id))} className="absolute right-2 top-2 grid size-8 place-items-center rounded-lg bg-bg/80 text-ink" aria-label={`Remove ${x.file.name}`}>
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="truncate font-mono text-xs text-muted">{x.file.name} · {(x.file.size / 1024).toFixed(0)} KB</p>
                      <input value={x.alt} onChange={(e) => setPending((p) => p.map((y) => (y.id === x.id ? { ...y, alt: e.target.value } : y)))} placeholder="Alt text (describe the screen)" aria-label={`Alt text for ${x.file.name}`} className={`${inputCls} mt-2 !py-2 text-xs`} />
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="mt-10" aria-labelledby="saved-title">
        <h2 id="saved-title" className="mb-3 font-display text-base font-semibold">Screenshots for {project.name}</h2>
        {project.screenshots.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted">No screenshots yet. Visitors see a clean placeholder on this project until you add one.</Card>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.screenshots.map((s, i) => (
              <li key={s.url}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-[16/10] bg-bg-2">
                    <img src={s.url} alt={s.alt} className="size-full object-cover object-top" loading="lazy" />
                    {i === 0 && <span className="absolute left-2 top-2 rounded-lg bg-gradient-to-r from-blue to-violet px-2 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-white">Main</span>}
                  </div>
                  <div className="flex items-center gap-2 p-3">
                    <p className="min-w-0 flex-1 truncate text-xs text-muted">{s.alt}</p>
                    {i > 0 && (
                      <button type="button" onClick={() => patchShots((shots) => [shots[i], ...shots.filter((_, j) => j !== i)])} className="grid size-8 place-items-center rounded-lg border border-line text-muted hover:text-violet" aria-label="Set as main screenshot" title="Set as main">
                        <Star size={14} aria-hidden="true" />
                      </button>
                    )}
                    <button type="button" onClick={() => { setReplacing(i); replaceRef.current?.click() }} className="grid size-8 place-items-center rounded-lg border border-line text-muted hover:text-ink" aria-label="Replace image" title="Replace">
                      <RefreshCw size={14} aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => setDeleting(i)} className="grid size-8 place-items-center rounded-lg border border-danger/30 text-danger hover:bg-danger/10" aria-label="Delete image" title="Delete">
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
        <input ref={replaceRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="sr-only" onChange={onReplace} aria-label="Replacement image" tabIndex={-1} />
      </section>

      <ConfirmDialog
        open={deleting != null}
        title="Delete this screenshot?"
        body="It will no longer appear on your portfolio."
        confirmLabel="Delete image"
        onCancel={cancelDelete}
        onConfirm={() => {
          patchShots((shots) => shots.filter((_, j) => j !== deleting))
          setDeleting(null)
        }}
      />
    </>
  )
}
