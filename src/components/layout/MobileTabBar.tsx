"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { cn } from "@/lib/cn"

/**
 * Hallmark · component: mobile-tab-bar · design-system: design.md
 *
 * Always-visible bottom navigation dock for mobile (replaces the hamburger so
 * no page is hidden behind a tap). Floating frosted pill in the thumb zone,
 * one icon + label per page, with a sliding active indicator (shared layoutId,
 * matching the desktop nav-pill). It slides out of the way when the footer is
 * on screen, so it never covers the footer's content.
 */

const tabs = [
  { label: "Home", href: "/", icon: IconHome },
  { label: "About", href: "/about", icon: IconAbout },
  { label: "Publications", href: "/publications", icon: IconPapers },
  { label: "Games", href: "/games", icon: IconGames },
  { label: "Team", href: "/team", icon: IconTeam },
]

export default function MobileTabBar() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)

  // Stay out of the way: hide while scrolling down (reading), slide back in
  // on scroll up or near the top. Keeps the dock from feeling intrusive while
  // still being one swipe away — and naturally clears the footer.
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      if (y < 64) setHidden(false)
      else if (y > lastY + 6) setHidden(true)
      else if (y < lastY - 6) setHidden(false)
      lastY = y
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        aria-label="Primary"
        initial={false}
        animate={{ y: hidden ? 120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="pointer-events-auto mb-[calc(env(safe-area-inset-bottom,0px)+10px)]
                   flex items-stretch gap-0.5 rounded-full border border-rule/70
                   bg-paper/80 px-1 py-1 shadow-[0_6px_20px_rgba(22,19,16,0.10)]"
        style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 rounded-full",
                "min-w-[54px] px-2 py-1.5 select-none transition-colors duration-150",
                "active:scale-95 transition-transform",
                active ? "text-accent" : "text-ink-3 hover:text-ink",
              )}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              {active && (
                <motion.span
                  layoutId="mobile-tab-pill"
                  className="absolute inset-0 rounded-full bg-accent/[0.10]"
                  transition={{ type: "spring", stiffness: 600, damping: 34 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">
                <Icon />
              </span>
              <span
                className={cn(
                  "relative z-10 text-[10px] leading-none font-sans tracking-tight",
                  active ? "font-semibold" : "font-medium",
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </motion.nav>
    </div>
  )
}

/* ── Icons (Lucide-style, 22px line) ─────────────────────────────── */

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function IconHome() {
  return (
    <svg {...base}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  )
}
function IconAbout() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  )
}
function IconPapers() {
  return (
    <svg {...base}>
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v4h4" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  )
}
function IconGames() {
  return (
    <svg {...base}>
      <path d="M6 8h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.7L13 15h-2l-2 .7A4 4 0 0 1 2 13v-1a4 4 0 0 1 4-4Z" />
      <path d="M7 11v3M5.5 12.5h3" />
      <path d="M16 11.5h.01M18.5 13.5h.01" />
    </svg>
  )
}
function IconTeam() {
  return (
    <svg {...base}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.5a3 3 0 0 1 0 5.8" />
      <path d="M17.5 14.5a5.5 5.5 0 0 1 3 5" />
    </svg>
  )
}
