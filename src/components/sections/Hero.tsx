"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollTrigger } from "@/lib/gsap"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

/**
 * Hallmark · genre: editorial · macrostructure: Pinned Scrub Hero · design-system: design.md
 *
 * SCRUB ARCHITECTURE (the robust one):
 *   The hero is a TALL section. Inside it, a CSS `position: sticky` child
 *   stays pinned to the viewport while the section scrolls past. Scroll
 *   *position* within the section maps 1:1 to the video's currentTime via
 *   a GSAP ScrollTrigger `onUpdate`.
 *
 *   Why this beats the old lock-and-intercept: there is no scroll lock to
 *   fail. To reach the content below, you MUST traverse the section — and
 *   traversing the section IS scrubbing the video. You cannot "skip to the
 *   bottom" without the video reaching its final frame, because the next
 *   section physically sits below the scrub distance. No wheel hijacking,
 *   no body-overflow lock, no idle-release timer, nothing to bypass.
 *
 *   - CSS sticky (not GSAP pin) → no `gsap-pin-spacer` DOM mutation, so no
 *     React reconciliation / removeChild errors.
 *   - Section height is computed in PIXELS from innerHeight (not vh) so the
 *     mobile Safari toolbar show/hide doesn't jump the scrub mid-scroll.
 *   - Lenis smooth scroll feeds ScrollTrigger (wired in LenisProvider), so
 *     currentTime moves in small continuous steps → smooth frame paint.
 */

type LenisLike = {
  scrollTo: (target: number | string | HTMLElement, opts?: { duration?: number }) => void
}

const timeline = [
  { time: 0.00, title: "Lab.",               subtitle: "Where Play Meets Purpose!" },
  { time: 0.23, title: "Gaming.",            subtitle: "Designing meaningful play experiences that drive learning, empathy, and change." },
  { time: 0.52, title: "Augmented Reality.", subtitle: "Expanding perception through interactive overlays that blend digital with real." },
  { time: 0.77, title: "Mixed Reality.",     subtitle: "Creating hybrid environments where virtual and physical worlds converge." },
  { time: 1.02, title: "Experiences.",       subtitle: "Crafting immersive narratives that connect design, behaviour, and emotion." },
  { time: 1.25, title: "Simulations.",       subtitle: "Transforming research and data into interactive, learn-by-doing environments." },
  { time: 1.50, title: "Lab.",               subtitle: "Where Play Meets Purpose!" },
]

/** How many viewport-heights of scrolling it takes to scrub the whole video.
    Generous on purpose: a longer scrub = a lower seek rate during a fast
    fling = fewer dropped frames (esp. Safari). */
