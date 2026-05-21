import ScrollReveal from "@/components/animations/ScrollReveal"

export default function CTABlock() {
  return (
    <section className="bg-brand-dark w-full py-24 mt-16">
      <div className="w-[88%] max-w-[1500px] mx-auto text-center">
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.15em] text-brand-accent font-semibold mb-4">
            Let&apos;s Build Together
          </p>
          <h2 className="text-[40px] md:text-[52px] font-black text-white leading-[1.1] mb-6 tracking-tight">
            Interested in collaborating<br />with GAMES Lab?
          </h2>
          <p className="text-[16px] text-white/60 max-w-[480px] mx-auto mb-10 leading-relaxed">
            We work with researchers, educators, designers, and studios.
            Reach out to explore partnerships and open positions.
          </p>
          <a
            href="mailto:info@games.iitd.ac.in"
            className="inline-flex items-center gap-3 bg-brand-accent text-brand-dark font-bold text-[15px] px-8 py-4 rounded-full hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(190,159,255,0.4)]"
          >
            Get in Touch
            <span className="text-[20px] leading-none">→</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
