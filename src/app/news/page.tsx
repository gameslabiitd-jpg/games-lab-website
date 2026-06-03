import type { Metadata } from "next"
import Image from "next/image"
import { news } from "@/data/news"
import Tag from "@/components/ui/Tag"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

/**
 * Hallmark · genre: editorial · macrostructure: Long Document (catalog) · design-system: design.md · designed-as-app
 */

export const metadata: Metadata = {
  title: "News",
  description: "Latest updates, events, and publications from GAMES Lab at IIT Delhi.",
}

export default function NewsPage() {
  const featured = news.find((n) => n.featured)
  const rest = news.filter((n) => !n.featured)

  return (
    <>
      <div className="w-[90%] max-w-[1400px] mx-auto pt-20 pb-10">
        <ScrollReveal>
          <h1 className="t-display font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] mb-5">
            News &amp; updates
          </h1>
          <p className="text-lg text-ink-2 leading-[1.75] max-w-[580px] mb-10">
            Conferences, publications, events, and happenings from around the lab.
          </p>
        </ScrollReveal>

        {/* Featured news item — dark photographic editorial card */}
        {featured && (
          <ScrollReveal>
            <div className="relative w-full rounded-[12px] overflow-hidden mb-12 card-lift group cursor-pointer bg-ink">
              <div className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-55 card-img-zoom"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,19,16,0.85)] via-[rgba(22,19,16,0.25)] to-transparent" />
              <div className="relative p-10 md:p-14 min-h-[320px] flex flex-col justify-end">
                <span className="inline-block text-xs font-medium font-sans px-2.5 py-1 rounded-full tracking-[0.08em] uppercase bg-white/15 text-white border border-white/25 mb-4 self-start">
                  {featured.tag}
                </span>
                <h2 className="font-sans font-extrabold text-paper leading-[1.05] tracking-tight mb-3 text-2xl md:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-paper/75 text-md max-w-[560px] leading-relaxed mb-3">
                  {featured.description}
                </p>
                <p className="text-paper/50 text-sm font-sans">{featured.date}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* News grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 70}>
              <div className="bg-paper border border-rule rounded-[10px] overflow-hidden card-lift hover:border-ink/30 flex flex-col h-full">
                <div className="relative w-full aspect-video overflow-hidden bg-paper-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Tag label={item.tag} className="mb-3 self-start" />
                  <h3 className="text-md font-semibold font-sans text-ink mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-2 leading-relaxed flex-1 m-0">
                    {item.description}
                  </p>
                  <p className="text-xs text-ink-3 mt-4 pt-3 border-t border-rule-soft font-sans">
                    {item.date}
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
