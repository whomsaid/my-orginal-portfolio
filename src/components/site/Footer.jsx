import { ArrowUp } from 'lucide-react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { formatInternational, whatsappLink } from '../../lib/whatsapp.js'
import { WhatsAppIcon } from '../ui/BrandIcons.jsx'
import Monogram from '../ui/Monogram.jsx'
import SocialLinks from './SocialLinks.jsx'
import { SECTIONS } from './Navbar.jsx'

export default function Footer({ profile, contact, socials }) {
  const { t, p } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Monogram text={profile.monogram} />
            <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-ink">{profile.fullName}</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{p(profile.tagline)}</p>
          <div className="mt-5">
            <SocialLinks socials={socials} size={38} />
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">{t('footer.explore')}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-sm text-muted transition hover:text-ink">{t(`nav.${id}`)}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">{t('footer.reach')}</p>
          <ul className="mt-4 space-y-2.5">
            {contact.whatsapp.map((num) => (
              <li key={num}>
                <a href={whatsappLink(num)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-[#25d366]">
                  <WhatsAppIcon width={15} height={15} />
                  {formatInternational(num)}
                </a>
              </li>
            ))}
            <li className="text-sm text-muted">{profile.location.city}, {profile.location.country}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted sm:flex-row sm:px-8">
          <p>© {year} {profile.fullName}. {t('footer.rights')}</p>
          <p>{t('footer.made')}</p>
          <a href="#home" className="inline-flex items-center gap-1.5 transition hover:text-ink">
            <ArrowUp size={13} aria-hidden="true" /> {t('footer.top')}
          </a>
        </div>
      </div>
    </footer>
  )
}
