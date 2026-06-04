"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"

/**
 * Hallmark · component: media-stack · design-system: design.md
 *
 * A "deck" of mixed media — autoplaying (muted) project clips and game-jam
 * photos — that cycles through itself one card at a time, with two cards
 * peeking behind the front for depth.
 *
 * Performance contract (important): only the FRONT card ever mounts a live
 * <video>. Cards stacked behind it render their static poster image, so at
 * most one video decodes at a time. Photos auto-advance on a timer; videos
 * advance when they finish (with a max-duration fallback so a stalled clip
 * can never freeze the deck). Honours prefers-reduced-motion by showing the
 * first item statically and letting the dots drive navigation.
 */

type MediaItem =
  | { id: string; type: "image"; src: string; alt: string }
  | { id: string; type: "video"; src: string; poster: string; alt: string }

const ITEMS: MediaItem[] = [
  { id: "game-jam-1", type: "image", src: "/images/home/game-jam-1.jpg", alt: "Students collaborating at a GAMES Lab game jam" },
  { id: "omya-project", type: "video", src: "/videos/omya-project.mp4", poster: "/images/home/omya-project-poster.jpg", alt: "Playthrough of a GAMES Lab student project" },
  { id: "stack-2", type: "image", src: "/images/home/stack-2.jpg", alt: "Players testing a board game prototype at the GAMES Lab" },
  { id: "gameplay-2", type: "video", src: "/videos/gameplay-2.mp4", poster: "/images/home/gameplay-2-poster.jpg", alt: "Gameplay clip from a GAMES Lab project" },
  { id: "stack-1", type: "image", src: "/images/home/stack-1.jpg", alt: "A close-up of a tabletop card game in play at the GAMES Lab" },
  { id: "game-jam-2", type: "image", src: "/images/home/game-jam-2.jpg", alt: "Playtesting tabletop prototypes at a game jam" },
  { id: "stack-3", type: "image", src: "/images/home/stack-3.jpg", alt: "A mentor discussing a project with students during a game-dev session" },
  { id: "omya-photo", type: "image", src: "/images/home/omya-project.jpg", alt: "A GAMES Lab project on show" },
  { id: "stack-4", type: "image", src: "/images/home/stack-4.jpg", alt: "Group photo of participants at a GAMES Lab event" },
  { id: "game-jam-4", type: "image", src: "/images/home/game-jam-4.jpg", alt: "Designers sketching ideas during a game jam" },
  { id: "game-jam-3", type: "image", src: "/images/home/game-jam-3.jpg", alt: "Team presenting their game at a jam" },
]

const PHOTO_MS = 4500 // photos hold this long before advancing
const VIDEO_MAX_MS = 20000 // fallback so a stalled clip never freezes the deck
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* Transform per stack depth: 0 = front, 1 & 2 peek behind, rest hidden.
   Tuned for a wide (16:9) card — peek fans to the right with a low,
   cinematic tilt so the corners don't swing too far. */
const DEPTHS = [
  { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 },
  { x: 28, y: 18, scale: 0.955, rotate: 1.6, opacity: 1, zIndex: 20 },
  { x: 54, y: 36, scale: 0.91, rotate: 3, opacity: 1, zIndex: 10 },
]
const HIDDEN = { x: 64, y: 42, scale: 0.89, rotate: 3.6, opacity: 0, zIndex: 0 }

export default function MediaStack() {
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const advance = () => setActive((i) => (i + 1) % ITEMS.length)

  /* Detect reduced-motion preference. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  /* Drive auto-advance for the active card. */
  useEffect(() => {
    if (reduced) return
    const item = ITEMS[active]

    if (item.type === "image") {
      const t = setTimeout(advance, PHOTO_MS)
      return () => clearTimeout(t)
    }

    // Video: ensure muted + play; advance on end or via fallback timer.
    // The element remounts fresh each time it returns to the front (keyed by
    // id), so it already starts at 0 — only rewind once metadata exists, as
    // Safari/WebKit can throw if currentTime is set before it's seekable.
    const el = videoRef.current
    if (el) {
      el.muted = true // React doesn't reliably set the muted attr; force it for Safari autoplay
      if (el.readyState >= 1 && el.currentTime > 0) el.currentTime = 0
      el.play().catch(() => {
        /* autoplay blocked (e.g. Safari Low Power Mode) — fallback timer carries the deck */
      })
    }
    const fallback = setTimeout(advance, VIDEO_MAX_MS)
    return () => clearTimeout(fallback)
  }, [active, reduced])

  return (
    <div className="w-full">
      {/* extra padding gives the peeking cards room so they aren't clipped */}
      <div className="relative w-full aspect-[16/9] pr-10 pb-10 md:pr-[68px] md:pb-12">
        {ITEMS.map((item, i) => {
          const depth = (i - active + ITEMS.length) % ITEMS.length
          const d = depth < DEPTHS.length ? DEPTHS[depth] : HIDDEN
          const isFront = depth === 0
          const showVideo = isFront && item.type === "video" && !reduced

          return (
            <motion.div
              key={item.id}
              onClick={isFront ? advance : undefined}
              onKeyDown={
                isFront
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        advance()
                      }
                    }
                  : undefined
              }
              role={isFront ? "button" : undefined}
              tabIndex={isFront ? 0 : -1}
              aria-label={isFront ? "Show next item" : undefined}
              className={
                "absolute inset-0 rounded-[14px] overflow-hidden border border-rule bg-paper-3 " +
                "shadow-[0_18px_40px_rgba(22,19,16,0.12)] " +
                (isFront
                  ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
                  : "pointer-events-none")
              }
              style={{ transformOrigin: "center center" }}
              initial={false}
              animate={{ x: d.x, y: d.y, scale: d.scale, rotate: d.rotate, opacity: d.opacity, zIndex: d.zIndex }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              {showVideo ? (
                <video
                  ref={videoRef}
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  onEnded={advance}
                  onError={advance}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={item.type === "video" ? item.poster : item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width:1536px) 1500px, 92vw"
                  className="object-cover"
                  priority={depth === 0}
                />
              )}

              {/* play affordance on the front video card before/while it plays */}
              {isFront && item.type === "video" && (
                <span
                  aria-hidden
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full
                             bg-ink/70 px-3 py-1.5 text-xs font-sans font-medium text-paper backdrop-blur-sm"
                >
                  <span className="block h-2 w-2 rounded-full bg-paper" />
                  Video
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* progress dots / manual navigation */}
      <div className="mt-5 flex items-center gap-2" role="group" aria-label="Media gallery navigation">
        {ITEMS.map((item, i) => {
          const isActive = i === active
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? "true" : undefined}
              aria-label={`Show ${item.alt}`}
              onClick={() => setActive(i)}
              className="group h-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ink/30 rounded-full"
            >
              <span
                className="block h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 26 : 8,
                  background: isActive ? "var(--color-ink)" : "oklch(70% 0.01 80 / 0.45)",
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
