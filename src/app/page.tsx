import Hero from "@/components/sections/Hero"
import Marquee from "@/components/sections/Marquee"
import Intro from "@/components/sections/Intro"
import LatestUpdates from "@/components/sections/LatestUpdates"
import HighlightedWorks from "@/components/sections/HighlightedWorks"
import CTABlock from "@/components/sections/CTABlock"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <LatestUpdates />
      <HighlightedWorks />
      <CTABlock />
    </>
  )
}
