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
      <div className="w-[88%] max-w-[1500px] mx-auto pt-32 pb-20">

        {/* Hero */}
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.14em] text-brand font-semibold mb-3">
            About the Lab
          </p>
          <h1 className="text-[48px] md:text-[60px] font-black text-ink leading-[1.08] tracking-tight mb-5 max-w-[680px]">
            Where Play Meets Purpose.
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.75] max-w-[660px] mb-10">
            GAMES Lab at IIT Delhi is a research and design studio investigating how interactive
            media, games, and immersive storytelling can drive meaningful change in education,
            health, accessibility, and social impact.
          </p>
        </ScrollReveal>

        {/* Hero image */}
        <ScrollReveal direction="scale">
          <div className="relative w-full aspect-[21/8] rounded-[20px] overflow-hidden bg-brand-muted mb-20">
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
          <h2 className="text-[32px] font-black text-ink mb-10">What We Do</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 80}>
              <div className="bg-white rounded-[14px] p-6 shadow-[0_4px_12px_rgba(15,13,20,0.07)] card-lift h-full">
                <div className="w-12 h-12 bg-brand-muted rounded-xl flex items-center justify-center mb-4">
                  <Image src={p.icon} alt="" width={24} height={24} />
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-2">{p.title}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed m-0">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <ScrollReveal direction="left">
            <h2 className="text-[32px] font-black text-ink mb-4">Our Mission</h2>
            <p className="text-[16px] text-ink-mid leading-[1.8]">
              We believe that play is a powerful lens through which to understand human behaviour,
              foster creativity, and create lasting change. Our work sits at the intersection of
              game studies, interaction design, HCI, and social impact — producing research and
              artefacts that matter beyond the academy.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120}>
            <div className="relative aspect-square rounded-[20px] overflow-hidden bg-brand-muted">
              <Image
                src="/images/research/research2.jpg"
                alt="Lab research"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw,50vw"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <ScrollReveal>
          <div className="bg-brand-dark rounded-[20px] p-10 md:p-14 text-center">
            <h2 className="text-[32px] font-black text-white mb-3">Our Values</h2>
            <p className="text-white/60 text-[15px] max-w-[520px] mx-auto mb-10 leading-relaxed">
              Everything we do is grounded in curiosity, rigour, and a commitment to making
              games that matter.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Rigour",      desc: "We hold our research to the highest academic standards." },
                { title: "Creativity",  desc: "We explore the unexpected, prototype boldly, and iterate." },
                { title: "Impact",      desc: "Every project asks: who does this serve, and how?" },
              ].map((v) => (
                <div key={v.title} className="bg-white/10 rounded-[14px] p-6">
                  <h3 className="text-[18px] font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-[13px] text-white/60 m-0 leading-relaxed">{v.desc}</p>
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
