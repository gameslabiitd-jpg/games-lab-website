"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "@/lib/gsap"

/**
 * PinnedHorizontal — pins a section via CSS `position: sticky` and uses
 * GSAP ScrollTrigger ONLY for the horizontal translate (no `pin: true`).
 *
 * Why this matters: GSAP's pin wraps the trigger in a `gsap-pin-spacer`
 * <div>. React doesn't know about that wrapper, so subsequent updates or
 * unmounts call `removeChild` on a parent that no longer has the expected
 * child — the "Failed to execute 'removeChild' on 'Node'" runtime error.
 *
 * With CSS sticky:
 *   - The outer section gets a tall height (viewport + travel distance)
 *   - An inner sticky child stays fixed in view while the outer scrolls
 *   - GSAP just translates the track via transform — no DOM mutation
 *
 * React owns the DOM, GSAP owns the animation. They don't fight.
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
  const stickyRef  = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const sticky  = stickyRef.current
    const track   = trackRef.current
    if (!section || !sticky || !track) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cleanup: (() => void) | undefined

    const ctx = gsap.context(() => {
      // How far the track has to travel horizontally to reveal everything
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      // Section height = sticky child height (100vh) + horizontal travel.
      // The browser will scroll the section, the sticky child stays put,
      // and our ScrollTrigger maps scroll progress → track translate.
      const setSectionHeight = () => {
        const dist = getDistance()
        section.style.height = `${window.innerHeight + dist}px`
      }
      setSectionHeight()

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: setSectionHeight,
        },
      })

      cleanup = () => {
        // Kill the ScrollTrigger first so onRefresh can't fire mid-tear-down
        tween.scrollTrigger?.kill()
        tween.kill()
        // Reset inline height so React doesn't see foreign attributes
        section.style.height = ""
      }
    }, section)

    return () => {
      cleanup?.()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className={className} style={{ position: "relative" }}>
      <div
        ref={stickyRef}
        className="flex items-center"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{
            gap,
            paddingLeft: gap,
            paddingRight: gap,
            willChange: "transform",
            height: "min(80vh, 560px)",
          }}
        >
          {Array.isArray(children) ? (
            children.map((child, i) => (
              <div key={i} className="shrink-0 h-full" style={{ width: cellWidth }}>
                {child}
              </div>
            ))
          ) : (
            <div className="shrink-0 h-full" style={{ width: cellWidth }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
