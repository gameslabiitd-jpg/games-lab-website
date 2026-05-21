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
          "border border-white/10 border-b border-b-brand/40",
          "transition-[background-color,box-shadow,backdrop-filter] duration-400",
          scrolled
            ? "bg-[rgba(7,5,12,0.85)] backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
            : "bg-[rgba(7,5,12,0.4)] backdrop-blur-md"
        )}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo-white.svg"
            alt="GAMES Lab IIT Delhi"
            width={120}
            height={40}
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
                    "text-[14px] font-semibold font-sans transition-colors duration-200",
                    active ? "text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  {label}
                </Link>
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-brand-accent rounded-full transition-[width] duration-300",
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
          className="hidden md:inline-flex items-center text-[13px] font-semibold font-sans
                     text-brand-accent border border-brand/50 px-4 py-2 rounded-full
                     transition-[background-color,border-color,color] duration-200
                     hover:bg-brand hover:border-brand hover:text-white whitespace-nowrap"
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
            "block h-px bg-white/70 rounded-full transition-[transform,opacity,width] duration-300",
            menuOpen ? "rotate-45 translate-y-[6px] w-6" : "w-6"
          )} />
          <span className={cn(
            "block h-px bg-white/70 rounded-full transition-[transform,opacity,width] duration-300",
            menuOpen ? "opacity-0 w-4" : "w-4"
          )} />
          <span className={cn(
            "block h-px bg-white/70 rounded-full transition-[transform,opacity,width] duration-300",
            menuOpen ? "-rotate-45 -translate-y-[6px] w-6" : "w-6"
          )} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={cn(
        "md:hidden absolute top-[72px] left-5 right-5",
        "bg-[rgba(15,13,24,0.96)] backdrop-blur-xl rounded-2xl border border-white/10",
        "overflow-hidden transition-[opacity,transform] duration-300 origin-top",
        menuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
      )}>
        <ul className="list-none m-0 p-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "block text-[15px] font-semibold font-sans px-4 py-3 rounded-xl transition-[background-color,color] duration-200",
                  pathname === href
                    ? "text-white bg-white/8"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="mailto:info@games.iitd.ac.in"
              className="block text-center text-[14px] font-semibold text-white bg-brand px-4 py-3 rounded-xl font-sans"
            >
              info@games.iitd.ac.in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
