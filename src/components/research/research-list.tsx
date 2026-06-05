"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Research, PubType } from "@/data/research"
import Tag from "@/components/ui/Tag"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_IO  = "cubic-bezier(0.65,0,0.35,1)"

/** Fixed display order for the three primary publication types. */
const TYPE_ORDER: PubType[] = ["Conference Paper", "Journal Article", "Extended Abstracts"]

/**
 * ResearchList — interactive editorial index with a two-tier filter.
 *
 *  - Primary row: the three publication TYPES (Conference Paper / Journal
 *    Article / Extended Abstracts) + All.
 *  - Secondary row: TOPIC keywords, scoped to whatever the active type
 *    surfaces (so you can't pick a dead-end combination).
 *  - The two tiers combine (AND). Switching type resets the topic.
 *  - Hover: non-hovered rows dim to 28%, active row title nudges right.
 */
export function ResearchList({ items }: { items: Research[] }) {
  const [hovered,     setHovered]     = useState<Research | null>(null)
  const [activeType,  setActiveType]  = useState<PubType | null>(null)
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  /* Primary types actually present in the data, in fixed order. */
  const types = useMemo(
    () => TYPE_ORDER.filter((t) => items.some((r) => r.type === t)),
    [items],
  )

  /* Narrow by the active type first… */
  const typeFiltered = useMemo(
    () => (activeType ? items.filter((r) => r.type === activeType) : items),
    [items, activeType],
  )

  /* …then offer only the topics available within that type slice. */
  const availableTopics = useMemo(() => {
    const seen = new Set<string>()
    typeFiltered.forEach((r) => r.topics.forEach((t) => seen.add(t)))
    return Array.from(seen)
  }, [typeFiltered])

  /* Ignore a stale topic that the current type no longer offers. */
  const shownTopic = activeTopic && availableTopics.includes(activeTopic)
    ? activeTopic
    : null

  const filtered = useMemo(
    () => (shownTopic ? typeFiltered.filter((r) => r.topics.includes(shownTopic)) : typeFiltered),
    [typeFiltered, shownTopic],
  )

  /* Selecting a type resets the secondary topic to avoid empty combos. */
  const selectType = (t: PubType | null) => {
    setActiveType(t)
    setActiveTopic(null)
  }

  return (
    <>
      {/* ── Primary filter — publication type ───────────────── */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[null, ...types].map((t) => {
          const isActive = t === null ? !activeType : t === activeType
          return (
            <button
              key={t ?? "__all__"}
              onClick={() => selectType(t === activeType ? null : t)}
              className="text-sm font-semibold font-sans px-5 py-2 rounded-full border
                         outline-none focus-visible:ring-2 focus-visible:ring-ink/30
                         cursor-pointer"
              style={{
                background:   isActive ? "var(--color-ink)"   : "transparent",
                color:        isActive ? "var(--color-paper)"  : "var(--color-ink-2)",
                borderColor:  isActive ? "var(--color-ink)"    : "oklch(80% 0.010 80 / 0.7)",
                transition:   `background 280ms ${EASE_IO}, color 280ms ${EASE_IO}, border-color 280ms ${EASE_IO}`,
              }}
            >
              {t ?? "All"}
            </button>
          )
        })}
      </div>

      {/* ── Secondary filter — topic ────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-14 md:mb-16">
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink-3 font-sans font-semibold mr-1 select-none">
          Topic
        </span>
        {availableTopics.map((topic) => {
          const isActive = topic === shownTopic
          return (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic === shownTopic ? null : topic)}
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
              {topic}
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
                    <div className="grid grid-cols-[24px_1fr] md:grid-cols-[32px_1fr_210px] gap-x-5 md:gap-x-8 items-start">

                      {/* ── Bullet marker ────────────────────── */}
                      <span
                        aria-hidden
                        className="block mt-[9px] ml-1 h-1.5 w-1.5 rounded-full bg-ink/45 select-none"
                      />

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

                        <p className="text-xs text-ink-3 font-sans m-0 mt-1.5">
                          <span className="font-medium text-ink-2">Venue —</span>{" "}{item.venue}
                        </p>

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-xs font-mono text-ink-3 hover:text-ink transition-colors duration-200 break-all"
                          >
                            DOI: {item.link.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}
                          </a>
                        )}

                        {/* Mobile: type + topics below content */}
                        <div className="md:hidden mt-4 flex flex-wrap gap-1.5 items-center">
                          <Tag label={item.type} className="bg-ink/10 text-ink border-ink/15" />
                          {item.topics.map((t) => <Tag key={t} label={t} />)}
                        </div>
                      </div>

                      {/* ── Desktop meta — right column ────────── */}
                      <div className="hidden md:flex flex-col items-end gap-2.5 pt-0.5">
                        <Tag label={item.type} className="bg-ink/10 text-ink border-ink/15" />
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {item.topics.map((t) => <Tag key={t} label={t} />)}
                        </div>
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
