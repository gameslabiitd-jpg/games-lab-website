import type { Metadata } from "next"
import { research } from "@/data/research"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"
import { ResearchList } from "@/components/research/research-list"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document
 *
 * Layout:
 *   - Giant "Research." heading, faint paper-count counter top-right
 *   - Hairline separator
 *   - Tag filter pills → animated editorial index rows
 *   - Cursor-following image preview on hover (client component)
 */

export const metadata: Metadata = {
  title: "Research",
  description:
    "Academic research from GAMES Lab at IIT Delhi on game design, gamification, accessibility, and immersive media.",
}

export default function ResearchPage() {
  return (
    <>
      <div className="w-[90%] max-w-[1400px] mx-auto pt-36 pb-24">

        {/* ── Hero ───────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex items-end justify-between gap-8 pb-10 mb-14 border-b border-rule">
            <div>
              <h1
                className="font-sans font-extrabold text-ink leading-[0.88] tracking-[-0.04em] m-0 mb-5"
                style={{ fontSize: "clamp(56px, 9.5vw, 136px)" }}
              >
                Research.
              </h1>
              <p className="text-lg text-ink-2 leading-[1.7] max-w-[50ch] m-0">
                Papers, book chapters, and conference contributions from the GAMES Lab.
              </p>
            </div>

            {/* Faint large counter — decorative */}
            <div className="shrink-0 text-right hidden md:block">
              <p
                className="font-extrabold font-sans leading-none tabular-nums m-0 select-none"
                style={{
                  fontSize: "clamp(60px, 8vw, 112px)",
                  color: "oklch(15% 0.006 50 / 0.07)",
                }}
              >
                {String(research.length).padStart(2, "0")}
              </p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-ink-3 font-sans m-0 mt-1.5">
                papers
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Interactive research index (client) ─────────────── */}
        <ResearchList items={research} />

      </div>

      <CTABlock />
    </>
  )
}
