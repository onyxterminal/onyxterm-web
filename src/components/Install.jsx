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
    <div className="overflow-hidden rounded-lg border border-line bg-bg">
      {label && (
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase">
            {label}
          </span>
          <button
            type="button"
            onClick={copy}
            className="font-mono text-[10.5px] text-faint transition-colors hover:text-ink"
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

export default function Install() {
  return (
    <Section id="install">
      <SectionHead
        eyebrow="install"
        title="Download. Drag. Done."
        lede={`One 6.9 MB disk image for macOS 13+ on Apple Silicon. No installer, no account, no email address.`}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          <Reveal delay={0.06}>
            <CopyBlock label="1 · download" code={LINKS.installCmd} />
          </Reveal>
          <Reveal delay={0.1}>
            <CopyBlock
              label="2 · clear the gatekeeper block"
              code="xattr -dr com.apple.quarantine /Applications/Onyx.app"
            />
          </Reveal>
          <Reveal delay={0.14}>
            <div className="rounded-xl border border-line bg-bg p-5">
              <h3 className="text-[14px] font-semibold tracking-tight">Why that second command exists</h3>
              <p className="mt-2 text-[13.5px] leading-[1.7] text-muted">
                Onyx is not signed with a Developer ID certificate yet, so macOS quarantines the
                download and refuses to open it. One command clears the flag, permanently. The
                build workflow already has signing, notarization and stapling written and inert —
                switch on the identity and all three turn on with no other change.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-bg p-6">
            <div>
              <h3 className="text-[14px] font-semibold tracking-tight">Requirements</h3>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-[1.6] text-muted">
                <li>macOS 13 or newer</li>
                <li>Apple Silicon (arm64)</li>
                <li>
                  <code className="font-mono text-[12.5px] text-ink">claude</code> or{' '}
                  <code className="font-mono text-[12.5px] text-ink">codex</code> on your PATH for
                  the agent panes
                </li>
              </ul>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] text-muted">Prefer to build it yourself?</p>
              <div className="mt-3">
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
      </div>

      <Reveal delay={0.18}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CTA href={LINKS.download} variant="primary" download chip>
            Download Onyx {VERSION}
          </CTA>
          <CTA href={LINKS.repo}>View on GitHub</CTA>
        </div>
      </Reveal>
    </Section>
  )
}