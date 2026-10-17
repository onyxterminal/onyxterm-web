import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/* ------------------------------------------------------------------ */
/* streaming helpers                                                   */
/* ------------------------------------------------------------------ */

function useTypewriter(text, { speed = 22, active = true } = {}) {
  const [out, setOut] = useState(active ? '' : text)
  useEffect(() => {
    if (!active) {
      setOut(text)
      return
    }
    let i = 0
    setOut('')
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, active])
  return out
}

function useStepStream(steps, { typeMs = 20, lineMs = 130, holdMs = 2600 } = {}) {
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(0)
  const timers = useRef([])

  useEffect(() => {
    const step = steps[idx]
    const command = step.cmd
    // type the command, then reveal its output lines
    const typeTotal = command.length * typeMs
    timers.current.push(setTimeout(() => setRevealed(0), typeTotal + 140))
    step.out.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setRevealed(i + 1), typeTotal + 200 + i * lineMs),
      )
    })
    timers.current.push(
      setTimeout(() => setIdx((i) => (i + 1) % steps.length), typeTotal + 260 + step.out.length * lineMs + holdMs),
    )
    return () => timers.current.forEach(clearTimeout)
  }, [idx, steps, typeMs, lineMs, holdMs])

  return { step: steps[idx], revealed }
}

/* ------------------------------------------------------------------ */
/* pieces                                                              */
/* ------------------------------------------------------------------ */

function Caret() {
  return <span className="caret ml-1 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-accent" />
}

function PaneHeader({ title, cwd, scroll, live }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-sunken px-3 py-1.5 font-mono text-[10.5px] text-muted sm:text-[11px]">
      {live && <span className="live-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
      <span className="truncate text-ink2">{title}</span>
      <span className="ml-auto hidden truncate text-faint sm:inline">{cwd}</span>
      <span className="shrink-0 text-faint">{scroll}</span>
    </div>
  )
}

function Pane({ title, cwd, scroll, live, className = '', children }) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <PaneHeader title={title} cwd={cwd} scroll={scroll} live={live} />
      <div className="flex-1 bg-bg px-3 py-2.5 font-mono text-[11px] leading-[1.65] text-ink2 sm:text-[11.5px]">
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* the window                                                          */
/* ------------------------------------------------------------------ */

const STREAM = [
  {
    tab: 'build',
    cmd: 'cargo test --workspace',
    out: [
      ['dim', 'running 375 tests across 12 crates'],
      ['plain', 'test restore::user_workspaces_round_trip ... ', 'ok'],
      ['plain', 'test keymap::rename_tab_has_default_shortcut ... ', 'ok'],
      ['plain', 'test vt::synchronized_updates_flush_on_timeout ... ', 'ok'],
      ['ok', 'test result: ok. 375 passed; 0 failed'],
    ],
  },
  {
    tab: 'agents',
    cmd: 'claude  # refactor the store',
    out: [
      ['dim', 'starting agent session in ~/onyxterm/crates/ui'],
      ['plain', '● Read  workspace-service/src/lib.rs'],
      ['plain', '● Read  persistence/src/restore.rs'],
      ['plain', '● Edit  workspace-service/src/lib.rs'],
      ['ok', '✓ 3 edits applied  ·  375 tests passed'],
    ],
  },
  {
    tab: 'review',
    cmd: 'codex  # why does restore drop the tab',
    out: [
      ['dim', 'starting agent session in ~/onyxterm/crates/persistence'],
      ['plain', '● Reproducing with a duplicated leaf'],
      ['plain', '● LayoutNode::close_leaf returned true'],
      ['warn', '✗ attention needed — pane 2 of 4'],
      ['dim', 'exit code 0  ·  elapsed 2m 14s'],
    ],
  },
]

function colour(kind) {
  if (kind === 'dim') return 'text-faint'
  if (kind === 'ok') return 'text-ink'
  if (kind === 'warn') return 'text-accent'
  if (kind === 'acc') return 'text-accent'
  return 'text-ink2'
}

