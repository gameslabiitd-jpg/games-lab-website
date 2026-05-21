"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

/**
 * LenisProvider — wraps the app in physics-based smooth scroll.
 * Syncs Lenis with GSAP's ticker so ScrollTrigger reads the Lenis
 * scroll position, not the native browser scroll.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    // Sync Lenis scroll events → GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker for frame-perfect sync
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
