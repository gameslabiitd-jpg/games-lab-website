"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * TiltCard — gentle cursor-tracked 3D tilt with eased smoothing.
 *
 * No dependencies. Listens for mousemove on the wrapper, eases the target
 * rotation toward (0, 0) on mouseleave via a running rAF loop, applies
 * `perspective(900px) rotateX rotateY` via inline transform.
 *
 * `max` caps the rotation angle in degrees on each axis. Keep small (4–8)
 * for tasteful editorial motion — anything larger reads as a toy.
 *
 * Respects `prefers-reduced-motion`: skips the effect entirely.
 */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let rafId = 0
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width   // 0..1
      const py = (e.clientY - r.top)  / r.height
      targetY =  (px - 0.5) * max * 2
      targetX = -(py - 0.5) * max * 2
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    // Always-running lerp toward target. Cost: one transform write per frame.
    const tick = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      el.style.transform =
        `perspective(900px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`
      rafId = requestAnimationFrame(tick)
    }

    el.addEventListener("mousemove",  onMove)
    el.addEventListener("mouseleave", onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener("mousemove",  onMove)
      el.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [max])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
