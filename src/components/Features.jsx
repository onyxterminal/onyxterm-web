import { Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { FEATURES } from '../site.js'

export default function Features() {
  return (
    <Section id="features">
      <SectionHead
        eyebrow="features"
        title="Shipped in v0.4.0, not on a roadmap."
        lede="Everything below is in the release you can download right now."
      />

      <Stagger className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <StaggerItem key={f.n} className="bg-bg">
            <article className="group flex h-full flex-col gap-2.5 p-6 transition-colors duration-300 hover:bg-surface">
              <span className="font-mono text-[11px] text-accent">{f.n}</span>
              <h3 className="font-mono text-[15px] font-medium tracking-tight text-ink">{f.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{f.body}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}