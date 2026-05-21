export type Research = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  authors: string
  year?: string
  link?: string
}

export const research: Research[] = [
  {
    id: "gamifying-mental-wellbeing",
    title: "Gamifying Mental Well-Being Assessment",
    description:
      "A novel approach incorporating gamification with OHQ to assess mental well-being of college students.",
    image: "/images/research/research1.jpg",
    tags: ["Book Chapter", "Research"],
    authors: "Renuka, Harsh, Krishnadas",
    year: "2025",
  },
  {
    id: "designing-pachi",
    title: "Designing Pachi",
    description:
      "A tablet-based Hindi language learning application for children with hearing impairment in India.",
    image: "/images/research/research3.jpg",
    tags: ["Book Chapter", "Accessibility"],
    authors: "Radhika Sharma, Aakash Johry",
    year: "2024",
  },
  {
    id: "chiplay-2025-workshop",
    title: "Leveling Up Leadership: CHI Play 2025 Workshop",
    description:
      "An interdisciplinary workshop exploring how game design principles can cultivate leadership skills in academic settings.",
    image: "/images/research/research4.jpg",
    tags: ["Conference", "Workshop"],
    authors: "GAMES Lab",
    year: "2025",
  },
  {
    id: "immersive-storytelling",
    title: "Immersive Storytelling in Educational Games",
    description:
      "Examining how narrative-driven game design can increase engagement and retention in formal learning environments.",
    image: "/images/research/research2.jpg",
    tags: ["Journal", "Pedagogy"],
    authors: "Lab Members",
    year: "2024",
  },
]
