"use client"

import { useState } from "react"
import Link from "next/link"
import type { TeamMember } from "@/data/team"

/**
 * MemberList — avant-garde editorial roster.
 *
 * Big-type name list (one row per member). Hovering a row dims the others
 * and nudges the active name to the right for an editorial highlight.
 *
 * On touch / reduced-motion: rows still navigate to the member detail
 * page on tap; the dim/nudge are pointer-driven enhancements.
 */
export function MemberList({ members }: { members: TeamMember[] }) {
  const [hovered, setHovered] = useState<TeamMember | null>(null)

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
                    className="t-h3 font-sans font-extrabold text-ink tracking-[-0.03em] leading-[0.9] m-0
                               transition-transform duration-[500ms]
                               group-hover:translate-x-2 md:group-hover:translate-x-4"
                    style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
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
    </>
  )
}
