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

  /* ── TABLETOP GAMES ─────────────────────────────────────────────
     Photo galleries for the student tabletop games. Write-ups mirror
     data/games.ts (short = description, long = fullDescription) so the
     catalog cards on /games become clickable. gallery[0] reuses each
     game's existing hero in /images/games/ so cards look unchanged;
     the rest are the new shoot in /images/highlights/<id>/.
     NOTE: only the first 4 entries in this array show on the home page
     (HighlightedWorks slices to one row) — these live on /games. */

  {
    id: "offerings-of-noroi",
    title: "Offerings of Noroi",
    authors: "Hrishitaa, Tanishq, Urja, Rugved, Shreya",
    tags: ["Tabletop", "Player vs Player", "Party", "Japanese"],
    short:
      "A two-team word-guessing game where Shamans give clues, Clan Heads guess — and the cursed Oni can end the game in a single reveal.",
    long:
      "Offerings of Noroi is a multiplayer word-guessing game where two teams compete to uncover more cards than their opponents using clues given by their teammates.\nEach team has a Shaman (clue giver) who provides hints, while the Clan Head (guesser) must interpret these clues and identify the correct cards on the board. The challenge lies in connecting the hints to the right words while avoiding dangerous ones.\nTeams have limited guesses, and every decision matters. Choosing the wrong card can strengthen the opposing team, while certain cards bring unexpected misfortune.\nMost importantly, players must beware of the Oni — a single cursed card that can end the game instantly if revealed.",
    gallery: [
      "/images/games/offeringOfNorot.jpg",
      "/images/highlights/offerings-of-noroi/1.jpg",
      "/images/highlights/offerings-of-noroi/2.jpg",
      "/images/highlights/offerings-of-noroi/3.jpg",
    ],
  },
  {
    id: "lab-rat",
    title: "Lab Rat",
    authors: "Anirudh, Geetika, Harinarayanan, Kashika, Siddharth, Varun",
    tags: ["Tabletop", "Player vs Player", "Strategy", "Card Game"],
    short:
      "Six rats scurry through vents to escape a laboratory — scavenging, building harvesters, and sabotaging rivals one round at a time.",
    long:
      "Deep within a laboratory that reeks of radium and blood, a frantic scientist searches for the test subjects that slipped from their cages. In the shadows, six rats scurry through vents and tunnels, each desperate to find a way out.\nScavenge strange resources, construct harvesters, and sabotage rival rats as every round unfolds into a new story of bold alliances and brutal betrayals.\nUnder the constant watch of the evil scientist and the towering walls of the facility — what will it take you to be the first one to escape?",
    gallery: [
      "/images/games/labRats.jpg",
      "/images/highlights/lab-rat/1.jpg",
      "/images/highlights/lab-rat/2.jpg",
      "/images/highlights/lab-rat/3.jpg",
    ],
  },
  {
    id: "ko-no-mercy",
    title: "K.O. No Mercy",
    authors: "Subrata, Sidhart, Jeswin, Roshan, Om",
    tags: ["Tabletop", "Card Game", "Player vs Player", "Two Player", "Combat", "Boxing"],
    short:
      "A fast-paced two-player boxing duel where timing, prediction, and combo-building decide who stays standing — with phygital twists.",
    long:
      "K.O: No Mercy is a fast-paced two-player boxing duel where timing, prediction, and combo-building decide who stays standing.\nEach round simulates an explosive exchange in the ring. Players secretly select their moves, reveal them one by one, and score points based on impact, combinations, and momentum.\nBuild pressure. Land clean hits. Trigger combos. Push your opponent towards Knockout.",
    gallery: [
      "/images/games/koNoMercy.jpg",
      "/images/highlights/ko-no-mercy/1.jpg",
      "/images/highlights/ko-no-mercy/2.jpg",
      "/images/highlights/ko-no-mercy/3.jpg",
    ],
  },
  {
    id: "who-invited-them",
    title: "Who Invited Them?",
    authors: "Ankita, Avani, Tanishq, Sumeet, Ravi, Siddhi",
    tags: ["Tabletop", "Player vs Game", "Party", "Education"],
    short:
      "A party-chaos game where players race to clear a house full of guests before the host's parents arrive — through dares, truths, and confessions.",
    long:
      "Who Invited Them is a fast-paced party chaos game where players must work together to secretly clear a house full of guests before the host's parents arrive. Each turn brings fun prompts — dares, truths, confessions, performances, or surprise tasks decided by the group.\nCompleting challenges earns points and helps move the game forward, but the real goal is teamwork, laughter, and quick thinking under pressure. Expect singing, acting, bluffing, and plenty of dramatic moments as players race against time.\nIt's social, silly, and perfect for breaking the ice, energising a group, and turning any gathering into an unforgettable house-party adventure.",
    gallery: [
      "/images/games/whoInvitedThem.jpg",
      "/images/highlights/who-invited-them/1.jpg",
      "/images/highlights/who-invited-them/2.jpg",
      "/images/highlights/who-invited-them/3.jpg",
    ],
  },
  {
    id: "stranded",
    title: "Stranded",
    authors: "Adiraj, Aradhay, Fabi, Himanshu, Yuvaan",
    tags: ["Tabletop", "Player vs Game", "Sci-Fi", "Alien", "Card Game"],
    short:
      "Race against a crashing space station while a xenomorph stalks the halls — a high-stakes game of trust where teammates may already be infected.",
    long:
      "In Stranded, you and your crew are racing against time to avoid being completely destroyed.\nHowever, the space station about to crash is only a part of the problem. You and your crew are being stalked in the hallways by a deadly xenomorph — not for food, but for suitable hosts.\nBeing smart with your resources isn't enough to stay alive. The alien can break your team from the inside out, so it's a high-stakes game of trust. As the xenomorph takes over your teammates, they will start to work against your escape or to doom everyone onboard. The line between friend and enemy gets blurry.\nYou will soon realise that the person next to you is more dangerous than the monster in the vents.",
    gallery: [
      "/images/games/stranded.jpg",
      "/images/highlights/stranded/1.jpg",
      "/images/highlights/stranded/2.jpg",
      "/images/highlights/stranded/3.jpg",
    ],
  },
  {
    id: "jungle",
    title: "Jungle",
    authors: "Renuka, Chinmay, Vansh",
    tags: ["Tabletop", "Card Game", "Education", "Animals"],
    short:
      "Collect support from jungle animals at the waterhole, claim territories on the map, and outsmart rivals with sneaky action cards.",
    long:
      "In Jungle, you'll need to collect and exchange support from the jungle animals at the waterhole to claim your territories on the jungle map. Don't forget about the fruit baskets, which can be used to help you gain more support from the animals.\nYou will need to outsmart your opponent and use your resources wisely to acquire as many territories as possible and become the next ruler of the jungle. But beware — your rivals will also be trying to claim territories and sabotage your progress with sneaky action cards.\nEvery game is a new adventure, with varying setups and outcomes.",
    gallery: [
      "/images/games/jungleJungle.jpg",
      "/images/highlights/jungle/1.jpg",
      "/images/highlights/jungle/2.jpg",
      "/images/highlights/jungle/3.jpg",
      "/images/highlights/jungle/4.jpg",
    ],
  },
  {
    id: "toddle",
    title: "Toddle — Language Learning Application",
    authors: "Shivangi Anand",
    tags: ["Digital", "Child-Computer Interaction"],
    short:
      "A data-enabled design probe supporting early literacy in children with intellectual disabilities via playful learning and educator dashboards.",
    long:
      "Toddle is based on an adapted Data-enabled Design (DeD) approach to support early literacy skills in children with intellectual disabilities (ID). Addressing key challenges such as retention difficulties, diverse cognitive profiles, and high educator dependence, the authors developed Toddle, a multisensory digital learning probe. The application includes a Student Mode featuring nine interactive games structured across three modules aligned with Bloom's Taxonomy — Alphabet Adventures, Picture Party, and Word Builder — alongside a Teacher Mode dashboard that tracks metrics like accuracy, completion rates, and time spent to provide actionable intervention insights. Rather than deploying probes immediately as in traditional DeD frameworks, this work adapts the methodology by beginning with an independent, design-oriented co-creation cycle with special educators, ensuring pedagogical continuity and minimal disruption to daily classroom routines.",
    gallery: [
      "/images/highlights/toddle/1.jpg",
      "/images/highlights/toddle/2.jpg",
      "/images/highlights/toddle/3.jpg",
    ],
  },
]

export const showcaseById = (id: string): ShowcaseProject | undefined =>
  showcaseProjects.find((p) => p.id === id)
