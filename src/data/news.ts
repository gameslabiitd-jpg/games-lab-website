export type NewsItem = {
  id: string
  title: string
  description: string
  image: string
  tag: "Research" | "Conference" | "Event" | "Press"
  date: string
  featured?: boolean
}

// NOTE: `date` values below are PLACEHOLDERS pending confirmation — update
// with the real event dates. Order matters: the homepage "Latest updates"
// section shows the first three; the /news page pulls `featured` into the
// hero and lists the rest.
export const news: NewsItem[] = [
  {
    id: "game-jam-roblox",
    title: "Game Jam with Roblox",
    description:
      "A two-day Game Jam organized in collaboration with Roblox, bringing together students from multiple colleges. Participants designed games focused on well-being and social connection, fostering creativity and collaborative problem-solving.",
    image: "/images/news/game-jam-roblox.jpg",
    tag: "Event",
    date: "2026",
    featured: true,
  },
  {
    id: "iitd-jnu-kv-collab",
    title: "IIT Delhi – JNU – Kendriya Vidyalaya Collaboration",
    description:
      "A one-day educational game testing event involving students from IIT Delhi and JNU. Participants designed games on subjects such as chemistry, mathematics, biology, and health, which were tested with students from Classes 6–10 at Kendriya Vidyalaya, JNU Campus. The event provided valuable feedback on the effectiveness of game-based learning and student engagement.",
    image: "/images/news/iitd-jnu-kv.jpg",
    tag: "Event",
    date: "2026",
  },
  {
    id: "chi-play-workshop",
    title: "CHI PLAY Workshop",
    description:
      "Researchers participated in a CHI PLAY workshop focused on leadership in Games & Play research. The workshop fostered discussions on community building, inclusive practices, and shaping the future of the field through collaborative and playful approaches.",
    image: "/images/news/chi-play-workshop.jpg",
    tag: "Conference",
    date: "2025",
  },
  {
    id: "guest-phalgun-polepalli",
    title: "Guest Session by Phalgun Polepalli",
    description:
      "Phalgun Polepalli, founder of Mozaic Games and creator of India’s largest tabletop gaming convention, delivered a guest session at IIT Delhi. He shared insights into the Indian tabletop gaming ecosystem, game publishing, and career opportunities in the games industry.",
    image: "/images/news/guest-phalgun.jpg",
    tag: "Event",
    date: "2025",
  },
]
