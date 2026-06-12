"use client"

import { cn } from "@/lib/cn"

/**
 * Hallmark · component: back-to-top · design-system: design.md
 *
 * Small circular control that returns to the top of the page. Uses the
 * site's Lenis smooth-scroll instance when present (window.scrollTo is
 * overridden by Lenis), falling back to native smooth scroll. The arrow
 * nudges up on hover.
 */
export default function BackToTop({ className }: { className?: string }) {
  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis
    if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={cn(
        "group inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-paper/20 bg-paper/5 text-paper/80",
        "transition-[background-color,border-color,color,transform] duration-300 ease-out",
        "hover:bg-paper hover:text-ink hover:border-paper hover:-translate-y-0.5",
        "outline-none focus-visible:ring-2 focus-visible:ring-paper/50",
        className,
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  )
}
