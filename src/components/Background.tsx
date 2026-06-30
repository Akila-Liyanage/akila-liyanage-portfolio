import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let frame = 0
    let width = 0
    let height = 0
    let pointerX = window.innerWidth * 0.5
    let pointerY = window.innerHeight * 0.35
    let targetX = pointerX
    let targetY = pointerY
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    type Particle = {
      x: number
      y: number
      originX: number
      originY: number
      radius: number
      speed: number
      phase: number
      depth: number
    }

    let particles: Particle[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const count = Math.min(82, Math.max(35, Math.floor(width / 19)))
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x,
          y,
          originX: x,
          originY: y,
          radius: Math.random() * 1.7 + 0.45,
          speed: Math.random() * 0.6 + 0.18,
          phase: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.8 + 0.2,
        }
      })
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      pointerX += (targetX - pointerX) * 0.035
      pointerY += (targetY - pointerY) * 0.035
      const tick = time * 0.00034

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x = particle.originX + Math.cos(tick * particle.speed + particle.phase) * (25 + particle.depth * 30)
          particle.y = particle.originY + Math.sin(tick * particle.speed + particle.phase) * (16 + particle.depth * 20)
          const dx = particle.x - pointerX
          const dy = particle.y - pointerY
          const distance = Math.hypot(dx, dy)
          if (distance < 180 && distance > 0) {
            const push = (180 - distance) * 0.035
            particle.x += (dx / distance) * push
            particle.y += (dy / distance) * push
          }
        }

        const alpha = index % 9 === 0 ? 0.55 : 0.18 + particle.depth * 0.13
        context.beginPath()
        context.fillStyle = index % 9 === 0 ? `rgba(139, 121, 255, ${alpha})` : `rgba(122, 173, 255, ${alpha})`
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const distance = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (distance < 128) {
            context.beginPath()
            context.strokeStyle = `rgba(104, 145, 226, ${0.065 * (1 - distance / 128)})`
            context.lineWidth = 0.65
            context.moveTo(particles[i].x, particles[i].y)
            context.lineTo(particles[j].x, particles[j].y)
            context.stroke()
          }
        }
      }

      const glow = context.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, 240)
      glow.addColorStop(0, 'rgba(108, 125, 255, .075)')
      glow.addColorStop(1, 'rgba(108, 125, 255, 0)')
      context.fillStyle = glow
      context.fillRect(pointerX - 240, pointerY - 240, 480, 480)

      frame = requestAnimationFrame(draw)
    }

    const trackPointer = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', trackPointer, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', trackPointer)
    }
  }, [])

  return (
    <div className="background-layer" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="cursor-aura" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <div className="mesh mesh-one" />
      <div className="mesh mesh-two" />
      <div className="moving-grid" />
      <div className="grain" />
    </div>
  )
}
