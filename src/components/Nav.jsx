import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { LINKS, NAV_LINKS } from '../site.js'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 34, mass: 0.25 })
  return (
    <motion.div
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
      aria-hidden
    />
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute inset-x-0 top-0 h-[5px] bg-accent transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="absolute inset-x-0 bottom-0 h-[5px] w-2.5 bg-ink transition-all duration-300 group-hover:w-full" />
          </span>
          <span className="font-mono text-[15px] font-bold tracking-tight">Onyx</span>
        </a>

        <div className="ml-auto hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={LINKS.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[13px] text-muted transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={LINKS.download}
            download
            className="rounded-md bg-accent px-4 py-2 font-mono text-[13px] font-medium text-onaccent transition-[filter] hover:brightness-110"
          >
            Download
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="ml-auto flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-line2 md:hidden"
        >
          <span
            className={`block h-px w-4 bg-ink transition-transform duration-200 ${open ? 'translate-y-[3px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-4 bg-ink transition-transform duration-200 ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/60 py-3 text-sm text-ink2 last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={LINKS.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="py-3 text-sm text-ink2"
              >
                GitHub
              </a>
              <a
                href={LINKS.download}
                download
                className="mt-2 mb-3 rounded-md bg-accent px-4 py-3 text-center font-mono text-[13px] font-medium text-onaccent"
              >
                Download for macOS
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollProgress />
    </header>
  )
}