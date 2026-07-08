import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Load the shader script after mount
    const existing = document.querySelector('script[data-shader]')
    if (existing) return

    const script = document.createElement('script')
    script.src = '/shader.js'
    script.dataset.shader = 'true'
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return <canvas id="canvas" ref={canvasRef} />
}
