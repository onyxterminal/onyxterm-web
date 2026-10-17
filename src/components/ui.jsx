import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 18, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
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
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 16 }) {
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

export function Eyebrow({ children, className = '' }) {
  return (
    <div
      className={`flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-faint uppercase ${className}`}
    >
      <span className="inline-block h-px w-6 bg-line2" />
      {children}
    </div>
  )
}

/** Editorial two-column head: headline left, supporting paragraph right. */
export function SectionHead({ eyebrow, title, lede, className = '' }) {
  return (
    <div className={`grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-14 ${className}`}>
      <div className="flex flex-col gap-5">
        {eyebrow && (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.06}>
          <h2 className="max-w-[20ch] text-[clamp(1.55rem,3.5vw,2.45rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
            {title}
          </h2>
        </Reveal>
      </div>
      {lede && (
        <Reveal delay={0.12}>
          <p className="max-w-[48ch] text-[15px] leading-[1.7] text-muted md:pb-1">{lede}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Section({ id, children, className = '', tint = false }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line ${tint ? 'bg-surface' : ''} ${className}`}
    >
      <div className="rule-frame mx-auto w-full max-w-7xl px-5 py-20 sm:px-10 md:py-28">
        {children}
      </div>
    </section>
  )
}

/** Black pill CTA with the dotted square chip, echoing the reference. */
export function CTA({ href, children, variant = 'ghost', className = '', download = false, chip = false }) {
  const base =
    'group inline-flex items-center gap-2.5 rounded-md px-5 py-3 font-mono text-[13px] font-medium transition-colors whitespace-nowrap'
  const styles = {
    primary: 'bg-ink text-surface hover:bg-ink2',
    ghost: 'border border-line2 bg-surface text-ink hover:border-ink',
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
      {chip && (
        <span className="dot-bg inline-block h-3.5 w-3.5 shrink-0 rounded-[3px]" aria-hidden />
      )}
      {children}
    </a>
  )
}

export function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line2 bg-surface px-2.5 py-0.5 font-mono text-[10.5px] text-muted">
      {children}
    </span>
  )
}