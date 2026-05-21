import type { Metadata } from "next"
import Image from "next/image"
import { research } from "@/data/research"
import Tag from "@/components/ui/Tag"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

export const metadata: Metadata = {
  title: "Research",
  description: "Academic research from GAMES Lab at IIT Delhi on game design, gamification, accessibility, and immersive media.",
}

export default function ResearchPage() {
  return (
    <>
      <div className="w-[88%] max-w-[1500px] mx-auto pt-36 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-accent font-semibold font-sans mb-5">
            Academic Output
          </p>
          <h1
            className="font-display font-bold text-ink leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Research
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.8] max-w-[560px] mb-16">
            Papers, book chapters, and conference contributions from the GAMES Lab.
          </p>
        </ScrollReveal>

        {/* Research list */}
        <div className="flex flex-col gap-5">
          {research.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 70}>
              <div className="flex flex-col md:flex-row gap-6 bg-surface border border-ink-border rounded-[10px] p-6 card-lift hover:border-brand/40">
                {/* Image */}
                <div className="relative w-full md:w-[200px] aspect-[4/3] rounded-[8px] overflow-hidden bg-white/4 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw,200px"
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {item.tags.map((t) => <Tag key={t} label={t} />)}
                      {item.year && (
                        <span className="text-[11px] text-ink-soft font-sans">{item.year}</span>
                      )}
                    </div>
                    <h2 className="font-display text-[22px] text-ink m-0 mb-3 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-[14px] text-ink-mid leading-relaxed m-0 mb-4">
                      {item.description}
                    </p>
                  </div>
                  <p className="text-[13px] text-ink-soft m-0 font-sans">
                    <span className="text-ink-mid">Authors: </span>
                    {item.authors}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <CTABlock />
    </>
  )
}
