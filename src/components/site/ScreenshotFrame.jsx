import { ImageOff } from 'lucide-react'
import { cdn } from '../../lib/image.js'

/** Browser-chrome frame around a real screenshot, or an empty state when none is uploaded. */
export default function ScreenshotFrame({ shot, url, title, hint, width = 900, className = '', eager = false }) {
  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
  return (
    <div className={`overflow-hidden rounded-2xl border border-line-strong bg-bg-2 ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-danger/70" />
          <span className="size-2 rounded-full bg-warn/70" />
          <span className="size-2 rounded-full bg-ok/70" />
        </span>
        {host && <span className="ml-2 truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[0.62rem] text-muted">{host}</span>}
      </div>
      <div className="relative aspect-[16/10]">
        {shot ? (
          <img
            src={cdn(shot.url, width)}
            alt={shot.alt || `${title} screenshot`}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden">
            <div className="bg-grid absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-x-6 top-6 space-y-2 opacity-60" aria-hidden="true">
              <div className="h-2.5 w-1/3 rounded-full bg-line-strong" />
              <div className="h-2 w-2/3 rounded-full bg-line" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-lg bg-line" />
                <div className="h-12 rounded-lg bg-line" />
                <div className="h-12 rounded-lg bg-line" />
              </div>
            </div>
            <div className="relative mt-10 flex flex-col items-center px-4 text-center">
              <span className="grid size-11 place-items-center rounded-2xl border border-line-strong bg-surface-strong text-muted">
                <ImageOff size={18} aria-hidden="true" />
              </span>
              <span className="mt-3 text-sm font-medium text-ink">{title}</span>
              {hint && <span className="mt-1 text-xs text-muted">{hint}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
