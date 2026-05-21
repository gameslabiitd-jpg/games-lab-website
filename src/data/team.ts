export type TeamMember = {
  id: string
  name: string
  role: string
  image: string
  bio?: string
  email?: string
  linkedin?: string
  specialisation?: string
  skills?: string[]
  publications?: { title: string; venue: string; year: string }[]
  projects?: { title: string; description: string }[]
  isFaculty?: boolean
  isAlumni?: boolean
}

export const team: TeamMember[] = [
  // ── Faculty ──────────────────────────────────────────────
  {
    id: "faculty-director",
    name: "Prof. [Name]",          // TODO: add faculty name
    role: "Director, GAMES Lab",
    image: "/images/team1.jpg",    // TODO: add faculty headshot to /public/images/Team/
    bio: "Professor at IIT Delhi, leading research in game design, immersive media, and interactive storytelling.",
    email: "info@games.iitd.ac.in",
    specialisation: "Game Design, Immersive Media, Interactive Storytelling",
    isFaculty: true,
  },

  // ── PhD Students & Research Members ──────────────────────
  {
    id: "krishnadas",
    name: "Krishnadas",
    role: "PhD Researcher",
    image: "/images/Team/Krish.jpg",
    specialisation: "Game-based Learning, Mental Well-Being",
    skills: ["Game Design", "UX Research", "Unity"],
    publications: [
      {
        title: "Gamifying Mental Well-Being Assessment",
        venue: "Book Chapter, 2025",
        year: "2025",
      },
    ],
  },
  {
    id: "harsh",
    name: "Harsh",
    role: "PhD Researcher",
    image: "/images/Team/Harsh.jpg",
    specialisation: "Gamification, Assessment Design",
    skills: ["Gamification", "Interaction Design", "Research Methods"],
    publications: [
      {
        title: "Gamifying Mental Well-Being Assessment",
        venue: "Book Chapter, 2025",
        year: "2025",
      },
    ],
  },
  {
    id: "aakash",
    name: "Aakash Johry",
    role: "Research Member",
    image: "/images/Team/Aakash.jpg",
    specialisation: "Accessibility, Language Learning",
    skills: ["Accessibility Design", "Mobile UX", "Hindi Language Apps"],
    publications: [
      {
        title: "Designing Pachi",
        venue: "Book Chapter, 2024",
        year: "2024",
      },
    ],
  },
  {
    id: "juben",
    name: "Juben",
    role: "Research Member",
    image: "/images/Team/Juben.jpg",
    specialisation: "Immersive Media, AR/VR",
    skills: ["AR/VR", "Unity", "Interaction Design"],
  },
]
