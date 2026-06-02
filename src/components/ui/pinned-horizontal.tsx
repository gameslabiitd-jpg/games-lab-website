"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "@/lib/gsap"

/**
 * PinnedHorizontal — pins a section to the viewport and translates its
 * inner horizontal track based on scroll progress. The pin distance is
 * computed dynamically from the track width so any number of children
 * works without hand-tuning.
 *
 * Wraps each child in an inline-flex shrink-0 cell so callers don't have
 * to worry about flex math.
 *
 * GSAP ScrollTrigger required (already installed via @/lib/gsap).
 */
export function PinnedHorizontal({
  children,
  className,
  cellWidth = "78vw",
  gap = "5vw",
}: {
  children: ReactNode
  className?: string
  cellWidth?: string
  gap?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      // Distance the track needs to travel horizontally so its right edge
      // aligns with the viewport's right edge.
      const getDistance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // Pin duration tracks the distance so scroll-pixels ≈ travel-pixels
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{ overflow: "hidden" }}
    >
      <div
        ref={trackRef}
        className="flex items-stretch h-full"
        style={{ gap, paddingLeft: gap, paddingRight: gap, willChange: "transform" }}
      >
        {Array.isArray(children) ? (
          children.map((child, i) => (
            <div key={i} className="shrink-0" style={{ width: cellWidth }}>
              {child}
            </div>
          ))
        ) : (
          <div className="shrink-0" style={{ width: cellWidth }}>{children}</div>
        )}
      </div>
    </section>
  )
}
