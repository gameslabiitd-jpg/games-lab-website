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
      <div className="w-[88%] max-w-[1500px] mx-auto pt-36 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-accent font-semibold font-sans mb-5">
            Design Portfolio
          </p>
          <h1
            className="font-display font-bold text-ink leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Games
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.8] max-w-[540px] mb-14">
            From tabletop to digital, every project in the lab is a real game —
            designed, playtested, and iterated upon.
          </p>
        </ScrollReveal>

        {/* Featured game — cinematic hero card */}
        {featured && (
          <ScrollReveal>
            <div className="relative w-full rounded-[12px] overflow-hidden bg-brand-dark mb-10 group cursor-pointer card-lift">
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
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative p-10 md:p-14 flex flex-col justify-end min-h-[360px] md:min-h-[440px]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {featured.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
                <h2 className="font-display text-[40px] md:text-[56px] text-white leading-tight mb-3">
                  {featured.title}
                </h2>
                <p className="text-white/65 text-[15px] max-w-[500px] leading-relaxed mb-4">
                  {featured.description}
                </p>
                <p className="text-[13px] text-white/35 font-sans">{featured.authors}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((game, i) => (
            <ScrollReveal key={game.id} delay={i * 70}>
              <div className="bg-surface border border-ink-border rounded-[10px] overflow-hidden card-lift hover:border-brand/40 flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden bg-white/4">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    loading="lazy"
                  />
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {game.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                  <h3 className="text-[15px] font-semibold font-sans text-ink mb-2 leading-snug">
                    {game.title}
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed flex-1 m-0">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-border">
                    <span className="text-[11px] text-ink-soft font-sans">{game.authors}</span>
                    <span aria-hidden className="text-brand-accent text-[16px] opacity-40">→</span>
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
