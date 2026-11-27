import { useI18n } from '../../i18n/I18nProvider.jsx'

const STYLES = {
  live: 'text-ok border-ok/30 bg-ok/10',
  in_development: 'text-warn border-warn/30 bg-warn/10',
  completed: 'text-blue border-blue/30 bg-blue/10',
  unavailable: 'text-danger border-danger/30 bg-danger/10',
}

/**
 * Resolve what visitors see. A manual status from the dashboard always wins;
 * a health check can only downgrade a "live" project to "unavailable".
 */
export function resolveStatus(project) {
  if (project.status === 'live' && project.health?.state === 'down') return 'unavailable'
  return project.status
}

export default function StatusBadge({ status, className = '' }) {
  const { t } = useI18n()
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-wider ${STYLES[status] || STYLES.completed} ${className}`}>
      <span className={`pulse-dot size-1.5 rounded-full bg-current ${status === 'live' ? '' : 'after:hidden'}`} aria-hidden="true" />
      {t(`projects.status.${status}`)}
    </span>
  )
}
