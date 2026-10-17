export const LINKS = {
  repo: 'https://github.com/onyxterminal/onyxterm',
  release: 'https://github.com/onyxterminal/onyxterm/releases/latest',
  download:
    'https://github.com/onyxterminal/onyxterm/releases/download/v0.4.0/Onyx-0.4.0-macos-arm64.dmg',
  issues: 'https://github.com/onyxterminal/onyxterm/issues',
  newIssue: 'https://github.com/onyxterminal/onyxterm/issues/new',
  discussions: 'https://github.com/onyxterminal/onyxterm/discussions',
  installCmd:
    'curl -LO https://github.com/onyxterminal/onyxterm/releases/download/v0.4.0/Onyx-0.4.0-macos-arm64.dmg',
}

export const VERSION = 'v0.4.0'

/* Facts pulled from the GitHub API. Nothing here is invented; if a number
   stops being true, fix it here rather than softening the claim. */
export const REPO = {
  stars: 0,
  forks: 0,
  issues: 0,
  contributors: 1,
  language: 'Rust',
  lines: '1.3M',
}

/* Every nav destination carries its section number so the nav and the
   page body read as the same document. */
export const NAV_LINKS = [
  { href: '#why', n: '01', label: 'Problem' },
  { href: '#model', n: '02', label: 'Model' },
  { href: '#agents', n: '03', label: 'Agents' },
  { href: '#features', n: '04', label: 'Features' },
  { href: '#showcase', n: '05', label: 'Showcase' },
  { href: '#install', n: '07', label: 'Install' },
  { href: '#source', n: '09', label: 'Source' },
]

/* The strip under the hero. Replaces a marquee: a marquee is motion with
   no information, and this page has plenty of real information to carry. */
export const SPEC_STRIP = [
  ['release', 'v0.4.0'],
  ['platform', 'macos-13+ · arm64'],
  ['toolkit', 'rust · gpui'],
  ['pty', 'real, not pipes'],
  ['account', 'none'],
  ['telemetry', 'none'],
  ['scrollback', '10,000 lines'],
  ['size', '6.9 mb'],
]

export const TALLY = [
  ['6', 'shells open', 'muted'],
  ['4', 'agents running', 'accent'],
  ['1', 'remote box', 'muted'],
  ['0', 'ways to find them', 'ink'],
]

/* The three nouns. Written as a spec table rather than three equal cards —
   equal cards are the default shape and they carry no hierarchy. */
export const MODEL = [
  {
    n: '01',
    name: 'Workspace',
    what: 'one home per project',
    keys: ['⇧⌘N', '⌘O', '⌥⌘['],
    blurb:
      'Switch away and your layout, pane names, working directories and running shells come back exactly as you left them. Nothing restarts. Nothing gets lost.',
  },
  {
    n: '02',
    name: 'Tab',
    what: 'a name you choose',
    keys: ['⌘T', '⌘R', '⌘1–9'],
    blurb:
      'Stop counting tabs. Call it "api", "infra", "claude". Hit ⌘R or double-click the tab. It sticks across restarts — clear the name and it falls back to a number.',
  },
  {
    n: '03',
    name: 'Pane',
    what: 'one process, one address',
    keys: ['⌘D', '⇧⌘D', '⌥⌘←↑↓→'],
    blurb:
      'Split, resize, move and swap by keyboard or mouse. Rearrange all you like — your processes keep running. Close a pane holding something live and it asks first.',
  },
]

export const AGENT_CARDS = [
  {
    name: 'claude',
    role: 'agent pane',
    blurb: 'Launch Claude Code into its own pane with a working directory you choose.',
  },
  {
    name: 'codex',
    role: 'agent pane',
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
    title: 'A real terminal, not a preview',
    body: 'Real PTYs, not pipes. Full VT emulation, true color, mouse reporting, application cursor keys, bracketed paste and wide glyphs. When a program asks for something specific, Onyx does it.',
  },
  {
    n: '02',
    title: 'Agents as panes',
    body: 'claude and codex launch into assigned panes you can focus, watch and stop.',
  },
  {
    n: '03',
    title: 'Named everything',
    body: 'Workspaces, tabs and panes all get names. Hit ⌘R to rename. It sticks across restarts.',
  },
  {
    n: '04',
    title: 'One keystroke away',
    body: 'A conflict-checked keymap and a command palette. Every action is two letters and Enter.',
  },
  {
    n: '05',
    title: 'Editor and file tree',
    body: 'Open files beside your terminal, with git status, quick open and syntax highlighting.',
  },
  {
    n: '06',
    title: 'Six themes',
    body: 'App chrome and terminal ANSI are themed separately, and every colour is an editable hex value.',
  },
  {
    n: '07',
    title: 'Local, private, yours',
    body: 'No account. No telemetry. No cloud. Workspaces live in a SQLite file on your own disk and nowhere else.',
  },
  {
    n: '08',
    title: 'Open source',
    body: 'The whole thing is public on GitHub. Read it, fork it, or open an issue when something is wrong.',
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
  '10,000 lines of scrollback by default, 100,000 at the ceiling',
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

/* The open-source block. Every line here is a statement the repo can back
   up. `note` is deliberately blunt about what is missing. */
export const SOURCE = {
  rows: [
    ['license', 'not yet declared'],
    ['language', 'Rust'],
    ['size', '1.3M lines'],
    ['build', 'cargo build --release'],
    ['tests', 'in the release gate'],
    ['platform', 'macos-13+ · arm64'],
  ],
  note: 'The source has been public from the first commit. It does not carry a LICENSE file yet, which means GitHub still applies its default all-rights-reserved terms. That is an omission on our side, not a position — if you want to fork it today, open an issue and say so and we will get a license committed before you build anything.',
  actions: [
    ['Star the repo', 'repo'],
    ['Report a problem', 'newIssue'],
    ['Read the source', 'repo'],
    ['Discussions', 'discussions'],
  ],
}

export const INSTALL_NOTE = {
  body: 'Onyx is not signed with a Developer ID certificate yet, so macOS quarantines the download and refuses the first launch. The build workflow already has signing, notarization and stapling staged — switch on the identity and they turn on with no other change.',
  rows: [
    ['platform', 'macos-13+ · arm64'],
    ['size', '6.9 mb · single dmg'],
    ['account', 'none'],
    ['quarantine', 'cleared by step 3'],
  ],
}

/* Q and A sit side by side, all open, no accordion. An accordion hides the
   honest answers — and half of these are the reason to trust the project. */
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
    a: 'None yet, and the site used to pretend otherwise. There is no LICENSE file in the repository, so GitHub default terms apply and you should not assume you may fork it. We are fixing that — see the source section above.',
  },
  {
    q: 'How stable is it?',
    a: 'v0.4.0 on a one-week-old repository. The terminal core is the oldest part and has the most attention; the editor and file tree are younger. Expect rough edges and tell us about them.',
  },
]