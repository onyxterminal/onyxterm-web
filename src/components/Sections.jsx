import { useState } from 'react'
import {
  Reveal,
  Section,
  Stagger,
  StaggerItem,
  SectionHead,
  Hairline,
  CTA,
  Tag,
  Keycap,
  GithubMark,
  StarMark,
  Dot,
} from './ui.jsx'
import Logo from './Logo.jsx'
import Shot from './Shot.jsx'
import {
  AGENT_CARDS,
  AGENT_GUARANTEES,
  FAQ,
  FEATURES,
  FIDELITY,
  INSTALL_NOTE,
  LINKS,
  MODEL,
  REPO,
  SHORTCUTS,
  SOURCE,
  TALLY,
  VERSION,
} from '../site.js'

/* ------------------------------------------------------- 01 the problem */

function Why() {
  return (
    <Section id="why" n="01" label="the problem">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="display text-[clamp(1.55rem,3.8vw,2.6rem)] text-ink">
              Six shells. Four agents.
              <br />
              One remote box.
              <br />
              <span className="text-line2">Zero ways to find them.</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="prose mt-7 max-w-[54ch] text-[15.5px]">
              You rebuild the same layout every morning and lose track of it by lunch. Onyx gives
              every workspace, tab and pane a name, then puts the layout back exactly as it was.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <dl className="border-t border-line">
            {TALLY.map(([n, l, tone]) => (
              <div
                key={l}
                className="flex items-baseline justify-between gap-4 border-b border-line py-4"
              >
                <dt className="label">{l}</dt>
                <dd
                  className={`tnum font-mono text-[20px] leading-none font-medium ${
                    { muted: 'text-ink2', accent: 'text-accent', ink: 'text-ink' }[tone]
                  }`}
                >
                  {n}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------- 02 how it works */

function Model() {
  return (
    <Section id="model" n="02" label="how it works">
      <Reveal>
        <h3 className="display max-w-[20ch] text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
          Three things, each with a name.
        </h3>
      </Reveal>

      {/* a spec table, not three equal cards — equal cards are the default
          shape and they say nothing about which of the three matters most */}
      <Stagger className="mt-12 border-t border-line">
        {MODEL.map((m) => (
          <StaggerItem key={m.n}>
            <div className="grid gap-x-8 gap-y-3 border-b border-line py-7 md:grid-cols-12 md:items-start">
              <div className="flex items-baseline gap-3 md:col-span-3">
                <span className="tnum font-mono text-[11px] text-accent">{m.n}</span>
                <span className="font-mono text-[15px] font-medium text-ink">{m.name}</span>
              </div>
              <p className="md:col-span-6 md:col-start-4 text-[14px] leading-[1.65] text-muted">
                <span className="font-mono text-[12.5px] text-faint">{m.what} — </span>
                {m.blurb}
              </p>
              <div className="flex flex-wrap gap-1.5 md:col-span-3 md:justify-end">
                {m.keys.map((k) => (
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

/* --------------------------------------------------------------- 03 agents */

function Agents() {
  return (
    <Section id="agents" n="03" label="agents">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <h3 className="display max-w-[16ch] text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
              Agents are panes, not a separate app.
            </h3>
          </Reveal>

          <Stagger className="mt-9 border-t border-line">
            {AGENT_CARDS.map((a) => (
              <StaggerItem key={a.name}>
                <div className="flex items-start gap-4 border-b border-line py-5">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line2 bg-sunken font-mono text-[11px] text-ink">
                    {a.name.slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[13.5px] text-ink">{a.name}</span>
                      <span className="label">{a.role}</span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-[1.6] text-muted">{a.blurb}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <div className="border border-line bg-panel p-6 md:p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-accent">—</span>
              <h4 className="label">what Onyx guarantees</h4>
            </div>
            <ul className="mt-5 space-y-3.5">
              {AGENT_GUARANTEES.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <Dot tone="accent" className="mt-2 h-1.5 w-1.5 shrink-0" />
                  <span className="text-[13.5px] leading-[1.6] text-muted">{g}</span>
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

/* ------------------------------------------------------------ 04 features */

function What() {
  return (
    <Section id="features" n="04" label="what you get">
      <Reveal>
        <h3 className="display max-w-[22ch] text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
          Eight things that ship today.
        </h3>
      </Reveal>
      {/* eight features as a dense two-column spec list. This used to be a
          three-across card grid — the single most recognisable template
          layout on the web. */}
      <Stagger className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-14">
        {FEATURES.map((f) => (
          <StaggerItem key={f.n}>
            <div className="h-full border-b border-line py-6">
              <div className="flex items-baseline gap-3">
                <span className="tnum font-mono text-[11px] text-accent">{f.n}</span>
                <h3 className="font-mono text-[14.5px] leading-snug font-medium text-ink">
                  {f.title}
                </h3>
              </div>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-muted">{f.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

/* ------------------------------------------------------------ 05 showcase */

function Showcase() {
  const panes = [
    ['claude', 'agent mid-task'],
    ['onyxterm', 'git-aware file tree'],
    ['zsh', 'a shell that never moved'],
  ]
  return (
    <Section id="showcase" n="05" label="the real thing">
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <h3 className="display text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
              An agent, a file tree and a shell. One window.
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="prose mt-6 max-w-[44ch] text-[15px]">
              Every pane is a real PTY with its own name, working directory and process. Resize,
              rearrange and swap them freely — the work underneath never stops.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <dl className="mt-8 border-t border-line">
              {panes.map(([name, role]) => (
                <div
                  key={name}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                >
                  <dt className="flex items-center gap-2.5 font-mono text-[12.5px] text-ink">
                    <Dot tone="accent" className="h-1.5 w-1.5" />
                    {name}
                  </dt>
                  <dd className="text-[12.5px] text-faint">{role}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <Shot
            src="/shot-panes.png"
            alt="An Onyx workspace with a claude session on the left, the file tree top-right, and a shell below it"
            caption="One Onyx workspace: a claude session on the left, the file tree top-right, a shell below it."
          />
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ 06 fidelity */

function Fidelity() {
  return (
    <Section id="fidelity" n="06" label="not a preview">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <h3 className="display text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
              When a program asks for something specific, Onyx does it.
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="prose mt-6 max-w-[44ch] text-[15px]">
              Real PTYs, full VT emulation, and process-group signalling. The fiddly terminal
              details are the product, not an afterthought.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
          {FIDELITY.map((f, i) => (
            <StaggerItem key={f}>
              <div className="flex items-start gap-3 border-b border-line py-3.5">
                <span className="tnum mt-px shrink-0 font-mono text-[10.5px] text-line2">
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

/* -------------------------------------------------------------- 07 install */

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
      className="group flex w-full items-start gap-3 py-3 text-left"
    >
      <span className="select-none font-mono text-[11px] text-accent" aria-hidden>
        ❯
      </span>
      <span className="min-w-0 flex-1 font-mono text-[12.5px] leading-[1.6] break-all text-ink transition-colors group-hover:text-accent">
        {code}
      </span>
      <span
        className={`shrink-0 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
          copied ? 'text-accent' : 'text-line2 group-hover:text-faint'
        }`}
      >
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  )
}

function Install() {
  return (
    <Section id="install" n="07" label="install">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <h3 className="display max-w-[18ch] text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
              macOS 13+, Apple Silicon. Three commands.
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="prose mt-6 max-w-[50ch] text-[15px]">
              One file, no installer, no account. The last command clears the quarantine flag macOS
              puts on an unsigned download.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 border-t border-line bg-panel px-4">
              <Copy code={LINKS.installCmd} />
              <div className="border-t border-line">
                <Copy code="open Onyx-0.4.0-macos-arm64.dmg" />
              </div>
              <div className="border-t border-line">
                <Copy code="xattr -dr com.apple.quarantine /Applications/Onyx.app" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <CTA href={LINKS.download} variant="primary" download>
                Download Onyx {VERSION}
              </CTA>
              <CTA href={LINKS.repo}>
                <GithubMark size={14} />
                Build from source
              </CTA>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border-l-2 border-accent bg-panel p-6 md:p-7">
            <h4 className="font-mono text-[12px] font-medium text-accent">note</h4>
            <p className="mt-3.5 text-[13.5px] leading-[1.7] text-muted">{INSTALL_NOTE.body}</p>
            <dl className="mt-6 border-t border-line pt-4">
              {INSTALL_NOTE.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-1.5">
                  <dt className="label">{k}</dt>
                  <dd className="tnum text-right font-mono text-[12px] text-ink2">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ 08 shortcuts */

function Shortcuts() {
  return (
    <Section id="shortcuts" n="08" label="shortcuts">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="display text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
            Every action, one keystroke.
          </h3>
          <Tag>conflict-checked</Tag>
        </div>
      </Reveal>
      <Stagger className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-14 lg:grid-cols-3">
        {SHORTCUTS.map(([k, l]) => (
          <StaggerItem key={k}>
            <div className="flex items-center gap-3 border-b border-line py-2.5">
              <span className="w-[92px] shrink-0 font-mono text-[12px] text-ink">{k}</span>
              <span className="truncate text-[13px] text-muted">{l}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

/* --------------------------------------------------------------- 09 source */

function Source() {
  return (
    <Section id="source" n="09" label="open source">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <h3 className="display text-[clamp(1.5rem,3.4vw,2.3rem)] text-ink">
              Read it, fork it, or tell us what is broken.
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="prose mt-6 max-w-[48ch] text-[15px]">
              The source has been public from the first commit. It is a{' '}
              <span className="tnum font-mono text-[13.5px] text-ink2">{REPO.lines}</span> lines of{' '}
              {REPO.language}, built by {REPO.contributors} person, and it is not finished.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <CTA href={LINKS.repo} variant="primary">
                <StarMark size={14} />
                Star the repo
              </CTA>
              <CTA href={LINKS.newIssue}>
                Report a problem
              </CTA>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border border-line bg-panel p-6 md:p-7">
            <dl className="border-b border-line pb-2">
              {SOURCE.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2">
                  <dt className="label">{k}</dt>
                  <dd
                    className={`tnum text-right font-mono text-[12.5px] ${
                      k === 'license' ? 'text-accent' : 'text-ink2'
                    }`}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[13px] leading-[1.7] text-muted">{SOURCE.note}</p>
            <Hairline className="my-6" />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {SOURCE.actions.map(([label, key]) => (
                <a
                  key={label}
                  href={LINKS[key]}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 font-mono text-[12.5px] text-faint transition-colors hover:text-ink"
                >
                  <span className="text-accent" aria-hidden>
                    ›
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ 10 questions */

function Faq() {
  return (
    <Section id="faq" n="10" label="questions" width="max-w-5xl">
      {/* No accordion. Four of these six answers are the reason to trust the
          project, and an accordion hides them behind a click. */}
      <Stagger className="grid border-t border-line md:grid-cols-2 md:gap-x-16">
        {FAQ.map((f, i) => (
          <StaggerItem key={f.q}>
            <div className="h-full border-b border-line py-6">
              <h3 className="flex gap-3 font-mono text-[13.5px] leading-snug font-medium text-ink">
                <span className="tnum shrink-0 text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span>{f.q}</span>
              </h3>
              <p className="mt-3 pl-8 text-[13.5px] leading-[1.68] text-muted">{f.a}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

/* ----------------------------------------------------------------- closing */

function Closing() {
  return (
    <section className="px-5 pb-20 sm:px-8 md:pb-28">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="dotgrid-invert relative overflow-hidden bg-void px-6 py-14 md:px-14 md:py-20">
            <div className="relative mx-auto max-w-2xl text-center">
              <Logo size={30} tone="inverse" className="mx-auto" />
              <h2 className="display mt-7 text-[clamp(1.6rem,4.2vw,2.6rem)] text-white">
                Name it once.
                <br />
                Find it forever.
              </h2>
              <p className="mx-auto mt-6 max-w-[46ch] text-[15.5px] leading-[1.65] text-[#c9c5be]">
                One download, no account, no cloud. Your shells, your agents, your layout.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={LINKS.download}
                  download
                  className="inline-flex items-center gap-2 rounded-[3px] bg-white px-5 py-3 font-mono text-[13px] leading-none font-medium text-void transition-[background-color,transform] duration-150 hover:bg-[#d8d8d6] active:translate-y-px"
                >
                  Download Onyx {VERSION}
                </a>
                <a
                  href={LINKS.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-[3px] border border-white/30 px-5 py-3 font-mono text-[13px] leading-none font-medium text-white transition-colors duration-150 hover:border-white hover:bg-white/5"
                >
                  <StarMark size={14} />
                  <span className="tnum">Star {REPO.stars}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={16} tone="ink" />
            <span className="tnum font-mono text-[12.5px] text-muted">Onyx {VERSION}</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12.5px]">
            {[
              ['GitHub', LINKS.repo],
              ['Releases', LINKS.release],
              ['Issues', LINKS.issues],
              ['Discussions', LINKS.discussions],
            ].map(([l, href]) => (
              <a
                key={l}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted transition-colors duration-150 hover:text-ink"
              >
                {l}
              </a>
            ))}
          </nav>
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

export { Why, Model, Agents, What, Showcase, Fidelity, Install, Shortcuts, Source, Faq, Closing, Footer }