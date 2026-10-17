import { motion } from 'motion/react'
import { Reveal, Section, SectionHead, Stagger, StaggerItem } from './ui.jsx'
import { PROBLEM_STATS } from '../site.js'

/** A visual "before": many anonymous tabs nobody can name. */
function TabSoup() {
  const tabs = Array.from({ length: 22 })
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-line bg-surface p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10.5px] text-faint">
        <span className="inline-block h-1.5 w-1.5 bg-faint" />
        every terminal, everywhere
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
        className="flex flex-wrap gap-1.5"
      >
        {tabs.map((_, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
            }}
            className="rounded border border-line bg-raise px-2.5 py-1 font-mono text-[10.5px] text-faint"
          >
            #{i + 1}
          </motion.span>
        ))}
      </motion.div>
      <p className="mt-4 text-[13px] text-muted">
        Every pane is technically reachable. None of them tell you anything.
      </p>
    </div>
  )
}

/** The "after": one named workspace, deliberate layout. */
function OrderedWorkspace() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-line bg-surface p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10.5px] text-accent">
        <span className="inline-block h-1.5 w-1.5 bg-accent" />
        onyx · one workspace
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['api', 'web', 'infra', 'claude', 'codex', 'logs'].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 * i }}
            className="rounded border border-line2 bg-raise px-3 py-1.5 font-mono text-[11px] text-ink2"
          >
            {t}
          </motion.span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {['api', 'web', 'db', 'claude', 'codex', 'logs'].map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
            className="overflow-hidden rounded border border-line bg-bg"
          >
            <div className="flex items-center gap-1.5 border-b border-line px-1.5 py-1 font-mono text-[9px] text-muted">
              <span
                className={`inline-block h-1 w-1 rounded-full ${t === 'claude' || t === 'codex' ? 'bg-accent' : 'bg-faint'}`}
              />
              <span className="truncate">{t}</span>
            </div>
            <div className="space-y-1 px-1.5 py-1.5">
              <div className="h-px w-full bg-line" />
              <div className="h-px w-4/5 bg-line" />
              <div className="h-px w-3/5 bg-line" />
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-ink2">
        Named, grouped and restored exactly where you left them.
      </p>
    </div>
  )
}

export default function Problem() {
  return (
    <Section id="why">
      <SectionHead
        eyebrow="the problem"
        title="Ghostty and Zellij made a terminal feel great. Then AI agents showed up."
        lede="Six shells, four agent sessions, one remote box — and no way to find any of them. Every launch you have to re-narrate where you were."
      />

      <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
        {PROBLEM_STATS.map((s) => (
          <StaggerItem key={s.lbl} className="bg-bg px-5 py-6">
            <div className="font-mono text-3xl font-bold text-accent md:text-4xl">{s.big}</div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
              {s.lbl}
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal>
          <TabSoup />
        </Reveal>
        <Reveal delay={0.1}>
          <OrderedWorkspace />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-2 max-w-3xl text-lg leading-relaxed text-ink2">
          Onyx treats a shell and a coding agent as the same kind of thing: a pane, in a split, in
          a tab, in a workspace with a name. Nothing to find, because everything is where you put it.
        </p>
      </Reveal>
    </Section>
  )
}