import type { Metadata } from "next"
import Image from "next/image"
import { news } from "@/data/news"
import Tag from "@/components/ui/Tag"
import ScrollReveal from "@/components/animations/ScrollReveal"
import CTABlock from "@/components/sections/CTABlock"

export const metadata: Metadata = {
  title: "News",
  description: "Latest updates, events, and publications from GAMES Lab at IIT Delhi.",
}

export default function NewsPage() {
  const featured = news.find((n) => n.featured)
  const rest = news.filter((n) => !n.featured)

  return (
    <>
      <div className="w-[88%] max-w-[1500px] mx-auto pt-36 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-accent font-semibold font-sans mb-5">
            What&apos;s Happening
          </p>
          <h1
            className="font-display font-bold text-ink leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            News &amp; Updates
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.8] max-w-[540px] mb-14">
            Conferences, publications, events, and happenings from around the lab.
          </p>
        </ScrollReveal>

        {/* Featured */}
        {featured && (
          <ScrollReveal>
            <div className="relative w-full rounded-[12px] overflow-hidden bg-brand-dark mb-10 card-lift group cursor-pointer">
              <div className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-35 card-img-zoom"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative p-10 md:p-14 min-h-[320px] flex flex-col justify-end">
                <Tag label={featured.tag} className="mb-4" />
                <h2 className="font-display text-[34px] md:text-[46px] text-white leading-tight mb-3">
                  {featured.title}
                </h2>
                <p className="text-white/65 text-[15px] max-w-[540px] leading-relaxed mb-3">
                  {featured.description}
                </p>
                <p className="text-white/35 text-[13px] font-sans">{featured.date}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* News grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 70}>
              <div className="bg-surface border border-ink-border rounded-[10px] overflow-hidden card-lift hover:border-brand/40 flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden bg-white/4">
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
                  <Tag label={item.tag} className="mb-3" />
                  <h3 className="text-[15px] font-semibold font-sans text-ink mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed flex-1 m-0">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-ink-soft mt-4 pt-3 border-t border-ink-border font-sans">
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
