import Image from "next/image"
import Link from "next/link"
import { news } from "@/data/news"
import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import ScrollReveal from "@/components/animations/ScrollReveal"

/**
 * Hallmark · genre: editorial · component: featured + secondary news · design-system: design.md
 *
 * Editorial news block — one large featured story on the left (image-led),
 * two compact secondary items stacked on the right. Replaces the older
 * "mission snippet + news list" layout whose left column duplicated the
 * Intro section's lab description.
 *
 * Cards are border-less; the image carries the card. Hairline rules
 * separate the secondary items instead of boxing each row.
 */

export default function LatestUpdates() {
  const [featured, ...rest] = news.slice(0, 3)
  const secondary = rest.slice(0, 2)

  return (
    <section className="w-[90%] max-w-[1500px] mx-auto pt-24 pb-32 md:pt-28 md:pb-36">
      {/* Section header — title left, action right */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <h2 className="font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] m-0"
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}>
            Latest updates
          </h2>
          <Button href="/news" variant="outline">View all updates</Button>
        </div>
      </ScrollReveal>

      {/* 7/5 split — featured story leads, secondary list balances right */}
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">

        {/* Featured */}
        <ScrollReveal className="md:col-span-7">
          <Link href="/news" className="group block no-underline">
            <div className="relative w-full aspect-[16/10] rounded-[10px] overflow-hidden bg-paper-3 mb-6">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover card-img-zoom"
                sizes="(max-width:768px) 100vw, 60vw"
                priority
              />
            </div>
            <Tag label={featured.tag} className="mb-3" />
            <h3 className="font-sans font-extrabold text-ink leading-[1.05] tracking-[-0.01em] m-0 mb-3
                           text-2xl md:text-3xl
                           transition-colors duration-300 group-hover:text-ink-2">
              {featured.title}
            </h3>
            <p className="text-md text-ink-2 leading-[1.6] m-0 max-w-[58ch]">
              {featured.date}
            </p>
          </Link>
        </ScrollReveal>

        {/* Secondary stack — border-less, separated by hairlines */}
        <ScrollReveal delay={120} className="md:col-span-5">
          <ul className="list-none p-0 m-0 flex flex-col">
            {secondary.map((item, i) => (
              <li key={item.id} className={i > 0 ? "border-t border-rule" : ""}>
                <Link
                  href="/news"
                  className="group flex gap-5 items-start py-6 no-underline
                             transition-colors duration-300"
                >
                  <div className="relative w-[110px] aspect-[4/3] rounded-[8px] overflow-hidden bg-paper-3 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover card-img-zoom"
                      sizes="110px"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Tag label={item.tag} className="mb-2" />
                    <p className="text-md font-semibold text-ink m-0 leading-snug line-clamp-2 font-sans
                                  transition-colors duration-300 group-hover:text-ink-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-ink-3 m-0 mt-2 font-sans">{item.date}</p>
                  </div>
                  <span aria-hidden
                        className="text-ink text-md opacity-30 shrink-0 mt-1
                                   transition-[opacity,transform] duration-300
                                   group-hover:opacity-100 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}
