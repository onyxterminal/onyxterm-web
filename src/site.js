export const LINKS = {
  repo: 'https://github.com/onyxterminal/onyxterm',
  release: 'https://github.com/onyxterminal/onyxterm/releases/latest',
  download:
    'https://github.com/onyxterminal/onyxterm/releases/download/v0.4.0/Onyx-0.4.0-macos-arm64.dmg',
  issues: 'https://github.com/onyxterminal/onyxterm/issues',
  installCmd:
    'curl -LO https://github.com/onyxterminal/onyxterm/releases/download/v0.4.0/Onyx-0.4.0-macos-arm64.dmg',
}

export const VERSION = 'v0.4.0'

export const SPECS = [
  { k: 'Version', v: 'v0.4.0', accent: true },
  { k: 'Platform', v: 'macOS 13+ · arm64' },
  { k: 'Stack', v: 'Rust · GPUI' },
  { k: 'Agents', v: 'claude · codex' },
  { k: 'Data', v: 'Local only · SQLite' },
]

export const NAV_LINKS = [
  { href: '#why', label: 'Why' },
  { href: '#model', label: 'How it works' },
  { href: '#agents', label: 'Agents' },
  { href: '#features', label: 'Features' },
  { href: '#install', label: 'Install' },
]

export const PROBLEM_STATS = [
  { big: '6', lbl: 'shells open' },
  { big: '4', lbl: 'agents running' },
  { big: '1', lbl: 'remote box' },
  { big: '0', lbl: 'way to find them' },
]

export const MODEL = [
  {
    n: '01',
    name: 'Workspace',
    what: 'A whole working context: its own tabs, layouts, pane names and root path.',
    keys: '⇧⌘N new · ⌘O switch · ⌥⌘[ ]',
    blurb:
      'Give every project a home. Each workspace keeps its own layout, so switching never restarts a shell and never resets your arrangement.',
  },
  {
    n: '02',
    name: 'Tab',
    what: 'One split layout with a name you chose.',
    keys: '⌘T new · ⌘R rename · ⌘1–9 jump',
    blurb:
      'Double-click a tab to rename it inline, or hit ⌘R. Empty the name and it falls back to a number. Names persist across restarts.',
  },
  {
    n: '03',
    name: 'Pane',
    what: 'One real PTY running a shell, an editor, or an agent.',
    keys: '⌘D split right · ⇧⌘D down · ⌥⌘←↑↓→',
    blurb:
      'Resize, maximize, move and swap panes by keyboard or mouse. Closing a pane with a live process asks before it takes anything down.',
  },
]

export const AGENT_CARDS = [
  {
    name: 'claude',
    blurb: 'Launch Claude Code into its own pane with a working directory you choose.',
  },
  {
    name: 'codex',
    blurb: 'Same treatment for Codex CLI. One adapter profile per provider.',
  },
]

export const AGENT_GUARANTEES = [
  'Argv execution — never shell string interpolation.',
  'Working directory locked to an allowed root.',
  'Prompts, commands and output redacted by default.',
  'No tokens embedded, no provider auth bypassed.',
]

export const FEATURES = [
  {
    n: '01',
    title: 'Real PTY terminals',
    body: 'Real PTYs, not pipes. Full VT emulation, true color, alternate screen, bracketed paste and wide glyphs.',
  },
  {
    n: '02',
    title: 'Agents as panes',
    body: 'claude and codex launch into assigned panes you can focus, watch and stop.',
  },
  {
    n: '03',
    title: 'Named everything',
    body: 'Workspaces, tabs and panes each get a name. Nothing is stuck as “Tab 7”.',
  },
  {
    n: '04',
    title: 'Command palette',
    body: 'Fuzzy palette over every registered command, with the shortcut shown next to it.',
  },
  {
    n: '05',
    title: 'Rebindable keys',
    body: 'Every shortcut is registered and conflict-checked. Override any of them in Settings.',
  },
  {
    n: '06',
    title: 'A mouse that behaves',
    body: 'Selection, click-drag extend, middle-click paste, cmd-click links, and full mouse reporting.',
  },
  {
    n: '07',
    title: 'Copy mode & search',
    body: 'Search scrollback, step with the keyboard, copy straight to the clipboard on mouse up.',
  },
  {
    n: '08',
    title: 'Editor & file tree',
    body: 'Open files beside your terminal with a project tree, git status and quick open.',
  },
  {
    n: '09',
    title: 'Six themes',
    body: 'Apple Light, Onyx Dark, Nord, Dracula, Solarized. Customize any with hex values.',
  },
  {
    n: '10',
    title: 'Local and private',
    body: 'No account, no telemetry, no cloud. Metadata lives in a local SQLite file.',
  },
]

export const FIDELITY = [
  'Ctrl-C interrupt and Ctrl-D EOF with real process-group signalling',
  '16, 256 and true-color ANSI, with separate app and terminal themes',
  'Application cursor keys and modes, including focus in / out reporting',
  'Block, underline, beam and blinking cursors as the running app requests',
  'SGR, UTF-8 and X10 mouse encodings, plus three-line wheel notches',
  'Smooth pixel scrolling with a scroll multiplier and fractional scrollback',
  'Synchronized output that flushes correctly once its timeout passes',
  'Live OSC title updates reflected in pane headers and tab labels',
  'SIGWINCH on resize — panes track the window',
]

export const SHORTCUTS = [
  ['⌘T', 'New tab'],
  ['⌘W', 'Close active pane'],
  ['⌘R', 'Rename active tab'],
  ['⌘D', 'Split right'],
  ['⇧⌘D', 'Split down'],
  ['⌘⏎', 'Maximize pane'],
  ['⌥⌘←↑↓→', 'Focus adjacent pane'],
  ['⇧⌘← →', 'Move tab left / right'],
  ['⌘} ⌘{', 'Next / previous tab'],
  ['⌘1 – ⌘9', 'Jump to tab'],
  ['⇧⌘P', 'Command palette'],
  ['⇧⌘R', 'Rename workspace'],
  ['⌘⇧B', 'Toggle file tree'],
  ['⌘K', 'Clear terminal'],
  ['⌃C', 'Interrupt process'],
  ['⌘Q', 'Quit'],
]

export const FAQ = [
  {
    q: 'Does it keep my shells running after I quit?',
    a: 'No. Panes, layouts, names and working directories are restored from local SQLite, but processes are not — restored shells come back as new sessions, clearly marked as new. A detached multiplexer that survives GUI exit is Phase 2. We would rather tell you that than fake it.',
  },
  {
    q: 'Is it signed and notarized?',
    a: 'Not yet. There is no Developer ID certificate behind Onyx, so macOS quarantines the download and blocks the first launch. The documented workaround is one command that clears the quarantine flag. The build workflow already has the signing and notarization steps staged and inert — set APPLE_SIGNING_IDENTITY and they turn on.',
  },
  {
    q: 'What platforms are supported?',
    a: 'macOS 13 or newer on Apple Silicon. The build workflow is macOS-only today, so the DMG is arm64. Linux is a stated goal, not a shipped artifact — there is no Linux build to download yet.',
  },
  {
    q: 'Do I need an account or an API key?',
    a: 'No. Onyx has no accounts, no telemetry and no cloud service. Metadata is a local SQLite file. The agent panes drive the claude and codex CLIs you already have on your PATH, so you keep using your own provider authentication.',
  },
  {
    q: 'What license is it under?',
    a: 'The source is public on GitHub. Check the LICENSE file in the repository for the exact terms.',
  },
]