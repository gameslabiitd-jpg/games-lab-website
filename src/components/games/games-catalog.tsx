"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Game } from "@/data/games"
import Tag from "@/components/ui/Tag"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_IO = "cubic-bezier(0.65,0,0.35,1)"

/* Format tags are always offered as filters, in this order, when present. */
const FORMATS = ["Tabletop", "Digital"]
/* Tags that are flavour-only and shouldn't appear as filter pills. */
const HIDDEN_FROM_FILTER = new Set(["TBA"])

/**
 * GamesCatalog — interactive catalog grid with a category filter.
 *
 * The filter pills are derived from the data (not hand-curated): the two
 * format tags first, then every other tag used by ≥2 games, ordered by how
 * common they are. Selecting a pill filters the grid; cards re-flow with a
 * staggered motion transition. Single-select, matching the Publications index.
 */
export function GamesCatalog({ games }: { games: Game[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  /* Derive filter vocabulary from the tags themselves. */
  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    games.forEach((g) =>
      g.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    )

    const formats = FORMATS.filter((f) => counts.has(f))

    const rest = Array.from(counts.entries())
      .filter(
        ([t, n]) =>
          !FORMATS.includes(t) && !HIDDEN_FROM_FILTER.has(t) && n >= 2
      )
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t)

    return [...formats, ...rest]
  }, [games])

  const filtered = useMemo(
    () => (activeTag ? games.filter((g) => g.tags.includes(activeTag)) : games),
    [games, activeTag]
  )

  return (
    <>
      {/* ── Category filter ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-7 md:mb-9">
        {[null, ...categories].map((tag) => {
          const isActive = tag === null ? !activeTag : tag === activeTag
          return (
            <button
              key={tag ?? "__all__"}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="text-xs font-semibold font-sans px-4 py-1.5 rounded-full border
                         outline-none focus-visible:ring-2 focus-visible:ring-ink/30
                         cursor-pointer"
              style={{
                background: isActive ? "var(--color-ink)" : "transparent",
                color: isActive ? "var(--color-paper)" : "var(--color-ink-3)",
                borderColor: isActive
                  ? "var(--color-ink)"
                  : "oklch(85% 0.010 80 / 0.5)",
                transition: `background 280ms ${EASE_IO}, color 280ms ${EASE_IO}, border-color 280ms ${EASE_IO}`,
              }}
            >
              {tag ?? "All"}
            </button>
          )
        })}
      </div>

      {/* ── Catalog grid ────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink-3 font-sans text-sm">
          No games match this filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((game, i) => (
              <motion.article
                key={game.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: EASE_OUT }}
                className="group bg-paper border border-rule rounded-[12px] overflow-hidden card-lift hover:border-ink/30 flex flex-col h-full"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-paper-3">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover card-img-zoom"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    loading={i < 3 ? "eager" : "lazy"}
                    priority={i < 3}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {game.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold font-sans text-ink mb-2 leading-snug tracking-[-0.01em]">
                    {game.title}
                  </h2>
                  <p className="text-sm text-ink-2 leading-relaxed flex-1 m-0 line-clamp-3">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-rule-soft">
                    <span className="text-xs text-ink-3 font-sans truncate pr-3">
                      {game.authors}
                    </span>
                    <span
                      aria-hidden
                      className="text-ink text-md opacity-30 shrink-0 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
