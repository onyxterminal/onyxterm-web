import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import {
  Why,
  Model,
  Agents,
  What,
  Showcase,
  Fidelity,
  Install,
  Shortcuts,
  Source,
  Faq,
  Closing,
  Footer,
} from './components/Sections.jsx'
import { initLenis, onAnchorClick } from './scroll.js'

export default function App() {
  useEffect(() => {
    const stopLenis = initLenis()
    document.addEventListener('click', onAnchorClick)
    return () => {
      stopLenis()
      document.removeEventListener('click', onAnchorClick)
    }
  }, [])

  return (
    <>
      <a
        href="#why"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:font-mono focus:text-[13px] focus:text-onaccent"
      >
        Skip to content
      </a>

      <Nav />

      <main id="top">
        <Hero />
        <Why />
        <Model />
        <Agents />
        <What />
        <Showcase />
        <Fidelity />
        <Install />
        <Shortcuts />
        <Source />
        <Faq />
        <Closing />
      </main>

      <Footer />
    </>
  )
}