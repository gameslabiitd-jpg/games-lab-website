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
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-5 px-5">
      {/* Pill */}
      <div
        className={cn(
          "relative w-full max-w-[1500px] h-[60px] rounded-2xl flex items-center justify-between px-6",
          "border transition-[box-shadow,border-color] duration-400",
          // Solid pill — readable on any page background (light or dark)
          "bg-[#FAFAF7] border-[#161310]/12",
          scrolled
            ? "shadow-[0_6px_28px_rgba(22,19,16,0.18)]"
            : "shadow-[0_2px_14px_rgba(22,19,16,0.10)]"
        )}
      >
        {/* Logo — original GAMES Lab brand mark */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/Brand/Logo.svg"
            alt="GAMES Lab IIT Delhi"
            width={120}
            height={38}
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
                    "text-[14px] font-medium font-sans transition-colors duration-200",
                    active ? "text-[#161310]" : "text-[#161310]/80 hover:text-[#161310]"
                  )}
                >
                  {label}
                </Link>
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-[#161310] rounded-full transition-[width] duration-300",
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
          className="hidden md:inline-flex items-center text-[13px] font-medium font-sans
                     text-[#161310] border border-[#161310]/45 px-4 py-2 rounded-full
                     transition-[background-color,border-color,color] duration-200
                     hover:bg-[#161310] hover:border-[#161310] hover:text-[#FAFAF7] whitespace-nowrap"
        >
          info@games.iitd.ac.in
        </a>

        {/* Hamburger — mobile */}
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ml-auto cursor-pointer"
        >
          <span className={cn(
            "block h-px bg-[#161310]/70 rounded-full transition-[transform,opacity,width] duration-300",
            menuOpen ? "rotate-45 translate-y-[6px] w-6" : "w-6"
          )} />
          <span className={cn(
            "block h-px bg-[#161310]/70 rounded-full transition-[transform,opacity,width] duration-300",
            menuOpen ? "opacity-0 w-4" : "w-4"
          )} />
          <span className={cn(
            "block h-px bg-[#161310]/70 rounded-full transition-[transform,opacity,width] duration-300",
            menuOpen ? "-rotate-45 -translate-y-[6px] w-6" : "w-6"
          )} />
        </button>
      </div>

      {/* Mobile dropdown — light theme to match the pill */}
      <div className={cn(
        "md:hidden absolute top-[72px] left-5 right-5",
        "bg-[#FAFAF7] rounded-2xl border border-[#161310]/12 shadow-[0_8px_28px_rgba(22,19,16,0.18)]",
        "overflow-hidden transition-[opacity,transform] duration-300 origin-top",
        menuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
      )}
      style={{ overscrollBehavior: "contain" }}>
        <ul className="list-none m-0 p-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "block text-[15px] font-medium font-sans px-4 py-3 rounded-xl transition-[background-color,color] duration-200",
                  pathname === href
                    ? "text-[#161310] bg-[#161310]/8"
                    : "text-[#161310]/75 hover:text-[#161310] hover:bg-[#161310]/5"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="mailto:info@games.iitd.ac.in"
              className="block text-center text-[14px] font-medium text-[#FAFAF7] bg-[#161310] px-4 py-3 rounded-xl font-sans hover:opacity-90 transition-opacity"
            >
              info@games.iitd.ac.in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
