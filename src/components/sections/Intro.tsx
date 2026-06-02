import ScrollReveal from "@/components/animations/ScrollReveal"

/**
 * Hallmark · genre: editorial · component: intro · design-system: design.md
 *
 * Lab mission statement — eyebrow + large ink headline on the left,
 * body copy on the right. Mirrors the two-column rhythm used by
 * CTABlock so the page reads as one editorial system.
 *
 * The "GAMES" acronym in the body is wrapped in <strong> so the
 * letter expansion (Gaming, Augmented & Mixed-Reality Experiences,
 * Simulations) reads as an intentional callout, not body text.
 */

export default function Intro() {
  return (
    <section className="w-full pt-24 pb-32 md:pt-32 md:pb-44 bg-paper">
      <div className="w-[90%] max-w-[1500px] mx-auto mb-16 md:mb-24">
        <div className="h-px bg-rule" />
      </div>

      <div className="w-[90%] max-w-[1500px] mx-auto">
        {/* Asymmetric 5/7 split — headline narrower & taller, body wider.
            Body column is pushed down so the H2 baseline sits above its
            first line, giving the spread an editorial drop-cap rhythm. */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <ScrollReveal className="md:col-span-5">
            <h2
              className="font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.03em] m-0"
              style={{ fontSize: "clamp(44px, 6.6vw, 96px)" }}
            >
              Transforming<br />through Play
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120} className="md:col-span-7 md:pt-8 lg:pt-10">
            <p className="font-sans text-ink-2 leading-[1.55] m-0 max-w-[58ch]"
               style={{ fontSize: "clamp(17px, 1.35vw, 22px)" }}>
              The{" "}
              <span className="text-ink font-medium">
                Gaming, Augmented &amp; Mixed-Reality Experiences and
                Simulations (GAMES) Lab
              </span>{" "}
              is an interdisciplinary collective that pushes the boundaries
              of immersive and playful technologies to facilitate education,
              well-being, behaviour change and accessibility.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
