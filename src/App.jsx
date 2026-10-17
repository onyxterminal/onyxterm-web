import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import Model from './components/Model.jsx'
import Agents from './components/Agents.jsx'
import Features from './components/Features.jsx'
import Fidelity from './components/Fidelity.jsx'
import Shortcuts from './components/Shortcuts.jsx'
import Install from './components/Install.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Model />
        <Agents />
        <Features />
        <Fidelity />
        <Shortcuts />
        <Install />
        <Faq />
      </main>
      <Footer />
    </>
  )
}