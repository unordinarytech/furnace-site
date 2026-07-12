import { useEffect, useRef, useState } from 'react'
import Coin from './Coin.jsx'

const NIHAL = { key: 'nihal', name: 'Nihal Rahman', handle: '@nihaliscoding', href: 'https://x.com/nihaliscoding' }
const RONISH = { key: 'ronish', name: 'Ronish Rohan', handle: '@ronish1o', href: 'https://x.com/ronish1o' }

function PersonInfo({ person, align }) {
  // align: 'start' = top-left slot, 'end' = bottom-right slot
  const isStart = align === 'start'
  return (
    <div className={`flex flex-col gap-1 ${isStart ? 'items-start' : 'items-end'}`}>
      <span className="font-mono text-[15px] text-white/90 whitespace-nowrap">{person.name}</span>
      <span className="font-mono text-[12px] text-white/40 whitespace-nowrap">{person.handle}</span>
      <a
        href={person.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] text-white/30 hover:text-accent whitespace-nowrap no-underline transition-colors duration-150"
      >
        on X ↗
      </a>
    </div>
  )
}

export default function Footer() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const [hovered, setHovered] = useState(null) // 'nihal' | 'ronish' | null

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let t = 0
    function draw() {
      const { width, height } = canvas
      if (!width || !height) { rafRef.current = requestAnimationFrame(draw); return }

      const img = ctx.createImageData(width, height)
      const data = img.data
      t += 0.5

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() * 255) | 0
        const alpha = (noise * 0.18) | 0
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
        data[i + 3] = alpha
      }

      ctx.putImageData(img, 0, 0)
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <footer className="relative z-[2000] bg-[#0e0e0e] flex items-center justify-center gap-[clamp(16px,3vw,48px)] px-6 md:px-[75px] py-[80px] overflow-hidden">
      <div className="font-mono text-[clamp(64px,12vw,160px)] font-bold text-white/90 uppercase tracking-[-0.02em] leading-none relative z-[1] select-none">
        FURNACE
      </div>
      <span className="font-serif italic text-[clamp(20px,3vw,40px)] text-white/70 relative z-[1] select-none">
        by
      </span>
      <div className="relative z-[1] h-[228px] w-[228px]">
        {/* Slot A — top-left: nihal's coin, or ronish's info when ronish is hovered */}
        <div className="absolute left-0 top-0 w-[120px] h-[120px] flex items-start justify-start">
          <div
            className={`absolute inset-0 transition-opacity duration-200 ${hovered === 'ronish' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onMouseEnter={() => setHovered('nihal')}
            onMouseLeave={() => setHovered(null)}
          >
            <a href={NIHAL.href} target="_blank" rel="noopener noreferrer" aria-label="Nihal on X" className="block">
              <Coin size={120} normalMap="/nihal_normal.png" showRing={hovered === 'nihal'} />
            </a>
          </div>
          <div className={`absolute inset-0 flex items-start justify-start transition-opacity duration-200 ${hovered === 'ronish' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <PersonInfo person={RONISH} align="start" />
          </div>
        </div>

        {/* Slot B — bottom-right: ronish's coin, or nihal's info when nihal is hovered */}
        <div className="absolute bottom-0 right-0 w-[120px] h-[120px] flex items-end justify-end">
          <div
            className={`absolute inset-0 transition-opacity duration-200 ${hovered === 'nihal' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onMouseEnter={() => setHovered('ronish')}
            onMouseLeave={() => setHovered(null)}
          >
            <a href={RONISH.href} target="_blank" rel="noopener noreferrer" aria-label="Ronish on X" className="block">
              <Coin size={120} normalMap="/ronish_normal.png" flipX showRing={hovered === 'ronish'} />
            </a>
          </div>
          <div className={`absolute inset-0 flex items-end justify-end transition-opacity duration-200 ${hovered === 'nihal' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <PersonInfo person={NIHAL} align="end" />
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />
    </footer>
  )
}