export default function TerminalMock() {
  const { step, revealed } = useStepStream(STREAM)
  const typed = useTypewriter(step.cmd, { speed: 34 })

  const tabs = ['build', 'agents', 'review', 'logs']
  const activeIdx = Math.max(
    0,
    tabs.indexOf(step.tab),
  )

  return (
    <div className="overflow-hidden rounded-xl border border-line2 bg-surface shadow-[0_24px_60px_-28px_rgba(31,35,40,0.28)]">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-sunken px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-line2 bg-raise" />
          <span className="h-2.5 w-2.5 rounded-full border border-line2 bg-raise" />
          <span className="h-2.5 w-2.5 rounded-full border border-line2 bg-raise" />
        </div>

        <div className="ml-1 flex items-center gap-2 font-mono text-[11px] text-ink2">
          <span className="inline-block h-2 w-2 bg-accent" />
          onyxterm
          <span className="text-faint">⌄</span>
        </div>

        <div className="ml-2 hidden items-center gap-1 sm:flex">
          {tabs.map((t) => (
            <span
              key={t}
              className={`rounded border px-2.5 py-1 font-mono text-[11px] transition-colors duration-300 ${
                t === step.tab
                  ? 'border-line2 bg-raise text-ink shadow-[inset_0_-2px_0_var(--color-accent)]'
                  : 'border-line text-faint'
              }`}
            >
              {t === step.tab && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />}
              {t}
            </span>
          ))}
          <span className="border border-dashed border-line px-2 py-1 font-mono text-[11px] text-faint">+</span>
        </div>

        <span className="ml-auto hidden font-mono text-[11px] text-faint md:inline">14:06</span>
      </div>

      {/* panes */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Pane
          title={step.tab === 'agents' ? 'claude · refactor store' : 'zsh — ~/onyxterm'}
          cwd="~/onyxterm/crates/ui"
          scroll="0/412"
          live
          className="border-b border-line md:border-r"
        >
          <div className="flex">
            <span className="text-accent">❯</span>
            <span className="text-ink2">
              {typed}
              {typed.length < step.cmd.length && <Caret />}
            </span>
          </div>
          <div className="mt-1 min-h-[7.2em]">
            <AnimatePresence mode="popLayout">
              {step.out.slice(0, revealed).map(([kind, text], i) => (
                <motion.div
                  key={`${step.tab}-${i}`}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className={colour(kind)}
                >
                  {text}
                </motion.div>
              ))}
            </AnimatePresence>
            {revealed > 0 && revealed >= step.out.length && (
              <div className="mt-1 flex items-center gap-2 text-accent">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                <span className="text-faint">running · 2m 14s</span>
              </div>
            )}
          </div>
        </Pane>

        <Pane
          title="codex · fix flaky test"
          cwd="~/onyxterm/crates/persistence"
          scroll="0/88"
          className="border-b border-line"
        >
          <div className="text-faint">$ cargo test -p persistence</div>
          <div className="mt-0.5">
            <div className="text-ink2">
              test restored_tab_survives_bad_leaf <span className="text-accent">FAILED</span>
            </div>
            <div className="text-ink2">
              test user_workspaces_round_trip <span className="text-ink">ok</span>
            </div>
            <div className="text-faint">test restore_rejects_downgrade <span className="text-ink">ok</span></div>
          </div>
          <div className="mt-1.5 flex items-center gap-2 border-t border-line pt-1.5">
            <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-accent">attention</span>
            <span className="text-faint">· pane 2 of 4</span>
          </div>
        </Pane>

        <Pane title="zsh" cwd="~/onyxterm" scroll="0/154" className="md:border-r">
          <div className="flex">
            <span className="text-accent">❯</span>
            <span className="text-ink2">git status -sb</span>
          </div>
          <div className="mt-0.5 text-faint">
            <div>## main...origin/main</div>
            <div>
              <span className="text-accent"> M</span> crates/ui/src/keymap.rs
            </div>
            <div>
              <span className="text-accent"> M</span> crates/ui/src/tests.rs
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-2 border-t border-line pt-1.5">
            <span className="text-accent">❯</span>
            <span className="inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-accent" />
          </div>
        </Pane>

        <Pane title="file tree" cwd="~/onyxterm/crates" scroll="0/13">
          <div className="space-y-0.5 text-ink2">
            <div className="text-accent">▾ app</div>
            <div className="pl-3 text-faint">main.rs</div>
            <div className="pl-3 text-faint">Cargo.toml</div>
            <div className="text-accent">▾ terminal-core</div>
            <div className="pl-3 text-faint">pty.rs</div>
            <div className="pl-3 text-faint">vt.rs</div>
            <div className="text-accent">▾ ui</div>
            <div className="pl-3 text-faint">keymap.rs</div>
            <div className="pl-3 text-faint">tabs.rs</div>
          </div>
        </Pane>
      </div>

      {/* status bar */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line bg-sunken px-3.5 py-2 font-mono text-[10.5px] text-faint">
        <span>
          <span className="text-ink2">1</span> workspace
        </span>
        <span>
          <span className="text-ink2">{tabs.length}</span> tabs
        </span>
        <span>
          <span className="text-ink2">4</span> panes
        </span>
        <span>
          <span className="text-accent">2</span> agents
        </span>
        <span className="ml-auto hidden gap-x-3 sm:flex">
          <span>⌃+&lt;g&gt; lock</span>
          <span>&lt;p&gt; pane</span>
          <span>&lt;t&gt; tab</span>
          <span>&lt;q&gt; quit</span>
        </span>
      </div>
    </div>
  )
}