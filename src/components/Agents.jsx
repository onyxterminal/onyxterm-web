import { Reveal, Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { AGENT_CARDS, AGENT_GUARANTEES } from '../site.js'

function Check() {
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-[9px] text-accent">
      ✓
    </span>
  )
}

export default function Agents() {
  return (
    <Section id="agents">
      <SectionHead
        eyebrow="agent manager"
        title="Your agents get a pane. Not a scavenger hunt."
        lede="Launch claude or codex straight into a pane with the directory you want, then focus, watch or stop it like anything else. Onyx runs the CLIs you already have — no model baked in, no new account, no new login."
      />

      <Stagger className="grid gap-4 md:grid-cols-2">
        {AGENT_CARDS.map((a) => (
          <StaggerItem key={a.name}>
            <article className="group h-full rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line2">
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-2 w-2 bg-accent" />
                <h3 className="font-mono text-base tracking-tight">{a.name}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink2">{a.blurb}</p>
              <div className="mt-4 rounded-md border border-line bg-bg px-3 py-2.5 font-mono text-[11px] text-muted">
                <span className="text-accent">❯</span> {a.name}
                <span className="text-faint"> --cwd ~/project</span>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="h-full rounded-xl border border-line bg-surface p-6">
            <h3 className="font-mono text-sm tracking-tight text-ink">
              Process-alive is not the same as working
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink2">
              A running agent is one whose OS process is alive. That is not proof it is thinking,
              and Onyx never claims it is. States are explicit — created, starting, running, exited,
              failed, stopping — and confidence is shown rather than guessed. A session needs
              attention only when an adapter actually reports a signal.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-2">
          <div className="h-full rounded-xl border border-line bg-surface p-6">
            <h3 className="font-mono text-sm tracking-tight text-ink">Boring by design</h3>
            <ul className="mt-4 space-y-3">
              {AGENT_GUARANTEES.map((g) => (
                <li key={g} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink2">
                  <Check />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}