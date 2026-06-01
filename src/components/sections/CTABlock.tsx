import ScrollReveal from "@/components/animations/ScrollReveal"

export default function CTABlock() {
  return (
    <section className="w-full py-32 mt-8">
      {/* Thin separator line */}
      <div className="w-[88%] max-w-[1500px] mx-auto mb-20">
        <div className="h-px bg-white/8" />
      </div>

      <div className="w-[88%] max-w-[1500px] mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
            {/* Left: text block */}
            <div>
              <h2 className="font-display text-[52px] md:text-[80px] text-ink leading-[0.9] tracking-tight m-0">
                Interested in<br />collaborating<br />with us?
              </h2>
            </div>

            {/* Right: description + CTA */}
            <div className="flex flex-col items-start md:items-end gap-8 pb-2">
              <p className="text-[16px] text-ink-mid leading-relaxed max-w-[360px] md:text-right m-0">
                We work with researchers, educators, designers, and studios.
                Reach out to explore partnerships and open positions.
              </p>
              <a
                href="mailto:info@games.iitd.ac.in"
                className="inline-flex items-center gap-3 bg-brand text-white font-semibold text-[15px] font-sans
                           px-8 py-4 rounded-full
                           transition-[background-color,transform,box-shadow] duration-300
                           hover:bg-brand-hover hover:-translate-y-1
                           hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)]"
              >
                Get in Touch
                <span aria-hidden className="text-[20px] leading-none">→</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
