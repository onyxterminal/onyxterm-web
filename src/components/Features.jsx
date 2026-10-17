import {
  Terminal,
  Bot,
  Tags,
  Command,
  Keyboard,
  MousePointer2,
  Copy,
  FolderTree,
  Palette,
  ShieldCheck,
} from 'lucide-react'
import { Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { FEATURES } from '../site.js'

const ICONS = {
  Terminal,
  Bot,
  Tags,
  Command,
  Keyboard,
  MousePointer2,
  Copy,
  FolderTree,
  Palette,
  ShieldCheck,
}

const ANSI = ['#d1242f', '#1a7f37', '#0969da', '#8250df', '#bf8700', '#1f2328']

/** A little swatch strip for the wide PTY card. */
function AnsiStrip() {
  return (
    <div className="mt-5 flex gap-1.5" aria-hidden>
      {ANSI.map((c, i) => (
        <span
          key={c}
          className="h-1.5 flex-1 rounded-full"
          style={{
            background: c,
            opacity: 0.25 + i * 0.12,
            transitionDelay: `${i * 40}ms`,
          }}
        />
      ))}
    </div>
  )
}

/** A faux scrollback meter for the wide copy-mode card. */
function ScrollbackMeter() {
  return (
    <div className="mt-5 space-y-1.5" aria-hidden>
      {[92, 74, 60, 81, 45, 68, 55].map((w, i) => (
        <span
          key={i}
          className="block h-1.5 rounded-full bg-line"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  )
}

const SPAN = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
}

export default function Features() {
  return (
    <Section id="features">
      <SectionHead
        eyebrow="features"
        title="Everything below ships in v0.4.0."
        lede="No “coming soon” column. No waitlist. Download it and it's already there."
      />

      <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = ICONS[f.icon] ?? Terminal
          return (
            <StaggerItem key={f.n} className={SPAN[f.span] ?? ''}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line2 hover:shadow-[0_12px_32px_-20px_rgba(29,29,31,0.30)]">
                {/* accent hairline that sweeps in on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden
                />

                <div className="flex items-start justify-between gap-4">
                  <span className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg text-muted transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[11px] text-faint transition-colors group-hover:text-accent">
                    {f.n}
                  </span>
                </div>

                <h3 className="mt-4 font-mono text-[15px] font-medium tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{f.body}</p>

                {f.n === '01' && <AnsiStrip />}
                {f.n === '07' && <ScrollbackMeter />}
              </article>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}