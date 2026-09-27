/**
 * Games catalog — final list from "Table Top Game For website.xlsx"
 * (Sheet1 = tabletop, "DP Projects" = digital). The `tags` array drives the
 * category filter on /games; the first tag is the format ("Tabletop" |
 * "Digital"). Keep tag spelling consistent so the derived filter joins.
 *
 * Schema:
 *   - description     → short blurb for cards/grid (~20–30 words)
 *   - fullDescription → long-form for detail pages and showcase. \n becomes
 *     a paragraph break when rendered.
 *   - priority        → "1st" | "2nd" | undefined. Use for sort/featuring.
 *   - image           → /images/games/<id>.jpg. OPTIONAL: games still awaiting
 *     a photo leave it commented out / undefined. The /games catalog moves
 *     image-less games into a clean text list at the end instead of showing an
 *     empty picture. To promote one back into the card grid, just uncomment
 *     its `image` line once the file is uploaded to public/images/games/.
 *   - featured        → renders the big dark hero card on /games. ONE only.
 */

export type Game = {
  id: string
  title: string
  description: string
  fullDescription?: string
  image?: string
  tags: string[]
  authors: string
  featured?: boolean
  priority?: "1st" | "2nd"
}

export const games: Game[] = [
  /* ── 1ST PRIORITY ───────────────────────────────────────────────── */

  {
    id: "offerings-of-noroi",
    title: "Offerings of Noroi",
    description:
      "A two-team word-guessing game where Shamans give clues, Clan Heads guess — and the cursed Oni can end the game in a single reveal.",
    fullDescription:
      "Offerings of Noroi is a multiplayer word-guessing game where two teams compete to uncover more cards than their opponents using clues given by their teammates.\nEach team has a Shaman (clue giver) who provides hints, while the Clan Head (guesser) must interpret these clues and identify the correct cards on the board. The challenge lies in connecting the hints to the right words while avoiding dangerous ones.\nTeams have limited guesses, and every decision matters. Choosing the wrong card can strengthen the opposing team, while certain cards bring unexpected misfortune.\nMost importantly, players must beware of the Oni — a single cursed card that can end the game instantly if revealed.",
    image: "/images/games/offeringOfNorot.jpg",
    tags: ["Tabletop", "Player vs Player", "Party", "Japanese"],
    authors: "Hrishitaa, Tanishq, Urja, Rugved, Shreya",
    featured: true,
    priority: "1st",
  },
  {
    id: "lab-rat",
    title: "Lab Rat",
    description:
      "Six rats scurry through vents to escape a laboratory — scavenging, building harvesters, and sabotaging rivals one round at a time.",
    fullDescription:
      "Deep within a laboratory that reeks of radium and blood, a frantic scientist searches for the test subjects that slipped from their cages. In the shadows, six rats scurry through vents and tunnels, each desperate to find a way out.\nScavenge strange resources, construct harvesters, and sabotage rival rats as every round unfolds into a new story of bold alliances and brutal betrayals.\nUnder the constant watch of the evil scientist and the towering walls of the facility — what will it take you to be the first one to escape?",
    image: "/images/games/labRats.jpg",
    tags: ["Tabletop", "Player vs Player", "Strategy", "Card Game"],
    authors: "Anirudh, Geetika, Harinarayanan, Kashika, Siddharth, Varun",
    priority: "1st",
  },
  {
    id: "ko-no-mercy",
    title: "K.O. No Mercy",
    description:
      "A fast-paced two-player boxing duel where timing, prediction, and combo-building decide who stays standing — with phygital twists.",
    fullDescription:
      "K.O: No Mercy is a fast-paced two-player boxing duel where timing, prediction, and combo-building decide who stays standing.\nEach round simulates an explosive exchange in the ring. Players secretly select their moves, reveal them one by one, and score points based on impact, combinations, and momentum.\nBuild pressure. Land clean hits. Trigger combos. Push your opponent towards Knockout.",
    image: "/images/games/koNoMercy.jpg",
    tags: ["Tabletop", "Card Game", "Player vs Player", "Two Player", "Combat", "Boxing"],
    authors: "Subrata, Sidhart, Jeswin, Roshan, Om",
    priority: "1st",
  },
  {
    id: "who-invited-them",
    title: "Who Invited Them?",
    description:
      "A party-chaos game where players race to clear a house full of guests before the host's parents arrive — through dares, truths, and confessions.",
    fullDescription:
      "Who Invited Them is a fast-paced party chaos game where players must work together to secretly clear a house full of guests before the host's parents arrive. Each turn brings fun prompts — dares, truths, confessions, performances, or surprise tasks decided by the group.\nCompleting challenges earns points and helps move the game forward, but the real goal is teamwork, laughter, and quick thinking under pressure. Expect singing, acting, bluffing, and plenty of dramatic moments as players race against time.\nIt's social, silly, and perfect for breaking the ice, energising a group, and turning any gathering into an unforgettable house-party adventure.",
    image: "/images/games/whoInvitedThem.jpg",
    tags: ["Tabletop", "Player vs Game", "Party", "Education"],
    authors: "Ankita, Avani, Tanishq, Sumeet, Ravi, Siddhi",
    priority: "1st",
  },
  {
    id: "stranded",
    title: "Stranded",
    description:
      "Race against a crashing space station while a xenomorph stalks the halls — a high-stakes game of trust where teammates may already be infected.",
    fullDescription:
      "In Stranded, you and your crew are racing against time to avoid being completely destroyed.\nHowever, the space station about to crash is only a part of the problem. You and your crew are being stalked in the hallways by a deadly xenomorph — not for food, but for suitable hosts.\nBeing smart with your resources isn't enough to stay alive. The alien can break your team from the inside out, so it's a high-stakes game of trust. As the xenomorph takes over your teammates, they will start to work against your escape or to doom everyone onboard. The line between friend and enemy gets blurry.\nYou will soon realise that the person next to you is more dangerous than the monster in the vents.",
    image: "/images/games/stranded.jpg",
    tags: ["Tabletop", "Player vs Game", "Sci-Fi", "Alien", "Card Game"],
    authors: "Adiraj, Aradhay, Fabi, Himanshu, Yuvaan",
    priority: "1st",
  },

  /* ── 2ND PRIORITY ───────────────────────────────────────────────── */

  {
    id: "jungle",
    title: "Jungle",
    description:
      "Collect support from jungle animals at the waterhole, claim territories on the map, and outsmart rivals with sneaky action cards.",
    fullDescription:
      "In Jungle, you'll need to collect and exchange support from the jungle animals at the waterhole to claim your territories on the jungle map. Don't forget about the fruit baskets, which can be used to help you gain more support from the animals.\nYou will need to outsmart your opponent and use your resources wisely to acquire as many territories as possible and become the next ruler of the jungle. But beware — your rivals will also be trying to claim territories and sabotage your progress with sneaky action cards.\nEvery game is a new adventure, with varying setups and outcomes.",
    image: "/images/games/jungleJungle.jpg",
    tags: ["Tabletop", "Card Game", "Education", "Animals"],
    authors: "Renuka, Chinmay, Vansh",
    priority: "2nd",
  },
  {
    id: "doobie-town",
    title: "Doobie Town",
    description:
      "A shadowy power-play game where Drug Lord, Money Manager, Landlord, and Police Officer compete to dominate the regions of a corrupt city.",
    fullDescription:
      "Shadowy Doobie Town is a strategic power-play game set in a city where control matters more than wealth. Players take on the roles of four key figures — Drug Lord, Money Manager, Landlord, and Police Officer — each competing to dominate critical regions of the town.\nThrough smart deals, calculated risks, and strategic moves, players must earn, buy, or seize control to win.",
    // image: "/images/games/doobieTown.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "Strategy", "Power Play"],
    authors: "Ella, Makrand, Niharika, Shivangi",
    priority: "2nd",
  },
  {
    id: "bazaar-mafia",
    title: "Bazaar Mafia",
    description:
      "Buy low, sell high — a stock-market game where strategy and timing decide whether you take risks, play safe, or do both.",
    fullDescription:
      "The game explores the exciting world of stocks and investments, where your strategy and timing dictate your success. Will you take risks, play it safe, or blend both approaches? The choice is yours.\nInvestors seek to maximise wealth through strategic buying and selling of stocks while adapting to market changes. By understanding trends and balancing risk, they compete to make the best investment decisions. The key is to buy low and sell high — timing is everything.",
    // image: "/images/games/bazaarMafia.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "Strategy", "Stock Market"],
    authors: "Lab Members",
    priority: "2nd",
  },

  /* ── ADDITIONAL TITLES ─────────────────────────────────────────── */

  {
    id: "gods-of-crops",
    title: "Gods of Crops",
    description:
      "A competitive farming card battle where players strengthen their crops and weaken rivals using sunlight, rain, insects, and chemicals.",
    fullDescription:
      "Gods of Crops is a competitive strategy card game where players battle to protect and strengthen their crops while weakening their opponent's farm through powerful attack, defence, and utility cards. Each crop has unique traits and reactions to different environmental conditions like sunlight, rain, insects, and chemicals, creating a dynamic and tactical gameplay experience.\nCombining resource management, strategy, and fast-paced decision-making, the game delivers an exciting farming-themed battle for survival and victory.",
    // image: "/images/games/godsOfCrops.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "Card Game", "Strategy", "Education"],
    authors: "Adiraj, Geetika, Fabi, Himanshu, Yuvaan",
  },
  {
    id: "feed-me",
    title: "Feed Me",
    description:
      "Build food chains by connecting animals across ecosystems — an educational card-and-board game about how nature links together.",
    fullDescription:
      "Feed Me is a strategic and educational card-based board game where players build food chains by connecting animals and organisms from different ecosystems. Using clever placement, action cards, and chain-building mechanics, players compete to create the strongest and highest-scoring ecosystem links.\nWith a mix of strategy, learning, and friendly competition, the game offers a fun way to explore how nature and food chains work together.",
    // image: "/images/games/feedMe.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "Education", "Animals", "Food Chain"],
    authors: "Hrishitaa, Tanishq, Urja, Rugved, Shreya",
  },
  {
    id: "mission-goldilocks",
    title: "Mission Goldilocks",
    description:
      "A sci-fi strategy game where players manage planets within the Goldilocks Zone — balancing satellites, ships, and survival conditions.",
    fullDescription:
      "Mission Goldilocks is a sci-fi strategy board game where players compete to keep their planets stable and survive within the mysterious Goldilocks Zone — the perfect region for life. Using satellites, spaceships, and condition-based mechanics, players must carefully manage planetary balance while outsmarting their opponents in a race for survival and control.\nCombining space exploration, tactical planning, and competitive gameplay, the game delivers an exciting interstellar battle for the ideal planet.",
    // image: "/images/games/missionGoldilocks.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "Sci-Fi", "Strategy", "Space"],
    authors: "Ankita, Avani, Tanishq, Sumeet, Siddhi",
  },
  {
    id: "building-lemuria",
    title: "Building Lemuria",
    description:
      "Race to dominate the sectors of a mysterious island — manage resources, build stacks, and seize majority control of Lem Coins.",
    fullDescription:
      "Building Lemuria is a competitive strategy board game where players race to develop and dominate sectors on the mysterious island of Lemuria. By managing resources, claiming territories, and building powerful stacks, players compete to gain the majority of Lem Coins and control the growing civilization.\nWith tactical decision-making, shifting alliances, and resource-based gameplay, the game creates an immersive battle for power, expansion, and survival in a newly discovered world.",
    // image: "/images/games/buildingLemuria.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "Strategy", "Resource Management"],
    authors: "Subrata, Sidhart, Jeswin, Roshan, Om",
  },
  {
    id: "cyto-polis",
    title: "Cyto-Polis",
    description:
      "A co-operative board game where players become Nanobots, harnessing organelle powers to collaborate, strategise, and revive a cell city collapsing under a dangerous infection.",
    fullDescription:
      "Cyto-Polis is a co-operative board game where you and your team are a group of Nanobots, assigned to a cell city collapsing under a dangerous infection. Your team is the last hope to bring it back to life.\nHarness the unique abilities and powers of various cell organelles to collaborate, strategise, and revive the Cyto-Polis.",
    image: "/images/highlights/cyto-polis/1.jpg",
    tags: ["Tabletop", "Education", "Cell Biology", "Cooperative"],
    authors: "Radhika, Shuriti, Suchalika, Adhiraj & Vinay",
  },

  /* ── STUBS — copy + image pending from team ─────────────────────── */

  {
    id: "cataclysm",
    title: "Cataclysm",
    description: "Full description coming soon.",
    // image: "/images/games/cataclysm.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "TBA"],
    authors: "Lab Members",
  },
  {
    id: "dont-get-sick",
    title: "Don't Get Sick",
    description: "Full description coming soon.",
    // image: "/images/games/dontGetSick.jpg", // TODO: awaiting photo
    tags: ["Tabletop", "TBA"],
    authors: "Lab Members",
  },

  /* ── DIGITAL PROJECTS ───────────────────────────────────────────── */

  {
    id: "laminar",
    title: "Laminar",
    description:
      "An interactive simulation that helps Indian youth build crowd-safety awareness — learning instinctive safe responses inside immersive crowd-distress scenarios.",
    fullDescription:
      "Laminar is an interactive play experience that aims to improve crowd preparedness in Indian youth, enabling them to understand probable crowd behaviours and take instinctive, safe decisions inside a crowd-distress simulation. The project bridges the preparedness gap for disasters that cannot be safely trained for in the real world.\nIt uses two mediums to communicate the context, each revealing different behavioural insights — from how an individual's planning and intuition together alter their decisions, to how intuition and immersion work their way together.\nLaminar not only promotes appropriate decision-making in players, but also surfaces shared and individual patterns of operation in such situations.",
    image: "/images/games/laminar.jpg",
    tags: ["Digital", "PC", "Education", "Training", "Safety"],
    authors: "Radhika",
  },
  {
    id: "care-paths",
    title: "Care Paths",
    description:
      "A choice-based VR training game that helps pediatric healthcare workers experience care from a child's perspective — building empathy and patient-centred practice.",
    fullDescription:
      "Care Paths is a choice-based VR training game that helps pediatric healthcare workers and nurses understand the emotions, fears, and experiences of child patients by letting them experience healthcare from a child's perspective. Through immersive role-play, the game fosters empathy and encourages more compassionate, patient-centred care.",
    image: "/images/games/carePaths.jpg",
    tags: ["Digital", "VR", "Training", "Empathy", "Healthcare"],
    authors: "Himanshu",
  },
  {
    id: "echoes-of-aevum",
    title: "Echoes of Aevum",
    description:
      "A VR game for the experiential learning of sound-related concepts — turning abstract physics into something you can hear, move through, and explore.",
    image: "/images/games/echoesOfAevum.jpg",
    tags: ["Digital", "VR", "Education", "Physics"],
    authors: "Omya Sharma",
  },
  {
    id: "narrative-sandbox",
    title: "Narrative Sandbox",
    description:
      "An AR sandbox where children aged 5–7 shape sand and place tokens to trigger AI-generated biomes, co-creating narrative worlds through embodied pretend play.",
    fullDescription:
      "We explore how augmented reality and generative AI can transform children's play. Using a custom AR Sandbox — a physical sand table augmented with real-time AI-generated visuals, depth sensing, and tangible tokens — we study how young children (ages 5–7) engage in co-located, embodied pretend play.\nOur work sits at the intersection of Tangible User Interfaces, Child-Computer Interaction, and generative AI, asking how technology can support imagination and collaborative storytelling without overshadowing the play itself. Children interact with the sandbox by shaping sand and placing themed tokens that trigger dynamic biome projections, co-creating narrative worlds together in real time.\nThrough iterative Research-through-Design methods, we aim to uncover design principles that keep the child at the centre of play.",
    image: "/images/highlights/narrative-sandbox/1.jpg",
    tags: ["Digital", "AR", "Pretend Play", "Child-Computer Interaction"],
    authors: "Omya Sharma",
  },

  /* ── RESEARCH APPLICATIONS & PROBES ─────────────────────────────
     Digital learning apps and design probes. Image-less for now, so the
     catalog lists them as text at the end (uncomment `image` once a photo
     is added to promote a card). First tag is the format filter. */

  {
    id: "toddle",
    title: "Toddle — Language Learning Application",
    description:
      "A data-enabled design probe supporting early literacy in children with intellectual disabilities via playful learning and educator dashboards.",
    fullDescription:
      "Toddle is based on an adapted Data-enabled Design (DeD) approach to support early literacy skills in children with intellectual disabilities (ID). Addressing key challenges such as retention difficulties, diverse cognitive profiles, and high educator dependence, the authors developed Toddle, a multisensory digital learning probe. The application includes a Student Mode featuring nine interactive games structured across three modules aligned with Bloom's Taxonomy — Alphabet Adventures, Picture Party, and Word Builder — alongside a Teacher Mode dashboard that tracks metrics like accuracy, completion rates, and time spent to provide actionable intervention insights. Rather than deploying probes immediately as in traditional DeD frameworks, this work adapts the methodology by beginning with an independent, design-oriented co-creation cycle with special educators, ensuring pedagogical continuity and minimal disruption to daily classroom routines.",
    // image: "/images/games/toddle.jpg", // TODO: awaiting photo
    tags: ["Digital", "Child-Computer Interaction"],
    authors: "Shivangi Anand",
  },
  {
    id: "pachi",
    title: "Pachi: A Verbal Language Learning Application",
    description:
      "A tablet app supporting Hindi speech and language therapy for hearing-impaired children.",
    fullDescription:
      "Pachi is an innovative tablet-based digital application designed to facilitate verbal language development and speech therapy in Hindi for hearing-impaired (HI) children aged 0 to 48 months, along with their facilitators. Developed to bridge the gap in formal therapy access caused by geographic and socio-economic barriers in India, Pachi translates clinical expertise into an engaging, home-friendly digital platform. Structured to serve communities lacking regular access to speech therapists, Pachi delivers concise, 10–12-minute daily activity modules tailored to the child's developmental profile according to the ISD scale. For example, modules calibrated for a 'Hearing Age' of 13–15 months provide four targeted, interactive games mapping directly to each of the four core developmental stages — scaffolding early auditory training, vocabulary building, pronunciation, and articulation into accessible everyday practice.",
    // image: "/images/games/pachi.jpg", // TODO: awaiting photo
    tags: ["Digital", "Early Literacy Intervention", "Speech-Language Therapy", "Assistive Learning Technology"],
    authors: "Radhika Sharma",
  },
  {
    id: "cardiac-probes",
    title: "Cultural Probes for Remote Cardiac Monitoring",
    description:
      "A cultural probe toolkit of six interactive physical formats (cards, boards, mock-ups) exploring older adults' natural behaviours in remote cardiac monitoring.",
    fullDescription:
      "The cultural probe toolkit was developed within a qualitative participatory framework to investigate how older adults in India interact with remote cardiac health monitoring technologies. Derived from a hierarchical task analysis of five existing cardiac applications, the kit targets six critical interaction areas: receiving guidance, addressing symptoms, device self-monitoring, sending manual data transmissions, responding to emergencies, and seeking assistance. To accommodate varying digital and textual literacy levels, the toolkit employs physical, interactive artifacts rather than abstract questionnaires. These tangible materials include instruction cards presented across text, audio, and graphic formats, anatomy boards paired with symptom vocabulary cards, mock-up device cards covering tools of varying invasiveness, simulation workflows featuring a stethoscope prototype, and scenario-based cards probing emergency responses and help-seeking thresholds. Deployed among 27 participants aged 59–86, the probes elicited intuitive behaviours and contextual nuances shaped by Indian socio-cultural and dependency dynamics.",
    // image: "/images/games/cardiac-probes.jpg", // TODO: awaiting photo
    tags: ["Physical", "Cultural Probes", "Remote Cardiac Monitoring", "User Dependency Status"],
    authors: "Lab Members", // TODO: confirm author (source entry had a copy-paste error)
  },
  {
    id: "voice-user-interface",
    title: "Voice User Interface for Designing Inclusive Games for Children with Visual Impairment",
    description:
      "Using Alexa voice interfaces to enable inclusive, accessible game play for visually impaired and sighted children in Indian classrooms.",
    fullDescription:
      "Children with visual impairment (VI) face significant challenges in experiencing inclusive play due to limited accessibility to games. This study explores how Voice User Interfaces (VUIs), specifically Amazon's Alexa, can facilitate inclusive play experiences among visually impaired and sighted children. We conducted contextual inquiry studies and a series of co-design workshops with special educators and students with mixed visual abilities, identifying key challenges and deriving opportunities for game design on VUI. We shared a game prototype demonstrating a dynamic and inclusive play experience with a VUI in a low-resource environment. Through evaluation and testing, design insights and challenges are shared with the game development community, which will help them to develop accessible games relevant to Indian schools.",
    // image: "/images/games/voice-user-interface.jpg", // TODO: awaiting photo
    tags: ["Digital", "Visually Impaired", "Inclusive Play", "Voice User Interface"],
    authors: "Monica",
  },
]
