import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

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
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
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

/** Small dotted display label — the page's only decorative type. */
export function PixelLabel({ children, className = '' }) {
  return (
    <div className={`pixel text-[11px] text-muted ${className}`}>{children}</div>
  )
}

/** A checkerboard divider. The only rule on the page. */
export function PixelRule({ className = '' }) {
  return <div className={`checker h-[3px] w-full ${className}`} aria-hidden />
}

/** Section: label, then content. Nothing else. */
export function Section({ id, children, className = '', label }) {
  return (
    <section id={id} className={`px-5 py-14 sm:px-8 md:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-3xl">
        {label && (
          <Reveal className="mb-7">
            <PixelLabel>{label}</PixelLabel>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

export function CTA({ href, children, variant = 'ghost', className = '', download = false }) {
  const base =
    'inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-[13px] font-medium transition-colors whitespace-nowrap'
  const styles = {
    primary: 'bg-ink text-onaccent hover:bg-ink2',
    ghost: 'border border-line2 text-ink hover:border-ink hover:bg-sunken',
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