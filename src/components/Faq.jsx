import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal, Section, SectionHead } from './ui.jsx'
import { FAQ } from '../site.js'

function Item({ q, a, open, onToggle }) {
  return (
    <div className={`rounded-xl border transition-colors duration-300 ${open ? 'border-line2 bg-surface' : 'border-line bg-bg hover:border-line2'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span className={`flex-1 text-[15px] leading-snug ${open ? 'text-ink' : 'text-ink2'}`}>{q}</span>
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-300 ${
            open ? 'rotate-45 border-accent text-accent' : 'border-line2 text-faint'
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <Section id="faq">
      <SectionHead eyebrow="questions" title="The things people actually ask." />
      <Reveal>
        <div className="mt-2 grid gap-2.5">
          {FAQ.map((item, i) => (
            <Item
              key={item.q}
              {...item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}