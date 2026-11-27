import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, subtitle, index, align = 'left' }) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-12 md:mb-16 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}`}>
      <p className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        {index && <span className="text-muted">{index}</span>}
        <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>}
    </Reveal>
  )
}
