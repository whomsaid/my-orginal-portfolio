import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, CheckCircle2, Circle, FlaskConical, FolderKanban, Hammer, Inbox, Radio, Trophy } from 'lucide-react'
import StatusBadge, { resolveStatus } from '../../components/ui/StatusBadge.jsx'
import { Card, PageHeader } from '../ui.jsx'

function Stat({ icon: I, label, value, to, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
      <Link to={to} className="glass glow-border group flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-0.5">
        <span className="flex items-center justify-between text-muted">
          <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
          <I size={16} className="text-blue" aria-hidden="true" />
        </span>
        <span className="mt-4 font-display text-3xl font-semibold tabular-nums text-ink">{value}</span>
      </Link>
    </motion.div>
  )
}

export default function Overview() {
  const { data, projects } = useOutletContext()
  const statuses = projects.map(resolveStatus)
  const count = (s) => statuses.filter((x) => x === s).length
  const skills = data.skillCategories.reduce((n, c) => n + c.skills.length, 0)
  const unread = 0 // contact messages are stored once the backend is connected

  const stats = [
    { icon: FolderKanban, label: 'Total projects', value: projects.length, to: '/admin/projects' },
    { icon: Radio, label: 'Live projects', value: count('live'), to: '/admin/projects' },
    { icon: Hammer, label: 'In development', value: count('in_development'), to: '/admin/projects' },
    { icon: Trophy, label: 'Completed', value: count('completed'), to: '/admin/projects' },
    { icon: BadgeCheck, label: 'Total skills', value: skills, to: '/admin/skills' },
    { icon: FlaskConical, label: 'Research articles', value: data.research.length, to: '/admin/research' },
    { icon: Inbox, label: 'Unread messages', value: unread, to: '/admin/messages' },
  ]

  const shots = projects.reduce((n, p) => n + p.screenshots.length, 0)
  const checklist = [
    { done: shots > 0, label: 'Upload real project screenshots', to: '/admin/project-images' },
    { done: skills > 0, label: 'Add your technical skills', to: '/admin/skills' },
    { done: !!data.profile.photoUrl, label: 'Upload a profile photo', to: '/admin/profile' },
    { done: !!data.profile.cvUrl, label: 'Upload your CV to enable “Download CV”', to: '/admin/cv' },
    { done: !!data.contact.email, label: 'Add a contact email address', to: '/admin/contact-info' },
    { done: data.socials.length > 0, label: 'Connect GitHub, LinkedIn or other profiles', to: '/admin/social' },
    { done: data.education.length > 0, label: 'Add education and certifications', to: '/admin/education' },
    { done: data.research.length > 0, label: 'Publish a first research entry', to: '/admin/research' },
  ]
  const doneCount = checklist.filter((c) => c.done).length

  return (
    <>
      <PageHeader title="Overview" description="A snapshot of everything visitors see on your portfolio." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Stat key={s.label} {...s} delay={i * 0.04} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Projects</h2>
            <Link to="/admin/projects" className="inline-flex items-center gap-1 text-sm font-medium text-blue">
              Manage <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{p.name}</p>
                  <p className="truncate font-mono text-xs text-muted">{p.url?.replace(/^https?:\/\//, '')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden font-mono text-[0.68rem] text-muted sm:inline">{p.screenshots.length} img</span>
                  <StatusBadge status={resolveStatus(p)} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Portfolio setup</h2>
            <span className="font-mono text-xs text-muted">{doneCount}/{checklist.length} done</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg-2" role="progressbar" aria-valuemin={0} aria-valuemax={checklist.length} aria-valuenow={doneCount} aria-label="Setup progress">
            <div className="h-full rounded-full bg-gradient-to-r from-blue to-violet" style={{ width: `${(doneCount / checklist.length) * 100}%` }} />
          </div>
          <ul className="mt-4 space-y-1">
            {checklist.map((c) => (
              <li key={c.label}>
                <Link to={c.to} className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-surface">
                  {c.done ? <CheckCircle2 size={17} className="text-ok" aria-label="Done" /> : <Circle size={17} className="text-muted" aria-label="To do" />}
                  <span className={c.done ? 'text-muted line-through' : 'text-ink'}>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
