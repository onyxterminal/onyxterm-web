import { motion } from 'motion/react'
import Shot from './Shot.jsx'
import { CTA, Tag, GithubMark, StarMark } from './ui.jsx'
import { LINKS, REPO, SPEC_STRIP } from '../site.js'

const EASE = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.06 * i, ease: EASE },
  }),
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="aura pointer-events-none absolute inset-0" aria-hidden />
      <div className="gridlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-14 sm:px-8 md:pt-20">
        <motion.div initial="hidden" animate="show" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* words — deliberately not centred */}
          <div className="lg:col-span-7">
            <motion.div custom={0} variants={rise}>
              <Tag tone="accent">
                <span className="inline-block h-1 w-1 rounded-full bg-accent" />
                macOS 13+ · Apple Silicon
              </Tag>
            </motion.div>

            <motion.h1
              custom={1}
              variants={rise}
              className="display mt-6 text-[clamp(1.95rem,5.2vw,3.5rem)] text-ink"
            >
              Every shell
              <br />
              and agent,
              <br />
              one workspace
              <span className="caret ml-0.5 inline-block w-[0.5em] translate-y-[-0.08em] bg-accent align-baseline text-accent">
                &nbsp;
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={rise}
              className="prose mt-7 max-w-[52ch] text-[16px]"
            >
              Onyx is a native Rust terminal where your shells and your coding agents share one
              workspace — named, split, and restored exactly how you left it.
            </motion.p>

            <motion.div custom={3} variants={rise} className="mt-8 flex flex-wrap items-center gap-2.5">
              <CTA href={LINKS.download} variant="primary" download>
                Download for macOS
              </CTA>
              <CTA href={LINKS.repo}>
                <GithubMark size={14} />
                Source
              </CTA>
              <a
                href={LINKS.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-[3px] px-3.5 py-3 font-mono text-[13px] text-muted transition-colors duration-150 hover:text-ink"
              >
                <StarMark size={13} className="text-accent" />
                <span className="tnum">{REPO.stars}</span>
                <span className="sr-only">stars on GitHub</span>
              </a>
            </motion.div>
          </div>

          {/* the machine-readable column — this is what balances the page
              without centring anything. Self-end so it sits flush with the
              CTA row instead of floating in the middle of the gutter. */}
          <motion.div custom={4} variants={rise} className="lg:col-span-5 lg:self-end lg:pb-1">
            <dl className="border-t border-line">
              {SPEC_STRIP.slice(0, 5).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                >
                  <dt className="label">{k}</dt>
                  <dd className="tnum font-mono text-[12.5px] text-ink2">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>

        {/* the real capture, set wider than the text column so the page has
            a second rhythm instead of one centred stack */}
        <Shot
          className="mt-14 md:mt-20"
          src="/shot-editor.png"
          alt="The Onyx app: a file tree on the left, a Rust source file open in the editor, and a shell pane underneath"
          caption="A real Onyx window — file tree, editor and shell in one frame."
          eager
        />
      </div>
    </section>
  )
}