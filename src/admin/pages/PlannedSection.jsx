import { Navigate, useOutletContext, useParams } from 'react-router-dom'
import { CheckCircle2, CircleDashed } from 'lucide-react'
import { ADMIN_NAV } from '../nav.js'
import { formatInternational } from '../../lib/whatsapp.js'
import { Card, PageHeader } from '../ui.jsx'

/** What each content area manages, plus what is currently published. */
const SECTIONS = {
  profile: {
    description: 'Your name, title, roles, tagline, profile photo and the availability indicator in the hero.',
    fields: ['Full name and monogram', 'Professional title and roles', 'Tagline (EN / RW / FR)', 'Profile photo upload', 'Availability indicator on/off and label'],
    current: (d) => [['Name', d.profile.fullName], ['Availability', d.profile.availability.available ? 'Available for new projects' : 'Unavailable'], ['Photo', d.profile.photoUrl ? 'Uploaded' : 'Not uploaded']],
  },
  about: {
    description: 'The biography, interests and goals shown in the About section.',
    fields: ['Biography paragraphs (EN / RW / FR)', 'Interests list with icons', 'Goals and ambitions'],
    current: (d) => [['Paragraphs', d.about.paragraphs.length], ['Interests', d.about.interests.length]],
  },
  skills: {
    description: 'Skills organised into the seven categories on your portfolio.',
    fields: ['Name', 'Icon or logo upload', 'Category', 'Optional proficiency level', 'Optional description', 'Display order'],
    current: (d) => d.skillCategories.map((c) => [c.name.en, `${c.skills.length} skills`]),
  },
  services: {
    description: 'The services you offer, with icons and translated descriptions.',
    fields: ['Title (EN / RW / FR)', 'Description (EN / RW / FR)', 'Icon', 'Display order', 'Show or hide'],
    current: (d) => d.services.map((s) => [s.title.en, 'Published']),
  },
  research: {
    description: 'Technology research, experiments, technical articles, innovation ideas and project discoveries.',
    fields: ['Title', 'Description', 'Cover image upload', 'Content (rich text)', 'Publication date', 'Category', 'Draft or published'],
    current: (d) => [['Entries', d.research.length]],
  },
  education: {
    description: 'Education, certifications, courses, technical training and learning achievements.',
    fields: ['Type', 'Title', 'Institution or issuer', 'Start and end dates', 'Description', 'Credential URL'],
    current: (d) => [['Records', d.education.length]],
  },
  'contact-info': {
    description: 'How visitors reach you from the contact section and footer.',
    fields: ['WhatsApp numbers', 'Email address', 'Location'],
    current: (d) => [...d.contact.whatsapp.map((n, i) => [`WhatsApp ${i + 1}`, formatInternational(n)]), ['Email', d.contact.email || 'Not set']],
  },
  cv: {
    description: 'Upload your CV as a PDF. The “Download CV” button appears in the hero once a file is active.',
    fields: ['PDF upload (validated type and size)', 'Replace or remove', 'Choose the active version'],
    current: (d) => [['Active CV', d.profile.cvUrl ? 'Uploaded' : 'None — button hidden']],
  },
  social: {
    description: 'Links to your profiles. Only configured links are shown on the site.',
    fields: ['Platform (GitHub, LinkedIn, X, website…)', 'URL', 'Display order'],
    current: (d) => [['Configured links', d.socials.length]],
  },
  appearance: {
    description: 'Visual settings for the public site.',
    fields: ['Default theme (dark / light)', 'Accent colours', 'Logo or monogram', 'Section visibility'],
    current: () => [['Default theme', 'Dark'], ['Monogram', 'HX']],
  },
  languages: {
    description: 'Interface translations for English, Kinyarwanda and French.',
    fields: ['Edit any interface string per language', 'Enable or disable a language', 'Set the default language'],
    current: () => [['English', 'Enabled'], ['Kinyarwanda', 'Enabled'], ['Français', 'Enabled']],
  },
  settings: {
    description: 'Account and site settings.',
    fields: ['Change password', 'Active sessions and sign-out everywhere', 'SEO title and description', 'Health-check interval for project websites'],
    current: () => [],
  },
}

export default function PlannedSection() {
  const { section } = useParams()
  const { data } = useOutletContext()
  const nav = ADMIN_NAV.find((n) => n.slug === section)
  const meta = SECTIONS[section]
  if (!nav || !meta) return <Navigate to="/admin/overview" replace />
  const I = nav.icon
  const current = meta.current(data)

  return (
    <>
      <PageHeader title={nav.label} description={meta.description} />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-blue/20 to-violet/20 text-blue">
              <I size={19} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold">What you will manage here</h2>
              <p className="text-xs text-muted">Editing for this area opens with the content API.</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2">
            {meta.fields.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm">
                <CircleDashed size={15} className="text-violet" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </Card>
        {current.length > 0 && (
          <Card className="p-6">
            <h2 className="font-display text-base font-semibold">Currently on your site</h2>
            <dl className="mt-4 divide-y divide-line">
              {current.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <dt className="flex items-center gap-2 text-muted">
                    <CheckCircle2 size={14} className="text-ok" aria-hidden="true" />
                    {k}
                  </dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        )}
      </div>
    </>
  )
}
