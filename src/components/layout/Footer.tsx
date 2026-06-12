import Link from "next/link"
import Image from "next/image"
import BackToTop from "@/components/ui/BackToTop"

/**
 * Hallmark · genre: editorial · component: footer · design-system: design.md
 *
 * "Game menu screen" footer — playful and on-brand for a games lab, but
 * fully accessible. Nav is an arcade-style menu: a ▶ selector + neon glow
 * snaps to whichever entry you hover OR keyboard-focus (group-hover +
 * group-focus-visible, so it works for mouse, keyboard and touch alike). It
 * floats on the approved animated mesh gradient with a faint CRT scanline.
 * Real data only; mesh + scanline freeze under prefers-reduced-motion.
 */

const nav = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Publications", href: "/publications" },
  { label: "Games",        href: "/games" },
  { label: "Team",         href: "/team" },
  { label: "News",         href: "/news" },
]

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden isolate text-paper">
      {/* Animated mesh gradient field */}
      <div aria-hidden className="footer-mesh absolute inset-0 -z-10" />

      <div className="relative w-[92%] max-w-[1100px] mx-auto py-14 md:py-20">
        {/* The "screen" */}
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-ink/40 backdrop-blur-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/10">
          {/* Dynamic gradient — a slowly rotating conic sweep (same palette
              as the mesh) that gives the glass a living, iridescent sheen. */}
          <div
            aria-hidden
            className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-2xl mix-blend-screen"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.10] to-transparent"
          />

          <div className="relative px-6 py-10 md:px-10 md:py-14 flex flex-col items-center gap-8 md:gap-10">
            <Image
              src="/images/Brand/Logo.svg"
              alt="GAMES Lab"
              width={150}
              height={47}
              className="h-auto w-[140px] [filter:invert(1)]"
            />

            {/* Arcade menu */}
            <nav className="flex flex-col items-center gap-1.5 md:gap-2">
              {nav.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative flex items-center justify-center py-1.5 text-lg md:text-xl font-semibold tracking-tight text-paper/65 transition-colors duration-200 hover:text-paper focus-visible:text-paper outline-none"
                >
                  {/* ▶ selector — appears on hover or keyboard focus */}
                  <span
                    aria-hidden
                    className="absolute right-full mr-3 flex items-center text-paper opacity-0 -translate-x-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 motion-reduce:transition-none"
                  >
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5v9l8-4.5-8-4.5Z" /></svg>
                  </span>
                  <span className="transition-transform duration-200 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06] group-hover:[text-shadow:0_0_20px_rgba(255,255,255,0.5)] group-focus-visible:[text-shadow:0_0_20px_rgba(255,255,255,0.5)] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    {label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Contact line */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <a
                href="mailto:gameslabiitd@gmail.com"
                className="group relative inline-block text-paper text-[15px] font-medium"
              >
                gameslabiitd@gmail.com
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-0.5 h-px w-full origin-center scale-x-0 bg-paper/80 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
              <p className="text-sm text-paper/55 m-0">
                IIT Campus, Hauz Khas, New Delhi, Delhi 110016
              </p>
            </div>
          </div>

          {/* Bottom bar inside the screen */}
          <div className="relative border-t border-white/12 px-6 md:px-10 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-paper/55 font-sans m-0 text-center sm:text-left">
              © 2026 IIT Delhi GAMES Lab
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}
