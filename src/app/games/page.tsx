import type { Metadata } from "next"
import { games } from "@/data/games"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"
import { GamesCatalog } from "@/components/games/games-catalog"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document (catalog) · design-system: design.md · designed-as-app
 *
 * Uniform catalog grid — every game is the same card size (no featured
 * hero card), so the page reads as a clean, even index. Featured games
 * are surfaced first in the data order; a derived category filter
 * (client component) lets visitors narrow by format and genre.
 */

export const metadata: Metadata = {
  title: "Games",
  description: "Game design projects from GAMES Lab at IIT Delhi — board games, card games, digital, AR/VR.",
}

export default function GamesPage() {
  // Featured first, then the rest — but every card is the same size.
  const ordered = [...games].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  )

  return (
    <>
      <div className="w-[90%] max-w-[1400px] mx-auto pt-20 pb-10">
        <ScrollReveal>
          <h1 className="t-display font-sans font-extrabold text-ink leading-[0.95] tracking-[-0.02em] mb-4">
            Games.
          </h1>
          <p className="text-md md:text-lg text-ink-2 leading-[1.7] max-w-[560px] mb-7 md:mb-9">
            From tabletop to digital, every project in the lab is a real game —
            designed, playtested, and iterated upon.
          </p>
        </ScrollReveal>

        {/* Catalog grid + derived category filter (client) */}
        <GamesCatalog games={ordered} />
      </div>
      <CTABlock />
    </>
  )
}
