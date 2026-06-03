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
    email: "gameslabiitd@gmail.com",
    specialisation: "Game Design · Immersive Media · Accessibility · Interactive Storytelling",
    skills: ["Game Design", "HCI", "Accessibility", "Research-through-design"],
    isFaculty: true,
  },

  // ── Research Scholars ────────────────────────────────────
  {
    id: "krishnadas",
    name: "Krishnadas M",
    role: "Research Scholar",
    image: "/images/Team/Krish.jpg",
    linkedin: "https://www.linkedin.com/in/krishnadas-m-484a55291",
    specialisation: "Virtual Reality · Experiential Learning · Space Science Education",
    skills: ["Visual Communication", "Virtual Reality", "Game Design", "Music Production", "Photography"],
    publications: [
      {
        title: "Gamifying Mental Well-Being Assessment",
        venue: "Conference Paper, 2025",
        year: "2025",
      },
    ],
  },
  {
    id: "harsh",
    name: "Harsh Mohan Shrivastava",
    role: "Research Scholar",
    image: "/images/Team/Harsh.jpg",
    linkedin: "https://www.linkedin.com/in/harshmohaan",
    specialisation: "Data and Design · Participatory Approaches · Design for Disability · Games for Learning",
    skills: ["Data-Enabled Design", "Co-Design", "Inclusive Design", "Assistive Technology", "Game-Based Learning", "HCI"],
    publications: [
      {
        title: "Gamifying Mental Well-Being Assessment",
        venue: "Conference Paper, 2025",
        year: "2025",
      },
    ],
  },
  {
    id: "juben",
    name: "Juben Basumatary",
    role: "Research Scholar",
    image: "/images/Team/Juben.jpg",
    linkedin: "https://www.linkedin.com/in/juben-basumatary-866a01215/",
    specialisation: "Leveraging digital tools to make elderly lives more meaningful, independent, and connected.",
    skills: ["AR", "VR", "MR", "Game Design", "Assistive Technology", "Behavioral Markers"],
  },
]
