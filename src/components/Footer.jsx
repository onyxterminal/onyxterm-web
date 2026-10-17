import { Reveal, CTA } from './ui.jsx'
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
    <footer className="relative overflow-hidden border-t border-line px-5 pt-20 pb-10 sm:px-8 md:pt-28">
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-40" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-start gap-7">
            <h2 className="max-w-[16ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl">
              Stop managing terminals. <span className="text-accent">Start working.</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <CTA href={LINKS.download} variant="primary" download>
                Download for macOS
                <span className="opacity-60">· 6.9 MB</span>
              </CTA>
              <CTA href={LINKS.repo}>View on GitHub</CTA>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inset-x-0 top-0 h-[4px] bg-accent" />
                <span className="absolute inset-x-0 bottom-0 h-[4px] w-2 bg-ink" />
              </span>
              <span className="font-mono text-[14px] font-bold tracking-tight">Onyx</span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted">
              A local-first, Rust-native terminal workspace and agent control center for people with
              more sessions than tabs. Built in the open on a Mac.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] tracking-[0.12em] text-faint uppercase">
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