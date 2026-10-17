import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { StarMark, GithubMark, Dot } from './ui.jsx'
import { LINKS, NAV_LINKS, REPO, VERSION } from '../site.js'
import { observeSections } from '../scroll.js'

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

function NavLink({ link, active, onClick, roomy = false }) {
  return (
    <a
      href={link.href}
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={`group flex items-baseline gap-2 font-mono text-[12.5px] transition-colors duration-150 ${
        roomy
          ? 'w-full rounded-[3px] px-3 py-3' // 44px row for touch
          : 'rounded-md px-2.5 py-1.5'
      } ${active ? 'text-ink' : 'text-faint hover:text-ink'}`}
    >
      <span className={`tnum text-[10px] ${active ? 'text-ink' : 'text-line2'}`}>{link.n}</span>
      <span className={active ? 'underline decoration-ink decoration-1 underline-offset-[5px]' : ''}>
        {link.label}
      </span>
    </a>
  )
}

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => observeSections(SECTION_IDS, setActive), [])

  // The panel is a full-height overlay on mobile. Lock the page behind it
  // and let Escape close it, so it behaves like the dialog it is.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <Logo size={18} tone="ink" />
          <span className="font-mono text-[13.5px] font-medium tracking-tight text-ink">Onyx</span>
          <span className="tnum hidden font-mono text-[10.5px] text-line2 sm:inline">{VERSION}</span>
        </a>

        <div className="ml-3 hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.href} link={l} active={active === l.href.slice(1)} />
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={LINKS.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-1.5 rounded-[3px] border border-line2 px-3 py-2 font-mono text-[12px] text-muted transition-[border-color,color,background-color] duration-150 hover:border-faint hover:bg-sunken hover:text-ink sm:inline-flex"
          >
            <StarMark size={13} className="text-accent" />
            <span className="tnum">{REPO.stars}</span>
            <span className="sr-only">stars on GitHub</span>
          </a>

          <a
            href={LINKS.download}
            download
            className="inline-flex items-center gap-2 rounded-[3px] bg-ink px-4 py-2 font-mono text-[12.5px] leading-none font-medium text-onaccent transition-[background-color,transform] duration-150 hover:bg-ink2 active:translate-y-px"
          >
            Download
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative flex h-11 w-11 items-center justify-center rounded-[3px] border border-line2 text-ink transition-colors duration-150 hover:bg-sunken lg:hidden"
          >
            {/* Both glyphs stay mounted and cross-fade + rotate, so the
                control never pops between two unrelated shapes. */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              aria-hidden
              className={`absolute transition-[opacity,transform] duration-200 ${
                open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
              />
            </svg>
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              aria-hidden
              className={`absolute transition-[opacity,transform] duration-200 ${
                open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
              }`}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                d="M4 4l8 8M12 4l-8 8"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* The mobile menu. Without this the site had no navigation at all
          under 1024px — every section was unreachable except by scrolling. */}
      <div
        id="site-menu"
        hidden={!open}
        className="border-t border-line bg-paper lg:hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.href}
                link={l}
                roomy
                active={active === l.href.slice(1)}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
            <a
              href={LINKS.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-line2 px-4 font-mono text-[12px] text-ink"
            >
              <GithubMark size={14} />
              Source
            </a>
            <a
              href={LINKS.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-line2 px-4 font-mono text-[12px] text-ink"
            >
              <Dot tone="accent" className="h-1.5 w-1.5" />
              <span className="tnum">{REPO.stars} stars</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}