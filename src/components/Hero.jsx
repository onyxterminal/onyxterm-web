import { motion } from 'motion/react'
import Diagram from './Diagram.jsx'
import { CTA, Reveal } from './ui.jsx'
import { LINKS, SPECS } from '../site.js'

const EASE = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.06 * i, ease: EASE },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />

      <div className="rule-frame relative mx-auto w-full max-w-7xl">
        <div className="px-5 pt-16 pb-10 sm:px-10 md:pt-24 md:pb-14">
          <motion.div initial="hidden" animate="show" className="max-w-3xl">
            <motion.div custom={0} variants={rise}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line2 bg-surface px-3.5 py-1.5 font-mono text-[11px] text-muted">
                <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                v0.4.0 · macOS · Apple Silicon
              </div>
            </motion.div>

            <motion.h1
              custom={1}
              variants={rise}
              className="mt-6 text-[clamp(2.4rem,6.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance"
            >
              Every shell and agent,
              <br />
              <span className="pixel text-[1.12em]">one workspace</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={rise}
              className="mt-6 max-w-[52ch] text-lg leading-[1.6] text-muted"
            >
              Six shells. Four agents. One remote box. None of them named. Onyx is a native Rust
              terminal that puts all of it in one place — and remembers exactly how you left it.
            </motion.p>

            <motion.div custom={3} variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
              <CTA href={LINKS.download} variant="primary" download>
                Download for macOS
              </CTA>
              <CTA href={LINKS.release}>Release notes</CTA>
              <CTA href={LINKS.repo} variant="quiet">
                Source →
              </CTA>
            </motion.div>

            <motion.div custom={4} variants={rise} className="mt-12">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
                {SPECS.map((s) => (
                  <div key={s.k} className="bg-surface px-4 py-3.5">
                    <dt className="font-mono text-[10px] tracking-[0.12em] text-faint uppercase">
                      {s.k}
                    </dt>
                    <dd className={`mt-1 font-mono text-[13px] ${s.accent ? 'text-ink' : 'text-muted'}`}>
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>
        </div>

        <Reveal delay={0.15} className="px-5 pb-16 sm:px-10 md:pb-24">
          <Diagram />
        </Reveal>
      </div>
    </section>
  )
}