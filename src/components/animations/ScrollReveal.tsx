"use client"

import { useEffect, useRef, CSSProperties } from "react"
import { cn } from "@/lib/cn"

type Direction = "up" | "left" | "right" | "scale" | "fade"

const dirClass: Record<Direction, string> = {
  up:    "reveal",
  left:  "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  fade:  "reveal-fade",
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number       // ms — stagger offset
  once?: boolean       // default true — only reveal once
  direction?: Direction
  style?: CSSProperties
}

/**
 * ScrollReveal — wraps content in a div that animates in when it enters
 * the viewport. Supports directional variants via `direction` prop.
 * Uses IntersectionObserver (no GSAP overhead for simple reveals).
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
  direction = "up",
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add("is-visible")
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove("is-visible")
          el.style.transitionDelay = "0ms"
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, once])

  return (
    <div ref={ref} className={cn(dirClass[direction], className)} style={style}>
      {children}
    </div>
  )
}
