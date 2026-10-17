import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 20, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-90px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Staggered container — pair with <StaggerItem>. */
export function Stagger({ children, className = '', gap = 0.08, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 18 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Small mono tag above a section headline, matching the terminal chrome. */
export function Eyebrow({ children, className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase ${className}`}
    >
      <span className="inline-block h-1.5 w-1.5 bg-accent" />
      {children}
    </div>
  )
}

export function SectionHead({ eyebrow, title, lede, align = 'left' }) {
  return (
    <div
      className={`flex flex-col gap-5 ${align === 'center' ? 'items-center text-center' : 'items-start'}`}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="max-w-[21ch] text-[clamp(1.7rem,4.1vw,2.7rem)] leading-[1.07] font-semibold tracking-[-0.032em] text-balance">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p
            className={`max-w-[62ch] text-[clamp(0.95rem,1.5vw,1.1rem)] leading-[1.65] text-ink2 ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

export function CTA({ href, children, variant = 'ghost', className = '', download = false }) {
  const base =
    'group inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-[13px] font-medium transition-all duration-200 whitespace-nowrap'
  const styles = {
    primary:
      'bg-accent text-onaccent hover:brightness-110 shadow-[0_0_0_0_rgba(217,72,15,0.35)] hover:shadow-[0_8px_26px_-8px_rgba(217,72,15,0.55)]',
    ghost:
      'border border-line2 text-ink hover:border-ink hover:bg-surface',
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

export function Kbd({ children }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-line2 bg-sunken px-1.5 font-mono text-[11px] text-ink2">
      {children}
    </kbd>
  )
}