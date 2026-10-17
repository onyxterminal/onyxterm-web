import { motion } from 'motion/react'
import TerminalMock from './TerminalMock.jsx'
import { CTA } from './ui.jsx'
import { LINKS, SPECS, VERSION } from '../site.js'

const EASE = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.08 * i, ease: EASE },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-32 pb-16 sm:px-8 md:pt-44 md:pb-24">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(217,72,15,0.10), transparent)' }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-7"
        >
          <motion.div custom={0} variants={rise}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line2 bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] text-muted backdrop-blur">
              <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {VERSION} · macOS · Apple Silicon
              <span className="text-faint">/</span>
              <span className="text-ink2">open source</span>
            </div>
          </motion.div>

          <motion.h1
            custom={1}
            variants={rise}
            className="max-w-[15ch] text-[clamp(2.5rem,7.4vw,5rem)] leading-[1] font-semibold tracking-[-0.045em] text-balance"
          >
            Every shell and agent,{' '}
            <span className="relative whitespace-nowrap">
              <span
                className="absolute inset-x-0 bottom-[0.06em] top-[0.02em] z-0 bg-accent/20"
                aria-hidden
              />
              <span className="relative z-10">one workspace</span>
            </span>
            .
          </motion.h1>

          <motion.p custom={2} variants={rise} className="max-w-[60ch] text-lg leading-relaxed text-ink2 md:text-xl">
            Six shells. Four agents. One remote box. None of them named.{' '}
            <span className="text-ink">Onyx puts all of it in one workspace</span> — and
            remembers exactly how you left it.
          </motion.p>

          <motion.div custom={3} variants={rise} className="flex flex-wrap items-center gap-3">
            <CTA href={LINKS.download} variant="primary" download>
              Download for macOS
              <span className="opacity-60">· 6.9 MB</span>
            </CTA>
            <CTA href={LINKS.release}>Release notes</CTA>
            <CTA href={LINKS.repo} variant="quiet">
              Star on GitHub →
            </CTA>
          </motion.div>

          <motion.dl custom={4} variants={rise} className="mt-6 grid w-full grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
            {SPECS.map((s) => (
              <div key={s.k} className="bg-bg px-4 py-3">
                <dt className="font-mono text-[10px] tracking-[0.12em] text-faint uppercase">{s.k}</dt>
                <dd
                  className={`mt-0.5 font-mono text-[13px] ${s.accent ? 'text-accent' : 'text-ink2'}`}
                >
                  {s.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.42, ease: EASE }}
          className="mt-14 md:mt-20"
        >
          <TerminalMock />
          <p className="mt-3 text-center font-mono text-[11px] text-faint">
            The interface, redrawn. Real PTYs, real agent sessions, four panes in one workspace.
          </p>
        </motion.div>
      </div>
    </section>
  )
}