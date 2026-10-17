/** Interaction checks against the live site. */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME =
  process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
const URL = process.argv[2] || 'https://onyxterminal.github.io/onyxterm-web/'
const OUT = process.argv[3] || '/tmp/onyx-checks'
const PORT = 9345
const PROFILE = `/tmp/onyx-cdp2-${Date.now()}`
mkdirSync(OUT, { recursive: true })

const chrome = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', 'about:blank'], { stdio: 'ignore' })
const cleanup = () => { try { chrome.kill() } catch {}; try { rmSync(PROFILE, { recursive: true, force: true }) } catch {} }
process.on('exit', cleanup)

let wsUrl
for (let i = 0; i < 60; i++) {
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; break }
  catch { await sleep(250) }
}
const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
let id = 0; const pending = new Map()
ws.onmessage = (m) => { const x = JSON.parse(m.data); if (x.id && pending.has(x.id)) { const p = pending.get(x.id); pending.delete(x.id); x.error ? p.rej(new Error(JSON.stringify(x.error))) : p.res(x.result) } }
const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method, params, sessionId })) })
const { sessionId } = await send('Target.attachToTarget', { targetId: target.id, flatten: true })
const S = (m, p) => send(m, p, sessionId)
await S('Page.enable'); await S('Runtime.enable')

const evalJs = async (expr) => {
  const r = await S('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text)
  return r.result?.value
}
const shot = async (name) => {
  const { data } = await S('Page.captureScreenshot', { format: 'png' })
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'))
}

// ---- mobile menu
await S('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 3, mobile: true })
await S('Page.navigate', { url: URL })
await evalJs(`document.fonts.ready.then(() => new Promise(r => setTimeout(r, 1500)))`)

const before = await evalJs(`(() => {
  const m = document.getElementById('site-menu');
  const links = [...document.querySelectorAll('#site-menu a')];
  return JSON.stringify({ menuHidden: m?.hidden, visibleLinks: links.filter(a => a.getBoundingClientRect().height > 0).length });
})()`)
console.log('BEFORE open:', before)

await evalJs(`document.querySelector('button[aria-controls="site-menu"]').click(); new Promise(r => setTimeout(r, 400))`)
const after = await evalJs(`(() => {
  const m = document.getElementById('site-menu');
  const links = [...document.querySelectorAll('#site-menu a')];
  const btn = document.querySelector('button[aria-controls="site-menu"]');
  const rects = links.map(a => a.getBoundingClientRect());
  return JSON.stringify({
    menuHidden: m?.hidden,
    ariaExpanded: btn?.getAttribute('aria-expanded'),
    visibleLinks: rects.filter(r => r.height > 0).length,
    anyOverflow: rects.some(r => r.right > window.innerWidth || r.left < 0),
    bodyLocked: getComputedStyle(document.body).overflow,
  });
})()`)
console.log('AFTER open: ', after)
await shot('mobile-menu-open')

// escape closes it
await S('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
await sleep(400)
const closed = await evalJs(`JSON.stringify({ hidden: document.getElementById('site-menu')?.hidden, aria: document.querySelector('button[aria-controls="site-menu"]')?.getAttribute('aria-expanded') })`)
console.log('AFTER esc:  ', closed)

// ---- nav anchor + scroll spy
await evalJs(`window.scrollTo(0,0)`)
await sleep(600)
await evalJs(`document.querySelector('a[href="#install"]').click(); new Promise(r => setTimeout(r, 2200))`)
const spy = await evalJs(`JSON.stringify({
  current: [...document.querySelectorAll('nav a[aria-current]')].map(a => a.getAttribute('href')),
  scrolled: Math.round(window.scrollY),
  installTop: Math.round(document.getElementById('install').getBoundingClientRect().top),
})`)
console.log('ANCHOR install:', spy)
await shot('desktop-after-anchor')

// ---- focus ring reachable by keyboard
await evalJs(`window.scrollTo(0,0)`)
await sleep(500)
await evalJs(`document.body.focus()`)
const focusable = await evalJs(`JSON.stringify({
  total: document.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])').length,
  imagesWithAlt: [...document.querySelectorAll('img')].every(i => i.hasAttribute('alt')),
  skipLink: !!document.querySelector('a[href="#why"].sr-only'),
  lang: document.documentElement.lang,
  title: document.title,
})`)
console.log('A11Y:', focusable)

cleanup()
process.exit(0)