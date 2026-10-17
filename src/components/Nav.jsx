import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import Logo from './Logo.jsx'
import { LINKS, NAV_LINKS, VERSION } from '../site.js'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 34, mass: 0.25 })
  return (
    <motion.div
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ink"
      aria-hidden
    />
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* announcement bar */}
      <div className="bg-ink text-surface">
        <div className="rule-frame mx-auto flex w-full max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center font-mono text-[11px] sm:px-10">
          <span className="text-surface/60">New</span>
          <span className="hidden sm:inline">
            {VERSION} — the terminal workspace for shells and agents
          </span>
          <span className="sm:hidden">{VERSION} is out</span>
          <a
            href={LINKS.release}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 opacity-80 transition-opacity hover:opacity-100"
          >
            Read the notes →
          </a>
        </div>
      </div>

      <div
        className={`border-b border-line transition-colors duration-300 ${
          scrolled ? 'bg-bg/85 backdrop-blur-xl' : 'bg-bg/40 backdrop-blur-sm'
        }`}
      >
        <nav className="rule-frame mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-5 sm:px-10">
          <a href="#top" className="group flex items-center gap-2.5">
            <Logo size={20} className="transition-transform duration-300 group-hover:-rotate-6" />
            <span className="text-[15px] font-semibold tracking-tight">Onyx</span>
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
              className="dot-bg inline-flex items-center gap-2.5 rounded-md bg-ink px-4 py-2.5 font-mono text-[13px] font-medium text-surface transition-colors hover:bg-ink2"
            >
              <span className="inline-block h-3 w-3 rounded-[3px] bg-surface" aria-hidden />
              Download
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="ml-auto flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-line2 bg-surface md:hidden"
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
              className="overflow-hidden border-t border-line bg-bg md:hidden"
            >
              <div className="rule-frame mx-auto flex w-full max-w-7xl flex-col px-5 py-3 sm:px-10">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-3 text-sm text-muted last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href={LINKS.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="py-3 text-sm text-muted"
                >
                  GitHub
                </a>
                <a
                  href={LINKS.download}
                  download
                  className="mb-3 mt-2 rounded-md bg-ink px-4 py-3 text-center font-mono text-[13px] font-medium text-surface"
                >
                  Download for macOS
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <ScrollProgress />
      </div>
    </header>
  )
}