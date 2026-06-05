import type { Metadata } from "next"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"
import { StatsFlipboard } from "@/components/about/stats-flipboard"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document · designed-as-app
 *
 * Verbatim-copy pass (user provided source text — must not be reworded):
 *   - Mission, methodology, funded projects, facilities & tools, research &
 *     outputs, application verticals — all use exact text from source.
 *   - Removed: image carousel, invented "Research/Design/Development/Impact"
 *     pillars section, equipment chips/marquee derivation.
 *   - Kept: hero H1 ("Where play meets purpose"), single 21:8 hero image,
 *     stats counters, pull quote, keyword marquee, pinned horizontal
 *     verticals, full-bleed Research & Outputs band, CTA block.
 */

export const metadata: Metadata = {
  title: "About Us",
  description:
    "GAMES Lab at IIT Delhi — our mission, research-through-design methodology, funded projects, facilities, and outputs.",
}

/** Verbatim from source copy. */
const verticals = [
  { label: "A", title: "Education",       desc: "Curricular games, training and simulation." },
  { label: "B", title: "Health/Wellbeing", desc: "Promoting healthy behaviors and sensitization." },
  { label: "C", title: "Accessibility",    desc: "Games for and with people with disability — e.g. ID and visual impairment." },
]

/** Verbatim from source copy. */
const fundedProjects = [
  {
    number: "01",
    title:  "Reimagining Nalanda Museum Experience",
    funder: "Archaeological Survey of India, Ministry of Culture, Govt. of India",
  },
  {
    number: "02",
    title:  "VR based Embodied Learning of Science Concepts for Middle School",
    funder: "Seed fund, Industrial Research and Development Unit, IIT Delhi",
  },
  {
    number: "03",
    title:  "Game and AR-based Toolkit for Disaster Preparation and Risk Reduction among Children and Youth",
    funder: "National Council for Science and Technology Communication, Department of Science and Technology, Govt. of India",
  },
  {
    number: "04",
    title:  "Viksit Bharat Digital matrix – 2026",
    funder: "Department for Promotion of Industry and Internal Trade, Govt. of India",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Top-anchored split-flap hero ─────────────────────────
          The slim 2-row board sits right under the navbar as a
          full-bleed masthead banner — no min-h-dvh, so it doesn't float
          in a sea of white. The opening statement (lifted Susan Linn
          quote) sits below, so the first screen reads as a deliberate
          editorial opening rather than padded empty space. */}
      <section className="relative w-full pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="w-full">
          <StatsFlipboard />
        </div>

        {/* Opening statement — quote lifted up to anchor the hero. */}
        <div className="w-[90%] max-w-[1500px] mx-auto mt-12 md:mt-16">
          <ScrollReveal>
            <blockquote className="max-w-[920px] m-0">
              <p className="t-quote font-sans font-extrabold text-ink leading-[1.12] tracking-[-0.02em] mb-6 m-0">
                &ldquo;Play is the foundation of learning, creativity,
                self-expression, and constructive problem-solving.&rdquo;
              </p>
              <footer className="text-sm text-ink-3 font-sans">
                Susan Linn, <cite className="italic">Consuming Kids</cite> (2003)
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Mission — verbatim from source ───────────────────────
          Readability pass: the first sentence is promoted to a large
          "lead" so the core mission lands immediately, then the
          supporting copy follows at a calmer body size. Heading sticks
          on desktop so it stays anchored while the column is read. */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-14 md:mb-24">
        <div className="grid md:grid-cols-12 gap-6 md:gap-16 items-start">
          <ScrollReveal className="md:col-span-4">
            <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0 md:sticky md:top-28">
              Our mission
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120} className="md:col-span-8 md:col-start-5">
            <div className="max-w-[62ch]">
              <p className="t-quote font-sans font-medium text-ink leading-[1.42] tracking-[-0.01em] m-0 mb-7 md:mb-9">
                The mission at GAMES lab is to harness game technology and immersive
                media to develop experiences and simulations that can facilitate
                learning and behavior change for real-world impact in areas like
                education, health/wellness, and accessibility.
              </p>
              <div className="space-y-5 md:space-y-6 text-md md:text-lg text-ink-2 leading-[1.75]">
                <p className="m-0">
                  Due to the interdisciplinary nature of work, most projects at GAMES
                  lab involve collaboration between designers, engineers, and social
                  scientists to push the boundaries of how play can engage people in
                  new ways. We believe in an experimental, rather playful, approach to
                  building new knowledge using the research-through-design methodology.
                </p>
                <p className="m-0">
                  This involves crafting immersive experiences and building
                  play-technology based prototypes, and using them as tools for novel
                  knowledge production and creating societal impact. The output ranges
                  from serious games (digital/tabletop) to tangible interfaces (motion
                  capture, gesture controls, etc.) as well as immersive experiences
                  using augmented and virtual reality (AR/VR/MR).
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Application verticals — static editorial grid ──────────
          Replaced the pinned horizontal-scroll section with a calm
          three-up grid that matches the rest of the page's rhythm. */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-10 md:mb-14">
        <ScrollReveal>
          <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0 mb-5 md:mb-7">
            Application verticals
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {verticals.map((v, i) => (
            <ScrollReveal key={v.label} delay={i * 80}>
              <div className="relative h-full bg-paper-2 rounded-[14px] p-8 md:p-10 overflow-hidden">
                <span
                  className="absolute right-5 top-1 font-extrabold text-ink/[0.06] select-none pointer-events-none leading-none"
                  style={{ fontSize: "clamp(96px, 12vw, 150px)" }}
                  aria-hidden="true"
                >
                  {v.label}
                </span>
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-ink-3 mb-3 font-sans">
                    Vertical {v.label}
                  </p>
                  <h3 className="t-title font-sans font-extrabold text-ink leading-[1.05] tracking-[-0.02em] mb-4 m-0">
                    {v.title}
                  </h3>
                  <p className="text-md text-ink-2 leading-[1.6] m-0">
                    {v.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── Funded projects — verbatim from source ─────────────── */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-10 md:mb-14">
        <ScrollReveal>
          <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] mb-6 m-0">
            Funded projects
          </h2>
          <p className="text-md md:text-lg text-ink-2 leading-[1.6] max-w-[62ch] mb-7 md:mb-9 m-0">
            The lab is engaged in funded project, focusing on research, design,
            development, and societal impact. Some of the recent projects are as
            follows:
          </p>
        </ScrollReveal>

        <div className="divide-y divide-rule">
          {fundedProjects.map((proj, i) => (
            <ScrollReveal key={proj.number} delay={i * 60}>
              <div className="py-8 md:py-10 grid md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-12 items-baseline">
                <span className="text-sm font-semibold font-sans text-ink-3 tabular-nums">{proj.number}</span>
                <h3 className="font-sans font-semibold text-ink text-lg md:text-xl leading-snug m-0">{proj.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed m-0">{proj.funder}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── Facilities & Tools — verbatim from source ────────────
          Same readability pass as Mission: lead sentence promoted, the
          equipment detail split into two calmer body paragraphs. */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-14 md:mb-24">
        <div className="grid md:grid-cols-12 gap-6 md:gap-16 items-start">
          <ScrollReveal className="md:col-span-4">
            <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0 md:sticky md:top-28">
              Facilities &amp; Tools
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120} className="md:col-span-8 md:col-start-5">
            <div className="max-w-[62ch]">
              <p className="t-quote font-sans font-medium text-ink leading-[1.42] tracking-[-0.01em] m-0 mb-7 md:mb-9">
                GAMES Lab is fully equipped for cutting-edge game and XR development.
              </p>
              <div className="space-y-5 md:space-y-6 text-md md:text-lg text-ink-2 leading-[1.75]">
                <p className="m-0">
                  We maintain high-performance game-development PCs and workstations,
                  the latest VR/MR headsets and spatial trackers, 360° cameras, and
                  popular gaming consoles and peripherals. Our lab also includes
                  specialized sensing equipment including eye-tracking and
                  physiological sensing to measure players&rsquo; attention, stress
                  and emotional responses during play.
                </p>
                <p className="m-0">
                  Finally, we house a growing library of digital and tabletop games.
                  These collections serve as both research benchmarks and teaching
                  materials, ensuring our students and faculty stay grounded in
                  existing game design discourse even as we invent new forms of play.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Research and Outputs — verbatim from source, full-bleed band ──
          Same readability pass: lead paragraph promoted, support below. */}
      <section className="w-full bg-paper-2 py-14 md:py-20">
        <div className="w-[90%] max-w-[1500px] mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-16 items-start">
            <ScrollReveal className="md:col-span-4">
              <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0 md:sticky md:top-28">
                Research and Outputs
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={120} className="md:col-span-8 md:col-start-5">
              <div className="max-w-[62ch]">
                <p className="t-quote font-sans font-medium text-ink leading-[1.42] tracking-[-0.01em] m-0 mb-7 md:mb-9">
                  As a research lab, we create and publish new knowledge on:
                  technical aspects (e.g. novel interfaces), experiential aspects
                  (e.g. game aesthetics, learning), and socio-cultural aspects (e.g.
                  empathy-triggering, behavior change) of play.
                </p>
                <p className="m-0 text-md md:text-lg text-ink-2 leading-[1.75]">
                  Through workshops and game jams, we engage students and
                  collaborators in hands-on design. In all our work, we aim to push
                  creative and technical boundaries: transforming play into a
                  catalyst for learning, empathy and positive change, whether in the
                  classroom, the clinic, or the community.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
