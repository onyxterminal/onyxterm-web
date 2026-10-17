import Logo from './Logo.jsx'
import { CTA } from './ui.jsx'
import { LINKS } from '../site.js'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-3xl items-center gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size={18} />
          <span className="font-mono text-[14px] font-bold tracking-tight">Onyx</span>
        </a>
        <a
          href={LINKS.download}
          download
          className="ml-auto rounded-md bg-ink px-4 py-2 font-mono text-[12.5px] font-medium text-onaccent transition-colors hover:bg-ink2"
        >
          Download
        </a>
      </nav>
    </header>
  )
}