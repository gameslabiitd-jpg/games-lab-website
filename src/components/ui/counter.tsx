"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counter — ticks from `from` to `to` over `duration` ms when the element
 * first enters the viewport. Eases on an out-cubic curve so the count
 * decelerates dramatically at the end.
 *
 * Use `pad` to format like "04" instead of "4". Pass `to="∞"` (string) to
 * render the literal infinity glyph instead of animating.
 */
export function Counter({
  to,
  duration = 1400,
  pad = 2,
  className,
  prefix = "",
  suffix = "",
}: {
  to: number | string
  duration?: number
  pad?: number
  className?: string
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState<string>(
    typeof to === "string" ? to : "0".padStart(pad, "0"),
  )

  useEffect(() => {
    if (typeof to === "string") return
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(String(to).padStart(pad, "0"))
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3) // out-cubic
          const current = Math.round(eased * to)
          setValue(String(current).padStart(pad, "0"))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration, pad])

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  )
}
