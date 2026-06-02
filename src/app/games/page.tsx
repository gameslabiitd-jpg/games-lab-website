import type { Metadata } from "next"
import Image from "next/image"
import { games } from "@/data/games"
import Tag from "@/components/ui/Tag"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document (catalog) · design-system: design.md · designed-as-app
 */

export const metadata: Metadata = {
  title: "Games",
  description: "Game design projects from GAMES Lab at IIT Delhi — board games, card games, digital, AR/VR.",
}

export default function GamesPage() {
  const featured = games.find((g) => g.featured)
  const rest = games.filter((g) => !g.featured)

  return (
    <>
      <div className="w-[90%] max-w-[1400px] mx-auto pt-36 pb-20">
        <ScrollReveal>
          <h1
            className="font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Games
          </h1>
          <p className="text-lg text-ink-2 leading-[1.75] max-w-[580px] mb-14">
            From tabletop to digital, every project in the lab is a real game —
            designed, playtested, and iterated upon.
          </p>
        </ScrollReveal>

        {/* Featured game — large editorial card, dark photographic */}
        {featured && (
          <ScrollReveal>
            <div className="relative w-full rounded-[12px] overflow-hidden mb-12 group cursor-pointer card-lift bg-ink">
              <div className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-60 card-img-zoom"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,19,16,0.85)] via-[rgba(22,19,16,0.25)] to-transparent" />
              <div className="relative p-10 md:p-14 flex flex-col justify-end min-h-[360px] md:min-h-[440px]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {featured.tags.map((t) => (
                    <span key={t} className="inline-block text-xs font-medium font-sans px-2.5 py-1 rounded-full tracking-[0.08em] uppercase bg-white/15 text-white border border-white/25">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-sans font-extrabold text-paper leading-[0.95] tracking-tight mb-3 text-3xl md:text-5xl">
                  {featured.title}
                </h2>
                <p className="text-paper/75 text-md max-w-[520px] leading-relaxed mb-4">
                  {featured.description}
                </p>
                <p className="text-sm text-paper/50 font-sans">{featured.authors}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((game, i) => (
            <ScrollReveal key={game.id} delay={i * 70}>
              <div className="bg-paper border border-rule rounded-[10px] overflow-hidden card-lift hover:border-ink/30 flex flex-col h-full">
                <div className="relative w-full aspect-video overflow-hidden bg-paper-3">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {game.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                  <h3 className="text-md font-semibold font-sans text-ink mb-2 leading-snug">
                    {game.title}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed flex-1 m-0">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-rule-soft">
                    <span className="text-xs text-ink-3 font-sans">{game.authors}</span>
                    <span aria-hidden className="text-ink text-md opacity-40">→</span>
                  </div>
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
