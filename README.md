# onyxterm-web

Landing page for **Onyx** — the terminal workspace where shells and AI coding agents share one
workspace.

Live: https://onyxterminal.github.io/onyxterm-web/

## Stack

- React 19 + Vite 7
- Tailwind CSS v4
- [motion](https://motion.dev) for the animations

## Design system

Colors come from the app's own theme files in
[`onyxterm/assets/themes/`](../onyxterm/assets/themes), not from a hand-picked palette. `index.css`
reads them as Tailwind `@theme` tokens, so the site and the product cannot drift apart.

The token values are **not** copied verbatim. Two are adjusted for accessibility:

| Token     | Theme value | Used     | Why                                                   |
| --------- | ----------- | -------- | ----------------------------------------------------- |
| `muted`   | `#6E6E73`   | `#5C5C63` | darkened; `subtle #8A8A90` is only 3.1:1 and fails AA  |
| `accent`  | `#007AFF`   | `#0B62CC` | white button text on `#007AFF` is 3.6:1, fails AA       |

Every text token clears WCAG AA (4.5:1) on both the page and panel backgrounds. If you change a
color, re-check the ratio — the original design failed this with `#c2c2c2` on white at ~1.9:1.

Type: `Geist Pixel` is a **display face only**. It turns to mush below ~14px, so labels use
tracked JetBrains Mono instead.

## Screenshots

`public/shot-*.png` are real screenshots. They already contain the app's own titlebar and tab
strip, so `Shot.jsx` deliberately adds **no** invented window chrome around them. Don't draw a
mock of the product UI — use the real capture.

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

## Updating release links

The download URLs and version string live in [`src/site.js`](src/site.js):

```js
export const LINKS = {
  download: '.../releases/download/v0.4.0/Onyx-0.4.0-macos-arm64.dmg',
}
export const VERSION = 'v0.4.0'
```

Bump both together when a new tag ships.

## Content rules

Copy on this page states only what ships in the current release. Do not claim Linux or Windows
builds, and do not claim shells survive a quit — both are untrue today. The FAQ says so explicitly.