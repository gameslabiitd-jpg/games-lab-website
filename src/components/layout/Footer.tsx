import Link from "next/link"
import Image from "next/image"

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
    <footer className="w-full border-t border-white/8">
      <div className="w-[88%] max-w-[1500px] mx-auto pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-20">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Image
              src="/images/logo-white.svg"
              alt="GAMES Lab"
              width={140}
              height={46}
            />
            <p className="text-[14px] leading-relaxed text-ink-soft max-w-[240px] m-0">
              IIT Delhi Game Design Lab.<br />
              Exploring innovation through gaming,<br />
              immersive media, and storytelling.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-1">
              {[
                { src: "/images/icon-fb.svg",       alt: "Facebook",  href: "#" },
                { src: "/images/icon-insta.svg",    alt: "Instagram", href: "#" },
                { src: "/images/icon-linkedin.svg", alt: "LinkedIn",  href: "#" },
              ].map(({ src, alt, href }) => (
                <a
                  key={alt}
                  href={href}
                  aria-label={alt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-30 hover:opacity-70 transition-opacity duration-200 hover:-translate-y-0.5"
                >
                  <Image src={src} alt={alt} width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold font-sans mb-5">
              Links
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14px] text-ink-soft hover:text-white/80 transition-colors duration-200 font-sans"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold font-sans mb-5">
              Contact Us
            </h4>
            <div className="flex flex-col gap-5 text-[14px] text-ink-soft leading-relaxed">
              <address className="not-italic">
                IIT Campus, Hauz Khas,<br />
                New Delhi, Delhi 110016
              </address>
              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] font-sans mb-1.5">Email</p>
                <a
                  href="mailto:info@games.iitd.ac.in"
                  className="hover:text-white/80 transition-colors duration-200 font-sans"
                >
                  info@games.iitd.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5 text-center">
        <p className="text-[12px] text-white/20 font-sans m-0">
          © 2026 IIT Delhi GAMES Lab. All rights reserved.
        </p>
        <a
          href="https://www.linkedin.com/in/amlan-you/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/15 hover:text-white/40 transition-colors mt-1 inline-block font-sans"
        >
          Designed &amp; Developed by Amlan Mishra
        </a>
      </div>
    </footer>
  )
}
