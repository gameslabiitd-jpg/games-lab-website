"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/cn"

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Games",    href: "/games" },
  { label: "Team",     href: "/team" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4">
      {/* Frosted gradient above navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-36"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          maskImage:
            "linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 40%,rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Pill */}
      <div
        className={cn(
          "relative w-full max-w-[1500px] h-16 bg-white rounded-2xl flex items-center justify-between px-6",
          "border-b-2 border-brand-accent",
          "transition-shadow duration-300",
          scrolled ? "shadow-[0_6px_24px_rgba(15,13,20,0.1)]" : "shadow-[0_2px_8px_rgba(15,13,20,0.06)]"
        )}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/Brand/Logo.svg"
            alt="GAMES Lab IIT Delhi"
            width={120}
            height={44}
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map(({ label, href }) => {
            const active = pathname === href
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className={cn(
                    "text-[15px] font-semibold transition-colors duration-200",
                    active ? "text-brand" : "text-ink-dark hover:text-brand"
                  )}
                >
                  {label}
                </Link>
                {/* Animated underline */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2.5px] bg-brand rounded-full transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </li>
            )
          })}
        </ul>

        {/* CTA — desktop */}
        <a
          href="mailto:info@games.iitd.ac.in"
          className="hidden md:inline-flex items-center text-[14px] font-semibold text-brand border-2 border-brand px-4 py-2 rounded-full hover:bg-brand hover:text-white transition-all duration-250 whitespace-nowrap"
        >
          info@games.iitd.ac.in
        </a>

        {/* Hamburger — mobile */}
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ml-auto"
        >
          <span
            className={cn(
              "block h-0.5 bg-ink-dark rounded-full transition-all duration-300",
              menuOpen ? "rotate-45 translate-y-[7px] w-6" : "w-6"
            )}
          />
          <span
            className={cn(
              "block h-0.5 bg-ink-dark rounded-full transition-all duration-300",
              menuOpen ? "opacity-0 w-4" : "w-4"
            )}
          />
          <span
            className={cn(
              "block h-0.5 bg-ink-dark rounded-full transition-all duration-300",
              menuOpen ? "-rotate-45 -translate-y-[7px] w-6" : "w-6"
            )}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "md:hidden absolute top-[76px] left-4 right-4 bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,13,20,0.12)] overflow-hidden",
          "transition-all duration-300 origin-top",
          menuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        )}
      >
        <ul className="list-none m-0 p-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "block text-[15px] font-semibold px-4 py-3 rounded-xl transition-all duration-200",
                  pathname === href
                    ? "text-brand bg-brand-muted"
                    : "text-ink-dark hover:text-brand hover:bg-brand-subtle"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="mailto:info@games.iitd.ac.in"
              className="block text-center text-[14px] font-semibold text-white bg-brand px-4 py-3 rounded-xl"
            >
              info@games.iitd.ac.in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
