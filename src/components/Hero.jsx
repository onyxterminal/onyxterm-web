import { motion } from 'motion/react'
import Logo from './Logo.jsx'
import Shot from './Shot.jsx'
import { CTA } from './ui.jsx'
import { LINKS } from '../site.js'

const EASE = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.07 * i, ease: EASE } }),
}

export default function Hero() {
  return (
    <section className="px-5 pt-16 pb-14 sm:px-8 md:pt-24 md:pb-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* words */}
        <motion.div initial="hidden" animate="show">
          <motion.div custom={0} variants={rise}>
            <Logo size={26} />
          </motion.div>

          <motion.h1
            custom={1}
            variants={rise}
            className="mt-8 text-[clamp(2.2rem,5.4vw,3.5rem)] leading-[1] font-bold tracking-[-0.04em] text-balance"
          >
            Every shell
            <br />
            and agent,
            <br />
            <span className="pixel text-[0.84em]">one workspace</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={rise}
            className="mt-7 max-w-[42ch] text-[17px] leading-[1.55] text-muted"
          >
            A native Rust terminal where your shells and your coding agents live in one place — and
            remember exactly how you left it.
          </motion.p>

          <motion.div custom={3} variants={rise} className="mt-8 flex flex-wrap items-center gap-2.5">
            <CTA href={LINKS.download} variant="primary" download>
              Download for macOS
            </CTA>
            <CTA href={LINKS.release}>Release notes</CTA>
            <CTA href={LINKS.repo} variant="quiet">
              Source
            </CTA>
          </motion.div>

          <motion.dl
            custom={4}
            variants={rise}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7"
          >
            {[
              ['v0.4.0', 'current release'],
              ['arm64', 'Apple Silicon'],
              ['6.9 MB', 'one file'],
              ['none', 'accounts or telemetry'],
            ].map(([v, k]) => (
              <div key={k}>
                <dt className="font-mono text-[14px] font-medium">{v}</dt>
                <dd className="mt-0.5 font-mono text-[10.5px] text-faint">{k}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* image */}
        <Shot
          src="/shot-editor.png"
          alt="The Onyx app: a file tree on the left, a Rust source file open in the editor on top, and a shell pane underneath"
          caption="Editor, file tree and shell in one window."
        />
      </div>
    </section>
  )
}