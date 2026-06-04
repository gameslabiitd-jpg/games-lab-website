"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  motion, AnimatePresence,
  useMotionValue, useSpring,
} from "motion/react"
import { cn } from "@/lib/cn"

/**
 * Hallmark · genre: editorial · component: nav · design-system: design.md
 *
 * Animation stack:
 *  1. Pill entry    — spring drop-in from above on mount
 *  2. Link stagger  — items cascade in (60ms between each)
 *  3. Magnetic pull — cursor moves links 25-35% toward pointer via useSpring
 *  4. Sliding pill  — layoutId "nav-pill" springs between hover/active positions
 *                     (stiffness 600, damping 20 = snappy with visible overshoot)
 *  5. Accent dot    — layoutId "nav-dot" travels between routes on navigation
 *  6. Scramble CTA  — "Contact" text randomises on hover then resolves
 *  7. CTA fill      — variant propagation: parent motion.a → child motion.span
 *                     (the correct fix for hover-text not changing colour)
 *  8. Hamburger     — individual spring rotate / translate / opacity per bar
 *  9. Mobile menu   — AnimatePresence scale-from-top + staggered list items
 */

/* ─────────────────────────── constants ─────────────────────────── */

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Publications", href: "/publications" },
  { label: "Games",    href: "/games" },
  { label: "Team",     href: "/team" },
]

const PILL_SPRING   = { type: "spring" as const, stiffness: 600, damping: 20 }
const MAGNET_SPRING = { stiffness: 700, damping: 40 }
const ENTRY_SPRING  = { type: "spring" as const, stiffness: 260, damping: 24 }
const FAST_SPRING   = { type: "spring" as const, stiffness: 500, damping: 32 }

/* ─────────────────────────── scramble hook ─────────────────────── */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!?$%"

function useScramble(text: string) {
  const [display, setDisplay] = useState(text)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const trigger = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    let frame = 0
    const total = 14
    timer.current = setInterval(() => {
      setDisplay(
        text.split("").map((ch, i) =>
          i < Math.floor((frame / total) * text.length)
            ? ch
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        ).join("")
      )
      frame++
      if (frame > total) {
        clearInterval(timer.current!)
        timer.current = null
        setDisplay(text)
      }
    }, 30)
  }, [text])

  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])

  return { display, trigger }
}

/* ─────────────────────── magnetic nav link ─────────────────────── */

function MagnetLink({
  href, label, isActive, isHighlighted, onEnter, onLeave, index,
}: {
  href: string; label: string; isActive: boolean; isHighlighted: boolean
  onEnter: () => void; onLeave: () => void; index: number
}) {
  const el    = useRef<HTMLLIElement>(null)
  const rawX  = useMotionValue(0)
  const rawY  = useMotionValue(0)
  const x     = useSpring(rawX, MAGNET_SPRING)
  const y     = useSpring(rawY, MAGNET_SPRING)

  const onMove = (e: React.MouseEvent) => {
    const r = el.current?.getBoundingClientRect()
    if (!r) return
    rawX.set((e.clientX - (r.left + r.width  / 2)) * 0.28)
    rawY.set((e.clientY - (r.top  + r.height / 2)) * 0.38)
  }
  const onLeaveEl = () => { rawX.set(0); rawY.set(0); onLeave() }

  return (
    <motion.li
      ref={el}
      className="relative"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...ENTRY_SPRING, delay: 0.08 + index * 0.065 }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeaveEl}
    >
      {/* Sliding pill — shared layoutId glides between list items */}
      {isHighlighted && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-xl bg-ink/[0.07]"
          transition={PILL_SPRING}
          aria-hidden="true"
        />
      )}

      {/* Magnetic inner wrapper */}
      <motion.div style={{ x, y }}>
        <Link
          href={href}
          className={cn(
            "relative z-10 inline-flex items-center gap-1.5",
            "px-3.5 py-[9px] rounded-xl",
            "text-[13px] font-sans tracking-[-0.005em] whitespace-nowrap select-none",
            "transition-colors duration-150 outline-none",
            isActive
              ? "font-semibold text-ink"
              : "font-medium text-ink-3 hover:text-ink",
          )}
        >
          {/* Accent dot — also slides between routes via layoutId */}
          {isActive && (
            <motion.span
              layoutId="nav-dot"
              className="block w-[5px] h-[5px] rounded-full bg-accent shrink-0"
              transition={PILL_SPRING}
              aria-hidden="true"
            />
          )}
          {label}
        </Link>
      </motion.div>
    </motion.li>
  )
}

