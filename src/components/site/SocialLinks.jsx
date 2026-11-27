import { Globe } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon } from '../ui/BrandIcons.jsx'

const PLATFORMS = {
  github: { label: 'GitHub', icon: GithubIcon },
  linkedin: { label: 'LinkedIn', icon: LinkedinIcon },
  x: { label: 'X', icon: XIcon },
  website: { label: 'Website', icon: Globe },
}

/** Renders only links that have been configured in the dashboard. */
export default function SocialLinks({ socials, size = 40 }) {
  if (!socials?.length) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {socials.map((s) => {
        const meta = PLATFORMS[s.platform] || { label: s.platform, icon: Globe }
        const I = meta.icon
        return (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={meta.label} className="grid place-items-center rounded-xl border border-line text-ink transition hover:border-blue/50 hover:text-blue" style={{ width: size, height: size }}>
              <I width={17} height={17} size={17} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
