import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { Why, What, Install, Footer } from './components/Sections.jsx'
import { PixelRule } from './components/ui.jsx'

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

export default function App() {
  useLenis()
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <PixelRule />
        </div>
        <Why />
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <PixelRule />
        </div>
        <What />
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <PixelRule />
        </div>
        <Install />
      </main>
      <Footer />
    </>
  )
}