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
      <div className="w-[88%] max-w-[1500px] mx-auto pt-32 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.14em] text-brand font-semibold mb-3">
            Academic Output
          </p>
          <h1 className="text-[48px] md:text-[60px] font-black text-ink leading-[1.08] tracking-tight mb-4">
            Research
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.75] max-w-[580px] mb-16">
            Papers, book chapters, and conference contributions from the GAMES Lab.
          </p>
        </ScrollReveal>

        {/* Research list */}
        <div className="flex flex-col gap-6">
          {research.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 70}>
              <div className="flex flex-col md:flex-row gap-6 bg-white rounded-[16px] p-6 shadow-[0_4px_14px_rgba(15,13,20,0.07)] card-lift">
                {/* Image */}
                <div className="relative w-full md:w-[220px] aspect-[4/3] rounded-[10px] overflow-hidden bg-brand-muted shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw,220px"
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((t) => <Tag key={t} label={t} />)}
                      {item.year && (
                        <span className="text-[11px] text-ink-soft font-medium">
                          {item.year}
                        </span>
                      )}
                    </div>
                    <h2 className="text-[20px] font-bold text-ink m-0 mb-2 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-[14px] text-ink-mid leading-relaxed m-0 mb-3">
                      {item.description}
                    </p>
                  </div>
                  <p className="text-[13px] text-ink-soft m-0">
                    <span className="font-semibold text-ink-mid">Authors: </span>
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
