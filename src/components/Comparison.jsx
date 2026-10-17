import { Check, Minus } from 'lucide-react'
import { Reveal, Section, SectionHead } from './ui.jsx'

const ROWS = [
  {
    what: 'Named workspaces, tabs and panes',
    before: 'tabs numbered #1…#22',
    after: 'every layer has a name',
  },
  {
    what: 'Coding agents as tracked panes',
    before: 'a shell that happens to be running claude',
    after: 'a session with state you can see',
  },
  {
    what: 'Finding the pane you want',
    before: 'scroll the tab bar, guess from the prompt',
    after: '⌘1–9, ⌘R, the palette',
  },
  {
    what: 'Layout after a restart',
    before: 'rebuild every split by hand',
    after: 'restored from local SQLite',
  },
  {
    what: 'Stopping a session',
    before: 'close the tab, hope nothing was running',
    after: 'close, stop and quit are different actions',
  },
  {
    what: 'Shells after quitting the app',
    before: 'whatever your multiplexer does',
    after: 'new sessions, marked honestly — no fake resume',
  },
]

export default function Comparison() {
  return (
    <Section id="compare" tint>
      <SectionHead
        eyebrow="what changes"
        title="The same work, with the management part removed."
        lede="Nothing here is a new concept. It is what happens when a terminal stops asking you to keep track of it."
      />

      <Reveal>
        <div className="mt-2 overflow-hidden rounded-xl border border-line bg-bg">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-px bg-line text-[11px] tracking-[0.1em] uppercase sm:text-[12px]">
            <div className="bg-raise px-5 py-3.5 font-mono text-faint">What you do</div>
            <div className="bg-raise px-5 py-3.5 font-mono text-faint">The usual setup</div>
            <div className="bg-raise px-5 py-3.5 font-mono text-accent">With Onyx</div>

            {ROWS.map((r) => (
              <div key={r.what} className="contents">
                <div className="bg-bg px-5 py-4 text-[13.5px] leading-snug text-ink2">
                  {r.what}
                </div>
                <div className="flex items-start gap-2.5 bg-bg px-5 py-4 text-[13.5px] leading-snug text-faint">
                  <Minus size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
                  <span>{r.before}</span>
                </div>
                <div className="flex items-start gap-2.5 bg-bg px-5 py-4 text-[13.5px] leading-snug text-ink">
                  <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" />
                  <span>{r.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}