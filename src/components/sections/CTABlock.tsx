import ScrollReveal from "@/components/animations/ScrollReveal"

/**
 * Hallmark · genre: editorial · component: CTA · design-system: design.md
 * Editorial two-column. Big ink statement on left, body + ink-pill CTA on right.
 */

export default function CTABlock() {
  return (
    <section className="w-full pt-28 pb-40 md:pt-32 md:pb-48 bg-paper">
      <div className="w-[90%] max-w-[1500px] mx-auto mb-20 md:mb-24">
        <div className="h-px bg-rule" />
      </div>

      <div className="w-[90%] max-w-[1500px] mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <h2 className="font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] m-0"
                  style={{ fontSize: "clamp(40px, 7vw, 96px)" }}>
                Interested in<br />collaborating<br />with us?
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-8 pb-2">
              <p className="text-md text-ink-2 leading-relaxed max-w-[360px] md:text-right m-0">
                We work with researchers, educators, designers, and studios.
                Reach out to explore partnerships and open positions.
              </p>
              {/* CTA — ink pill with burgundy slide-fill on hover.
                  Accent burgundy gets a deliberate moment here, since it's the
                  page's single call to action. Arrow slides right on hover. */}
              {/* CTA — ink pill with burgundy slide-fill on hover.
                  Text uses pure `text-white` (not the warm `text-paper` token)
                  so it stays high-contrast against ink AND accent burgundy. */}
              <a
                href="mailto:info@games.iitd.ac.in"
                aria-label="Email the GAMES Lab at info@games.iitd.ac.in"
                className="group relative inline-flex items-center gap-3 overflow-hidden
                           bg-ink text-white font-semibold text-md font-sans
                           px-9 py-4 rounded-full
                           transition-[transform,box-shadow] duration-[500ms]
                           hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(22,19,16,0.22)]"
                style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
              >
                {/* Burgundy fill slides in from left */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100
                             bg-accent transition-transform duration-[600ms]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
                />
                <span className="relative z-10 text-white">Get in touch</span>
                <span
                  aria-hidden
                  className="relative z-10 text-lg leading-none text-white
                             transition-transform duration-[500ms]
                             group-hover:translate-x-1"
                  style={{ transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
