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
      <div className="w-[88%] max-w-[1500px] mx-auto pt-32 pb-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.14em] text-brand font-semibold mb-3">
            What&apos;s Happening
          </p>
          <h1 className="text-[48px] md:text-[60px] font-black text-ink leading-[1.08] tracking-tight mb-4">
            News &amp; Updates
          </h1>
          <p className="text-[17px] text-ink-mid leading-[1.75] max-w-[540px] mb-12">
            Conferences, publications, events, and happenings from around the lab.
          </p>
        </ScrollReveal>

        {/* Featured */}
        {featured && (
          <ScrollReveal>
            <div className="relative w-full rounded-[20px] overflow-hidden bg-brand-dark mb-10 card-lift group cursor-pointer">
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
              <div className="relative p-10 md:p-14 min-h-[300px] flex flex-col justify-end">
                <Tag label={featured.tag} className="mb-3" />
                <h2 className="text-[32px] md:text-[42px] font-black text-white leading-tight mb-2">
                  {featured.title}
                </h2>
                <p className="text-white/70 text-[15px] max-w-[560px] leading-relaxed mb-3">
                  {featured.description}
                </p>
                <p className="text-white/40 text-[13px]">{featured.date}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* News grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 70}>
              <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_4px_14px_rgba(15,13,20,0.07)] card-lift flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden bg-brand-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Tag label={item.tag} className="mb-2.5" />
                  <h3 className="text-[15px] font-bold text-ink mb-2 leading-snug">{item.title}</h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed flex-1 m-0">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-ink-soft mt-3 pt-3 border-t border-ink-border">
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
