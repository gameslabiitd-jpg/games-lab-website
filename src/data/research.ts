/** The three primary publication types (drive the main filter row). */
export type PubType = "Conference Paper" | "Journal Article" | "Extended Abstracts"

export type Research = {
  id: string
  title: string
  description: string
  /** Primary filter — one of the three publication types. */
  type: PubType
  /** Secondary filters — topical keywords. */
  topics: string[]
  authors: string
  /** Publication venue (conference / journal), incl. short code. */
  venue: string
  year?: string
  /** DOI URL. */
  link?: string
}

/**
 * Publications — updated list from "research works by games lab (1).md".
 * Ordered as in the source (most recent first). `link` is the DOI URL and
 * `venue` is the publication venue; both surface in the UI. DOIs were
 * un-escaped from the markdown (`\_` → `_`). Author lists are normalised to
 * the site's "comma + & before last" style; diacritics kept verbatim.
 *
 * Filtering is two-tier: `type` powers the primary row (Conference Paper /
 * Journal Article / Extended Abstracts) and `topics` the secondary row;
 * the two combine (AND).
 */
export const research: Research[] = [
  {
    id: "Educational technology for space",
    title:
      "Educational technology for space science: Capturing higher secondary students' perceptions of its integration into the curriculum in India",
    description:
      "",
    type: "Conference Paper",
    topics: ["VR", "Embodied Learning", "Space education"],
    authors: "Krishnadas M, Sreelal S, &  Aakash Johry",
    venue:
      "7th International Conference on Information Technology and Education Technology (ITET 2026), Hiroshima, Japan",
    link: "Accepted",
  },
  {
    id: "responsible-democratization-genai",
    title:
      "Mapping the Responsible Democratization of Generative AI through Participatory Futuring",
    description:
      "A workshop paper that uses an HCI lens and a participatory futuring approach to explore the responsible democratization of generative AI across domains like education, sustainability, art, and health.",
    type: "Extended Abstracts",
    topics: ["Artificial Intelligence", "Participatory Design", "Speculative Design"],
    authors:
      "Anniek Jansen, Supraja Sankaran, Matilda Kalving, Kaisa Väänänen, Eva Geurts, Gustavo Alberto Rovelo Ruiz, Cosmin Munteanu, Aakash Johry & Jonna Häkkilä",
    venue:
      "The 2026 CHI Conference on Human Factors in Computing Systems (CHI 2026)",
    link: "https://doi.org/10.1145/3772363.3778759",
  },
  {
    id: "leveling-up-leadership",
    title:
      "Leveling Up Leadership: Emerging Voices and Evolving Practices in the Games & Play Community",
    description:
      "A workshop bringing emerging and established leaders in the games and play research community together to share practices around inclusive, playful leadership across disciplines and geographies.",
    type: "Extended Abstracts",
    topics: ["Games", "Leadership"],
    authors:
      "Oğuz ‘Oz’ Buruk, Max V. Birk, Ferran Altarriba Bertran, Alena Denisova, Aakash Johry, Rakesh Patibanda, Velvet Spors, Xin Tong & Rina R. Wehbe",
    venue:
      "The Annual Symposium on Computer-Human Interaction in Play (CHI PLAY ’25)",
    link: "https://doi.org/10.1145/3744736.3749322",
  },
  {
    id: "theory-as-design-material",
    title:
      "Theory as Design Material: How Design Researchers Use Design Skills to Explore the Malleability of Theory",
    description:
      "How design researchers explore the use of various forms of knowledge, such as theory, through their design skills and design practices.",
    type: "Journal Article",
    topics: ["Research-through-Design", "Theory in Design Practice", "Design Education"],
    authors: "Tilde Bekker, Helle Marie Skovbjerg, Maria Lyndgaard & Aakash Johry",
    venue: "International Journal of Design",
    link: "https://doi.org/10.57698/v19i2.01",
  },
  {
    id: "body-language-design-students",
    title:
      "Impact of Body Language on Design Students — A Case Study at an Indian University Classroom",
    description:
      "Using a research-through-design approach and two gamified probes to explore the impact of non-verbal communication on university design students in India.",
    type: "Conference Paper",
    topics: ["Probes", "Research-through-Design", "Design Education"],
    authors: "Bhagyashri Sharma, U. M. Krishnanunni & Aakash Johry",
    venue: "International Conference on Research into Design (ICORD 2025)",
    link: "https://doi.org/10.1007/978-981-96-5495-6_29",
  },
  {
    id: "educational-goals-intellectual-disabilities",
    title:
      "Understanding the Perception and Process of Practitioners in Defining and Achieving the Educational Goals of Children with Intellectual Disabilities in India",
    description:
      "Exploring how special educators in an Indian metropolitan school develop and implement IEPs for children with intellectual disabilities.",
    type: "Conference Paper",
    topics: ["Accessibility", "Learning"],
    authors: "Harsh Mohan Shrivastava & Aakash Johry",
    venue:
      "17th International Conference on Education and New Learning Technologies (EduLearn25)",
    link: "https://doi.org/10.21125/edulearn.2025.0933",
  },
  {
    id: "competitive-gaming-skills",
    title:
      "Play, Watch, Analyze, Repeat: How Do Players Develop Competitive Gaming Skills?",
    description:
      "A study of how players learn competitive gaming skills across genres such as MOBA, RTS, and battle royale, and the role self-efficacy plays in that process.",
    type: "Journal Article",
    topics: ["Games", "Learning"],
    authors:
      "Günter Wallner, Aakash Johry, Marnix van Wijland, Regina Bernhaupt & Simone Kriglstein",
    venue: "Entertainment Computing",
    link: "https://doi.org/10.1016/j.entcom.2024.100908",
  },
  {
    id: "vui-inclusive-games-visual-impairment",
    title:
      "Voice User Interface for Designing Inclusive Games for Children with Visual Impairment and Sighted Pupils",
    description:
      "How Voice User Interfaces like Amazon Alexa can facilitate inclusive play between visually impaired and sighted children in Indian schools.",
    type: "Conference Paper",
    topics: ["Accessibility", "Games"],
    authors: "Monika & Aakash Johry",
    venue:
      "15th International Conference of Human-Computer Interaction (IndiaHCI 2024)",
    link: "https://doi.org/10.1007/978-3-031-80832-6_7",
  },
  {
    id: "designing-pachi",
    title:
      "Designing Pachi: A Verbal Language Learning Application for Children with Hearing Impairment in India",
    description:
      'Addressing the limited availability of formal therapy in India, introducing "Pachi," a tablet-based app designed to enhance Hindi language development for hearing-impaired children.',
    type: "Conference Paper",
    topics: ["Accessibility", "Learning", "Games"],
    authors: "Radhika Sharma & Aakash Johry",
    venue:
      "International Conference on Computers Helping People with Special Needs (ICCHP 2024)",
    link: "https://doi.org/10.1007/978-3-031-62849-8_8",
  },
  {
    id: "gamifying-mental-wellbeing",
    title:
      "Gamifying Mental Well-Being Assessment: A New Approach for College-Going Students Using the 'Oxford Happiness Questionnaire'",
    description:
      'Gamifying the Oxford Happiness Questionnaire through an app called "The Mirror" significantly increases user engagement and enjoyment for college students compared to the traditional text-based format.',
    type: "Conference Paper",
    topics: ["Well-being", "Gamification"],
    authors: "Renuka Singh, Harsh Mohan Shrivastava, M. Krishnadas & Aakash Johry",
    venue:
      "15th International Conference of Human-Computer Interaction (IndiaHCI 2024)",
    link: "https://doi.org/10.1007/978-3-031-80832-6_8",
  },
  {
    id: "existing-knowledge-research-through-design",
    title:
      "Facilitating Use of Existing Knowledge in Research-Through-Design: A Case Study with Design Students",
    description:
      "How design students struggle to integrate existing knowledge and theory into their projects. Using a design-based research approach within a bachelor-level play design course, the authors act as facilitators to introduce educational interventions across the Research-through-Design (RtD) process.",
    type: "Conference Paper",
    topics: ["Research-through-Design", "Design Education", "Theory in Design Practice"],
    authors: "Aakash Johry, Tilde Bekker & Helle Marie Skovbjerg",
    venue:
      "International Conference on Research into Design (ICORD 2023) · Best Paper Award",
    link: "https://doi.org/10.1007/978-981-99-0428-0_59",
  },
]
