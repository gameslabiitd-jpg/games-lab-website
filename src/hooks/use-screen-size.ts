"use client"

import { useEffect, useState } from "react"

/**
 * useScreenSize — reactive Tailwind breakpoint hook.
 * Returns a ComparableScreenSize so consumers can write
 *   screenSize.lessThan("md")
 *   screenSize.greaterThanOrEqual("lg")
 * without memorizing pixel values. Mirrors the Tailwind defaults
 * (sm:640, md:768, lg:1024, xl:1280, 2xl:1536).
 *
 * Source: danielpetho/use-screen-size (21st.dev gooey-filter recipe).
 * Adapted only for codebase formatting.
 */

export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const sizeOrder: Record<ScreenSize, number> = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
} as const

class ComparableScreenSize {
  constructor(private value: ScreenSize) {}

  toString(): ScreenSize {
    return this.value
  }

  valueOf(): number {
    return sizeOrder[this.value]
  }

  equals(other: ScreenSize): boolean {
    return this.value === other
  }

  lessThan(other: ScreenSize): boolean {
    return this.valueOf() < sizeOrder[other]
  }

  greaterThan(other: ScreenSize): boolean {
    return this.valueOf() > sizeOrder[other]
  }

  lessThanOrEqual(other: ScreenSize): boolean {
    return this.valueOf() <= sizeOrder[other]
  }

  greaterThanOrEqual(other: ScreenSize): boolean {
    return this.valueOf() >= sizeOrder[other]
  }
}

export function useScreenSize(): ComparableScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>("xs")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1536)      setScreenSize("2xl")
      else if (width >= 1280) setScreenSize("xl")
      else if (width >= 1024) setScreenSize("lg")
      else if (width >=  768) setScreenSize("md")
      else if (width >=  640) setScreenSize("sm")
      else                    setScreenSize("xs")
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return new ComparableScreenSize(screenSize)
}
