"use client"

import { useCallback, useEffect, useState } from "react"
import { TextFlippingBoard } from "@/components/ui/text-flipping-board"

/**
 * StatsFlipboard — full-screen About hero board.
 *
 * Cycles two information-dense messages every 8 seconds:
 *   1. Identity + tagline (brand anchor)
 *   2. The four lab stats (numbers the page would otherwise list)
 *
 * Each message uses 4 lines on the 22×6 grid so it centers vertically
 * with a blank row top + bottom. ∞ isn't in FLAP_CHARS so playtests
 * reads "INFINITE PLAYTESTS".
 */

const MESSAGES: string[] = [
  [
    "GAMES LAB",
    "@ IIT DELHI",
    "WHERE PLAY MEETS",
    "PURPOSE",
  ].join("\n"),
  [
    "04 FUNDED PROJECTS",
    "03 APPLICATION AREAS",
    "14 TABLETOP GAMES",
    "INFINITE PLAYTESTS",
  ].join("\n"),
]

const CYCLE_MS = 8000

export function StatsFlipboard() {
  const [msgIdx, setMsgIdx] = useState(0)

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  )

  useEffect(() => {
    const id = setInterval(next, CYCLE_MS)
    return () => clearInterval(id)
  }, [next])

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  )
}
