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
    <section className="w-full bg-paper py-10 md:py-8 md:min-h-[88svh] md:flex md:items-center">
      <div className="w-[90%] max-w-[1500px] mx-auto">
        {/* Single-screen composition: headline + body + About route on the
            left, the cycling media deck on the right, vertically centred so
            text and stack sit together in one viewport. */}
        {/* Compact header — headline + About on the left, body on the right —
            above a full-width, wide cinematic deck. */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-5 md:mb-6">
          <ScrollReveal className="md:col-span-5">
            <h2 className="t-display font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.03em] m-0">
              Transforming<br />through Play
            </h2>

            <div className="mt-5 md:mt-6">
              <Button href="/about" variant="outline">
                About the Lab
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="md:col-span-7 md:pb-1">
            <p className="font-sans text-ink-2 leading-[1.5] m-0 max-w-[60ch]"
               style={{ fontSize: "clamp(15px, 1.1vw, 19px)" }}>
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

        {/* Full-width cinematic media deck — the section's focal point. */}
        <ScrollReveal delay={180}>
          <MediaStack />
        </ScrollReveal>
      </div>
    </section>
  )
}
