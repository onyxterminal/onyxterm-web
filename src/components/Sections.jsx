import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Reveal,
  Section,
  Stagger,
  StaggerItem,
  Hairline,
  Label,
  CTA,
  Chip,
  Dot,
  Keycap,
} from './ui.jsx'
import Logo from './Logo.jsx'
import Shot from './Shot.jsx'
import { ChevronDown } from 'lucide-react'
import {
  FEATURES,
  FIDELITY,
  MODEL,
  AGENT_CARDS,
  AGENT_GUARANTEES,
  FAQ,
  SHORTCUTS,
  TICKER,
  LINKS,
} from '../site.js'

/* --------------------------------------------------------------- ticker */

function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-canvas/60 py-3.5">
      <div className="marquee flex w-max items-center gap-8 whitespace-nowrap">
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-mono text-[12px] text-faint">{t}</span>
            <span className="h-1 w-1 rounded-full bg-line2" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  )
}

/* ------------------------------------------------------------- the problem */

function Why() {
  return (
    <Section id="why" label="the problem" width="max-w-6xl">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="text-[clamp(1.7rem,4.4vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink2">
              Six shells. Four agents.
              <br />
              One remote box.
              <br />
              <span className="text-faint">Zero ways to find them.</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[54ch] text-[15.5px] leading-[1.7] text-muted">
              You rebuild the same layout every morning and lose track of it by lunch. Onyx gives
              every workspace, tab and pane a name, then puts the layout back exactly as it was.
            </p>
          </Reveal>
        </div>

        {/* the tally, stated plainly — no invented chrome */}
        <Reveal delay={0.12}>
          <dl className="divide-y divide-line rounded-xl border border-line bg-panel px-5">
            {[
              ['6', 'shells open', 'muted'],
              ['4', 'agents running', 'green'],
              ['1', 'remote box', 'muted'],
              ['0', 'ways to find them', 'red'],
            ].map(([n, l, tone]) => (
              <div key={l} className="flex items-baseline gap-5 py-4">
                <dt className="w-6 shrink-0 text-right font-mono text-[19px] font-medium text-ink2">
                  {n}
                </dt>
                <dd
                  className={`font-mono text-[13px] ${
                    { muted: 'text-muted', green: 'text-green', red: 'text-red' }[tone]
                  }`}
                >
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ model */

function Model() {
  return (
    <Section id="model" label="how it works" width="max-w-6xl">
      <Reveal>
        <h2 className="max-w-[18ch] text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-ink2">
          Three things, each with a name.
        </h2>
      </Reveal>

      <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {MODEL.map((m) => (
          <StaggerItem key={m.n} className="bg-panel">
            <div className="flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-widest text-accent">{m.n}</span>
                <span className="font-mono text-[11px] text-faint">{m.what}</span>
              </div>
              <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-ink2">
                {m.name}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-muted">{m.blurb}</p>
              <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-line pt-4">
                {m.keys.split(' · ').map((k) => (
                  <Keycap key={k}>{k}</Keycap>
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

/* ----------------------------------------------------------------- agents */

function Agents() {
  return (
    <Section id="agents" label="agents" width="max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-ink2">
              Agents are panes, not a separate app.
            </h2>
          </Reveal>

          <Stagger className="mt-8 space-y-3">
            {AGENT_CARDS.map((a) => (
              <StaggerItem key={a.name}>
                <div className="flex items-start gap-4 rounded-lg border border-line bg-panel p-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line2 bg-raised font-mono text-[12px] text-ink2">
                    {a.name.slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[13px] text-ink2">{a.name}</div>
                    <p className="mt-1 text-[13.5px] leading-[1.6] text-muted">{a.blurb}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-line bg-canvas/60 p-6">
            <Label className="mb-5">what Onyx guarantees</Label>
            <ul className="space-y-3.5">
              {AGENT_GUARANTEES.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <Dot tone="green" className="mt-1.5 h-1.5 w-1.5 shrink-0" />
                  <span className="text-[14px] leading-[1.6] text-muted">{g}</span>
                </li>
              ))}
            </ul>
            <Hairline className="my-6" />
            <p className="text-[13px] leading-[1.65] text-faint">
              Onyx drives the CLIs you already have on your PATH. Your provider authentication is
              yours — Onyx never asks for a token.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------- what / features */

function What() {
  return (
    <Section id="features" label="what you get" width="max-w-6xl">
      <Stagger className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <StaggerItem key={f.n} className="bg-panel">
            <div className="group h-full p-6 transition-colors hover:bg-raised">
              <span className="font-mono text-[11px] tracking-widest text-accent">{f.n}</span>
              <h3 className="mt-4 text-[15.5px] leading-[1.35] font-semibold text-ink2">
                {f.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-muted">{f.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

/* ------------------------------------------------------------- fidelity */

function Fidelity() {
  return (
    <Section id="fidelity" label="not a preview" width="max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-ink2">
              When a program asks for something specific, Onyx does it.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
              Real PTYs, full VT emulation, and process-group signalling. The fiddly terminal
              details are the product, not an afterthought.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
          {FIDELITY.map((f, i) => (
            <StaggerItem key={f}>
              <div className="flex items-start gap-3 border-t border-line py-3.5">
                <span className="mt-px font-mono text-[10px] text-faint/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[13px] leading-[1.55] text-muted">{f}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ shortcuts */

function ShortcutGrid() {
  return (
    <Stagger className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
      {SHORTCUTS.map(([k, l]) => (
        <StaggerItem key={k}>
          <div className="flex items-center gap-3 border-t border-line py-2.5">
            <span className="w-[104px] shrink-0 font-mono text-[12px] text-ink2">{k}</span>
            <span className="truncate text-[13px] text-muted">{l}</span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

function Shortcuts() {
  return (
    <Section id="shortcuts" label="shortcuts" width="max-w-6xl">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.12] font-bold tracking-[-0.03em] text-ink2">
            Every action, one keystroke.
          </h2>
          <Chip>conflict-checked</Chip>
        </div>
      </Reveal>
      <ShortcutGrid />
    </Section>
  )
}

/* -------------------------------------------------------------- install */

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
      className="group flex w-full items-start gap-3.5 py-3 text-left"
    >
      <span className="select-none font-mono text-[11px] text-green">❯</span>
      <span className="min-w-0 flex-1 font-mono text-[12.5px] leading-[1.6] break-all text-ink transition-colors group-hover:text-accent">
        {code}
      </span>
      <span
        className={`shrink-0 font-mono text-[10.5px] tracking-wider uppercase transition-colors ${
          copied ? 'text-green' : 'text-faint group-hover:text-muted'
        }`}
      >
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  )
}

function Install() {
  return (
    <Section id="install" label="install" width="max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-ink2">
              macOS 13+, Apple Silicon. Three commands.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 max-w-[50ch] text-[15px] leading-[1.7] text-muted">
              One file, no installer, no account. The last command clears the quarantine flag macOS
              puts on an unsigned download.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-panel px-4">
              <Copy code={LINKS.installCmd} />
              <Copy code="open Onyx-0.4.0-macos-arm64.dmg" />
              <Copy code="xattr -dr com.apple.quarantine /Applications/Onyx.app" />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CTA href={LINKS.download} variant="primary" download>
                Download Onyx v0.4.0
              </CTA>
              <CTA href={LINKS.repo}>Build from source</CTA>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-amber/25 bg-amber/[0.05] p-6">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[12px] text-amber">note</span>
              <Hairline className="flex-1" />
            </div>
            <p className="mt-4 text-[13.5px] leading-[1.7] text-muted">
              Onyx is not signed with a Developer ID certificate yet, so macOS quarantines the
              download and refuses the first launch. The build workflow already has signing,
              notarization and stapling staged — switch on the identity and they turn on with no
              other change.
            </p>
            <dl className="mt-6 space-y-2.5 border-t border-amber/15 pt-5 font-mono text-[12px]">
              {[
                ['platform', 'macos-13+ · arm64'],
                ['size', '6.9 MB · single dmg'],
                ['account', 'none'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-faint">{k}</dt>
                  <dd className="text-right text-ink2">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------- faq */

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" label="questions" width="max-w-4xl">
      <div className="divide-y divide-line border-y border-line">
        {FAQ.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 py-5 text-left"
              >
                <span className="mt-0.5 font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`flex-1 text-[15px] leading-[1.4] font-medium transition-colors ${
                    isOpen ? 'text-ink2' : 'text-ink'
                  }`}
                >
                  {f.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`mt-0.5 shrink-0 text-faint transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-accent' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-[68ch] pr-8 pb-6 pl-9 text-[14px] leading-[1.7] text-muted">
                  {f.a}
                </p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------- showcase */

function Showcase() {
  return (
    <Section id="showcase" label="the real thing" width="max-w-6xl">
      <Stagger className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
        <StaggerItem>
          <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-ink2">
            An agent, a file tree and a shell. One window.
          </h2>
          <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
            Every pane is a real PTY with its own name, working directory and process. Resize,
            rearrange and swap them freely — the work underneath never stops.
          </p>
          <div className="mt-7 space-y-3">
            {[
              ['claude', 'agent mid-task', 'green'],
              ['onyxterm', 'git-aware file tree', 'blue'],
              ['zsh', 'a shell that never moved', 'muted'],
            ].map(([name, role, tone]) => (
              <div key={name} className="flex items-center gap-3 font-mono text-[12.5px]">
                <Dot tone={tone} className="h-1.5 w-1.5 shrink-0" />
                <span className="w-20 text-ink2">{name}</span>
                <span className="text-faint">{role}</span>
              </div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <Shot
            src="/shot-panes.png"
            alt="An Onyx workspace with a claude session on the left, the file tree top-right, and a shell below it"
            caption="One Onyx workspace: a claude session on the left, the file tree top-right, a shell below it."
            glow
          />
        </StaggerItem>
      </Stagger>
    </Section>
  )
}

/* ----------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-line bg-canvas/40 px-5 py-12 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={17} tone="ink" />
            <span className="font-mono text-[12.5px] text-muted">Onyx v0.4.0</span>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[12px]">
            {[
              ['GitHub', LINKS.repo],
              ['Releases', LINKS.release],
              ['Issues', LINKS.issues],
            ].map(([l, href]) => (
              <a
                key={l}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted transition-colors hover:text-ink"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <Hairline className="my-8" />
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-faint">
          <span>macOS 13+ · arm64 · Rust · GPUI</span>
          <span>no account · no telemetry · local SQLite</span>
        </div>
      </div>
    </footer>
  )
}

export { Ticker, Why, Model, Agents, What, Showcase, Fidelity, Shortcuts, Install, Faq, Footer }
