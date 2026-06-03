import Hero from "@/components/sections/Hero"
import Intro from "@/components/sections/Intro"
import LatestUpdates from "@/components/sections/LatestUpdates"
import HighlightedWorks from "@/components/sections/HighlightedWorks"
import CTABlock from "@/components/sections/CTABlock"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <HighlightedWorks />
      <LatestUpdates />
      <CTABlock />
    </>
  )
}
