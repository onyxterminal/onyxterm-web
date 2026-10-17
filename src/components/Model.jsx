import { Reveal, Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { MODEL } from '../site.js'

export default function Model() {
  return (
    <Section id="model">
      <SectionHead
        eyebrow="how it works"
        title="Four nested containers. You only ever touch the one you need."
        lede="Workspace holds tabs, tab holds splits, split holds panes, pane holds a process. Each layer has its own name and its own keys."
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
              Every tab, split, focus position, pane name and working directory is written to a
              local SQLite database. Quit, reopen, and your workspace is where you left it. Shells
              come back as <span className="text-ink">new</span> sessions — honestly marked, never
              faked.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-xl border border-line bg-surface p-6">
            <h3 className="font-mono text-sm tracking-tight text-ink">Close and stop are different</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink2">
              Closing a pane, stopping an agent and quitting Onyx are three separate actions. A pane
              holding a live process asks before it takes anything down, and quitting tells you how
              many sessions will end first.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}