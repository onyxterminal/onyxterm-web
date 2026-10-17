import { Reveal, Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { FIDELITY } from '../site.js'

const BOOT = [
  ['store open', '3.70 ms'],
  ['bundled fonts', '0.38 ms'],
  ['workspace restore', '4.59 ms'],
  ['first pty spawned', '125 ms'],
  ['window open', '79.9 ms'],
  ['first frame', '317 ms'],
]

export default function Fidelity() {
  const longest = Math.max(...BOOT.map(([, v]) => parseFloat(v)))
  return (
    <Section id="fidelity">
      <SectionHead
        eyebrow="terminal fidelity"
        title="New chrome. An old-school terminal underneath."
        lede="It's a real PTY running a full VT engine. Programs ask for mouse reporting, specific cursors, alternate screen and focus events — and they get them."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Stagger className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
            {FIDELITY.map((f, i) => (
              <StaggerItem key={f} className="bg-bg">
                <div className="flex items-start gap-4 px-5 py-3.5">
                  <span className="mt-px font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[14px] leading-relaxed text-ink2">{f}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.08} className="lg:col-span-2">
          <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
            <h3 className="font-mono text-sm tracking-tight text-ink">Cold start, measured</h3>
            <p className="mt-2 text-[13px] text-muted">
              Logged at startup on an M-series MacBook Pro. No spinner, no stall.
            </p>
            <div className="mt-6 flex-1 space-y-3.5">
              {BOOT.map(([label, val]) => {
                const ms = parseFloat(val)
                return (
                  <div key={label}>
                    <div className="mb-1.5 flex items-baseline justify-between font-mono text-[11.5px]">
                      <span className="text-muted">{label}</span>
                      <span className={ms > 100 ? 'text-ink' : 'text-faint'}>{val}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-sunken">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.max(2, (ms / longest) * 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-6 font-mono text-[11px] text-faint">
              release v0.4.0 · macOS 26.5 · arm64
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-4 flex gap-4 rounded-xl border-l-2 border-accent bg-surface p-6">
          <div className="min-w-0">
            <h3 className="font-mono text-sm tracking-tight text-ink">What it does not do</h3>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink2">
              Onyx does not keep your shells alive across a full quit or crash. Panes, layout and
              metadata are restored; processes are not. A detached multiplexer that maintains
              interactive PTYs after the GUI exits is Phase 2. Pretending otherwise would be a lie,
              so it is written down instead.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}