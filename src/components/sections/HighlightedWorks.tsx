"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { games } from "@/data/games"
import { research } from "@/data/research"
import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import { gsap, ScrollTrigger } from "@/lib/gsap"

type Card = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  authors: string
  href: string
}

const highlighted: Card[] = [
  { ...games[0],    href: "/games" },
  { ...games[1],    href: "/games" },
  { ...research[0], href: "/research" },
  { ...games[2],    href: "/games" },
  { ...research[1], href: "/research" },
  { ...games[3],    href: "/games" },
]

export default function HighlightedWorks() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".hw-card")
      if (!cards) return
      gsap.from(cards, {
        opacity: 0,
        y: 32,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="w-[88%] max-w-[1500px] mx-auto py-24">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="font-display text-[42px] md:text-[52px] text-ink leading-tight m-0">
            Highlighted Projects
          </h2>
        </div>
        <Button href="/games" variant="outline" className="hidden sm:inline-flex">
          Explore All
        </Button>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {highlighted.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="hw-card group flex flex-col no-underline rounded-[10px] overflow-hidden
                       bg-surface border border-ink-border
                       card-lift hover:border-brand/40"
          >
            {/* Image */}
            <div className="relative w-full aspect-video overflow-hidden bg-white/4 shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover card-img-zoom"
                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                loading="lazy"
              />
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((t) => <Tag key={t} label={t} />)}
              </div>

              <p className="text-[14px] font-semibold text-ink m-0 mb-2 leading-snug font-sans">
                {item.title}
              </p>
              <p className="text-[13px] text-ink-soft leading-relaxed m-0 flex-1">
                {item.description}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-border">
                <span className="text-[11px] text-ink-soft font-sans">{item.authors}</span>
                <span
                  aria-hidden
                  className="text-brand-accent text-[18px] opacity-50 group-hover:opacity-100 group-hover:translate-x-1
                             transition-[opacity,transform] duration-300"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Button href="/games" variant="outline">Explore All</Button>
      </div>
    </section>
  )
}
