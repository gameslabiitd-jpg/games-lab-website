"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import ProjectModal from "@/components/ui/ProjectModal"
import { showcaseProjects, type ShowcaseProject } from "@/data/highlights"
import { gsap } from "@/lib/gsap"

/**
 * Hallmark · genre: editorial · component: highlighted projects grid · design-system: design.md
 *
 * Uniform 4-column grid of image-led cards (one row). Clicking a card opens a
 * shared detail popup (ProjectModal) with the full write-up and every project
 * photo — so the highlights are self-contained and don't bounce to /games.
 * Cards fade up in a stagger on scroll. Sits on bg-paper-2.
 */

export default function HighlightedWorks() {
  const gridRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [active, setActive] = useState<ShowcaseProject | null>(null)

  const open = (p: ShowcaseProject, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget
    setActive(p)
  }
  const close = () => {
    setActive(null)
    triggerRef.current?.focus()
  }

  /* Stagger the cards in on scroll. */
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
    <>
      <section className="w-full bg-paper-2 pt-10 pb-12 md:pt-12 md:pb-14">
        <div className="w-[90%] max-w-[1500px] mx-auto">
          {/* Section header — title left, CTA right */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-5 md:mb-7">
            <h2 className="t-h2 font-sans font-extrabold text-ink leading-[0.92] tracking-[-0.02em] m-0">
              Highlighted projects
            </h2>
            <Button href="/games" variant="outline">Explore all projects</Button>
          </div>

          {/* Uniform 4-column grid (one row) — identical cards */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-9"
          >
            {showcaseProjects.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={(e) => open(item, e)}
                aria-haspopup="dialog"
                className="hw-card group flex flex-col text-left cursor-pointer outline-none
                           focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-4
                           focus-visible:ring-offset-paper-2 rounded-[12px]"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[12px] bg-paper-3 mb-4">
                  <Image
                    src={item.gallery[0]}
                    alt={item.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    loading="lazy"
                  />
                </div>

                {/* Title sits directly under the image so all four align,
                    regardless of how many lines the tags below wrap to. */}
                <h3 className="text-lg font-semibold text-ink m-0 leading-snug tracking-[-0.01em] font-sans
                               transition-colors duration-300 group-hover:text-ink-2">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {item.tags.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
                </div>

                <p className="text-sm text-ink-2 leading-relaxed mt-2.5 mb-0 line-clamp-2">
                  {item.short}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3.5 w-full">
                  <span className="text-xs text-ink-3 font-sans truncate pr-3">{item.authors}</span>
                  <span
                    aria-hidden
                    className="text-ink text-md opacity-30 shrink-0 group-hover:opacity-100 group-hover:translate-x-1
                               transition-[opacity,transform] duration-300"
                  >
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={active} onClose={close} />
    </>
  )
}
