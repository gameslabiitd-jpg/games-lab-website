import Image from "next/image"
import Link from "next/link"
import { news } from "@/data/news"
import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import ScrollReveal from "@/components/animations/ScrollReveal"

export default function LatestUpdates() {
  const items = news.slice(0, 3)

  return (
    <section className="w-[88%] max-w-[1500px] mx-auto py-16 grid md:grid-cols-2 gap-16 items-start">
      {/* Left: About snippet */}
      <ScrollReveal direction="left">
        <h2 className="text-[28px] font-black text-ink leading-tight mb-5">
          Intersection of Play,<br />Design &amp; Impact
        </h2>
        <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-brand-muted mb-5">
          <Image
            src="/images/game1.jpg"
            alt="GAMES Lab at IIT Delhi"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw,50vw"
          />
        </div>
        <p className="text-[15px] text-ink-mid leading-[1.75] mb-6">
          GAMES Lab at IIT Delhi is a research and design studio investigating how
          interactive media, games, and immersive storytelling can drive meaningful change.
        </p>
        <Button href="/about" variant="outline">Know more about us</Button>
      </ScrollReveal>

      {/* Right: Latest news */}
      <ScrollReveal direction="right" delay={100}>
        <h2 className="text-[28px] font-black text-ink leading-tight mb-5">Latest Updates</h2>
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item, i) => (
            <Link
              key={item.id}
              href="/news"
              className="flex gap-4 bg-white rounded-[12px] p-3.5 shadow-[0_3px_10px_rgba(15,13,20,0.07)] items-center card-lift no-underline"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Thumb */}
              <div className="relative w-[76px] h-[56px] rounded-[8px] overflow-hidden bg-brand-muted shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="76px"
                />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <Tag label={item.tag} className="mb-1" />
                <p className="text-[13px] font-semibold text-ink m-0 leading-snug line-clamp-2">
                  {item.title}
                </p>
                <p className="text-[11px] text-ink-soft m-0 mt-0.5">{item.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <Button href="/news" variant="outline">View all updates</Button>
      </ScrollReveal>
    </section>
  )
}
