import type { Metadata } from "next"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"
import { TiltCard } from "@/components/ui/tilt-card"
import { PinnedHorizontal } from "@/components/ui/pinned-horizontal"
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

const keywordMarquee = [
  "Research-through-design", "Embodied learning", "Tabletop", "Augmented reality",
  "Mixed reality", "Behaviour change", "Empathy", "Accessibility", "Game jams",
  "Tangible interfaces", "Motion capture", "IIT Delhi", "Serious games", "Play",
]

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
      {/* ── Full-screen split-flap hero ──────────────────────────
          The flipboard IS the hero. min-h-dvh so it claims the full
          viewport, centered horizontally + vertically. The board cycles
          identity → stats every 8s, so anyone who lingers sees both
          framings. Bottom-anchored "About" credit gives the page a
          masthead feel without competing with the board. */}
      <section className="relative min-h-dvh w-full flex flex-col items-center justify-center pt-28 pb-20 mb-24 md:mb-32 overflow-hidden">
        <div className="w-full">
          <StatsFlipboard />
        </div>
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.32em] font-semibold font-sans text-ink-3 m-0 pointer-events-none">
          About · GAMES Lab IIT Delhi
        </p>
      </section>

      {/* ── Pull quote — verbatim from source ──────────────────── */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-24 md:mb-32">
        <ScrollReveal>
          <blockquote className="max-w-[920px] m-0">
            <p
              className="font-sans font-extrabold text-ink leading-[1.08] tracking-[-0.02em] mb-6 m-0"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              &ldquo;Play is the foundation of learning, creativity,
              self-expression, and constructive problem-solving.&rdquo;
            </p>
            <footer className="text-sm text-ink-3 font-sans">
              Susan Linn, <cite className="italic">Consuming Kids</cite> (2003)
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>

      {/* ── Keyword marquee ────────────────────────────────────── */}
      <div className="marquee-track border-y border-rule py-5 bg-paper-2/40 mb-36 md:mb-48">
        <div className="marquee-inner" aria-hidden="true">
          {[...keywordMarquee, ...keywordMarquee].map((kw, i) => (
            <span key={i} className="inline-flex items-center shrink-0">
              <span className="text-md md:text-lg font-medium font-sans text-ink-2 px-7">{kw}</span>
              <span className="text-accent text-md font-bold" aria-hidden>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Mission — verbatim from source ─────────────────────── */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-36 md:mb-48">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <ScrollReveal className="md:col-span-5">
            <h2
              className="font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0"
              style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
            >
              Our mission
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120} className="md:col-span-7 md:pt-6 lg:pt-8">
            <div className="space-y-6 text-md md:text-lg text-ink-2 leading-[1.7] max-w-[62ch]">
              <p className="m-0">
                The mission at GAMES lab is to harness game technology and immersive
                media to develop experiences and simulations that can facilitate
                learning and behavior change for real-world impact in areas like
                education, health/wellness, and accessibility.
              </p>
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
          </ScrollReveal>
        </div>
      </div>

      {/* ── Application verticals → pinned horizontal ──────────── */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-12 md:mb-16">
        <ScrollReveal>
          <h2
            className="font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0"
            style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
          >
            Application verticals
          </h2>
          <p className="mt-6 text-md md:text-lg text-ink-3 font-sans m-0">
            Scroll → to traverse the three verticals
          </p>
        </ScrollReveal>
      </div>

      <PinnedHorizontal cellWidth="80vw" gap="3vw" className="mb-36 md:mb-48">
        {verticals.map((v) => (
          <TiltCard key={v.label} max={4} className="h-full max-h-[560px]">
            <div className="relative bg-paper-2 rounded-[14px] p-10 md:p-16 h-full overflow-hidden flex flex-col justify-end">
              <span
                className="absolute right-6 top-2 font-extrabold text-ink/[0.06] select-none pointer-events-none"
                style={{
                  fontSize: "clamp(180px, 30vw, 480px)",
                  lineHeight: 1,
                  transform: "translateZ(20px)",
                }}
                aria-hidden="true"
              >
                {v.label}
              </span>
              <div className="relative max-w-[640px]" style={{ transform: "translateZ(10px)" }}>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-ink-3 mb-3 font-sans">
                  Vertical {v.label}
                </p>
                <h3
                  className="font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] mb-6 m-0"
                  style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
                >
                  {v.title}
                </h3>
                <p className="text-md md:text-lg text-ink-2 leading-[1.6] m-0 max-w-[52ch]">
                  {v.desc}
                </p>
              </div>
            </div>
          </TiltCard>
        ))}
      </PinnedHorizontal>

      {/* ── Funded projects — verbatim from source ─────────────── */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-36 md:mb-48">
        <ScrollReveal>
          <h2
            className="font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] mb-6 m-0"
            style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
          >
            Funded projects
          </h2>
          <p className="text-md md:text-lg text-ink-2 leading-[1.6] max-w-[62ch] mb-12 md:mb-16 m-0">
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

      {/* ── Facilities & Tools — verbatim from source ──────────── */}
      <div className="w-[90%] max-w-[1500px] mx-auto mb-36 md:mb-48">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <ScrollReveal className="md:col-span-5">
            <h2
              className="font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0"
              style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
            >
              Facilities &amp; Tools
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120} className="md:col-span-7 md:pt-6 lg:pt-8">
            <p className="m-0 text-md md:text-lg text-ink-2 leading-[1.7] max-w-[62ch]">
              GAMES Lab is fully equipped for cutting-edge game and XR development.
              We maintain high-performance game-development PCs and workstations, the
              latest VR/MR headsets and spatial trackers, 360° cameras, and popular
              gaming consoles and peripherals. Our lab also includes specialized
              sensing equipment including eye-tracking and physiological sensing to
              measure players&rsquo; attention, stress and emotional responses during
              play. Finally, we house a growing library of digital and tabletop
              games. These collections serve as both research benchmarks and teaching
              materials, ensuring our students and faculty stay grounded in existing
              game design discourse even as we invent new forms of play.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Research and Outputs — verbatim from source, full-bleed band ── */}
      <section className="w-full bg-paper-2 py-32 md:py-44">
        <div className="w-[90%] max-w-[1500px] mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
              <h2
                className="md:col-span-5 font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] m-0"
                style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
              >
                Research and Outputs
              </h2>
              <div className="md:col-span-7 md:pt-3 space-y-5 text-md md:text-lg text-ink-2 leading-[1.7] max-w-[62ch]">
                <p className="m-0">
                  As a research lab, we create and publish new knowledge on:
                  technical aspects (e.g. novel interfaces), experiential aspects
                  (e.g. game aesthetics, learning), and socio-cultural aspects (e.g.
                  empathy-triggering, behavior change) of play.
                </p>
                <p className="m-0">
                  Through workshops and game jams, we engage students and
                  collaborators in hands-on design. In all our work, we aim to push
                  creative and technical boundaries: transforming play into a
                  catalyst for learning, empathy and positive change, whether in the
                  classroom, the clinic, or the community.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock />
    </>
  )
}
