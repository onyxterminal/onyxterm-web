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
  { href: '#compare', label: 'What changes' },
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
    what: 'One home per project.',
    keys: '⇧⌘N new · ⌘O switch · ⌥⌘[ ]',
    blurb:
      'Switch away and your layout, pane names, working directories and running shells come back exactly as you left them. Nothing restarts. Nothing gets lost.',
  },
  {
    n: '02',
    name: 'Tab',
    what: 'A name you choose.',
    keys: '⌘T new · ⌘R rename · ⌘1–9 jump',
    blurb:
      'Stop counting tabs. Call it "api", "infra", "claude". Hit ⌘R or double-click the tab. It sticks across restarts — clear the name and it falls back to a number.',
  },
  {
    n: '03',
    name: 'Pane',
    what: 'One process, one address.',
    keys: '⌘D split right · ⇧⌘D down · ⌥⌘←↑↓→',
    blurb:
      'Split, resize, move and swap by keyboard or mouse. Rearrange all you like — your processes keep running. Close a pane holding something live and it asks first.',
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
    icon: 'Terminal',
    span: 2,
    title: 'A real terminal, not a preview',
    body: 'Real PTYs, not pipes. Full VT emulation, true color, mouse reporting, application cursor keys, bracketed paste and wide glyphs. When a program asks for something specific, Onyx does it.',
  },
  {
    n: '02',
    icon: 'Bot',
    title: 'Agents as panes',
    body: 'claude and codex launch into assigned panes you can focus, watch and stop.',
  },
  {
    n: '03',
    icon: 'Tags',
    title: 'Named everything',
    body: 'Workspaces, tabs and panes all get names. Hit ⌘R to rename. It sticks across restarts.',
  },
  {
    n: '04',
    icon: 'Keyboard',
    title: 'One keystroke away',
    body: 'A conflict-checked keymap and a command palette. Every action is two letters and Enter.',
  },
  {
    n: '05',
    icon: 'FolderTree',
    title: 'Editor & file tree',
    body: 'Open files beside your terminal, with git status, quick open and syntax highlighting.',
  },
  {
    n: '06',
    icon: 'ShieldCheck',
    span: 2,
    title: 'Local, private, yours',
    body: 'No account. No telemetry. No cloud. Six themes, customizable with hex values. Your workspaces live in a SQLite file on your own disk and nowhere else.',
  },
]

export const TICKER = [
  'real PTYs, not pipes',
  'named workspaces',
  'layouts that survive a restart',
  'claude & codex as first-class panes',
  'no account',
  'no telemetry',
  'conflict-checked keybindings',
  'true color',
  'git-aware file tree',
  '10,000 lines of scrollback',
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