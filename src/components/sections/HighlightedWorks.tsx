"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { games } from "@/data/games"
import { research } from "@/data/research"
import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import { gsap } from "@/lib/gsap"

/**
 * Hallmark · genre: editorial · component: highlighted projects grid · design-system: design.md
 *
 * Clean, uniform 3-column grid of image-led cards — every card is the same
 * size and aspect ratio, matching the Games catalog for site-wide
 * consistency. Cards fade up in a stagger on scroll. Sits on bg-paper-2 to
 * break the cream stretch above.
 */

type Card = {
  id: string
  title: string
  description: string
  image: string
  authors: string
  tags: string[]
  href: string
}

const highlighted: Card[] = [
  { ...games[0],    href: "/games" },
  { ...games[1],    href: "/games" },
  { ...research[0], href: "/publications" },
  { ...games[2],    href: "/games" },
  { ...games[3],    href: "/games" },
  { ...research[1], href: "/publications" },
]

export default function HighlightedWorks() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".hw-card")
      if (!cards) return
      gsap.from(cards, {
        opacity: 0,
        y: 12,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="w-full bg-paper-2 pt-10 pb-12 md:pt-12 md:pb-14">
      <div className="w-[90%] max-w-[1500px] mx-auto">
        {/* Section header — title left, CTA right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-5 md:mb-7">
          <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] m-0">
            Highlighted projects
          </h2>
          <Button href="/games" variant="outline">Explore all projects</Button>
        </div>

        {/* Uniform 3-column grid — identical cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-9"
        >
          {highlighted.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="hw-card group flex flex-col no-underline"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[12px] bg-paper-3 mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover card-img-zoom"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {item.tags.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
                </div>

                <h3 className="text-lg font-semibold text-ink m-0 mb-1.5 leading-snug tracking-[-0.01em] font-sans
                               transition-colors duration-300 group-hover:text-ink-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed m-0 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3.5">
                  <span className="text-xs text-ink-3 font-sans truncate pr-3">{item.authors}</span>
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
          ))}
        </div>
      </div>
    </section>
  )
}
