import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function Chrome() {
  // Freeze to absolute the moment we cross the hero boundary
  const [released, setReleased] = useState(false)
  const releasedRef = useRef(false)

  // Stored absolute positions (set once at transition, never updated)
  const [absPos, setAbsPos] = useState({ top: 0, bottom: 0 })

  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    const onScroll = () => {
      if (releasedRef.current) return
      const scrollTop = root.scrollTop
      const vh = window.innerHeight
      if (scrollTop >= vh) {
        releasedRef.current = true
        setAbsPos({ top: scrollTop + 75, bottom: scrollTop + vh - 75 })
        setReleased(true)
      }
    }

    root.addEventListener('scroll', onScroll, { passive: true })
    return () => root.removeEventListener('scroll', onScroll)
  }, [])

  const sharedTop = released ? { position: 'absolute', top: `${absPos.top}px` } : { position: 'fixed', top: '75px' }
  const sharedBottom = released ? { position: 'absolute', top: `${absPos.bottom}px` } : { position: 'fixed', bottom: '75px' }

  return (
    <>
      {/* Logo — top left */}
      <Link to="/" className="left-[75px] z-[1000] block no-underline" style={sharedTop}>
        <span
          id="logo"
          className="block font-mono text-[18px] uppercase whitespace-nowrap text-white/90 opacity-85 hover:text-accent hover:[text-shadow:0_0_8px_rgba(91,141,239,0.6)] hover:opacity-100"
        >
          FURNACE
        </span>
      </Link>

      {/* Nav — top right */}
      <nav className="right-[75px] z-[200] flex flex-col items-end gap-2" style={sharedTop}>
        <Link to="/features" className="font-mono text-[14px] uppercase text-white/95 no-underline hover:text-accent hover:[text-shadow:0_0_8px_rgba(91,141,239,0.8)]">
          Features
        </Link>
        <Link to="/quickstart" className="font-mono text-[14px] uppercase text-white/95 no-underline hover:text-accent hover:[text-shadow:0_0_8px_rgba(91,141,239,0.8)]">
          Quickstart
        </Link>
        <a href="https://github.com/amoreX/furnace" target="_blank" rel="noopener noreferrer" className="font-mono text-[14px] uppercase text-white/95 no-underline hover:text-accent hover:[text-shadow:0_0_8px_rgba(91,141,239,0.8)]">
          GitHub
        </a>
      </nav>

      {/* Footer label — bottom left */}
      <div
        id="site-footer"
        className="left-[75px] z-[200] font-mono text-[14px] text-white/95 px-2.5 py-1.5"
        style={sharedBottom}
      >
        FURNACE · MIT · v0.1.2
      </div>

      {/* Theme toggle — bottom right */}
      <div className="right-[75px] z-[200] flex items-center gap-4" style={sharedBottom}>
        <button
          id="theme-toggle"
          type="button"
          aria-label="Toggle color theme"
          className="border-0 bg-none font-mono text-[14px] text-white/95 px-2.5 py-1.5 cursor-pointer hover:text-accent hover:[text-shadow:0_0_8px_rgba(91,141,239,0.6)]"
        >
          <span className="value"></span>
        </button>
      </div>
    </>
  )
}
