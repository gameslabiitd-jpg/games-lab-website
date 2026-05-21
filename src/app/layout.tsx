import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/animations/LenisProvider"
import ScrollProgressBar from "@/components/animations/ScrollProgressBar"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "GAMES Lab — IIT Delhi",
    template: "%s | GAMES Lab IIT Delhi",
  },
  description:
    "GAMES Lab at IIT Delhi is a research and design studio investigating how interactive media, games, and immersive storytelling can drive meaningful change.",
  keywords: ["Game Design", "Research", "IIT Delhi", "Immersive Media", "Storytelling"],
  openGraph: {
    title: "GAMES Lab — IIT Delhi",
    description:
      "Research and design studio at IIT Delhi exploring games, AR/VR, and interactive storytelling.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <LenisProvider>
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
