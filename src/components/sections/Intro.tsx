import ScrollReveal from "@/components/animations/ScrollReveal"
import Button from "@/components/ui/Button"
import MediaStack from "@/components/sections/MediaStack"

/**
 * Hallmark · genre: editorial · component: intro · design-system: design.md
 *
 * Lab mission statement — large ink headline + body copy + a route to the
 * About page on the left, paired with a cycling deck of project clips and
 * game-jam photos (MediaStack) on the right. Mirrors the two-column rhythm
 * used by CTABlock so the page reads as one editorial system.
 *
 * The "GAMES" acronym in the body is wrapped in <strong> so the
 * letter expansion (Gaming, Augmented & Mixed-Reality Experiences,
 * Simulations) reads as an intentional callout, not body text.
 */

export default function Intro() {
  return (
    <section className="w-full pt-10 pb-10 md:pt-14 md:pb-12 bg-paper">
      <div className="w-[90%] max-w-[1500px] mx-auto">
        {/* Editorial header — headline + route to About on the left, body
            copy on the right — sits above the full-width cinematic deck. */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-10 md:mb-14">
          <ScrollReveal className="md:col-span-5">
            <h2 className="t-display font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.03em] m-0">
              Transforming<br />through Play
            </h2>

            <div className="mt-7 md:mt-9">
              <Button href="/about" variant="outline">
                About the Lab
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="md:col-span-7 md:pb-2">
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

        {/* Full-width widescreen media deck — the section's focal point. */}
        <ScrollReveal delay={180}>
          <MediaStack />
        </ScrollReveal>
      </div>
    </section>
  )
}
