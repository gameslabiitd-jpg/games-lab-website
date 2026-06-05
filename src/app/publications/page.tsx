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
  title: "Publications",
  description:
    "Publications from GAMES Lab at IIT Delhi — papers, book chapters, and conference contributions on game design, gamification, accessibility, and immersive media.",
}

export default function PublicationsPage() {
  return (
    <>
      <div className="w-[90%] max-w-[1400px] mx-auto pt-20 pb-10">

        {/* ── Hero ───────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="pb-8 mb-12 border-b border-rule">
            <h1 className="t-display font-sans font-extrabold text-ink leading-[0.88] tracking-[-0.04em] m-0 mb-5">
              Publications.
            </h1>
            <p className="text-lg text-ink-2 leading-[1.7] max-w-[50ch] m-0">
              Papers, book chapters, and conference contributions from the GAMES Lab.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Interactive research index (client) ─────────────── */}
        <ResearchList items={research} />

      </div>

      <CTABlock />
    </>
  )
}
