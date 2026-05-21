import Hero from "@/components/sections/Hero"
import Marquee from "@/components/sections/Marquee"
import LatestUpdates from "@/components/sections/LatestUpdates"
import HighlightedWorks from "@/components/sections/HighlightedWorks"
import CTABlock from "@/components/sections/CTABlock"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <LatestUpdates />
      <HighlightedWorks />
      <CTABlock />
    </>
  )
}
