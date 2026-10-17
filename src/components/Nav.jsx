import Logo from './Logo.jsx'
import { Dot } from './ui.jsx'
import { LINKS, NAV_LINKS } from '../site.js'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-void/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="group flex shrink-0 items-center gap-2.5">
          <Logo size={19} tone="ink" />
          <span className="font-mono text-[14px] font-bold tracking-tight text-ink2">
            Onyx
          </span>
          <span className="hidden font-mono text-[10px] text-faint sm:inline">v0.4.0</span>
        </a>

        <div className="ml-2 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 font-mono text-[12.5px] text-muted transition-colors hover:bg-raised hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={LINKS.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[12.5px] text-muted transition-colors hover:text-ink sm:flex"
          >
            <Dot tone="green" className="h-1.5 w-1.5" />
            GitHub
          </a>
          <a
            href={LINKS.download}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-mono text-[12.5px] font-medium text-onaccent transition-all duration-150 hover:bg-blue hover:shadow-[0_8px_22px_-8px_rgba(11,98,204,0.55)]"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  )
}
