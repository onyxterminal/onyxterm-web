/**
 * Render smoke test.
 *
 * `vite build` only checks that modules parse. A component that
 * references an identifier it never imported still bundles fine and
 * then throws ReferenceError at runtime, blanking the whole page.
 * Rendering the app through react-dom/server catches that here
 * instead of in the browser.
 *
 * Run with: npm run check
 */
import { renderToString } from 'react-dom/server'
import App from './src/App.jsx'

const html = renderToString(<App />)

if (!html || html.length < 1000) {
  console.error('RENDER FAILED: suspiciously short output, length =', html.length)
  process.exit(1)
}

console.log(`render ok — ${html.length} characters`)