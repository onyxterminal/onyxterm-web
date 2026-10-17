# onyxterm-web

Landing page for **Onyx** — the terminal workspace where shells and AI coding agents share one
workspace.

## Stack

- React 19 + Vite 7
- Tailwind CSS v4
- [motion](https://motion.dev) for the animations
- [Lenis](https://lenis.darkroom.engineering) for inertial scrolling

## Design system

**Black, white and gray only.** There is no hue anywhere on the page. `--color-accent` is a
misnomer kept for one reason: emphasis should stay a deliberate decision rather than an
accident. It resolves to `#0a0a0a`, the same black as `--color-ink`. Hierarchy comes from weight,
scale, rule weight and inversion — never from colour.

The neutral ramp is deliberately **cool-neutral** (not warm, not blue-tinted) so nothing on the
page reads as tinted.

### Contrast

Every text token clears WCAG AA (4.5:1) against all three light surfaces. The worst case is the
*darkest* surface, `sunken`, and it is quoted here:

| Token  | Value     | Worst case |
| ------ | --------- | ---------- |
| `ink`  | `#0A0A0A` | 17.36:1    |
| `ink2` | `#3D3D3D` | 9.53:1     |
| `muted` | `#5A5A5A` | 6.05:1    |
| `faint` | `#6C6C6C` | 4.60:1    |

Surfaces: `panel #FFFFFF`, `paper #F7F7F6`, `sunken #F0F0EF`.

**Re-check these numbers before changing any colour.** The previous design failed this twice —
first with the app theme's `#8A8A90` at 3.1:1, then with `#c2c2c2` on white at ~1.9:1.

### Type

Two families, no more:

- **Geist Mono** — every heading, label, table key, keycap and numeral. Headings must not exceed
  weight 500; mono display type closes up and goes muddy above that.
- **Inter** — body prose only.

`Geist Pixel` was previously loaded and declared as `--font-pixel` but **never used by a single
component**. It has been removed rather than left as dead weight.

### Sections are numbered

Every section carries a number and a name (`01 — the problem`) via `SectionHead`. This is what
makes the page read as a document instead of a stack of blocks. Adding a section means picking the
next number; nav links carry the same number so the nav and the body are the same document.

## Screenshots

`public/shot-*.png` are real screenshots. They already contain the app's own titlebar and tab
strip, so `Shot.jsx` deliberately adds **no** invented window chrome around them. Don't draw a
mock of the product UI — use the real capture.

## Content rules

Copy on this page states only what ships in the current release. Do not claim Linux or Windows
builds, and do not claim shells survive a quit — both are untrue today. The FAQ says so
explicitly.

**The repo has no LICENSE file.** Section 09 states this on the page rather than implying a
license. If one is committed, update `SOURCE.rows` and the license FAQ answer in `site.js`.

Numbers in `site.js` under `REPO` come from the GitHub API. They were correct as of the last
check; stars were **0**. Nothing on this page rounds up or invents a social proof figure.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # -> dist/
npm run preview  # serve dist/ on :4173
npm run check    # SSR smoke test: render App to string
```

`dist/` is a plain static bundle. It can be served from GitHub Pages, Netlify, Cloudflare Pages or
any static host.

## Screenshots of the site itself

```bash
node scripts/shoot.mjs http://localhost:5173/ /tmp/onyx-shots v1
```

Drives headless Chrome over the DevTools protocol, captures every section at 1440px and 375px, and
fails loudly on horizontal overflow. Requires the Chromium build that ships with Playwright.

## Updating release links

The download URLs and version string live in [`src/site.js`](src/site.js):

```js
export const LINKS = {
  download: '.../releases/download/v0.4.0/Onyx-0.4.0-macos-arm64.dmg',
}
export const VERSION = 'v0.4.0'
```

Bump both together when a new tag ships.