"use client"

import { useCallback, useEffect, useState } from "react"
import { TextFlippingBoard } from "@/components/ui/text-flipping-board"

/**
 * StatsFlipboard — slim About hero board (2 rows).
 *
 * Cycles a set of short, punchy framings every 8 seconds — identity,
 * tagline, and what the lab is about — with no numbers. Each message is
 * 2 lines so it fills the 22×2 grid edge to edge.
 */

const MESSAGES: string[] = [
  ["GAMES LAB", "IIT DELHI"].join("\n"),
  ["WHERE PLAY", "MEETS PURPOSE"].join("\n"),
  ["EDUCATION ·", "WELLBEING · ACCESS"].join("\n"),
  ["RESEARCH", "THROUGH DESIGN"].join("\n"),
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
