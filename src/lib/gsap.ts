/**
 * GSAP registration — import this once at the top of any client component
 * that uses GSAP plugins. All plugins are free since Webflow's April 2025 acquisition.
 */
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }
