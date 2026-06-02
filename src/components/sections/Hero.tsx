"use client"

import { useEffect, useRef, useState } from "react"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

/**
 * Hallmark · genre: editorial · macrostructure: Marquee Hero · design-system: design.md
 *
 * Layout: "Vertical Tension" — video dominates the field; typography floats
 * as sparse anchors at the periphery. No top-left anchor — the video itself
 * carries the GAMES identity. "Lab." is the single massive display word,
 * set in Syne ExtraBold at cinematic scale, bottom-left.
 *
 *   ─────────────── IIT Delhi (top-right)
 *
 *       [scroll-scrub video, ~76% wide]
 *
 *   Lab.           cycling subtitle (bottom-right)
 *
 * Animations:
 *   - "Lab."         → slides from left on mount (900ms spring)
 *   - IIT Delhi      → fades from right (700ms, 200ms delay)
 *   - hairline       → draws left-to-right via scaleX (1100ms, 400ms delay)
 *   - video          → fades + subtle rise (900ms, 150ms delay)
 *   - subtitle       → cross-fades on each text change (280ms)
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

const SCROLL_DISTANCE  = 1200
const IDLE_RELEASE_MS  = 10000
const EASE             = "cubic-bezier(0.16, 1, 0.3, 1)"

export default function Hero() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const accumDelta  = useRef(0)
  const ticking     = useRef(false)
  const completeRef = useRef(false)
  const lockedRef   = useRef(false)
  const lenisRef    = useRef<LenisLike | null>(null)

  const [text, setText]                 = useState({ title: timeline[0].title, subtitle: timeline[0].subtitle })
  const [displayTitle, setDisplayTitle] = useState(timeline[0].title)
  const [displaySub, setDisplaySub]     = useState(timeline[0].subtitle)
  const [textFading, setTextFading]     = useState(false)
  const [complete, setComplete]         = useState(false)
  const [mounted, setMounted]           = useState(false)

  const screen    = useScreenSize()
  const pixelSize = screen.lessThan("md") ? 28 : 36

  /* Trigger mount animation one frame after render */
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(id)
  }, [])

  /* Title + subtitle cross-fade: fade out → swap both → fade in */
  useEffect(() => {
    if (text.title === displayTitle && text.subtitle === displaySub) return
    setTextFading(true)
    const id = setTimeout(() => {
      setDisplayTitle(text.title)
      setDisplaySub(text.subtitle)
      setTextFading(false)
    }, 250)
    return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text.title, text.subtitle])

  /* ── Scroll-scrub / lock logic (unchanged) ────────────────── */
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
      lockedRef.current   = false
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
      if (!Number.isFinite(duration) || duration <= 0) { ticking.current = false; return }
      const progress = Math.max(0, Math.min(accumDelta.current / SCROLL_DISTANCE, 1))
      const t        = progress * duration
      video.currentTime = t
      const e = findEntry(t)
      setText(prev =>
        prev.title === e.title && prev.subtitle === e.subtitle ? prev
          : { title: e.title, subtitle: e.subtitle }
      )
      if (progress >= 1) release()
      ticking.current = false
    }

    const requestTick = () => {
      if (!ticking.current) { requestAnimationFrame(applyFrame); ticking.current = true }
    }

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return
      e.preventDefault()
      accumDelta.current += e.deltaY
      if (accumDelta.current < 0) accumDelta.current = 0
      armSafetyTimer(); requestTick()
    }

    let lastTouchY = 0
    const onTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0]?.clientY ?? 0 }
    const onTouchMove  = (e: TouchEvent) => {
      if (!lockedRef.current) return
      const y = e.touches[0]?.clientY ?? 0
      const dy = lastTouchY - y
      lastTouchY = y
      e.preventDefault()
      accumDelta.current += dy * 2.5
      if (accumDelta.current < 0) accumDelta.current = 0
      armSafetyTimer(); requestTick()
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lockedRef.current) { release(); return }
      if (lockedRef.current && (e.key === " " || e.key === "PageDown" || e.key === "ArrowDown")) {
        e.preventDefault()
        accumDelta.current += 200
        armSafetyTimer(); requestTick()
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

  /* ── Fade helpers ──────────────────────────────────────────── */
  const fadeIn = (delay = 0, dur = 700): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "translateY(0)" : "translateY(10px)",
    transition: `opacity ${dur}ms ${delay}ms ease, transform ${dur}ms ${delay}ms ${EASE}`,
    willChange: "opacity, transform",
  })

  return (
    /*
     * flex-col skeleton — no more floating absolute text.
     * Masthead → hairline → [video flex-1] → hairline → statement footer.
     * The two hairlines frame the video as a zone; text lives in flow.
     */
    <section
      data-hero
      className="relative min-h-dvh bg-paper text-ink flex flex-col overflow-hidden"
    >
      {/* ── Gooey cursor trail ───────────────────────────────────── */}
      <GooeyFilter id="hero-goo" strength={6} />
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 pointer-events-auto" style={{ filter: "url(#hero-goo)" }}>
          <PixelTrail pixelSize={pixelSize} fadeDuration={700} delay={80} pixelClassName="bg-ink" />
        </div>
      </div>

      <h1 className="sr-only">GAMES Lab — IIT Delhi</h1>

      {/* ══════════════════════════════════════════════════════════
          MASTHEAD — Lab. IIT Delhi, same weight, unified mark
          ══════════════════════════════════════════════════════════ */}
      <div
        className="relative z-20 flex items-baseline gap-2.5 px-[4vw] select-none pointer-events-none"
        style={{ paddingTop: "clamp(94px, 9.5vh, 118px)", ...fadeIn(60, 650) }}
        aria-hidden="true"
      >
        <span
          className="font-black font-sans text-ink tracking-[-0.025em]"
          style={{ fontSize: "clamp(17px, 1.9vw, 26px)" }}
        >
          Lab.
        </span>
        <span
          className="font-black font-sans text-ink/40 tracking-[-0.025em]"
          style={{ fontSize: "clamp(17px, 1.9vw, 26px)" }}
        >
          IIT Delhi
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════
          VIDEO — flex-1 fills all remaining vertical space
          ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none py-5">
        <div
          className="w-[82%] sm:w-[72%] md:w-[64%] max-w-[920px]"
          style={fadeIn(140, 900)}
        >
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
      </div>

      {/* ── Hairline 2 — draws right → left ─────────────────────── */}
      <div
        className="relative z-20 mx-[4vw] mb-4 h-px bg-ink/18"
        style={{
          transformOrigin: "right center",
          transform: mounted ? "scaleX(1)" : "scaleX(0)",
          opacity:   mounted ? 1 : 0,
          transition: `transform 1000ms 280ms ${EASE}, opacity 350ms 280ms ease`,
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════
          STATEMENT FOOTER
          Left: subtitle is the MAIN readable statement — big, bold.
          Right: cycling title is the quiet category tag.
          ══════════════════════════════════════════════════════════ */}
      <div
        className="relative z-20 flex items-end justify-between gap-6 px-[4vw] select-none pointer-events-none"
        style={{ paddingBottom: "clamp(40px, 6vh, 80px)" }}
        aria-live="polite"
      >
        {/* Subtitle — the dominant statement */}
        <p
          className="font-sans font-semibold text-ink leading-[1.22] tracking-[-0.02em] m-0 max-w-[52%] md:max-w-[46%]"
          style={{
            fontSize: "clamp(20px, 2.6vw, 38px)",
            opacity:   textFading ? 0 : mounted ? 1 : 0,
            transform: textFading ? "translateY(6px)" : "translateY(0)",
            transition: textFading
              ? `opacity 200ms ease, transform 200ms ease`
              : `opacity 650ms ${mounted ? "0ms" : "500ms"} ease, transform 650ms ${mounted ? "0ms" : "500ms"} ${EASE}`,
          }}
        >
          {displaySub}
        </p>

        {/* Cycling category — secondary, right-aligned */}
        <span
          className="font-black font-sans text-ink/50 leading-[0.88] tracking-[-0.03em] block text-right shrink-0"
          style={{
            fontSize: "clamp(18px, 2.4vw, 34px)",
            opacity:   textFading ? 0 : mounted ? 1 : 0,
            transform: textFading ? "translateY(6px)" : "translateY(0)",
            transition: textFading
              ? `opacity 200ms ease, transform 200ms ease`
              : `opacity 650ms ${mounted ? "80ms" : "580ms"} ease, transform 650ms ${mounted ? "80ms" : "580ms"} ${EASE}`,
          }}
        >
          {displayTitle}
        </span>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────────── */}
      <button
        type="button"
        onClick={skipIntro}
        aria-label="Skip intro and scroll down"
        className={[
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-40",
          "flex flex-col items-center",
          "cursor-pointer bg-transparent border-0 p-2",
          "transition-opacity duration-500",
          complete ? "opacity-0 pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        <div className="w-px h-11 bg-ink/30" />
      </button>
    </section>
  )
}