/* ─────────────────────── contact CTA ──────────────────────────── */

/**
 * Variant propagation pattern — parent motion.a sets the variant,
 * children automatically inherit it. This is how Framer Motion
 * guarantees child states update together with the hover gesture.
 */
const ctaFillV = {
  rest:  { scaleX: 0, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] as const } },
  hover: { scaleX: 1, transition: { duration: 0.42, ease: [0.65, 0, 0.35, 1] as const } },
}
const ctaTextV = {
  rest:  { color: "#161310", transition: { duration: 0.22 } },
  hover: { color: "#FBF8F2", transition: { duration: 0.18 } },
}
const ctaArrowV = {
  rest:  { opacity: 0, x: -6, width: 0,  transition: { duration: 0.2 } },
  hover: { opacity: 1, x:  0, width: 14, transition: { duration: 0.32, ease: [0.65, 0, 0.35, 1] as const } },
}

function ContactCTA() {
  const { display, trigger } = useScramble("Contact")

  return (
    <motion.a
      href="mailto:gameslabiitd@gmail.com"
      aria-label="Contact GAMES Lab at gameslabiitd@gmail.com"
      className="relative hidden md:inline-flex items-center gap-1.5 overflow-hidden
                 border border-ink/30 px-5 py-[9px] rounded-full
                 text-[13px] font-medium font-sans tracking-[-0.005em] cursor-pointer"
      variants={{}}           /* parent just carries the gesture */
      initial="rest"
      whileHover="hover"
      onHoverStart={trigger}
    >
      {/* Ink fill slides from left — inherits "hover" from parent */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-ink origin-left"
        variants={ctaFillV}
      />
      {/* Scrambled text — colour flips via variant */}
      <motion.span
        className="relative z-10 font-sans font-medium text-[13px] min-w-[46px] text-center"
        variants={ctaTextV}
      >
        {display}
      </motion.span>
      {/* Arrow slides in */}
      <motion.span
        aria-hidden="true"
        className="relative z-10 overflow-hidden leading-none"
        variants={ctaArrowV}
        style={{ color: "#FBF8F2" }}
      >
        →
      </motion.span>
    </motion.a>
  )
}

/* ─────────────────────── main navbar ───────────────────────────── */

export default function Navbar() {
  const pathname  = usePathname()
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  /* The highlighted link — hovered takes priority, falls back to active */
  const highlight = hoveredHref ?? pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Close the mobile menu whenever the route changes. Done during render
     (React's documented "adjust state when a prop changes" pattern) rather
     than in an effect, so there's no setState-in-effect cascade. */
  const [menuPathname, setMenuPathname] = useState(pathname)
  if (pathname !== menuPathname) {
    setMenuPathname(pathname)
    setMenuOpen(false)
  }

  return (
    /*
     * Outer wrapper is pointer-events-none so the transparent space above
     * the pill doesn't swallow scroll / click events on the page behind it.
     * Pill and dropdown restore pointer events individually.
     */
    <nav
      className="fixed top-0 left-0 w-full z-50 flex flex-col items-center px-4 pt-4"
      style={{ pointerEvents: "none" }}
    >

      {/* ── Floating pill ─────────────────────────────────────────── */}
      <motion.div
        layoutRoot                         /* layout boundary for fixed elements */
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1,  y:   0 }}
        transition={ENTRY_SPRING}
        className={cn(
          "pointer-events-auto w-full max-w-[1100px]",
          "h-[58px] flex items-center justify-between px-3",
          "rounded-2xl border",
          "transition-[background-color,border-color,box-shadow] duration-500",
          scrolled
            ? "bg-paper/[0.97] border-rule shadow-[0_4px_24px_rgba(22,19,16,0.09)]"
            : "bg-paper/[0.86] border-rule/40",
        )}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)",
        }}
      >

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="ml-2 shrink-0"
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={FAST_SPRING}>
            <Link href="/" aria-label="GAMES Lab — home">
              <Image
                src="/images/Brand/Logo.svg"
                alt="GAMES Lab IIT Delhi"
                width={112}
                height={36}
                priority
                className="h-auto w-[112px] opacity-100 hover:opacity-70 transition-opacity duration-300"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Desktop links */}
        <ul
          className="hidden md:flex items-center gap-0 list-none m-0 p-0"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {navLinks.map(({ label, href }, i) => (
            <MagnetLink
              key={href}
              href={href}
              label={label}
              isActive={pathname === href}
              isHighlighted={highlight === href}
              onEnter={() => setHoveredHref(href)}
              onLeave={() => setHoveredHref(null)}
              index={i}
            />
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          className="hidden md:block"
        >
          <ContactCTA />
        </motion.div>

        {/* Hamburger — mobile */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
          className="pointer-events-auto md:hidden flex flex-col justify-center
                     items-center gap-[5px] w-10 h-10 rounded-xl ml-auto mr-1
                     hover:bg-ink/[0.05] transition-colors duration-200 cursor-pointer"
          style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        >
          <motion.span
            className="block h-[1.5px] w-5 rounded-full bg-ink-2"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
            transition={FAST_SPRING}
          />
          <motion.span
            className="block h-[1.5px] rounded-full bg-ink-2"
            animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 8 : 12 }}
            transition={FAST_SPRING}
          />
          <motion.span
            className="block h-[1.5px] w-5 rounded-full bg-ink-2"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
            transition={FAST_SPRING}
          />
        </motion.button>
      </motion.div>

      {/* ── Mobile dropdown ──────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scaleY: 0.85, y: -10 }}
            animate={{ opacity: 1, scaleY: 1.0,  y:   0 }}
            exit={{   opacity: 0, scaleY: 0.9,   y:  -6 }}
            transition={PILL_SPRING}
            style={{ originY: 0, pointerEvents: "auto" }}
            className="w-full max-w-[1100px] mt-2
                       bg-paper rounded-2xl border border-rule
                       shadow-[0_8px_32px_rgba(22,19,16,0.12)] overflow-hidden"
            aria-label="Mobile navigation"
          >
            <ul className="list-none m-0 p-3 flex flex-col gap-0.5">
              {navLinks.map(({ label, href }, i) => {
                const active = pathname === href
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1,  x:   0 }}
                    transition={{ ...FAST_SPRING, delay: i * 0.045 }}
                  >
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2.5 px-4 py-3 rounded-xl",
                        "text-md font-sans",
                        "transition-[background-color,color] duration-150",
                        active
                          ? "font-semibold text-ink bg-ink/[0.07]"
                          : "font-medium text-ink-2 hover:text-ink hover:bg-ink/[0.04]",
                      )}
                    >
                      {active && (
                        <span className="block w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                      )}
                      {label}
                    </Link>
                  </motion.li>
                )
              })}

              <motion.li
                className="mt-2 pt-2 border-t border-rule"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.045 + 0.04 }}
              >
                <a
                  href="mailto:gameslabiitd@gmail.com"
                  className="flex items-center justify-between px-4 py-3 rounded-xl
                             text-sm font-medium font-sans bg-ink text-paper
                             hover:opacity-85 transition-opacity duration-150"
                >
                  <span>gameslabiitd@gmail.com</span>
                  <span aria-hidden="true" className="opacity-60">→</span>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
