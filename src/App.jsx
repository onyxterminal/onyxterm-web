import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Problem from './components/Problem.jsx'
import Comparison from './components/Comparison.jsx'
import Features from './components/Features.jsx'
import Install from './components/Install.jsx'
import Footer from './components/Footer.jsx'

/** Smooth scroll, unless the user asked for reduced motion. */
function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  useLenis()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Comparison tint />
        <Features />
        <Install tint />
      </main>
      <Footer />
    </>
  )
}