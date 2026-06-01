"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hero v7 — scroll-scrub video with the original timeline, plus safety hatches.
 *
 * What changed vs v6 (the "stuck forever" build):
 *   - Scrub model is cumulative delta → progress, not per-event time addition.
 *     Trackpads (small frequent deltas) and mouse wheels (big deltas) now
 *     reach completion in the same total scroll distance.
 *   - Hard safety net: if locked for > 6s with no completion, force release.
 *   - Escape key, click-to-skip on the scroll indicator, and tap-on-video
 *     all release the lock immediately.
 *   - If component mounts with scrollY > 60 (back nav, refresh mid-page),
 *     don't lock at all.
 *   - prefers-reduced-motion: no lock, video stays at frame 0, normal scroll.
 *   - `complete` is state (not a ref) so the scroll indicator actually fades.
 */

type LenisLike = { stop: () => void; start: () => void }

const timeline = [
  { time: 0.00, title: "Lab.",               subtitle: "Where Play Meets Purpose!" },
  { time: 0.23, title: "Gaming.",            subtitle: "Designing meaningful play experiences that drive learning, empathy, and change." },
  { time: 0.52, title: "Augmented Reality.", subtitle: "Expanding perception through interactive overlays that blend digital with real." },
  { time: 0.77, title: "Mixed Reality.",     subtitle: "Creating hybrid environments where virtual and physical worlds converge." },
  { time: 1.02, title: "Experiences.",       subtitle: "Crafting immersive narratives that connect design, behaviour, and emotion." },
  { time: 1.25, title: "Simulations.",       subtitle: "Transforming research and data into interactive, learn-by-doing environments." },
  { time: 1.50, title: "Lab.",               subtitle: "Where Play Meets Purpose!" },
]

/** Total scroll distance (in px-equivalent) needed to scrub the whole video. */
const SCROLL_DISTANCE = 1200
/** After this long, give up and release the lock so the user is never trapped. */
const MAX_LOCK_MS = 6000

export default function Hero() {
  const videoRef     = useRef<HTMLVideoElement>(null)
  const accumDelta   = useRef(0)
  const ticking      = useRef(false)
  const completeRef  = useRef(false)
  const lockedRef    = useRef(false)
  const lenisRef     = useRef<LenisLike | null>(null)

  const [text, setText] = useState({
    title:    timeline[0].title,
    subtitle: timeline[0].subtitle,
  })
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Respect reduced motion — no lock, no scrub.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Don't lock if user is already past the hero (back-nav, deep refresh).
    const startedScrolled = window.scrollY > 60

    const shouldLock = !reducedMotion && !startedScrolled
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis ?? null
    lenisRef.current = lenis

    const release = () => {
      if (!lockedRef.current) return
      lockedRef.current = false
      completeRef.current = true
      document.body.style.overflow = ""
      lenis?.start()
      setComplete(true)
    }

    if (shouldLock) {
      lockedRef.current = true
      document.body.style.overflow = "hidden"
      lenis?.stop()
    } else {
      // We're not locking. Skip straight to "complete" so the indicator hides.
      completeRef.current = true
      setComplete(true)
    }

    // Hard safety net — never trap the user longer than MAX_LOCK_MS.
    const safetyTimer = window.setTimeout(() => {
      if (!completeRef.current) release()
    }, MAX_LOCK_MS)

    const findEntry = (t: number) => {
      for (let i = timeline.length - 1; i >= 0; i--) {
        if (t >= timeline[i].time) return timeline[i]
      }
      return timeline[0]
    }

    const applyFrame = () => {
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) {
        ticking.current = false
        return
      }
      const progress = Math.max(0, Math.min(accumDelta.current / SCROLL_DISTANCE, 1))
      const t = progress * duration
      video.currentTime = t

      const e = findEntry(t)
      setText((prev) =>
        prev.title === e.title && prev.subtitle === e.subtitle ? prev : { title: e.title, subtitle: e.subtitle }
      )

      if (progress >= 1) release()
      ticking.current = false
    }

    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(applyFrame)
        ticking.current = true
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return
      e.preventDefault()
      accumDelta.current += e.deltaY
      if (accumDelta.current < 0) accumDelta.current = 0
      requestTick()
    }

    let lastTouchY = 0
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return
      const y = e.touches[0]?.clientY ?? 0
      const dy = lastTouchY - y
      lastTouchY = y
      e.preventDefault()
      accumDelta.current += dy * 2.5
      if (accumDelta.current < 0) accumDelta.current = 0
      requestTick()
    }

    const onKey = (e: KeyboardEvent) => {
      // Escape skips the intro entirely.
      if (e.key === "Escape" && lockedRef.current) {
        release()
        return
      }
      // PageDown / Space / ArrowDown still scrub forward while locked.
      if (lockedRef.current && (e.key === " " || e.key === "PageDown" || e.key === "ArrowDown")) {
        e.preventDefault()
        accumDelta.current += 200
        requestTick()
      }
    }

    window.addEventListener("wheel",      onWheel,      { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true  })
    window.addEventListener("touchmove",  onTouchMove,  { passive: false })
    window.addEventListener("keydown",    onKey)

    // Cleanup
    return () => {
      window.clearTimeout(safetyTimer)
      window.removeEventListener("wheel",      onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove",  onTouchMove)
      window.removeEventListener("keydown",    onKey)
      // Always restore — leaving body locked across unmount would brick the app.
      document.body.style.overflow = ""
      lenis?.start()
      lockedRef.current = false
    }
  }, [])

  // Click-to-skip on the scroll indicator
  const skipIntro = () => {
    if (completeRef.current) return
    completeRef.current = true
    document.body.style.overflow = ""
    lenisRef.current?.start()
    setComplete(true)
    // Scroll user just past the hero
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7] text-[#161310] overflow-hidden">
      <div className="pt-28 md:pt-32" />

      {/* Scrub video — multiply blend over light paper drops the white video bg */}
      <div className="w-[78%] md:w-[70%] max-w-[1000px] mx-auto">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          width={1000}
          height={563}
          aria-hidden="true"
          className="w-full rounded-[14px] block"
          style={{ mixBlendMode: "multiply" }}
        >
          <source src="/videos/fingers464.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Timeline-driven headline + subtitle. aria-live so AT users hear the changes. */}
      <div className="text-center px-6 -mt-6 md:-mt-10" aria-live="polite">
        <h1
          className="font-sans font-black tracking-tight leading-none m-0"
          style={{ fontSize: "clamp(44px, 8vw, 96px)" }}
        >
          {text.title}
        </h1>
        <p
          className="font-sans text-[16px] md:text-[18px] mt-4 max-w-[640px] mx-auto m-0"
          style={{ color: "#4A4338" }}
        >
          {text.subtitle}
        </p>
      </div>

      {/* Click-to-skip scroll indicator. Now actually fades because `complete` is state. */}
      <button
        type="button"
        onClick={skipIntro}
        aria-label="Skip intro and scroll down"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40
                    transition-opacity duration-500 cursor-pointer bg-transparent border-0 p-2
                    ${complete ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-[#161310]/60 font-semibold">
          Scroll · or press Esc
        </span>
        <div className="w-px h-12 bg-[#161310]/50" />
      </button>
    </section>
  )
}
