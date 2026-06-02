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
    id: "aakash-johry",
    name: "Aakash Johry",
    role: "Faculty · GAMES Lab, IIT Delhi",
    image: "/images/Team/Aakash.jpg",
    bio:
      "Aakash leads the GAMES Lab at IIT Delhi, where his research investigates how games, immersive media, and tangible interfaces can drive learning, behaviour change, accessibility, and well-being. His work bridges design, HCI, and social impact — translating play into a tool for real-world outcomes.",
    email: "info@games.iitd.ac.in",
    specialisation: "Game Design · Immersive Media · Accessibility · Interactive Storytelling",
    skills: ["Game Design", "HCI", "Accessibility", "Research-through-design"],
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
    id: "juben",
    name: "Juben",
    role: "Research Member",
    image: "/images/Team/Juben.jpg",
    specialisation: "Immersive Media, AR/VR",
    skills: ["AR/VR", "Unity", "Interaction Design"],
  },
]
