import { Reveal, CTA } from './ui.jsx'
import Logo from './Logo.jsx'
import { LINKS, VERSION } from '../site.js'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Why', href: '#why' },
      { label: 'How it works', href: '#model' },
      { label: 'Agents', href: '#agents' },
      { label: 'Features', href: '#features' },
    ],
  },
  {
    title: 'Code',
    links: [
      { label: 'Repository', href: LINKS.repo, ext: true },
      { label: 'Releases', href: LINKS.release, ext: true },
      { label: 'Issues', href: LINKS.issues, ext: true },
      { label: 'Install', href: '#install' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div className="dot-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="rule-frame relative mx-auto w-full max-w-7xl px-5 pt-20 pb-10 sm:px-10 md:pt-28">
        <Reveal>
          <div className="flex flex-col items-start gap-7">
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance">
              Stop managing terminals.
              <br />
              <span className="pixel text-[1.1em]">Start working.</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <CTA href={LINKS.download} variant="primary" download chip>
                Download for macOS
              </CTA>
              <CTA href={LINKS.repo}>View on GitHub</CTA>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo size={18} />
              <span className="text-[14px] font-semibold tracking-tight">Onyx</span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-[1.7] text-muted">
              A local-first, Rust-native terminal workspace and agent control center for people with
              more sessions than tabs. Built in the open on a Mac.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.ext ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="text-[13.5px] text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>Onyx {VERSION} · macOS 13+ · Apple Silicon</span>
          <span>Built with Rust, GPUI and SQLite. Not affiliated with Zellij or Ghostty.</span>
        </div>
      </div>
    </footer>
  )
}