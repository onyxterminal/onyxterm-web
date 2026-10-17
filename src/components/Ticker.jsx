import { TICKER } from '../site.js'

/** A thin marquee of product promises. Pauses on hover. */
export default function Ticker() {
  const row = [...TICKER, ...TICKER]
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-surface py-3.5 select-none">
      <div className="marquee-track flex w-max items-center gap-8">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex shrink-0 items-center gap-8">
            <span className="font-mono text-[12px] tracking-tight whitespace-nowrap text-muted">
              {t}
            </span>
            <span className="inline-block h-1 w-1 shrink-0 bg-accent" aria-hidden />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}