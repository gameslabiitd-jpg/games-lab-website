/**
 * Showcase projects — the fleshed-out flagship work that gets a rich detail
 * popup (full write-up + photo gallery). Shared by the home "Highlighted
 * projects" grid and the matching cards in the /games catalog, keyed by `id`
 * (ids match entries in data/games.ts). More projects get added here as their
 * write-ups and photos are compiled.
 */

export type ShowcaseProject = {
  id: string
  title: string
  authors: string
  tags: string[]
  short: string
  long: string
  gallery: string[]
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "laminar",
    title: "Laminar",
    authors: "Radhika",
    tags: ["Video Game", "Learning", "Training", "Research"],
    short:
      "A crowd-disaster simulation that trains Indian youth to make instinctive, safe decisions in high-pressure crowd emergencies.",
    long:
      "Laminar is an interactive play experience that aims to improve crowd preparedness in Indian youth, enabling them to understand probable crowd behaviours and take instinctive, safe responses inside a crowd-distress simulation. The project bridges the preparedness gap for disasters that cannot be simulated or trained for in the real world.\nIt uses two mediums to communicate the context, each revealing different behavioural insights — from how an individual's planning and intuition together alter their decisions, to how intuition and immersion work their way together.\nThe project not only promotes appropriate decision-making in players, but also reveals shared and individual patterns of operation in such situations.",
    gallery: [
      "/images/highlights/laminar/1.jpg",
      "/images/highlights/laminar/2.jpg",
      "/images/highlights/laminar/3.jpg",
    ],
  },
  {
    id: "care-paths",
    title: "Care Paths",
    authors: "Himanshu Sejwar",
    tags: ["VR", "Empathy", "Training"],
    short:
      "A VR training experience that builds empathy and compassionate decision-making in healthcare trainees through a child patient's journey.",
    long:
      "An immersive VR training experience designed to study behavioural change, empathy development, and decision-making in healthcare interactions. Trainees follow a child patient's emotional journey, building trust and personal connection while making critical medical choices.\nThrough real-time reactions and reflective moments from the child's perspective, players see how communication, tone, and care decisions can shape emotional well-being, trust in healthcare, and long-term outcomes.\nThe experience encourages deeper empathy, self-awareness, and more compassionate clinical behaviour.",
    gallery: [
      "/images/highlights/care-paths/1.jpg",
      "/images/highlights/care-paths/2.jpg",
    ],
  },
  {
    id: "narrative-sandbox",
    title: "Narrative Sandbox",
    authors: "Omya Sharma",
    tags: ["Augmented Reality", "Pretend Play", "Tangible Interaction", "Child-Computer Interaction"],
    short:
      "An AR sandbox where children aged 5–7 co-create imaginative narrative worlds through sand, tokens, and generative-AI projections.",
    long:
      "We explore how augmented reality and generative AI can transform children's play. Using a custom AR Sandbox — a physical sand table augmented with real-time AI-generated visuals, depth sensing, and tangible tokens — we study how young children (ages 5–7) engage in co-located, embodied pretend play.\nOur work sits at the intersection of Tangible User Interfaces, Child-Computer Interaction, and generative AI, asking how technology can support imagination and collaborative storytelling without overshadowing the play itself. Children interact with the sandbox by shaping sand and placing themed tokens that trigger dynamic biome projections, co-creating narrative worlds together in real time.\nThrough iterative Research-through-Design methods, we aim to uncover design principles that keep the child at the centre of play.",
    gallery: [
      "/images/highlights/narrative-sandbox/1.jpg",
      "/images/highlights/narrative-sandbox/2.jpg",
    ],
  },
  {
    id: "cyto-polis",
    title: "Cyto-Polis",
    authors: "Radhika, Shuriti, Suchalika, Adhiraj & Vinay",
    tags: ["Board Game", "Education", "Cell Biology", "Cooperative"],
    short:
      "A co-operative board game where players team up as Nanobots, wielding organelle powers to revive a collapsing cell city.",
    long:
      "Cyto-Polis is a co-operative board game where you and your team are a group of Nanobots, assigned to a cell city collapsing under a dangerous infection. Your team is the last hope to bring it back to life.\nHarness the unique abilities and powers of various cell organelles to collaborate, strategise, and revive the Cyto-Polis.",
    gallery: [
      "/images/highlights/cyto-polis/1.jpg",
      "/images/highlights/cyto-polis/2.jpg",
      "/images/highlights/cyto-polis/3.jpg",
    ],
  },
]

export const showcaseById = (id: string): ShowcaseProject | undefined =>
  showcaseProjects.find((p) => p.id === id)
