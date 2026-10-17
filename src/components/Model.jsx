import { Reveal, Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { MODEL } from '../site.js'

export default function Model() {
  return (
    <Section id="model">
      <SectionHead
        eyebrow="how it works"
        title="Three levels. One mental model."
        lede="A workspace holds tabs. A tab holds splits. A split holds panes. A pane holds one process. Everything under the workspace is named — so you never scroll a tab bar hunting for a number again."
      />

      <Stagger className="grid gap-4 md:grid-cols-3">
        {MODEL.map((m) => (
          <StaggerItem key={m.name}>
            <article className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-accent">{m.n}</span>
                <h3 className="font-mono text-lg font-medium tracking-tight">{m.name}</h3>
              </div>
              <p className="text-[14px] leading-relaxed text-muted">{m.blurb}</p>
              <p className="text-[14px] leading-relaxed text-ink2">{m.what}</p>
              <div className="mt-auto rounded-md border border-line bg-bg px-3 py-2 font-mono text-[11px] text-muted">
                {m.keys}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-line bg-surface p-6">
            <h3 className="font-mono text-sm tracking-tight text-ink">Layouts survive</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink2">
              Every tab, split, pane name and working directory is written to a local SQLite file.
              Quit, reopen, and your workspace is exactly where you left it. Shells come back as{' '}
              <span className="text-ink">new</span> sessions — marked honestly, never faked.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-xl border border-line bg-surface p-6">
            <h3 className="font-mono text-sm tracking-tight text-ink">Close and stop are different</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink2">
              Closing a pane, stopping an agent and quitting Onyx are three separate actions. A pane
              holding a live process asks before it takes anything down, and quitting tells you how
              many sessions will end before you commit.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}