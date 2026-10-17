import { motion } from 'motion/react'

/**
 * A real screenshot of the app, presented as-is.
 *
 * The PNGs already contain the real Onyx window — titlebar, traffic lights,
 * tabs and all — so this deliberately adds no invented window chrome on
 * top of them. Only a hairline and a warm-tinted shadow to seat it on the
 * paper. See the note in README.md before changing this.
 *
 * `src` is resolved against Vite's BASE_URL rather than written as "/x.png".
 * This site is published to a project subpath (/onyxterm-web/), so an
 * absolute path silently 404s in production while working perfectly in dev.
 * Vite rewrites index.html refs for you; it does not touch runtime JSX.
 */
export default function Shot({
  src,
  alt,
  caption,
  className = '',
  delay = 0,
  width = 1280,
  height = 803,
  eager = false,
}) {
  const resolved = src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`
  return (
    <motion.figure
      initial={{ opacity: 0, y: 22 }}
      {...(eager ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="relative">
        <img
          src={resolved}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          {...(eager ? { fetchPriority: 'high' } : {})}
          /* The outline is pure black at low alpha, not a grey token: a tinted
             border picks up the paper colour underneath and reads as dirt
             along the image edge. */
          className="block w-full rounded-[4px] border border-black/10 shadow-[0_24px_60px_-28px_rgba(10,10,10,0.28),0_2px_6px_-2px_rgba(10,10,10,0.06)]"
        />
      </div>
      {caption && (
        <figcaption className="mt-3.5 flex items-baseline gap-2.5 font-mono text-[11px] leading-[1.6] text-faint">
          <span className="text-accent" aria-hidden>
            ›
          </span>
          <span>{caption}</span>
        </figcaption>
      )}
    </motion.figure>
  )
}