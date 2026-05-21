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
    <footer className="bg-brand-dark w-full text-white">
      {/* Gradient top bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-dark via-brand-accent to-brand-dark" />

      <div className="w-[88%] max-w-[1500px] mx-auto pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-16">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo-white.svg"
              alt="GAMES Lab"
              width={160}
              height={52}
              className="mb-1"
            />
            <p className="text-[14px] leading-relaxed text-white/70 max-w-[260px]">
              IIT Delhi Game Design Lab.<br />
              Exploring innovation through gaming,<br />
              immersive media, and storytelling.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-2">
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
                  className="opacity-60 hover:opacity-100 transition-opacity duration-200 hover:-translate-y-0.5"
                >
                  <Image src={src} alt={alt} width={22} height={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-4">
              Links
            </h4>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-4">
              Contact Us
            </h4>
            <div className="flex flex-col gap-4 text-[14px] text-white/70 leading-relaxed">
              <address className="not-italic">
                IIT Campus, Hauz Khas,<br />
                New Delhi, Delhi 110016
              </address>
              <div>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Email</p>
                <a
                  href="mailto:info@games.iitd.ac.in"
                  className="hover:text-white transition-colors"
                >
                  info@games.iitd.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/10 py-5 text-center">
        <p className="text-[13px] text-white/40">
          © 2026 IIT Delhi GAMES Lab. All rights reserved.
        </p>
        <a
          href="https://www.linkedin.com/in/amlan-you/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-white/30 hover:text-white/60 transition-colors mt-1 inline-block"
        >
          Designed &amp; Developed by Amlan Mishra
        </a>
      </div>
    </footer>
  )
}
