/**
 * One scroll path for the whole page.
 *
 * Lenis owns the scroll position, so native anchor jumps and Lenis used to
 * fight each other: the browser teleports, then Lenis eases back, and the
 * section lands in the wrong place. Every in-page link goes through
 * `scrollToId` instead, which drives Lenis when it is running and falls
 * back to the platform when it is not (reduced-motion users, or a failed
 * import).
 */

import Lenis from 'lenis'

let lenis = null

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function initLenis() {
  if (lenis || prefersReducedMotion()) return () => {}

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  let id
  const raf = (t) => {
    lenis.raf(t)
    id = requestAnimationFrame(raf)
  }
  id = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(id)
    lenis.destroy()
    lenis = null
  }
}

/* Must match the sticky header (h-16 = 64px) plus a little breathing room. */
const NAV_OFFSET = 84

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return

  // Compute the absolute destination ourselves. Passing the element plus an
  // offset to the scroller was landing every anchor ~350px short of where it
  // should be, because the offset gets applied on top of the element's own
  // scroll margin. An absolute pixel target is unambiguous.
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET

  if (lenis) {
    lenis.scrollTo(Math.max(0, top))
    return
  }
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

/**
 * Delegated handler. Attach once, near the root. It covers every in-page
 * link in the app, including ones rendered later.
 */
export function onAnchorClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
  const a = e.target.closest?.('a[href^="#"]')
  if (!a) return
  const id = a.getAttribute('href').slice(1)
  if (!id) return
  e.preventDefault()
  scrollToId(id)
  history.replaceState(null, '', `#${id}`)
}

/** Which section is currently on screen, for nav highlighting. */
export function observeSections(ids, onChange) {
  const visible = new Map()
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
      // The topmost visible section wins, so the highlight never flickers
      // between two sections sharing the viewport.
      const active = ids.find((id) => visible.get(id))
      if (active) onChange(active)
    },
    { rootMargin: '-84px 0px -55% 0px', threshold: 0 },
  )
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  }
  return () => io.disconnect()
}