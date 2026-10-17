import { Reveal, Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { PROBLEM_STATS } from '../site.js'

export default function Problem() {
  return (
    <Section id="why">
      <SectionHead
        eyebrow="the problem"
        title="Everything open. Nothing findable."
        lede="Six shells, four agents, one remote box — and a tab bar that tells you nothing. You rebuild the same layout every morning and lose track of it by lunch."
      />

      <Stagger className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
        {PROBLEM_STATS.map((s) => (
          <StaggerItem key={s.lbl} className="bg-surface px-5 py-6">
            <div className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.big}</div>
            <div className="mt-1.5 font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase">
              {s.lbl}
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-3xl text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.55] tracking-[-0.02em] text-ink2">
          Onyx treats a shell and a coding agent as the same thing: a pane, in a split, in a tab, in
          a workspace with a name.{' '}
          <span className="text-ink">Nothing to find, because nothing gets lost.</span>
        </p>
      </Reveal>
    </Section>
  )
}