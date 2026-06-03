export type Research = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  authors: string
  year?: string
  link?: string
}

/**
 * Publications — final list from "research works by games lab-final.docx".
 * Descriptions are the abstracts supplied in the source doc. `link` is the
 * DOI. Years were NOT provided in the source, so they are intentionally
 * omitted. Title #2 was title-cased for display (source was all-caps).
 * `image` reuses the four existing /images/research/*.jpg (only research[0]
 * and research[1] surface as images on the homepage HighlightedWorks block).
 */
export const research: Research[] = [
  {
    id: "gamifying-mental-wellbeing",
    title:
      "Gamifying Mental Well-Being Assessment: A New Approach for College-Going Students Using the 'Oxford Happiness Questionnaire'",
    description:
      'Gamifying the Oxford Happiness Questionnaire through an app called "The Mirror" significantly increases user engagement and enjoyment for college students compared to the traditional text-based format.',
    image: "/images/research/research1.jpg",
    tags: ["Conference Paper", "Well-being", "Gamification"],
    authors: "Renuka Singh, Harsh Mohan Shrivastava, M. Krishnadas & Aakash Johry",
    link: "https://doi.org/10.1007/978-3-031-80832-6_8",
  },
  {
    id: "educational-goals-intellectual-disabilities",
    title:
      "Understanding the Perception and Process of Practitioners in Defining and Achieving the Educational Goals of Children with Intellectual Disabilities in India",
    description:
      "Exploring how special educators in an Indian metropolitan school develop and implement IEPs for children with intellectual disabilities.",
    image: "/images/research/research2.jpg",
    tags: ["Conference Paper", "Accessibility", "Education"],
    authors: "Harsh Mohan Shrivastava & Aakash Johry",
    link: "https://doi.org/10.21125/edulearn.2025.0933",
  },
  {
    id: "vui-inclusive-games-visual-impairment",
    title:
      "Voice User Interface for Designing Inclusive Games for Children with Visual Impairment and Sighted Pupils",
    description:
      "How Voice User Interfaces like Amazon Alexa can facilitate inclusive play between visually impaired and sighted children in Indian schools.",
    image: "/images/research/research3.jpg",
    tags: ["Conference Paper", "Accessibility", "Inclusive Play"],
    authors: "Monika & Aakash Johry",
    link: "https://doi.org/10.1007/978-3-031-80832-6_7",
  },
  {
    id: "designing-pachi",
    title:
      "Designing Pachi: A Verbal Language Learning Application for Children with Hearing Impairment in India",
    description:
      'Addressing the limited availability of formal therapy in India, introducing "Pachi," a tablet-based app designed to enhance Hindi language development for hearing-impaired children.',
    image: "/images/research/research4.jpg",
    tags: ["Conference Paper", "Accessibility", "Language Learning"],
    authors: "Radhika Sharma & Aakash Johry",
    link: "https://doi.org/10.1007/978-3-031-62849-8_8",
  },
  {
    id: "body-language-design-students",
    title:
      "Impact of Body Language on Design Students — A Case Study at an Indian University Classroom",
    description:
      "Using a research-through-design approach and two gamified probes to explore the impact of non-verbal communication on university design students in India.",
    image: "/images/research/research1.jpg",
    tags: ["Conference Paper", "Design Education"],
    authors: "Bhagyashri Sharma, U. M. Krishnanunni & Aakash Johry",
    link: "https://doi.org/10.1007/978-981-96-5495-6_29",
  },
  {
    id: "theory-as-design-material",
    title:
      "Theory as Design Material: How Design Researchers Use Design Skills to Explore the Malleability of Theory",
    description:
      "How design researchers explore the use of various forms of knowledge, such as theory, through their design skills and design practices.",
    image: "/images/research/research2.jpg",
    tags: ["Journal Article", "Design Research"],
    authors: "Tilde Bekker, Helle Marie Skovbjerg, Maria Lyndgaard & Aakash Johry",
    link: "https://doi.org/10.57698/v19i2.01",
  },
  {
    id: "existing-knowledge-research-through-design",
    title:
      "Facilitating Use of Existing Knowledge in Research-Through-Design: A Case Study with Design Students",
    description:
      "How design students struggle to integrate existing knowledge and theory into their projects. Using a design-based research approach within a bachelor-level play design course, the authors act as facilitators to introduce educational interventions across the Research-through-Design (RtD) process.",
    image: "/images/research/research3.jpg",
    tags: ["Conference Paper", "Research-through-Design"],
    authors: "Aakash Johry, Tilde Bekker & Helle Marie Skovbjerg",
    link: "https://doi.org/10.1007/978-981-99-0428-0_59",
  },
]
