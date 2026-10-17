import { motion } from 'motion/react'
import Logo from './Logo.jsx'
import { CTA } from './ui.jsx'
import { LINKS } from '../site.js'

const EASE = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.07 * i, ease: EASE } }),
}

export default function Hero() {
  return (
    <section className="px-5 pt-20 pb-16 sm:px-8 md:pt-28 md:pb-24">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div initial="hidden" animate="show">
          <motion.div custom={0} variants={rise}>
            <Logo size={26} />
          </motion.div>

          <motion.h1
            custom={1}
            variants={rise}
            className="mt-9 text-[clamp(2.6rem,8vw,4.75rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance"
          >
            Every shell
            <br />
            and agent,
            <br />
            <span className="pixel text-[0.86em]">one workspace</span>
          </motion.h1>

          <motion.p custom={2} variants={rise} className="mt-8 max-w-[46ch] text-lg leading-[1.55] text-muted">
            A native Rust terminal where your shells and your coding agents live in one place — and
            remember exactly how you left it.
          </motion.p>

          <motion.div custom={3} variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
            <CTA href={LINKS.download} variant="primary" download>
              Download for macOS
            </CTA>
            <CTA href={LINKS.release}>Release notes</CTA>
            <CTA href={LINKS.repo} variant="quiet">
              Source
            </CTA>
          </motion.div>

          <motion.dl custom={4} variants={rise} className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ['v0.4.0', 'current release'],
              ['arm64', 'Apple Silicon'],
              ['6.9 MB', 'one file'],
              ['none', 'accounts or telemetry'],
            ].map(([v, k]) => (
              <div key={k}>
                <dt className="font-mono text-[15px] font-medium">{v}</dt>
                <dd className="mt-0.5 font-mono text-[11px] text-faint">{k}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}