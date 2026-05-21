import type { Metadata } from "next"
import Image from "next/image"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about GAMES Lab at IIT Delhi — our mission, research focus, and values.",
}

const pillars = [
  {
    icon: "/images/whatWeDo/research.svg",
    title: "Research",
    desc: "We conduct rigorous academic research on games, gamification, accessibility, and immersive media.",
  },
  {
    icon: "/images/whatWeDo/design.svg",
    title: "Design",
    desc: "We design and prototype board games, digital games, AR/VR experiences, and interactive installations.",
  },
  {
    icon: "/images/whatWeDo/dev.svg",
    title: "Development",
    desc: "We build functional prototypes and production-ready game systems across platforms.",
  },
  {
    icon: "/images/whatWeDo/impact.svg",
    title: "Impact",
    desc: "We translate play into purpose — driving change in education, health, accessibility, and beyond.",
  },
]

export default function AboutPage() {
  return (
    <>
      <div className="w-[88%] max-w-[1500px] mx-auto pt-36 pb-20">

        {/* Hero */}
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-accent font-semibold font-sans mb-5">
            About the Lab
          </p>
          <h1
            className="font-display font-bold text-ink leading-[0.9] tracking-tight mb-7"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Where Play<br />Meets Purpose.
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.8] max-w-[600px] mb-12">
            GAMES Lab at IIT Delhi is a research and design studio investigating how interactive
            media, games, and immersive storytelling can drive meaningful change in education,
            health, accessibility, and social impact.
          </p>
        </ScrollReveal>

        {/* Hero image */}
        <ScrollReveal direction="scale">
          <div className="relative w-full aspect-[21/8] rounded-[12px] overflow-hidden bg-white/4 mb-24">
            <Image
              src="/images/game1.jpg"
              alt="GAMES Lab at IIT Delhi"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </ScrollReveal>

        {/* What We Do */}
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-brand-accent font-semibold font-sans mb-4">
            What We Do
          </p>
          <h2 className="font-display text-[40px] md:text-[52px] text-ink mb-12">Areas of Work</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 80}>
              <div className="bg-surface border border-ink-border rounded-[10px] p-6 card-lift h-full hover:border-brand/40">
                <div className="w-11 h-11 bg-white/6 rounded-lg flex items-center justify-center mb-5">
                  <Image src={p.icon} alt="" width={22} height={22} />
                </div>
                <h3 className="text-[15px] font-semibold font-sans text-ink mb-2">{p.title}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed m-0">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <ScrollReveal direction="left">
            <p className="text-[11px] uppercase tracking-[0.25em] text-brand-accent font-semibold font-sans mb-4">
              Our Mission
            </p>
            <h2 className="font-display text-[40px] text-ink mb-5">Why We Do It</h2>
            <p className="text-[16px] text-ink-mid leading-[1.85]">
              We believe that play is a powerful lens through which to understand human behaviour,
              foster creativity, and create lasting change. Our work sits at the intersection of
              game studies, interaction design, HCI, and social impact — producing research and
              artefacts that matter beyond the academy.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120}>
            <div className="relative aspect-square rounded-[12px] overflow-hidden bg-white/4">
              <Image
                src="/images/research/research2.jpg"
                alt="Lab research"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw,50vw"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <ScrollReveal>
          <div className="border border-white/8 rounded-[12px] p-10 md:p-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-brand-accent font-semibold font-sans mb-4 text-center">
              Our Values
            </p>
            <h2 className="font-display text-[40px] md:text-[52px] text-ink mb-4 text-center">
              What Drives Us
            </h2>
            <p className="text-ink-soft text-[15px] max-w-[480px] mx-auto mb-12 leading-relaxed text-center">
              Everything we do is grounded in curiosity, rigour, and a commitment to making
              games that matter.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Rigour",     desc: "We hold our research to the highest academic standards." },
                { title: "Creativity", desc: "We explore the unexpected, prototype boldly, and iterate." },
                { title: "Impact",     desc: "Every project asks: who does this serve, and how?" },
              ].map((v) => (
                <div key={v.title} className="bg-white/4 border border-white/8 rounded-[10px] p-6">
                  <h3 className="font-display text-[22px] text-ink mb-2">{v.title}</h3>
                  <p className="text-[13px] text-ink-soft m-0 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <CTABlock />
    </>
  )
}
