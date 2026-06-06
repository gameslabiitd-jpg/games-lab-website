"use client"

import Link from "next/link"
import { useRef, useState, type MouseEvent } from "react"
import { cn } from "@/lib/cn"

/**
 * Hallmark · component: play-cta · design-system: design.md
 *
 * Cursor-following glow CTA (adapted from a 21st.dev hover-glow button for our
 * light theme): a high-contrast ink pill on the paper page, with a soft accent
 * glow that tracks the cursor inside the pill and a gentle lift on hover.
 * Client component (pointer tracking) — safe inside server components.
 */
export default function PlayCTA({
  href,
  children,
  className,
  glowColor = "#9B6BFF",
}: {
  href: string
  children: string
  className?: string
  glowColor?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const track = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={(e) => {
        track(e)
        setHovered(true)
      }}
      onMouseMove={track}
      onMouseLeave={() => setHovered(false)}
      // Color set inline: the global unlayered `a { color: inherit }` rule
      // (see globals.css) outranks the `text-paper` utility on links.
      style={{ color: "var(--color-paper)" }}
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-full bg-ink isolate",
        "px-7 py-3.5 text-sm font-semibold font-sans select-none",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(22,19,16,0.22)]",
        "active:translate-y-0 active:duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        className,
      )}
    >
      {/* Cursor-following glow (clipped to the pill by overflow-hidden,
          painted over the ink fill but under the label) */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-0 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full",
          "transition-[opacity,transform] duration-300 ease-out",
          hovered ? "opacity-70 scale-100" : "opacity-0 scale-50",
        )}
        style={{
          left: pos.x,
          top: pos.y,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 68%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  )
}
