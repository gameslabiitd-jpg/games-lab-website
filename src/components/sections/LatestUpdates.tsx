import Image from "next/image"
import Link from "next/link"
import { news } from "@/data/news"
import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import ScrollReveal from "@/components/animations/ScrollReveal"

/**
 * Hallmark · genre: editorial · component: latest updates grid · design-system: design.md
 *
 * Clean, uniform 3-column grid of image-led news cards — same card shape and
 * aspect ratio as Highlighted projects and the Games catalog, for a
 * consistent rhythm across the site.
 */

export default function LatestUpdates() {
  const items = news.slice(0, 3)

  return (
    <section className="w-[90%] max-w-[1500px] mx-auto pt-10 pb-12 md:pt-12 md:pb-14">
      {/* Section header — title left, action right */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-5 md:mb-7">
          <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] m-0">
            Latest updates
          </h2>
          <Button href="/news" variant="outline">View all updates</Button>
        </div>
      </ScrollReveal>

      {/* Uniform 3-column grid — identical cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-9">
        {items.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 70}>
            <Link href="/news" className="group flex flex-col h-full no-underline">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[12px] bg-paper-3 mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover card-img-zoom"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  priority={i === 0}
                />
              </div>

              <div className="flex flex-col flex-1">
                <Tag label={item.tag} className="mb-2.5 self-start" />

                <h3 className="text-lg font-semibold text-ink m-0 mb-1.5 leading-snug tracking-[-0.01em] font-sans
                               transition-colors duration-300 group-hover:text-ink-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed m-0 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3.5">
                  <span className="text-xs text-ink-3 font-sans">{item.date}</span>
                  <span
                    aria-hidden
                    className="text-ink text-md opacity-30 shrink-0 group-hover:opacity-100 group-hover:translate-x-1
                               transition-[opacity,transform] duration-300"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
