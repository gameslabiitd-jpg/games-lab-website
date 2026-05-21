export type NewsItem = {
  id: string
  title: string
  description: string
  image: string
  tag: "Research" | "Conference" | "Event" | "Press"
  date: string
  featured?: boolean
}

export const news: NewsItem[] = [
  {
    id: "abc-2026",
    title: "GAMES Lab at ABC 2026 at IIT Delhi",
    description:
      "The lab presented three research papers and two interactive game prototypes at the annual ABC conference hosted at IIT Delhi.",
    image: "/images/research/research1.jpg",
    tag: "Research",
    date: "May 2026",
    featured: true,
  },
  {
    id: "chiplay-2025",
    title: "Leveling Up Leadership: CHI Play 2025 Workshop",
    description:
      "GAMES Lab co-organised an interdisciplinary workshop at CHI Play 2025 exploring how game design cultivates leadership.",
    image: "/images/research/research4.jpg",
    tag: "Conference",
    date: "April 2025",
  },
  {
    id: "showcase-spring-2025",
    title: "Game Design Showcase — Spring 2025",
    description:
      "Students presented semester-long game design projects to faculty, industry guests, and the broader IIT Delhi community.",
    image: "/images/games/jungleJungle.jpg",
    tag: "Event",
    date: "March 2025",
  },
  {
    id: "pachi-accessibility",
    title: "Pachi Research Published in Book Chapter",
    description:
      "Our research on designing Hindi language learning apps for children with hearing impairment was published in an edited volume.",
    image: "/images/research/research3.jpg",
    tag: "Research",
    date: "January 2025",
  },
]
