import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/* ---------------------------------------------------------------- motion */

export function Reveal({ children, delay = 0, y = 14, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className = '', gap = 0.06, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 12 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ----------------------------------------------------------------- rules */

/** A one-pixel rule that fades out at both ends. */
export function Hairline({ className = '' }) {
  return <div className={`hairline h-px w-full ${className}`} aria-hidden />
}

/**
 * The page spine: a section number, its name, and a rule that runs to the
 * edge. Every section on the page carries one, which is what makes the
 * thing read as a document instead of a stack of blocks.
 */
export function SectionHead({ n, label, className = '' }) {
  return (
    <Reveal className={className}>
      <div className="flex items-baseline gap-4">
        <span className="tnum font-mono text-[12px] leading-none font-medium text-ink">{n}</span>
        <h2 className="label shrink-0">{label}</h2>
        <div className="hairline h-px flex-1 translate-y-[-3px]" aria-hidden />
      </div>
    </Reveal>
  )
}

/** Section shell. `n` renders the spine; `label` is the section name. */
export function Section({
  id,
  n,
  label,
  children,
  className = '',
  width = 'max-w-6xl',
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      <div className={`mx-auto w-full ${width}`}>
        <SectionHead n={n} label={label} className="mb-10 md:mb-14" />
        {children}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ type */

/** A keyboard shortcut rendered as a keycap. */
export function Keycap({ children, className = '' }) {
  return (
    <kbd
      className={`inline-flex min-w-6 items-center justify-center rounded-[3px] border border-line2 bg-sunken px-1.5 py-1 font-mono text-[11px] leading-none font-medium text-ink shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </kbd>
  )
}

/* --------------------------------------------------------------- actions */

const CTA_BASE =
  'inline-flex items-center justify-center gap-2 rounded-[3px] px-5 py-3 font-mono text-[13px] leading-none font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:translate-y-px'

const CTA_STYLES = {
  primary: 'bg-ink text-onaccent hover:bg-ink2',
  ghost: 'border border-line2 bg-panel text-ink hover:border-ink hover:bg-sunken',
  quiet: 'text-muted hover:text-ink',
}

export function CTA({ href, children, variant = 'ghost', className = '', download = false }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={`${CTA_BASE} ${CTA_STYLES[variant]} ${className}`}
      {...(download ? { download: '' } : {})}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </a>
  )
}

/* ----------------------------------------------------------------- atoms */

/** A small square-cornered tag. Rounded-full pills are the default badge
    shape everywhere else on the internet; this one is a terminal prompt. */
export function Tag({ children, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'border-line2 text-faint',
    accent: 'border-accent/40 text-accent',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-1 font-mono text-[10.5px] leading-none font-medium tracking-[0.12em] uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

/** A status dot with a soft halo. */
export function Dot({ tone = 'accent', className = '' }) {
  const tones = {
    accent: 'bg-accent',
    ink: 'bg-ink',
    faint: 'bg-line2',
  }
  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span className={`absolute inline-flex h-full w-full rounded-full opacity-45 ${tones[tone]}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${tones[tone]}`} />
    </span>
  )
}

/* --------------------------------------------------------------- figures */

export function GithubMark({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38l-.01-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  )
}

export function StarMark({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
      />
    </svg>
  )
}