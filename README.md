# onyxterm-web

Landing page for **Onyx** — the terminal workspace where shells and AI coding agents share one
workspace.

## Stack

- React 19 + Vite 7
- Tailwind CSS v4
- [motion](https://motion.dev) for the animations

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # -> dist/
npm run preview  # serve dist/ on :4173
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