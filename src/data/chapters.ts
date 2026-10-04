// Multi-Chapter Journey Architecture for Akshita & Vivaan

export interface ChapterInfo {
  id: number;
  title: string;
  subtitle: string;
  theme: 'calm' | 'cute' | 'funny' | 'chaotic' | 'emotional' | 'magical' | 'romantic';
  durationMin: number;
  description: string;
}

export const CHAPTERS: ChapterInfo[] = [
  {
    id: 1,
    title: "the secret door",
    subtitle: "where it all begins",
    theme: "calm",
    durationMin: 1,
    description: "a minimal entry into a secret world created for one person."
  },
  {
    id: 2,
    title: "the memory room",
    subtitle: "physical memories suspended in space",
    theme: "cute",
    durationMin: 1.5,
    description: "pinned, floating, and taped polaroids with hidden secrets."
  },
  {
    id: 3,
    title: "the akshita archive",
    subtitle: "classified database: highly confidential",
    theme: "funny",
    durationMin: 1.5,
    description: "fictional dossiers, metric gauges, and dangerous cuteness levels."
  },
  {
    id: 4,
    title: "the chaos machine",
    subtitle: "honest confessions & controlled explosions",
    theme: "chaotic",
    durationMin: 1.5,
    description: "warning alerts, interactive chaos escalators, and unhinged energy."
  },
  {
    id: 5,
    title: "things i miss",
    subtitle: "a quiet emotional pause",
    theme: "emotional",
    durationMin: 1.5,
    description: "one memory at a time, revealing what life feels like without you near."
  },
  {
    id: 6,
    title: "the photo universe",
    subtitle: "a 3d memory constellation",
    theme: "magical",
    durationMin: 1.5,
    description: "floating memories in depth that subtly coalesce into a heart."
  },
  {
    id: 7,
    title: "the 'i love you' department",
    subtitle: "we need to talk about this",
    theme: "romantic",
    durationMin: 1.5,
    description: "the silly, funny, and deeply true reasons why you matter so much."
  },
  {
    id: 8,
    title: "the dream sequence",
    subtitle: "the song that carries your memory",
    theme: "magical",
    durationMin: 1.5,
    description: "slow dissolving memories and cinema where music speaks."
  },
  {
    id: 9,
    title: "the final walk",
    subtitle: "approaching the destination",
    theme: "calm",
    durationMin: 1,
    description: "the world quiets down as the journey nears its true purpose."
  },
  {
    id: 10,
    title: "the question",
    subtitle: "will u go on a date with me?",
    theme: "romantic",
    durationMin: 2,
    description: "the final destination, the dodging NO, the grand YES, and the date plan."
  }
];
