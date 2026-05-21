"use client"

import { useScroll, motion } from "motion/react"

/**
 * ScrollProgressBar — a thin fixed line at the top of the viewport
 * that tracks scroll progress across the page.
 * Positioned above the navbar (z-60) so it's always visible.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-brand z-[60] origin-left will-change-transform"
    />
  )
}
