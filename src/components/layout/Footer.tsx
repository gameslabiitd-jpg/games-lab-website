import Link from "next/link"
import Image from "next/image"

/**
 * Hallmark · genre: editorial · component: footer · design-system: design.md
 *
 * Dark closing band — a deliberate departure from the cream body so the
 * page ends on a strong note. Burgundy radial glow + a giant faint
 * "GAMES LAB" watermark behind masthead-style info columns. The dark
 * logo is rendered as a white silhouette to read on ink.
 */

const links = [
  { label: "Home",      href: "/" },
  { label: "About Us",  href: "/about" },
  { label: "Publications",  href: "/publications" },
  { label: "Games",     href: "/games" },
  { label: "Team",      href: "/team" },
  { label: "News",      href: "/news" },
]

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ink text-paper">
      {/* Burgundy radial glow — top-right accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -right-1/4 w-[70%] h-[180%]"
        style={{
          background:
            "radial-gradient(circle at 70% 35%, oklch(45% 0.14 30 / 0.40), transparent 62%)",
        }}
      />

      {/* Giant faint watermark — anchored bottom-left, clipped by overflow */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute left-0 -bottom-[0.18em] whitespace-nowrap font-black font-sans leading-none tracking-[-0.04em] text-paper/[0.045]"
        style={{ fontSize: "clamp(90px, 17vw, 260px)" }}
      >
        GAMES LAB
      </span>

      <div className="relative w-[90%] max-w-[1500px] mx-auto pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-20">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Image
              src="/images/Brand/Logo.svg"
              alt="GAMES Lab"
              width={140}
              height={44}
              className="h-auto w-[140px] [filter:brightness(0)_invert(1)]"
            />
            <p className="text-sm leading-relaxed text-paper/55 max-w-[280px] m-0">
              IIT Delhi Game Design Lab. Exploring innovation through gaming,
              immersive media, and storytelling.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-paper/40 font-semibold font-sans mb-5">
              Pages
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-paper/70 hover:text-paper transition-colors duration-200 font-sans"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-paper/40 font-semibold font-sans mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-5 text-sm text-paper/70 leading-relaxed">
              <address className="not-italic">
                IIT Campus, Hauz Khas,<br />
                New Delhi, Delhi 110016
              </address>
              <div>
                <p className="text-paper/40 text-xs uppercase tracking-[0.2em] font-sans mb-1.5">Email</p>
                <a
                  href="mailto:gameslabiitd@gmail.com"
                  className="text-paper hover:text-paper/60 transition-colors font-sans"
                >
                  gameslabiitd@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-paper/15 py-5 text-center">
        <p className="text-xs text-paper/40 font-sans m-0">
          © 2026 IIT Delhi GAMES Lab
        </p>
      </div>
    </footer>
  )
}