const SCRUB_SCREENS = 2.6
const EASE          = "cubic-bezier(0.16, 1, 0.3, 1)"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const completeRef = useRef(false)

  const [text, setText]                 = useState({ title: timeline[0].title, subtitle: timeline[0].subtitle })
  const [displayTitle, setDisplayTitle] = useState(timeline[0].title)
  const [displaySub, setDisplaySub]     = useState(timeline[0].subtitle)
  const [textFading, setTextFading]     = useState(false)
  const [complete, setComplete]         = useState(false)
  const [mounted, setMounted]           = useState(false)

  const screen    = useScreenSize()
  const pixelSize = screen.lessThan("md") ? 28 : 36

  /* Mount fade-in (client-only → no hydration mismatch). */
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(id)
  }, [])

  /* Title + subtitle cross-fade: fade out → swap both → fade in */
  useEffect(() => {
    if (text.title === displayTitle && text.subtitle === displaySub) return
    // Intentional: kick off the cross-fade, then swap text after the fade-out.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTextFading(true)
    const id = setTimeout(() => {
      setDisplayTitle(text.title)
      setDisplaySub(text.subtitle)
      setTextFading(false)
    }, 90)
    return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text.title, text.subtitle])

  /* ── Pinned scroll-scrub ─────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    if (!section || !video) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const findEntry = (t: number) => {
      for (let i = timeline.length - 1; i >= 0; i--) {
        if (t >= timeline[i].time) return timeline[i]
      }
      return timeline[0]
    }

    /* Force Safari/WebKit to decode the first frame — it won't paint from
       currentTime until the video has been "played" once. Muted+inline so
       it's invisible. */
    const kickDecode = () => {
      const p = video.play()
      if (p && typeof p.then === "function") p.then(() => video.pause()).catch(() => {})
      else { try { video.pause() } catch {} }
    }

    const applyProgress = (raw: number) => {
      const p = Math.max(0, Math.min(raw, 1))
      const d = video.duration
      if (Number.isFinite(d) && d > 0) video.currentTime = p * d
      const t = (Number.isFinite(d) && d > 0 ? d : 1.7) * p
      const e = findEntry(t)
      setText(prev =>
        prev.title === e.title && prev.subtitle === e.subtitle ? prev : { title: e.title, subtitle: e.subtitle }
      )
      const done = p > 0.985
      if (done !== completeRef.current) {
        completeRef.current = done
        setComplete(done)
      }
    }

    /* ── Reduced motion: no scrub. Normal-height hero showing the resolved
          final frame. ─────────────────────────────────────────────────── */
    if (reduced) {
      section.style.height = ""
      completeRef.current = true
      // Reduced motion: mark the scrub complete immediately (no scroll-driven
      // progress to wait for).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setComplete(true)
      const showFinal = () => {
        kickDecode()
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = video.duration
          setText({ title: timeline[0].title, subtitle: timeline[0].subtitle })
        }
      }
      if (video.readyState >= 1) showFinal()
      else { video.addEventListener("loadedmetadata", showFinal, { once: true }); try { video.load() } catch {} }
      return () => { video.removeEventListener("loadedmetadata", showFinal) }
    }

    /* ── Scrub setup ──────────────────────────────────────────────── */
    const setHeight = () => {
      // Pixels, not vh — immune to mobile toolbar resize jank.
      section.style.height = `${Math.round(window.innerHeight * (1 + SCRUB_SCREENS))}px`
    }
    setHeight()

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onRefreshInit: setHeight,
      onUpdate: (self) => applyProgress(self.progress),
    })

    // Apply the first frame at the current scroll position once metadata is
    // ready (scroll done during load isn't dropped).
    const onLoaded = () => { kickDecode(); applyProgress(st.progress); ScrollTrigger.refresh() }
    if (video.readyState >= 1 && Number.isFinite(video.duration)) onLoaded()
    else {
      video.addEventListener("loadedmetadata", onLoaded, { once: true })
      video.addEventListener("canplay",        onLoaded, { once: true })
      try { video.load() } catch {}
    }

    // Recompute on resize (orientation, window changes).
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)

    return () => {
      st.kill()
      window.removeEventListener("resize", onResize)
      video.removeEventListener("loadedmetadata", onLoaded)
      video.removeEventListener("canplay",        onLoaded)
      section.style.height = ""
    }
  }, [])

  /* Skip intro → smooth-scroll to the end of the scrub section (video lands
     on its final frame, page continues to the next section). */
  const skipIntro = () => {
    const section = sectionRef.current
    if (!section) return
    const target = section.offsetTop + section.offsetHeight - window.innerHeight
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
    if (lenis?.scrollTo) lenis.scrollTo(target, { duration: 1.4 })
    else window.scrollTo({ top: target, behavior: "smooth" })
  }

  /* ── Fade helpers ──────────────────────────────────────────── */
  const fadeIn = (delay = 0, dur = 700): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "translateY(0)" : "translateY(10px)",
    transition: `opacity ${dur}ms ${delay}ms ease, transform ${dur}ms ${delay}ms ${EASE}`,
    willChange: "opacity, transform",
  })

  return (
    /* Tall outer section. Height is set in px by the effect; the inline vh
       value is only a pre-JS fallback so first paint isn't collapsed. */
    <section
      ref={sectionRef}
      data-hero
      className="relative bg-paper text-ink"
      style={{ height: `${(1 + SCRUB_SCREENS) * 100}vh` }}
    >
      {/* Sticky pinned visual — stays in view while the section scrolls. */}
      <div className="sticky top-0 h-dvh w-full flex flex-col overflow-hidden">

        {/* ── Gooey cursor trail ─────────────────────────────────────── */}
        <GooeyFilter id="hero-goo" strength={6} />
        {/* z-[15]: above the video (z-10) so the trail continues over it,
            but below the masthead/footer text (z-20) so they stay legible. */}
        <div className="absolute inset-0 z-[15] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 pointer-events-auto" style={{ filter: "url(#hero-goo)" }}>
            <PixelTrail pixelSize={pixelSize} fadeDuration={700} delay={80} pixelClassName="bg-ink" />
          </div>
        </div>

        <h1 className="sr-only">GAMES Lab — IIT Delhi</h1>

        {/* ── MASTHEAD — Lab. IIT Delhi ──────────────────────────────── */}
        <div
          className="relative z-20 flex items-baseline gap-2.5 px-[4vw] select-none pointer-events-none"
          style={{ paddingTop: "clamp(94px, 9.5vh, 118px)", ...fadeIn(60, 650) }}
          aria-hidden="true"
        >
          <span className="font-black font-sans text-ink tracking-[-0.025em]" style={{ fontSize: "clamp(17px, 1.9vw, 26px)" }}>
            Lab.
          </span>
          <span className="font-black font-sans text-ink/40 tracking-[-0.025em]" style={{ fontSize: "clamp(17px, 1.9vw, 26px)" }}>
            IIT Delhi
          </span>
        </div>

        {/* ── VIDEO — fills remaining vertical space ──────────────────── */}
        <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none py-5">
          <div className="w-[82%] sm:w-[72%] md:w-[64%] max-w-[920px]" style={fadeIn(140, 900)}>
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
              {/* MP4 first: Safari can stall on webm with preload="auto".
                  H.264/yuv420p + faststart scrubs reliably. */}
              <source src="/videos/fingers464.mp4"  type="video/mp4"  />
              <source src="/videos/fingers464.webm" type="video/webm" />
            </video>
          </div>
        </div>

        {/* ── Hairline ───────────────────────────────────────────────── */}
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

        {/* ── STATEMENT FOOTER ───────────────────────────────────────── */}
        <div
          className="relative z-20 flex items-end justify-between gap-6 px-[4vw] select-none pointer-events-none"
          style={{ paddingBottom: "clamp(40px, 6vh, 80px)" }}
          aria-live="polite"
        >
          <p
            className="font-sans font-medium text-ink-2 leading-[1.3] tracking-[-0.01em] m-0 max-w-[50%] md:max-w-[42%]"
            style={{
              fontSize: "clamp(14px, 1.7vw, 22px)",
              opacity:   textFading ? 0 : mounted ? 1 : 0,
              transform: textFading ? "translateY(4px)" : "translateY(0)",
              transition: textFading
                ? `opacity 110ms ease, transform 110ms ease`
                : `opacity 300ms ${mounted ? "0ms" : "500ms"} ease, transform 300ms ${mounted ? "0ms" : "500ms"} ${EASE}`,
            }}
          >
            {displaySub}
          </p>

          <span
            className="font-black font-sans text-ink leading-[0.92] tracking-[-0.03em] block text-right max-w-[48%]"
            style={{
              fontSize: "clamp(26px, 3.6vw, 54px)",
              opacity:   textFading ? 0 : mounted ? 1 : 0,
              transform: textFading ? "translateY(5px)" : "translateY(0)",
              transition: textFading
                ? `opacity 110ms ease, transform 110ms ease`
                : `opacity 300ms ${mounted ? "40ms" : "560ms"} ease, transform 300ms ${mounted ? "40ms" : "560ms"} ${EASE}`,
            }}
          >
            {displayTitle}
          </span>
        </div>

        {/* ── Scroll cue (chevron, not a bare line) ──────────────────── */}
        <button
          type="button"
          onClick={skipIntro}
          aria-label="Skip intro and scroll down"
          className={[
            "absolute bottom-6 left-1/2 -translate-x-1/2 z-40",
            "flex items-center justify-center",
            "cursor-pointer bg-transparent border-0 p-2 text-ink/35",
            "transition-opacity duration-500 hover:text-ink/60",
            complete ? "opacity-0 pointer-events-none" : "opacity-100",
          ].join(" ")}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
