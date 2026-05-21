export type Game = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  authors: string
  featured?: boolean
}

export const games: Game[] = [
  {
    id: "jungle-jungle",
    title: "Jungle Jungle",
    description:
      "Collect and exchange support from jungle animals to claim territories and become ruler of the jungle.",
    image: "/images/games/jungleJungle.jpg",
    tags: ["Board Game", "Education"],
    authors: "Chinmay, Renuka, Vansh",
    featured: true,
  },
  {
    id: "stranded",
    title: "Stranded",
    description:
      "A high-stakes survival game where a deadly xenomorph hunts your crew from within a crashing space station.",
    image: "/images/games/stranded.jpg",
    tags: ["Tabletop", "SciFi"],
    authors: "Adiraj, Aradhay, Fabi",
  },
  {
    id: "lab-rat",
    title: "LAB RAT",
    description:
      "Six rats scurry through vents, scavenge resources, and sabotage rivals in a bid to escape the laboratory.",
    image: "/images/games/labRats.jpg",
    tags: ["Strategy", "Card Game"],
    authors: "Anirudh, Geetika, Harinarayanan",
  },
  {
    id: "offerings-of-noroi",
    title: "Offerings of Noroi",
    description:
      "A multiplayer word-guessing game where two teams compete to uncover cards — while avoiding the cursed Oni.",
    image: "/images/games/offeringOfNorot.jpg",
    tags: ["Party", "Japanese"],
    authors: "Hrishitaa, Tanishq, Urja",
  },
  {
    id: "ko-no-mercy",
    title: "Ko No Mercy",
    description:
      "A fast-paced abstract strategy game inspired by the ancient board game Go, reimagined for modern players.",
    image: "/images/games/koNoMercy.jpg",
    tags: ["Abstract", "Strategy"],
    authors: "Lab Members",
  },
  {
    id: "who-invited-them",
    title: "Who Invited Them?",
    description:
      "A social deduction party game where hidden guests crash a party and players must figure out who doesn't belong.",
    image: "/images/games/whoInvitedThem.jpg",
    tags: ["Social", "Party"],
    authors: "Lab Members",
  },
]
