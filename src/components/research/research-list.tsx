"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Research } from "@/data/research"
import Tag from "@/components/ui/Tag"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_IO  = "cubic-bezier(0.65,0,0.35,1)"

/**
 * ResearchList — interactive editorial index.
 *
 * Features:
 *  - Tag filter pills with AnimatePresence in/out
 *  - Hover: non-hovered rows dim to 28%, active row title nudges right
 *  - Empty-state message when a filter returns no results
 */
export function ResearchList({ items }: { items: Research[] }) {
  const [hovered,   setHovered]   = useState<Research | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  /* Collect unique tags */
  const allTags = useMemo(() => {
    const seen = new Set<string>()
    items.forEach(r => r.tags.forEach(t => seen.add(t)))
    return Array.from(seen)
  }, [items])

  /* Filtered list */
  const filtered = useMemo(
    () => activeTag ? items.filter(r => r.tags.includes(activeTag)) : items,
    [items, activeTag]
  )

  return (
    <>
      {/* ── Tag filter ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-14 md:mb-16">
        {[null, ...allTags].map((tag) => {
          const isActive = tag === null ? !activeTag : tag === activeTag
          return (
            <button
              key={tag ?? "__all__"}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="text-xs font-semibold font-sans px-4 py-1.5 rounded-full border
                         outline-none focus-visible:ring-2 focus-visible:ring-ink/30
                         cursor-pointer"
              style={{
                background:   isActive ? "var(--color-ink)"   : "transparent",
                color:        isActive ? "var(--color-paper)"  : "var(--color-ink-3)",
                borderColor:  isActive ? "var(--color-ink)"    : "oklch(85% 0.010 80 / 0.5)",
                transition:   `background 280ms ${EASE_IO}, color 280ms ${EASE_IO}, border-color 280ms ${EASE_IO}`,
              }}
            >
              {tag ?? "All"}
            </button>
          )
        })}
      </div>

      {/* ── Research rows ───────────────────────────────────── */}
      <ul className="list-none m-0 p-0">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.li
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-ink-3 font-sans text-sm"
            >
              No papers match this filter.
            </motion.li>
          ) : (
            filtered.map((item, i) => {
              const isDimmed = hovered && hovered.id !== item.id
              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.55, delay: i * 0.055, ease: EASE_OUT }}
                  className="border-b border-rule first:border-t"
                >
                  <div
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    className="py-8 md:py-11"
                    style={{
                      opacity:    isDimmed ? 0.28 : 1,
                      transition: `opacity 420ms ${EASE_IO}`,
                    }}
                  >
                    <div className="grid grid-cols-[48px_1fr] md:grid-cols-[64px_1fr_210px] gap-x-6 md:gap-x-10 items-start">

                      {/* ── Index number ─────────────────────── */}
                      <span className="pt-[3px] text-xs font-semibold font-sans text-ink-3 tabular-nums select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* ── Main content ─────────────────────── */}
                      <div
                        style={{
                          transform:  hovered?.id === item.id ? "translateX(7px)" : "translateX(0)",
                          transition: `transform 420ms ${EASE_IO}`,
                        }}
                      >
                        <h2 className="t-title font-sans font-extrabold text-ink leading-[1.05] tracking-[-0.025em] m-0 mb-3">
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="no-underline text-ink hover:text-ink/70 transition-colors duration-200"
                            >
                              {item.title}
                            </a>
                          ) : item.title}
                        </h2>

                        <p className="text-sm text-ink-2 leading-[1.72] m-0 mb-3 max-w-[64ch]">
                          {item.description}
                        </p>

                        <p className="text-xs text-ink-3 font-sans m-0">
                          <span className="font-medium text-ink-2">Authors —</span>{" "}{item.authors}
                        </p>

                        {/* Mobile: tags below content */}
                        <div className="md:hidden mt-4 flex flex-wrap gap-1.5 items-center">
                          {item.tags.map(t => <Tag key={t} label={t} />)}
                          {item.year && (
                            <span className="text-xs text-ink-3 font-sans">{item.year}</span>
                          )}
                        </div>
                      </div>

                      {/* ── Desktop meta — right column ────────── */}
                      <div className="hidden md:flex flex-col items-end gap-2.5 pt-0.5">
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {item.tags.map(t => <Tag key={t} label={t} />)}
                        </div>
                        {item.year && (
                          <span className="text-xs text-ink-3 font-sans tabular-nums">{item.year}</span>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.li>
              )
            })
          )}
        </AnimatePresence>
      </ul>
    </>
  )
}
