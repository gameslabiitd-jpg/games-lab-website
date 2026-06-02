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
 * Hallmark · genre: editorial · component: zig-zag feature grid · design-system: design.md
 *
 * Editorial zig-zag on a 12-col grid — breaks the symmetric 3-col card
 * pattern. Card column-spans alternate (8/4 · 4/8 · 6/6) so the eye
 * traverses the page like a magazine spread instead of a CMS feed.
 *
 * Cards are border-less; the image carries the card. Hover lifts the
 * image (existing .card-img-zoom) and brightens the arrow. The whole
 * block sits on bg-paper-2 to break the long cream stretch above.
 */

type Card = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  authors: string
  href: string
  span: string  // tailwind col-span class
  aspect: string // tailwind aspect class for the image
}

const highlighted: Card[] = [
  { ...games[0],    href: "/games",    span: "lg:col-span-8", aspect: "aspect-[16/9]"  },
  { ...games[1],    href: "/games",    span: "lg:col-span-4", aspect: "aspect-[4/3]"   },
  { ...research[0], href: "/research", span: "lg:col-span-4", aspect: "aspect-[4/3]"   },
  { ...games[2],    href: "/games",    span: "lg:col-span-8", aspect: "aspect-[16/9]"  },
  { ...research[1], href: "/research", span: "lg:col-span-6", aspect: "aspect-[3/2]"   },
  { ...games[3],    href: "/games",    span: "lg:col-span-6", aspect: "aspect-[3/2]"   },
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
    <section className="w-full bg-paper-2 pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="w-[90%] max-w-[1500px] mx-auto">
        {/* Section header — title left, single CTA right (duplicate bottom CTA removed) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <h2 className="font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] m-0"
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}>
            Highlighted projects
          </h2>
          <Button href="/games" variant="outline">Explore all projects</Button>
        </div>

        {/* Zig-zag grid — 12-col on lg, stacked on mobile */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-14 md:gap-y-20"
        >
          {highlighted.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`hw-card group flex flex-col no-underline ${item.span}`}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden rounded-[10px] bg-paper-3 mb-5`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover card-img-zoom"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,50vw"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((t) => <Tag key={t} label={t} />)}
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-ink m-0 mb-2 leading-snug font-sans
                               transition-colors duration-300 group-hover:text-ink-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed m-0 max-w-[56ch]">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <span className="text-xs text-ink-3 font-sans">{item.authors}</span>
                  <span
                    aria-hidden
                    className="text-ink text-md opacity-30 group-hover:opacity-100 group-hover:translate-x-1
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
