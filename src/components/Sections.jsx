import { useState } from 'react'
import { Reveal, Section, Stagger, StaggerItem, PixelLabel, PixelRule, CTA } from './ui.jsx'
import Shot from './Shot.jsx'
import { FEATURES } from '../site.js'
import { LINKS } from '../site.js'

/* ---------------------------------------------------------------- */

function Why() {
  return (
    <Section label="the problem">
      <Reveal>
        <p className="text-[clamp(1.6rem,4.5vw,2.6rem)] leading-[1.15] font-bold tracking-[-0.035em] text-balance">
          Six shells. Four agents.
          <br />
          One remote box.
          <br />
          <span className="text-line2">Zero ways to find them.</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.7] text-muted">
          You rebuild the same layout every morning and lose track of it by lunch. Onyx gives every
          workspace, tab and pane a name, then puts the layout back exactly as it was.
        </p>
      </Reveal>
    </Section>
  )
}

/* ---------------------------------------------------------------- */

function What() {
  return (
    <Section label="what you get">
      <Stagger className="divide-y divide-line border-y border-line">
        {FEATURES.map((f) => (
          <StaggerItem key={f.n}>
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 py-5 sm:grid-cols-[3rem_14rem_1fr]">
              <span className="pixel text-[11px] text-line2">{f.n}</span>
              <h3 className="text-[15px] font-semibold tracking-tight">{f.title}</h3>
              <p className="col-start-2 text-[14px] leading-[1.6] text-muted sm:col-start-3">{f.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Shot
        className="mt-12"
        src="/shot-panes.png"
        alt="Three panes in one Onyx workspace: a running claude agent session, the project file tree, and a shell"
        caption="One workspace, three panes: an agent mid-task, the file tree, and a shell that never moved."
      />
    </Section>
  )
}

/* ---------------------------------------------------------------- */

function Copy({ code }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          setCopied(false)
        }
      }}
      className="group flex w-full items-start gap-4 py-3 text-left"
    >
      <span className="select-none font-mono text-[11px] text-line2">$</span>
      <span className="min-w-0 flex-1 font-mono text-[12.5px] leading-[1.6] break-all text-ink2 transition-colors group-hover:text-ink">
        {code}
      </span>
      <span className="shrink-0 font-mono text-[11px] text-line2 transition-colors group-hover:text-ink">
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  )
}

function Install() {
  return (
    <Section label="install">
      <Reveal>
        <p className="max-w-[52ch] text-[15px] leading-[1.7] text-muted">
          macOS 13+, Apple Silicon. Two commands and you are running.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-8 divide-y divide-line border-y border-line">
          <Copy code={LINKS.installCmd} />
          <Copy code="open Onyx-0.4.0-macos-arm64.dmg" />
          <Copy code="xattr -dr com.apple.quarantine /Applications/Onyx.app" />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-[52ch] text-[13.5px] leading-[1.7] text-faint">
          Onyx is not signed with a Developer ID certificate yet, so macOS quarantines the download
          and refuses to open it. The third command clears that flag. The build workflow already
          has signing, notarization and stapling staged — switch on the identity and they turn on
          with no other change.
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <CTA href={LINKS.download} variant="primary" download>
            Download Onyx v0.4.0
          </CTA>
          <CTA href={LINKS.repo}>Build from source</CTA>
        </div>
      </Reveal>
    </Section>
  )
}

/* ---------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="px-5 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <PixelRule className="mb-8" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={16} />
            <span className="font-mono text-[12px] text-muted">Onyx v0.4.0</span>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[12px] text-muted">
            <a href={LINKS.repo} target="_blank" rel="noreferrer noopener" className="hover:text-ink">
              GitHub
            </a>
            <a href={LINKS.release} target="_blank" rel="noreferrer noopener" className="hover:text-ink">
              Releases
            </a>
            <a href={LINKS.issues} target="_blank" rel="noreferrer noopener" className="hover:text-ink">
              Issues
            </a>
          </div>
        </div>
        <p className="mt-6 font-mono text-[11px] text-faint">
          macOS 13+ · arm64 · built in the open
        </p>
      </div>
    </footer>
  )
}

export { Why, What, Install, Footer }