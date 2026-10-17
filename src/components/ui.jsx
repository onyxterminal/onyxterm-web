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

export function Stagger({ children, className = '', gap = 0.07, delay = 0 }) {
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

/** A one-pixel gradient hairline that fades out at both ends. */
export function Hairline({ className = '' }) {
  return <div className={`hairline h-px w-full ${className}`} aria-hidden />
}

/** Section eyebrow: a short accent tick, then a tracked mono label. */
export function Label({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="inline-block h-px w-6 bg-accent/70" aria-hidden />
      <span className="label">{children}</span>
    </div>
  )
}

/** Section shell: padded, centered, with an optional eyebrow. */
export function Section({
  id,
  children,
  className = '',
  label,
  width = 'max-w-5xl',
  bleed = false,
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      <div className={`mx-auto w-full ${width} ${bleed ? '' : 'px-0'}`}>
        {label && (
          <Reveal className="mb-8">
            <Label>{label}</Label>
          </Reveal>
        )}
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
      className={`inline-flex min-w-6 items-center justify-center rounded-[5px] border border-line2 bg-raised px-1.5 py-1 font-mono text-[11px] leading-none font-medium text-ink shadow-[inset_0_-1px_0_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.05)] ${className}`}
    >
      {children}
    </kbd>
  )
}

/* ------------------------------------------------------------------ atoms */

/** A small pill for metadata. */
export function Chip({ children, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'border-line2 bg-raised text-muted',
    blue: 'border-blue/30 bg-blue/10 text-blue',
    green: 'border-green/30 bg-green/10 text-green',
    magenta: 'border-magenta/30 bg-magenta/10 text-magenta',
    amber: 'border-amber/30 bg-amber/10 text-amber',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

/** A live status dot with a soft halo — the app's running indicator. */
export function Dot({ tone = 'green', className = '' }) {
  const tones = {
    green: 'bg-green',
    blue: 'bg-blue',
    amber: 'bg-amber',
    muted: 'bg-faint',
  }
  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span
        className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${tones[tone]}`}
      />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${tones[tone]}`} />
    </span>
  )
}

/* --------------------------------------------------------------- actions */

export function CTA({ href, children, variant = 'ghost', className = '', download = false }) {
  const base =
    'inline-flex items-center gap-2 rounded-lg px-5 py-3 font-mono text-[13px] font-medium whitespace-nowrap transition-all duration-150'
  const styles = {
    primary: 'bg-accent text-onaccent hover:bg-blue hover:shadow-[0_8px_22px_-8px_rgba(11,98,204,0.55)]',
    ghost: 'border border-line2 bg-panel/60 text-ink hover:border-line2 hover:bg-raised',
    quiet: 'text-muted hover:text-ink',
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
      {...(download ? { download: '' } : {})}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </a>
  )
}
