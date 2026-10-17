import { motion } from 'motion/react'
import Shot from './Shot.jsx'
import { CTA, Chip, Hairline } from './ui.jsx'
import { LINKS } from '../site.js'

const EASE = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.07 * i, ease: EASE },
  }),
}

const SPECS = [
  ['v0.4.0', 'current release'],
  ['arm64', 'Apple Silicon'],
  ['6.9 MB', 'one file'],
  ['zero', 'accounts or telemetry'],
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="aura pointer-events-none absolute inset-0" aria-hidden />
      <div className="gridlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-20 pb-16 sm:px-8 md:pt-28 md:pb-20">
        <motion.div initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
          <motion.div custom={0} variants={rise}>
            <Chip tone="blue" className="gap-1.5">
              <span className="mr-1 inline-block h-1 w-1 rounded-full bg-blue" />
              macOS 13+ · Apple Silicon
            </Chip>
          </motion.div>

          <motion.h1
            custom={1}
            variants={rise}
            className="mt-7 text-[clamp(2.4rem,6.2vw,4.15rem)] leading-[1.02] font-bold tracking-[-0.035em] text-balance text-ink2"
          >
            Every shell
            <br />
            and agent,
            <br />
            <span className="text-ink">one workspace.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={rise}
            className="mx-auto mt-7 max-w-[52ch] text-[17px] leading-[1.6] text-muted"
          >
            Onyx is a native Rust terminal where your shells and your coding agents share one
            workspace — named, split, and restored exactly how you left it.
          </motion.p>

          <motion.div
            custom={3}
            variants={rise}
            className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
          >
            <CTA href={LINKS.download} variant="primary" download>
              Download for macOS
            </CTA>
            <CTA href={LINKS.repo}>
              <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden>
                <path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38l-.01-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                />
              </svg>
              Source
            </CTA>
            <CTA href={LINKS.release} variant="quiet">
              Release notes
            </CTA>
          </motion.div>
        </motion.div>

        <div className="mt-16 md:mt-20">
          <Shot
            src="/shot-editor.png"
            alt="The Onyx app: a file tree on the left, a Rust source file open in the editor, and a shell pane underneath"
            caption="A real Onyx window — file tree, editor and shell in one frame."
            eager
            glow
          />
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 text-center sm:grid-cols-4"
        >
          {SPECS.map(([v, k]) => (
            <div key={k}>
              <dt className="font-mono text-[17px] font-medium text-ink2">{v}</dt>
              <dd className="mt-1 font-mono text-[10.5px] tracking-wide text-faint">{k}</dd>
            </div>
          ))}
        </motion.dl>

        <Hairline className="mt-16 md:mt-20" />
      </div>
    </section>
  )
}
