import type { Metadata } from "next"
import Image from "next/image"
import { research } from "@/data/research"
import Tag from "@/components/ui/Tag"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document · design-system: design.md · designed-as-app
 */

export const metadata: Metadata = {
  title: "Research",
  description: "Academic research from GAMES Lab at IIT Delhi on game design, gamification, accessibility, and immersive media.",
}

export default function ResearchPage() {
  return (
    <>
      <div className="w-[90%] max-w-[1400px] mx-auto pt-36 pb-20">
        <ScrollReveal>
          <h1
            className="font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Research
          </h1>
          <p className="text-lg text-ink-2 leading-[1.75] max-w-[600px] mb-16">
            Papers, book chapters, and conference contributions from the GAMES Lab.
          </p>
        </ScrollReveal>

        {/* Research list */}
        <div className="flex flex-col gap-5">
          {research.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 70}>
              <div className="flex flex-col md:flex-row gap-6 bg-paper border border-rule rounded-[10px] p-6 card-lift hover:border-ink/30">
                <div className="relative w-full md:w-[220px] aspect-[4/3] rounded-[8px] overflow-hidden bg-paper-3 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw,220px"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {item.tags.map((t) => <Tag key={t} label={t} />)}
                      {item.year && (
                        <span className="text-xs text-ink-3 font-sans">{item.year}</span>
                      )}
                    </div>
                    <h2 className="font-sans font-semibold text-ink m-0 mb-3 leading-snug text-xl">
                      {item.title}
                    </h2>
                    <p className="text-md text-ink-2 leading-relaxed m-0 mb-4">
                      {item.description}
                    </p>
                  </div>
                  <p className="text-sm text-ink-3 m-0 font-sans">
                    <span className="text-ink-2">Authors: </span>
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
