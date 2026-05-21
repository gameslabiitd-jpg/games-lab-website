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

// Mix games + research for the highlighted grid
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
      const cards = gridRef.current?.querySelectorAll(".hw-card-item")
      if (!cards) return
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="w-[88%] max-w-[1500px] mx-auto py-20">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-[36px] font-black text-ink m-0">Highlighted Works</h2>
        <Button href="/games" variant="outline" className="hidden sm:inline-flex">
          Explore All
        </Button>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {highlighted.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="hw-card-item group bg-white rounded-[14px] overflow-hidden shadow-[0_4px_14px_rgba(15,13,20,0.07)] border-b-2 border-brand-accent card-lift flex flex-col no-underline"
          >
            {/* Image */}
            <div className="relative w-full aspect-video overflow-hidden bg-brand-muted shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover card-img-zoom"
                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              />
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {item.tags.map((t) => <Tag key={t} label={t} />)}
              </div>

              <p className="text-[14px] font-bold text-ink m-0 mb-1.5 leading-snug">
                {item.title}
              </p>
              <p className="text-[12px] text-ink-soft leading-relaxed m-0 flex-1">
                {item.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-border">
                <span className="text-[11px] text-ink-soft">{item.authors}</span>
                <span className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-white text-[11px] group-hover:scale-110 transition-transform">
                  ›
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
