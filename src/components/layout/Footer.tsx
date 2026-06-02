import Link from "next/link"
import Image from "next/image"

/**
 * Hallmark · genre: editorial · component: footer · design-system: design.md
 * Border-top only. No backgrounds, no brand bars. Masthead-style info layout.
 */

const links = [
  { label: "Home",      href: "/" },
  { label: "About Us",  href: "/about" },
  { label: "Research",  href: "/research" },
  { label: "Games",     href: "/games" },
  { label: "Team",      href: "/team" },
  { label: "News",      href: "/news" },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-rule bg-paper">
      <div className="w-[90%] max-w-[1500px] mx-auto pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-20">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Image
              src="/images/Brand/Logo.svg"
              alt="GAMES Lab"
              width={140}
              height={44}
            />
            <p className="text-sm leading-relaxed text-ink-2 max-w-[280px] m-0">
              IIT Delhi Game Design Lab. Exploring innovation through gaming,
              immersive media, and storytelling.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ink-3 font-semibold font-sans mb-5">
              Pages
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ink-2 hover:text-ink transition-colors duration-200 font-sans"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ink-3 font-semibold font-sans mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-5 text-sm text-ink-2 leading-relaxed">
              <address className="not-italic">
                IIT Campus, Hauz Khas,<br />
                New Delhi, Delhi 110016
              </address>
              <div>
                <p className="text-ink-3 text-xs uppercase tracking-[0.2em] font-sans mb-1.5">Email</p>
                <a
                  href="mailto:info@games.iitd.ac.in"
                  className="text-ink hover:opacity-60 transition-opacity font-sans"
                >
                  info@games.iitd.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rule-soft py-5 text-center">
        <p className="text-xs text-ink-3 font-sans m-0">
          © 2026 IIT Delhi GAMES Lab
        </p>
      </div>
    </footer>
  )
}
