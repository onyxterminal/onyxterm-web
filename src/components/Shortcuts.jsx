import { Reveal, Section, SectionHead } from './ui.jsx'
import { SHORTCUTS } from '../site.js'

export default function Shortcuts() {
  return (
    <Section id="shortcuts">
      <SectionHead
        eyebrow="keyboard first"
        title="Every core action has a key. Every key can be changed."
        lede="Shortcuts live in one registry with stable IDs. Conflicts are detected and reported rather than silently shadowing each other, and you can rebind any of them in Settings."
      />

      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SHORTCUTS.map(([keys, what]) => (
            <div
              key={keys + what}
              className="flex items-center gap-3 bg-bg px-5 py-3 transition-colors hover:bg-surface"
            >
              <span className="shrink-0 rounded border border-line2 bg-sunken px-2 py-1 font-mono text-[11.5px] text-ink">
                {keys}
              </span>
              <span className="truncate text-[13.5px] text-muted">{what}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted">
          Keys your running program needs are left alone. Onyx only claims what it has explicitly
          registered, so <span className="font-mono text-ink2">Ctrl-C</span> still interrupts and{' '}
          <span className="font-mono text-ink2">Ctrl-D</span> still sends EOF.
        </p>
      </Reveal>
    </Section>
  )
}