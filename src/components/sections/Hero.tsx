"use client"

import { useRef, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const textTimeline = [
  { time: 0.0,  title: "Lab.",                 sub: "Where Play Meets Purpose!" },
  { time: 0.23, title: "Gaming.",              sub: "Designing meaningful play that drives learning, empathy, and change" },
  { time: 0.52, title: "Augmented-Reality.",   sub: "Expanding perception through interactive overlays that blend digital with real" },
  { time: 0.77, title: "Mixed-Reality.",       sub: "Creating hybrid environments where virtual and physical worlds converge" },
  { time: 1.02, title: "Experiences.",         sub: "Crafting immersive narratives that connect design, behaviour, and emotion" },
  { time: 1.25, title: "Simulations.",         sub: "Transforming research and data into interactive, learn-by-doing environments" },
  { time: 1.50, title: "Lab.",                 sub: "Where Play Meets Purpose!" },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const cueRef       = useRef<HTMLDivElement>(null)

  const [textIdx, setTextIdx]     = useState(0)
  const [showCue, setShowCue]     = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          // Drive video currentTime from scroll progress
          if (video.readyState >= 1 && video.duration) {
            video.currentTime = video.duration * self.progress
          }

          // Map currentTime → text phase
          const t = video.currentTime
          let idx = 0
          for (let i = textTimeline.length - 1; i >= 0; i--) {
            if (t >= textTimeline[i].time) { idx = i; break }
          }
          setTextIdx(idx)

          // Hide scroll cue once we've started scrolling
          setShowCue(self.progress < 0.05)
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  const current = textTimeline[textIdx]

  return (
    <div ref={containerRef} className="hero-track">
      <div className="hero-pin pt-20">
        {/* Video */}
        <div className="hero-video-shell">
          <video
            ref={videoRef}
            src="/videos/fingers464.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        {/* Animated text */}
        <div className="hero-text-shell">
          <AnimatePresence mode="wait">
            <motion.h1
              key={current.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="text-[80px] md:text-[96px] font-black text-ink leading-none tracking-tight m-0"
            >
              {current.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={current.sub}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              className="text-[16px] md:text-[18px] text-ink-mid mt-4 max-w-[540px] mx-auto leading-relaxed"
            >
              {current.sub}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="hero-scroll-cue"
          style={{ opacity: showCue ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/arrow-down.webp"
            alt="Scroll to explore"
            width={56}
            height={56}
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>
    </div>
  )
}
