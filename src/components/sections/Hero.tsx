"use client"

import { useEffect, useRef, useState } from "react"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

/**
 * Hallmark · genre: editorial · macrostructure: Marquee Hero · design-system: design.md
 * Cream scroll-scrub hero with cursor-driven gooey pixel trail behind
 * the centerpiece. The trail layer sits at z-0, content stays at z-10+.
 * See design.md for the locked system.
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

const SCROLL_DISTANCE = 1200
/** Idle timeout — lock auto-releases after this much time WITHOUT user
 *  activity. Active scrollers never hit it. Slow scrollers reset it on
 *  every wheel/touch/key event. */
const IDLE_RELEASE_MS = 10000

export default function Hero() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const accumDelta  = useRef(0)
  const ticking     = useRef(false)
  const completeRef = useRef(false)
  const lockedRef   = useRef(false)
  const lenisRef    = useRef<LenisLike | null>(null)

  const [text, setText]         = useState({ title: timeline[0].title, subtitle: timeline[0].subtitle })
  const [complete, setComplete] = useState(false)

  // Coarser pixels on mobile (touch can't drive a hover trail meaningfully,
  // but the resize-on-rotate cost stays cheap).
  const screen = useScreenSize()
  const pixelSize = screen.lessThan("md") ? 28 : 36

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion   = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const startedScrolled = window.scrollY > 60
    const shouldLock      = !reducedMotion && !startedScrolled
    const lenis           = (window as unknown as { __lenis?: LenisLike }).__lenis ?? null
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
      completeRef.current = true
      setComplete(true)
    }

    /* Idle-reset safety timer — fires only after IDLE_RELEASE_MS of no
       user input. Active scrollers continually push it forward. */
    let safetyTimerId: number | null = null
    const armSafetyTimer = () => {
      if (safetyTimerId !== null) window.clearTimeout(safetyTimerId)
      safetyTimerId = window.setTimeout(() => {
        if (!completeRef.current) release()
      }, IDLE_RELEASE_MS)
    }
    armSafetyTimer()

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
        prev.title === e.title && prev.subtitle === e.subtitle
          ? prev
          : { title: e.title, subtitle: e.subtitle }
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
      armSafetyTimer()
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
      armSafetyTimer()
      requestTick()
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lockedRef.current) {
        release()
        return
      }
      if (lockedRef.current && (e.key === " " || e.key === "PageDown" || e.key === "ArrowDown")) {
        e.preventDefault()
        accumDelta.current += 200
        armSafetyTimer()
        requestTick()
      }
    }

    window.addEventListener("wheel",      onWheel,      { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true  })
    window.addEventListener("touchmove",  onTouchMove,  { passive: false })
    window.addEventListener("keydown",    onKey)

    return () => {
      if (safetyTimerId !== null) window.clearTimeout(safetyTimerId)
      window.removeEventListener("wheel",      onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove",  onTouchMove)
      window.removeEventListener("keydown",    onKey)
      document.body.style.overflow = ""
      lenis?.start()
      lockedRef.current = false
    }
  }, [])

  const skipIntro = () => {
    if (completeRef.current) return
    completeRef.current = true
    document.body.style.overflow = ""
    lenisRef.current?.start()
    setComplete(true)
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section
      data-hero
      className="relative min-h-dvh flex flex-col items-center justify-center bg-paper text-ink overflow-hidden"
    >
      {/* Gooey-merged cursor trail — sits at z-0 behind all content.
          The SVG filter def is hidden; PixelTrail's grid is what gets
          filtered via inline style on its wrapper. */}
      <GooeyFilter id="hero-goo" strength={6} />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 pointer-events-auto"
          style={{ filter: "url(#hero-goo)" }}
        >
          <PixelTrail
            pixelSize={pixelSize}
            fadeDuration={700}
            delay={80}
            pixelClassName="bg-ink"
          />
        </div>
      </div>

      <div className="relative z-10 pt-28 md:pt-32" />

      {/* Scroll-scrub video — dark logo content sits naturally on cream. */}
      <div className="relative z-10 w-[78%] md:w-[70%] max-w-[1000px] mx-auto">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          width={1000}
          height={563}
          aria-hidden="true"
          className="w-full block"
        >
          <source src="/videos/fingers464.webm" type="video/webm" />
          <source src="/videos/fingers464.mp4"  type="video/mp4"  />
        </video>
      </div>

      {/* Timeline-driven headline + subtitle */}
      <div className="relative z-10 text-center px-6 -mt-6 md:-mt-10" aria-live="polite">
        <h1
          className="font-sans font-black tracking-[-0.02em] leading-[0.95] m-0 text-ink"
          style={{ fontSize: "clamp(44px, 8vw, 96px)" }}
        >
          {text.title}
        </h1>
        <p className="font-sans text-md md:text-lg mt-4 max-w-[640px] mx-auto m-0 text-ink-2/80">
          {text.subtitle}
        </p>
      </div>

      {/* Scroll cue — ink-tone for the cream hero */}
      <button
        type="button"
        onClick={skipIntro}
        aria-label="Skip intro and scroll down"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40
                    transition-opacity duration-500 cursor-pointer bg-transparent border-0 p-2
                    ${complete ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="w-px h-12 bg-ink/40" />
      </button>
    </section>
  )
}
