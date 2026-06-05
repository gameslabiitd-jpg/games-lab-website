"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import { gsap } from "@/lib/gsap"

/**
 * Hallmark · genre: editorial · component: highlighted projects grid · design-system: design.md
 *
 * Uniform 4-column grid of image-led cards (one row). Clicking a card opens a
 * detail popup with the full write-up and every project photo in a small
 * gallery — so the highlights are self-contained and don't bounce to /games.
 * Cards fade up in a stagger on scroll. Sits on bg-paper-2.
 */

type Highlight = {
  id: string
  title: string
  authors: string
  tags: string[]
  short: string
  long: string
  gallery: string[]
}

const highlighted: Highlight[] = [
  {
    id: "laminar",
    title: "Laminar",
    authors: "Radhika",
    tags: ["Video Game", "Learning", "Training", "Research"],
    short:
      "A crowd-disaster simulation that trains Indian youth to make instinctive, safe decisions in high-pressure crowd emergencies.",
    long:
      "Laminar is an interactive play experience that aims to improve crowd preparedness in Indian youth, enabling them to understand probable crowd behaviours and take instinctive, safe responses inside a crowd-distress simulation. The project bridges the preparedness gap for disasters that cannot be simulated or trained for in the real world.\nIt uses two mediums to communicate the context, each revealing different behavioural insights — from how an individual's planning and intuition together alter their decisions, to how intuition and immersion work their way together.\nThe project not only promotes appropriate decision-making in players, but also reveals shared and individual patterns of operation in such situations.",
    gallery: [
      "/images/highlights/laminar/1.jpg",
      "/images/highlights/laminar/2.jpg",
      "/images/highlights/laminar/3.jpg",
    ],
  },
  {
    id: "care-paths",
    title: "Care Paths",
    authors: "Himanshu Sejwar",
    tags: ["VR", "Empathy", "Training"],
    short:
      "A VR training experience that builds empathy and compassionate decision-making in healthcare trainees through a child patient's journey.",
    long:
      "An immersive VR training experience designed to study behavioural change, empathy development, and decision-making in healthcare interactions. Trainees follow a child patient's emotional journey, building trust and personal connection while making critical medical choices.\nThrough real-time reactions and reflective moments from the child's perspective, players see how communication, tone, and care decisions can shape emotional well-being, trust in healthcare, and long-term outcomes.\nThe experience encourages deeper empathy, self-awareness, and more compassionate clinical behaviour.",
    gallery: [
      "/images/highlights/care-paths/1.jpg",
      "/images/highlights/care-paths/2.jpg",
    ],
  },
  {
    id: "narrative-sandbox",
    title: "Narrative Sandbox",
    authors: "Omya Sharma",
    tags: ["Augmented Reality", "Pretend Play", "Tangible Interaction", "Child-Computer Interaction"],
    short:
      "An AR sandbox where children aged 5–7 co-create imaginative narrative worlds through sand, tokens, and generative-AI projections.",
    long:
      "We explore how augmented reality and generative AI can transform children's play. Using a custom AR Sandbox — a physical sand table augmented with real-time AI-generated visuals, depth sensing, and tangible tokens — we study how young children (ages 5–7) engage in co-located, embodied pretend play.\nOur work sits at the intersection of Tangible User Interfaces, Child-Computer Interaction, and generative AI, asking how technology can support imagination and collaborative storytelling without overshadowing the play itself. Children interact with the sandbox by shaping sand and placing themed tokens that trigger dynamic biome projections, co-creating narrative worlds together in real time.\nThrough iterative Research-through-Design methods, we aim to uncover design principles that keep the child at the centre of play.",
    gallery: [
      "/images/highlights/narrative-sandbox/1.jpg",
      "/images/highlights/narrative-sandbox/2.jpg",
    ],
  },
  {
    id: "cyto-polis",
    title: "Cyto-Polis",
    authors: "Radhika, Shuriti, Suchalika, Adhiraj & Vinay",
    tags: ["Board Game", "Education", "Cell Biology", "Cooperative"],
    short:
      "A co-operative board game where players team up as Nanobots, wielding organelle powers to revive a collapsing cell city.",
    long:
      "Cyto-Polis is a co-operative board game where you and your team are a group of Nanobots, assigned to a cell city collapsing under a dangerous infection. Your team is the last hope to bring it back to life.\nHarness the unique abilities and powers of various cell organelles to collaborate, strategise, and revive the Cyto-Polis.",
    gallery: [
      "/images/highlights/cyto-polis/1.jpg",
      "/images/highlights/cyto-polis/2.jpg",
      "/images/highlights/cyto-polis/3.jpg",
    ],
  },
]

export default function HighlightedWorks() {
  const gridRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const [active, setActive] = useState<Highlight | null>(null)
  const [imgIndex, setImgIndex] = useState(0)

  const open = (h: Highlight, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget
    setImgIndex(0)
    setActive(h)
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

  /* While the modal is open: lock background scroll (Lenis + body) and wire
     Escape. Cleanup restarts Lenis even if the component unmounts while open. */
  useEffect(() => {
    if (!active) return
    const lenis = (window as unknown as { __lenis?: { stop?: () => void; start?: () => void } }).__lenis
    lenis?.stop?.()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)

    closeRef.current?.focus()

    return () => {
      lenis?.start?.()
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [active])

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
            {highlighted.map((item) => (
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

      {/* ── Detail popup ──────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[860px] max-h-[88vh] flex flex-col bg-paper rounded-[18px] overflow-hidden shadow-[0_40px_120px_rgba(22,19,16,0.35)]"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close */}
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-paper/80 backdrop-blur
                           border border-rule flex items-center justify-center text-ink
                           hover:bg-paper transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {/* Scrollable content (data-lenis-prevent so the panel scrolls,
                  not the locked page behind it) */}
              <div className="overflow-y-auto p-5 sm:p-7" data-lenis-prevent>
                {/* Gallery — main image (contain, so artwork/text isn't cropped) */}
                <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-paper-3">
                  <Image
                    key={active.gallery[imgIndex]}
                    src={active.gallery[imgIndex]}
                    alt={`${active.title} — image ${imgIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="860px"
                    priority
                  />
                </div>

                {active.gallery.length > 1 && (
                  <div className="flex gap-2.5 mt-3">
                    {active.gallery.map((g, idx) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setImgIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                        aria-current={idx === imgIndex}
                        className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-lg overflow-hidden bg-paper-3 shrink-0
                                   outline-none focus-visible:ring-2 focus-visible:ring-ink/40 transition-opacity"
                        style={{ opacity: idx === imgIndex ? 1 : 0.55 }}
                      >
                        <Image src={g} alt="" fill className="object-cover" sizes="80px" />
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-lg ring-2 transition-colors"
                          style={{ boxShadow: idx === imgIndex ? "inset 0 0 0 2px var(--color-ink)" : "none" }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Text */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {active.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>

                  <h3 className="t-h3 font-sans font-extrabold text-ink tracking-[-0.02em] leading-[1.02] m-0">
                    {active.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.16em] font-semibold font-sans text-ink-3 mt-2 mb-0">
                    {active.authors}
                  </p>

                  <div className="mt-5 space-y-4 text-sm md:text-md text-ink-2 leading-[1.7] max-w-[62ch]">
                    {active.long.split("\n").map((para, i) => (
                      <p key={i} className="m-0">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
