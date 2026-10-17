import { useState } from 'react'
import { Reveal, Section, SectionHead, CTA } from './ui.jsx'
import { LINKS, VERSION } from '../site.js'

function CopyBlock({ label, code, multiline = false }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }
  return (
    <div className="group relative overflow-hidden rounded-lg border border-line bg-bg">
      {label && (
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase">
            {label}
          </span>
          <button
            type="button"
            onClick={copy}
            className="font-mono text-[10.5px] text-faint transition-colors hover:text-accent"
          >
            {copied ? 'copied ✓' : 'copy'}
          </button>
        </div>
      )}
      <pre
        className={`px-4 py-3.5 font-mono text-[12.5px] leading-[1.7] text-ink2 ${multiline ? 'overflow-x-auto' : 'break-all'}`}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Download the disk image',
    body: 'One 6.9 MB DMG for macOS 13+ on Apple Silicon. No installer, no account, no telemetry.',
  },
  {
    n: '02',
    title: 'Drag Onyx into Applications',
    body: 'It installs like any other Mac app and shows up in Spotlight and the Dock immediately.',
  },
  {
    n: '03',
    title: 'Clear the quarantine flag once',
    body: 'Onyx has no Developer ID certificate yet, so Gatekeeper blocks the first launch. One command fixes it permanently.',
  },
]

export default function Install() {
  return (
    <Section id="install">
      <SectionHead
        eyebrow="install"
        title="Download. Drag. Done."
        lede={`One ${'6.9 MB'} disk image for macOS 13+ on Apple Silicon. No installer, no account, no telemetry, no email.`}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="flex gap-4 rounded-xl border border-line bg-surface p-5">
                <span className="mt-0.5 font-mono text-[11px] text-accent">{s.n}</span>
                <div>
                  <h3 className="font-mono text-[14px] font-medium tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="space-y-4 lg:col-span-2">
          <Reveal delay={0.1}>
            <CopyBlock label="download" code={LINKS.installCmd} />
          </Reveal>
          <Reveal delay={0.14}>
            <CopyBlock label="clear the gatekeeper block" code="xattr -dr com.apple.quarantine /Applications/Onyx.app" />
          </Reveal>
          <Reveal delay={0.18}>
            <div className="rounded-xl border-l-2 border-accent bg-surface p-5">
              <h3 className="font-mono text-[12px] tracking-tight text-ink">
                Why the extra step
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                Without a Developer ID certificate macOS quarantines the download and refuses to
                open it. The build workflow already has the signing, notarization and stapling steps
                written and inert — set{' '}
                <span className="font-mono text-ink2">APPLE_SIGNING_IDENTITY</span> and they switch
                on with no other change.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-4 rounded-xl border border-line bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h3 className="font-mono text-base tracking-tight text-ink">
                Prefer to build it yourself?
              </h3>
              <p className="mt-1.5 text-[13.5px] text-muted">
                Rust 1.85 or newer. The bundling script produces an ad-hoc signed{' '}
                <span className="font-mono text-ink2">.app</span> and installs it for you.
              </p>
            </div>
            <div className="w-full max-w-md">
              <CopyBlock
                multiline
                code={`git clone https://github.com/onyxterminal/onyxterm
cd onyxterm
scripts/bundle-macos.sh --install`}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <CTA href={LINKS.download} variant="primary" download>
            Download Onyx {VERSION}
            <span className="opacity-60">· arm64</span>
          </CTA>
          <CTA href={LINKS.repo}>Browse the source</CTA>
        </div>
      </Reveal>
    </Section>
  )
}