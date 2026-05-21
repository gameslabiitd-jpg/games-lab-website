import type { Metadata } from "next"
import Image from "next/image"
import { games } from "@/data/games"
import Tag from "@/components/ui/Tag"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

export const metadata: Metadata = {
  title: "Games",
  description: "Game design projects from GAMES Lab at IIT Delhi — board games, card games, digital, AR/VR.",
}

export default function GamesPage() {
  const featured = games.find((g) => g.featured)
  const rest = games.filter((g) => !g.featured)

  return (
    <>
      <div className="w-[88%] max-w-[1500px] mx-auto pt-32 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.14em] text-brand font-semibold mb-3">
            Design Portfolio
          </p>
          <h1 className="text-[48px] md:text-[60px] font-black text-ink leading-[1.08] tracking-tight mb-4">
            Games
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.75] max-w-[560px] mb-12">
            From tabletop to digital, every project in the lab is a real game —
            designed, playtested, and iterated upon.
          </p>
        </ScrollReveal>

        {/* Featured game — large hero card */}
        {featured && (
          <ScrollReveal>
            <div className="relative w-full rounded-[20px] overflow-hidden bg-brand-dark mb-10 group cursor-pointer card-lift">
              <div className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-40 card-img-zoom"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="relative p-10 md:p-14 flex flex-col justify-end min-h-[360px] md:min-h-[420px]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {featured.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
                <h2 className="text-[36px] md:text-[48px] font-black text-white leading-tight mb-2">
                  {featured.title}
                </h2>
                <p className="text-white/70 text-[15px] max-w-[520px] leading-relaxed mb-4">
                  {featured.description}
                </p>
                <p className="text-[13px] text-white/40">{featured.authors}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((game, i) => (
            <ScrollReveal key={game.id} delay={i * 70}>
              <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_4px_14px_rgba(15,13,20,0.07)] card-lift border-b-2 border-brand-accent flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden bg-brand-muted">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  />
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {game.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                  <h3 className="text-[16px] font-bold text-ink mb-1.5 leading-snug">
                    {game.title}
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed flex-1 m-0">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-border">
                    <span className="text-[12px] text-ink-soft">{game.authors}</span>
                    <span className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white text-sm">
                      ›
                    </span>
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
