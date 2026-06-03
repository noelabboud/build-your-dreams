import courtroom from "@/assets/concept-courtroom.jpg";
import impostor from "@/assets/concept-impostor.jpg";
import beirut from "@/assets/concept-beirut.jpg";
import survivor from "@/assets/concept-survivor.jpg";
import voicenote from "@/assets/concept-voicenote.jpg";
import excuse from "@/assets/concept-excuse.jpg";
import samer from "@/assets/avatar-samer.jpg";
import marc from "@/assets/avatar-marc.jpg";

export const images = { courtroom, impostor, beirut, survivor, voicenote, excuse, samer, marc };

export type ConceptType =
  | "Narrative Series"
  | "Episodic Series"
  | "Competitive Series"
  | "One Shot Event"
  | "Minigame";

export type Concept = {
  id: string;
  title: string;
  type: ConceptType;
  host: string;
  hostId: string;
  rating: number;
  participants: string;
  image: string;
  tags: string[];
  status?: "live" | "ended" | "upcoming";
};

export const concepts: Concept[] = [
  {
    id: "courtroom",
    title: "The Courtroom",
    type: "Narrative Series",
    host: "Samer",
    hostId: "samer",
    rating: 4.8,
    participants: "1.2K",
    image: courtroom,
    tags: ["Story", "Audience-Driven", "Weekly"],
    status: "live",
  },
  {
    id: "escape-beirut",
    title: "Escape Beirut",
    type: "Episodic Series",
    host: "Elissa",
    hostId: "elissa",
    rating: 4.6,
    participants: "740",
    image: beirut,
    tags: ["Adventure", "Recurring"],
  },
  {
    id: "survivor",
    title: "Survivor League",
    type: "Competitive Series",
    host: "Basit",
    hostId: "basit",
    rating: 4.8,
    participants: "2.1K",
    image: survivor,
    tags: ["Elimination", "Tournament"],
  },
  {
    id: "excuse-champ",
    title: "Worst Excuse Championship",
    type: "One Shot Event",
    host: "Elissa",
    hostId: "elissa",
    rating: 4.6,
    participants: "2.4K",
    image: excuse,
    tags: ["Comedy", "Standalone"],
  },
  {
    id: "voice-roulette",
    title: "Voice Note Roulette",
    type: "Minigame",
    host: "Samer",
    hostId: "samer",
    rating: 4.7,
    participants: "982",
    image: voicenote,
    tags: ["Live", "Automated"],
    status: "upcoming",
  },
  {
    id: "impostor",
    title: "Impostor League",
    type: "Competitive Series",
    host: "Basit",
    hostId: "basit",
    rating: 4.6,
    participants: "1.3K",
    image: impostor,
    tags: ["Mystery", "Elimination"],
  },
];

export type OpenToJoinItem = {
  id: string;
  conceptId: string;
  title: string;
  subtitle: string;
  type: ConceptType;
  host: string;
  hostId: string;
  image: string;
  participants: string;
  availability:
    | { kind: "capped"; spotsLeft: number; totalSpots: number }
    | { kind: "uncapped"; closesIn: string };
};

export const openToJoinItems: OpenToJoinItem[] = [
  {
    id: "courtroom-defense",
    conceptId: "courtroom",
    title: "The Missing Witness",
    subtitle: "Submit your defense before voting opens.",
    type: "Narrative Series",
    host: "Samer",
    hostId: "samer",
    image: courtroom,
    participants: "1.2K joined",
    availability: { kind: "capped", spotsLeft: 18, totalSpots: 60 },
  },
  {
    id: "voice-roulette-open",
    conceptId: "voice-roulette",
    title: "Voice Note Roulette",
    subtitle: "Quick round, instant scoring, live reactions.",
    type: "Minigame",
    host: "Samer",
    hostId: "samer",
    image: voicenote,
    participants: "982 ready",
    availability: { kind: "uncapped", closesIn: "4h" },
  },
  {
    id: "excuse-final-call",
    conceptId: "excuse-champ",
    title: "Worst Excuse Championship",
    subtitle: "Last chance to enter the comedy bracket.",
    type: "One Shot Event",
    host: "Elissa",
    hostId: "elissa",
    image: excuse,
    participants: "2.4K watching",
    availability: { kind: "capped", spotsLeft: 3, totalSpots: 40 },
  },
];

export const episodes = [
  {
    n: 1,
    title: "The Accusation",
    status: "completed",
    score: 8.2,
    percentile: "Top 10%",
    rating: 4.7,
  },
  {
    n: 2,
    title: "The Evidence",
    status: "completed",
    score: 8.6,
    percentile: "Top 5%",
    rating: 4.8,
  },
  {
    n: 3,
    title: "The Missing Witness",
    status: "live",
    score: 8.9,
    percentile: "Top 5%",
    rating: 4.8,
  },
  { n: 4, title: "The Final Argument", status: "upcoming", rating: null },
  { n: 5, title: "The Verdict", status: "locked", rating: null },
  { n: 6, title: "Aftermath", status: "locked", rating: null },
];

export const categories = [
  { id: "comedy", label: "Comedy", emoji: "😄", color: "oklch(0.93 0.08 75)" },
  { id: "mystery", label: "Mystery", emoji: "🕵️", color: "oklch(0.88 0.1 290)" },
  { id: "competition", label: "Competition", emoji: "🏆", color: "oklch(0.93 0.1 85)" },
  { id: "story", label: "Story", emoji: "📖", color: "oklch(0.9 0.08 20)" },
  { id: "voice", label: "Voice Notes", emoji: "🎙️", color: "oklch(0.9 0.07 240)" },
  { id: "community", label: "Community", emoji: "👥", color: "oklch(0.9 0.09 150)" },
  { id: "games", label: "Games", emoji: "🎮", color: "oklch(0.9 0.08 200)" },
  { id: "other", label: "Other", emoji: "✨", color: "oklch(0.92 0.05 260)" },
];

export const topHosts = [
  { id: "samer", name: "Samer", followers: "200K", concepts: 12, rating: 4.8, avatar: samer },
  { id: "basit", name: "Basit", followers: "120K", concepts: 8, rating: 4.7, avatar: marc },
  { id: "elissa", name: "Elissa", followers: "80K", concepts: 6, rating: 4.6, avatar: samer },
];

export const me = {
  name: "Marc El Hage",
  handle: "@marc",
  badge: "Top 5% Storyteller",
  level: 18,
  xpToNext: 3240,
  avatar: marc,
  stats: { joined: 14, played: 87, wins: 12, top10: 25 },
  traits: { Humor: 8.7, Creativity: 9.0, Storytelling: 7.8, Originality: 8.4, Persuasion: 8.2 },
};
