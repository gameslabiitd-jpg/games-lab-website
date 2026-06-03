import type { Metadata } from "next"
import Image from "next/image"
import { games } from "@/data/games"
import Tag from "@/components/ui/Tag"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document (catalog) · design-system: design.md · designed-as-app
 *
 * Uniform catalog grid — every game is the same card size (no featured
 * hero card), so the page reads as a clean, even index. Featured games
 * are surfaced first in the data order rather than by size.
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
            Games
          </h1>
          <p className="text-md md:text-lg text-ink-2 leading-[1.7] max-w-[560px] mb-7 md:mb-9">
            From tabletop to digital, every project in the lab is a real game —
            designed, playtested, and iterated upon.
          </p>
        </ScrollReveal>

        {/* Uniform games grid — identical cards across the board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ordered.map((game, i) => (
            <ScrollReveal key={game.id} delay={(i % 3) * 70}>
              <article className="group bg-paper border border-rule rounded-[12px] overflow-hidden card-lift hover:border-ink/30 flex flex-col h-full">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-paper-3">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    loading={i < 3 ? "eager" : "lazy"}
                    priority={i < 3}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {game.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                  <h2 className="text-lg font-semibold font-sans text-ink mb-2 leading-snug tracking-[-0.01em]">
                    {game.title}
                  </h2>
                  <p className="text-sm text-ink-2 leading-relaxed flex-1 m-0 line-clamp-3">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-rule-soft">
                    <span className="text-xs text-ink-3 font-sans truncate pr-3">{game.authors}</span>
                    <span
                      aria-hidden
                      className="text-ink text-md opacity-30 shrink-0 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <CTABlock />
    </>
  )
}
