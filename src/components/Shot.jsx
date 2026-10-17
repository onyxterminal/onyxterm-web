import { motion } from 'motion/react'

/**
 * A real screenshot of the app, presented as-is.
 *
 * The PNGs already contain the real Onyx window — titlebar, traffic lights,
 * tabs and all — so this deliberately adds no invented window chrome on
 * top of them. Only a hairline border and a shadow to seat it on the page.
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
  glow = false,
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      {...(eager ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="relative">
        {glow && (
          /* inset, not -inset-x: a negative horizontal inset pushed the
             blurred layer past the viewport and forced a mobile scrollbar */
          <div
            className="pointer-events-none absolute inset-x-0 -top-10 bottom-4 -z-10 blur-2xl"
            style={{
              background:
                'radial-gradient(58% 56% at 50% 42%, rgba(11,98,204,0.09), transparent 70%)',
            }}
            aria-hidden
          />
        )}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          {...(eager ? { fetchPriority: 'high' } : {})}
          className="block w-full rounded-xl border border-line shadow-[0_28px_70px_-24px_rgba(0,0,0,0.28)]"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 font-mono text-[11.5px] leading-[1.6] text-faint">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
