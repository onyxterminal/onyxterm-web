import { Reveal, CTA } from './ui.jsx'
import { LINKS, VERSION } from '../site.js'

export default function MidCta() {
  return (
    <div className="px-5 py-6 sm:px-8">
      <Reveal>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-line2 bg-bg px-7 py-9 sm:flex-row sm:items-center sm:px-10 sm:py-11">
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-[0.06] grid-bg" aria-hidden />
          <div className="relative max-w-xl">
            <h3 className="text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-balance">
              Try it with the sessions you already have open.
            </h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
              {VERSION} · macOS 13+ · Apple Silicon · 6.9 MB. No account, no telemetry.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-wrap items-center gap-3">
            <CTA href={LINKS.download} variant="primary" download>
              Download for macOS
            </CTA>
            <CTA href={LINKS.repo}>Source</CTA>
          </div>
        </div>
      </Reveal>
    </div>
  )
}