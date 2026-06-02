"use client"

import { useState, useEffect, RefObject } from "react"

interface Dimensions {
  width: number
  height: number
}

/**
 * useDimensions — measure an element via getBoundingClientRect, with a
 * 250ms debounce on window resize so we don't thrash on drag-resize.
 * Returns { width: 0, height: 0 } before the first measurement lands.
 *
 * Source: danielpetho/use-debounced-dimensions.
 */
export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement | null>,
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    const debouncedUpdate = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 250)
    }

    updateDimensions()
    window.addEventListener("resize", debouncedUpdate)

    return () => {
      window.removeEventListener("resize", debouncedUpdate)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [ref])

  return dimensions
}
