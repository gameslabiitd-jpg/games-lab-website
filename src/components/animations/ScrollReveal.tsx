"use client"

import { useEffect, useRef, CSSProperties } from "react"
import { cn } from "@/lib/cn"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number       // ms — stagger offset
  once?: boolean       // default true — only reveal once
  style?: CSSProperties
}

/**
 * ScrollReveal — wraps content in a div that fades+slides up when
 * it enters the viewport. Uses IntersectionObserver (no GSAP overhead
 * for simple single-element reveals).
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
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
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  )
}
