"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import Tag from "@/components/ui/Tag"
import type { ShowcaseProject } from "@/data/highlights"

/**
 * ProjectModal — shared detail popup for showcase projects.
 *
 * Renders nothing when `project` is null. When open it shows a photo gallery
 * (main image is object-contain so artwork/text isn't cropped) plus the full
 * write-up, tags and authors. Handles Escape, click-outside, background
 * scroll-lock (Lenis + body, restored on cleanup) and moves focus to the
 * close button. Used by both the home highlights grid and the games catalog.
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: ShowcaseProject | null
  onClose: () => void
}) {
  const [imgIndex, setImgIndex] = useState(0)
  const [shownId, setShownId] = useState(project?.id)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  /* Reset the gallery to the first image whenever a different project opens
     (adjust-state-during-render — no effect needed). */
  if (project?.id !== shownId) {
    setShownId(project?.id)
    setImgIndex(0)
  }

  /* Keep the latest onClose in a ref so the lock effect below depends only on
     `project` and doesn't re-run (re-stealing focus) on every re-render. */
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  /* Lock background scroll + wire Escape while open; cleanup always restores
     Lenis even if this unmounts mid-open (e.g. route change). */
  useEffect(() => {
    if (!project) return
    const lenis = (window as unknown as { __lenis?: { stop?: () => void; start?: () => void } }).__lenis
    lenis?.stop?.()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current()
    }
    document.addEventListener("keydown", onKey)

    closeRef.current?.focus()

    return () => {
      lenis?.start?.()
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [project])

  if (!project) return null

  return (
    <>
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/55 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[860px] max-h-[88vh] flex flex-col bg-paper rounded-[18px] overflow-hidden shadow-[0_40px_120px_rgba(22,19,16,0.35)]"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
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
                  key={project.gallery[imgIndex]}
                  src={project.gallery[imgIndex]}
                  alt={`${project.title} — image ${imgIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="860px"
                  priority
                />
              </div>

              {project.gallery.length > 1 && (
                <div className="flex gap-2.5 mt-3">
                  {project.gallery.map((g, idx) => (
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
                        className="absolute inset-0 rounded-lg transition-colors"
                        style={{ boxShadow: idx === imgIndex ? "inset 0 0 0 2px var(--color-ink)" : "none" }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Text */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((t) => <Tag key={t} label={t} />)}
                </div>

                <h3 className="t-h3 font-sans font-extrabold text-ink tracking-[-0.02em] leading-[1.02] m-0">
                  {project.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.16em] font-semibold font-sans text-ink-3 mt-2 mb-0">
                  {project.authors}
                </p>

                <div className="mt-5 space-y-4 text-sm md:text-md text-ink-2 leading-[1.7] max-w-[62ch]">
                  {project.long.split("\n").map((para, i) => (
                    <p key={i} className="m-0">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
    </>
  )
}
