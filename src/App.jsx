import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import {
  Ticker,
  Why,
  Model,
  Agents,
  What,
  Showcase,
  Fidelity,
  Shortcuts,
  Install,
  Faq,
  Footer,
} from './components/Sections.jsx'
import { Reveal } from './components/ui.jsx'
import Logo from './components/Logo.jsx'
import { CTA } from './components/ui.jsx'
import { LINKS } from './site.js'

function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1,
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
    }
  }, [])
}

function Closing() {
  return (
    <section className="relative overflow-hidden border-t border-line px-5 py-24 sm:px-8 md:py-32">
      <div className="aura pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <Logo size={34} tone="ink" className="mx-auto" />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-7 text-[clamp(1.9rem,5vw,3rem)] leading-[1.06] font-bold tracking-[-0.035em] text-balance text-ink2">
            Stop rebuilding the same layout every morning.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-[46ch] text-[15.5px] leading-[1.65] text-muted">
            One download, no account, no cloud. Your shells, your agents, your layout.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            <CTA href={LINKS.download} variant="primary" download>
              Download Onyx v0.4.0
            </CTA>
            <CTA href={LINKS.repo}>GitHub</CTA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  useLenis()
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Ticker />
        <Why />
        <Model />
        <Agents />
        <What />
        <Showcase />
        <Fidelity />
        <Shortcuts />
        <Install />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
