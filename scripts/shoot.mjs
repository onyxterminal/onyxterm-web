/**
 * Screenshot harness. Drives Chrome over the DevTools protocol so each
 * section can be captured at its own scroll position, at both widths.
 *
 *   node scripts/shoot.mjs <url> <outDir> [label]
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME =
  process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'

const [, , url = 'http://localhost:5174/', outDir = '/tmp/onyx-shots', label = 'v1'] = process.argv
const PORT = 9333
const PROFILE = `/tmp/onyx-cdp-${Date.now()}`

const SECTIONS = [
  ['hero', null],
  ['why', '#why'],
  ['model', '#model'],
  ['agents', '#agents'],
  ['features', '#features'],
  ['showcase', '#showcase'],
  ['fidelity', '#fidelity'],
  ['install', '#install'],
  ['shortcuts', '#shortcuts'],
  ['source', '#source'],
  ['faq', '#faq'],
  ['closing', '.dotgrid'],
]

const VIEWPORTS = [
  ['desktop', 1440, 900, 2],
  ['mobile', 375, 812, 3],
]

mkdirSync(outDir, { recursive: true })

const chrome = spawn(
  CHROME,
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--force-color-profile=srgb',
    '--font-render-hinting=none',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const cleanup = () => {
  try { chrome.kill() } catch {}
  try { rmSync(PROFILE, { recursive: true, force: true }) } catch {}
}
process.on('exit', cleanup)

// Wait for the debugging endpoint.
let wsUrl
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`)
    wsUrl = (await r.json()).webSocketDebuggerUrl
    break
  } catch {
    await sleep(250)
  }
}
if (!wsUrl) { console.error('chrome never came up'); process.exit(1) }

// Open a tab and attach to it as a flat session.
const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

let id = 0
const pending = new Map()
const events = new Map()
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data)
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result)
  } else if (msg.method && events.has(msg.method)) {
    for (const fn of events.get(msg.method)) fn(msg.params)
  }
}
const send = (method, params = {}, sessionId) =>
  new Promise((res, rej) => {
    const n = ++id
    pending.set(n, { res, rej })
    ws.send(JSON.stringify({ id: n, method, params, sessionId }))
  })

const { sessionId } = await send('Target.attachToTarget', { targetId: target.id, flatten: true })
const S = (m, p) => send(m, p, sessionId)

await S('Page.enable')
await S('Runtime.enable')

async function evaluate(expression) {
  const r = await S('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception?.description || ''))
  return r.result?.value
}

async function shoot(name) {
  const { data } = await S('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  const file = `${outDir}/${label}-${name}.png`
  writeFileSync(file, Buffer.from(data, 'base64'))
  return file
}

const results = []

for (const [vpName, width, height, dsf] of VIEWPORTS) {
  await S('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: dsf, mobile: vpName === 'mobile',
  })
  await S('Page.navigate', { url })
  // Wait for fonts + first paint + reveal animations to settle.
  await evaluate(`document.fonts.ready.then(() => new Promise(r => setTimeout(r, 1600)))`)

  const metrics = await evaluate(`JSON.stringify({
    h: document.documentElement.scrollHeight,
    w: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    clientW: document.documentElement.clientWidth,
    innerW: window.innerWidth
  })`)
  const m = JSON.parse(metrics)
  console.log(`[${vpName}] page ${m.h}px tall, scrollWidth ${m.w} (inner ${m.innerW})${m.overflow ? '  *** HORIZONTAL OVERFLOW ***' : ''}`)
  if (m.overflow) results.push(`HORIZONTAL OVERFLOW at ${vpName}: scrollWidth ${m.w} > ${m.innerW}`)

  for (const [name, sel] of SECTIONS) {
    if (sel) {
      await evaluate(`(() => {
        const el = document.querySelector(${JSON.stringify(sel)});
        if (!el) return 'missing';
        const y = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo(0, y);
        return 'ok';
      })()`)
      await sleep(900) // let the in-view reveals finish
    } else {
      await evaluate('window.scrollTo(0,0)')
      await sleep(700)
    }
    const f = await shoot(`${vpName}-${name}`)
    results.push(f)
  }

  // one full-page pass so nothing between the sections is missed
  await evaluate('window.scrollTo(0,0)')
  await sleep(400)
  const full = await S('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: m.w, height: Math.min(m.h, 30000), scale: 1 },
  })
  const ff = `${outDir}/${label}-${vpName}-FULL.png`
  writeFileSync(ff, Buffer.from(full.data, 'base64'))
  results.push(ff)
}

console.log(results.join('\n'))
cleanup()
process.exit(0)