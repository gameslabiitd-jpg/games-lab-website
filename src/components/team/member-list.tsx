"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { TeamMember } from "@/data/team"

/**
 * MemberList — avant-garde editorial roster.
 *
 * Big-type name list (one row per member) with a cursor-following portrait
 * that fades in when you hover a row. The portrait tracks mouse position
 * via rAF lerp at 0.15 ease, sitting at a permanent -3° tilt for a
 * polaroid feel.
 *
 * On touch / reduced-motion / no hover: the portrait is hidden and rows
 * still navigate to the member detail page on tap.
 */
export function MemberList({ members }: { members: TeamMember[] }) {
  const [hovered, setHovered] = useState<TeamMember | null>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  // Cursor follower — runs once, owns its own rAF loop.
  useEffect(() => {
    if (typeof window === "undefined") return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const portrait = portraitRef.current
    if (!portrait) return

    const target = { x: 0, y: 0 }
    const pos    = { x: 0, y: 0 }
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const tick = () => {
      // Lerp toward cursor at 0.15 — feels weighty without lagging
      pos.x += (target.x - pos.x) * 0.15
      pos.y += (target.y - pos.y) * 0.15
      // Translate so the portrait CENTER sits at the cursor (offset by half its size)
      portrait.style.transform =
        `translate3d(${pos.x - 110}px, ${pos.y - 130}px, 0) rotate(-3deg)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <ul className="divide-y divide-rule list-none p-0 m-0">
        {members.map((m, i) => {
          const isDimmed = hovered && hovered.id !== m.id
          return (
            <li key={m.id}>
              <Link
                href={`/team/${m.id}`}
                onMouseEnter={() => setHovered(m)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(m)}
                onBlur={() => setHovered(null)}
                className={`group block no-underline py-6 md:py-9
                            transition-opacity duration-500
                            ${isDimmed ? "opacity-35" : "opacity-100"}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
              >
                <div className="grid grid-cols-[44px_1fr] md:grid-cols-[72px_1fr_auto] gap-x-5 md:gap-x-8 items-baseline">
                  <span className="text-xs md:text-sm font-semibold font-sans text-ink-3 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-sans font-extrabold text-ink tracking-[-0.03em] leading-[0.9] m-0
                               transition-transform duration-[500ms]
                               group-hover:translate-x-2 md:group-hover:translate-x-4"
                    style={{
                      fontSize: "clamp(36px, 7vw, 96px)",
                      transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)",
                    }}
                  >
                    {m.name}
                  </h3>
                  <span className="hidden md:inline-block text-sm uppercase tracking-[0.18em] font-medium font-sans text-ink-3 self-center">
                    {m.role}
                  </span>
                </div>
                {/* Mobile-only secondary row — role shows below name */}
                <p className="md:hidden mt-2 ml-[44px] text-xs uppercase tracking-[0.18em] font-medium font-sans text-ink-3 m-0">
                  {m.role}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Cursor-following portrait — fades in only when a row is hovered.
          pointer-events-none so it doesn't steal hover from the rows. */}
      <div
        ref={portraitRef}
        aria-hidden="true"
        className={`hidden md:block pointer-events-none fixed top-0 left-0 z-30
                    transition-opacity duration-300 ease-out
                    ${hovered ? "opacity-100" : "opacity-0"}`}
        style={{ width: 220, height: 260, willChange: "transform" }}
      >
        <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-paper-3
                        shadow-[0_24px_60px_rgba(22,19,16,0.28)]">
          {hovered && (
            <Image
              src={hovered.image}
              alt=""
              fill
              className="object-cover"
              sizes="220px"
            />
          )}
        </div>
      </div>
    </>
  )
}
