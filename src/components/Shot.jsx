import { motion } from 'motion/react'

/**
 * A real screenshot, framed in window chrome so it reads as the app
 * rather than a pasted image.
 */
export default function Shot({
  src,
  alt,
  caption,
  className = '',
  delay = 0,
  width = 1280,
  height = 803,
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="overflow-hidden rounded-xl border border-line bg-sunken">
        <div className="flex items-center gap-2 border-b border-line bg-bg px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full border border-line2" />
          <span className="h-2.5 w-2.5 rounded-full border border-line2" />
          <span className="h-2.5 w-2.5 rounded-full border border-line2" />
          <span className="pixel ml-2 text-[10px] text-line2">onyx</span>
        </div>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] text-faint">{caption}</figcaption>
      )}
    </motion.figure>
  )
}