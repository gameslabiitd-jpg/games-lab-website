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
  publications?: { title: string; venue: string; year: string; link: string }[]
  projects?: { title: string; description: string }[]
  isFaculty?: boolean
  isAlumni?: boolean
}

export const team: TeamMember[] = [
  // ── Faculty ──────────────────────────────────────────────
  {
    id: "aakash-johry",
    name: "Aakash Johry",
    role: "Faculty",
    image: "/images/Team/Aakash.jpg",
    bio:
      "Aakash leads the GAMES Lab at IIT Delhi. His research looks at how games, immersive media, and tangible interfaces can support learning, accessibility, wellbeing, and lasting changes in behaviour. He comes from a background in design and HCI, and is interested in how play can lead to real change in people's lives.",
    linkedin: "https://www.linkedin.com/in/aakash-johry",
    specialisation: "Game Design · Immersive Media · Accessibility · Interactive Storytelling",
    skills: ["Game Design", "HCI", "Accessibility", "Research-through-design"],
    isFaculty: true,
  },

  // ── Research Scholars ────────────────────────────────────
    {
    id: "renuka",
    name: "Renuka Singh",
    role: "Research Scholar",
    image: "/images/Team/renuka.jpg",
    linkedin: "https://www.linkedin.com/in/renuka-singh-64baa4159/",
    specialisation: "Pediatric Healthcare Environment · Environment-Behaviour Research · Evidence-Based Desgin · Design for Health and Wellbeing",
    skills: ["Healthcare", "Architecture",  "Urban Design", "Participatory Design", "Game Design"],
    publications: [
      {
        title: "Gamifying Mental Well-Being Assessment: A New Approach for College-Going Students Using the 'Oxford Happiness Questionnaire'",
        venue: "15th International Conference of Human-Computer Interaction",
        year: "2024",
        link: "10.1007/978-3-031-80832-6_8",
      },
      {
        title: "How Does the Physical Environment Influence Behaviors of Parents/Caregivers in a Pediatric Waiting Space? Findings From an Environment-Behavior Study in a Pediatric Hospital in New Delhi, India",
        venue: "Proceedings of the Human Factors and Ergonomics Society Annual Meeting",
        year: "2026",
        link: "10.1177/10711813261485204",
      },
      {
        title: "Impact of Physical Environment of Pediatric Inpatient Wards on Children: A Systematic Literature Review",
        venue: "HERD: Health Environments Research & Design Journal",
        year: "2026",
        link: "10.1177/19375867261451751",
      },
    ],
  },
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
        title: "Gamifying Mental Well-Being Assessment: A New Approach for College-Going Students Using the 'Oxford Happiness Questionnaire'",
        venue: "15th International Conference of Human-Computer Interaction",
        year: "2024",
        link: "10.1007/978-3-031-80832-6_8",
      },
      {
        title: "Implementation of a multi-stage orbital launcher assembly simulation using virtual reality: Practical lessons learned for hands-on outreach",
        venue: "77th International Astronautical Congress",
        year: "2026",
        link: "Accepted",
      },
      {
        title: "Educational technology for space science: Capturing higher secondary students' perceptions of its integration into the curriculum in India",
        venue: "7th International Conference on Information Technology and Education Technology",
        year: "2026",
        link: "Accepted",
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
        title: "Gamifying Mental Well-Being Assessment: A New Approach for College-Going Students Using the 'Oxford Happiness Questionnaire'",
        venue: "15th International Conference of Human-Computer Interaction",
        year: "2024",
        link: "10.1007/978-3-031-80832-6_8",
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
    publications: [
      {
        title: "Implementation of a multi-stage orbital launcher assembly simulation using virtual reality: Practical lessons learned for hands-on outreach",
        venue: "77th International Astronautical Congress",
        year: "2026",
        link: "Accepted",
      },
    ],
  },

]
