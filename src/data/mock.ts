import courtroom from "@/assets/concept-courtroom.jpg";
import impostor from "@/assets/concept-impostor.jpg";
import beirut from "@/assets/concept-beirut.jpg";
import survivor from "@/assets/concept-survivor.jpg";
import voicenote from "@/assets/concept-voicenote.jpg";
import excuse from "@/assets/concept-excuse.jpg";
import samer from "@/assets/avatar-samer.jpg";
import marc from "@/assets/avatar-marc.jpg";

export const images = { courtroom, impostor, beirut, survivor, voicenote, excuse, samer, marc };

export type Concept = {
  id: string;
  title: string;
  host: string;
  hostId: string;
  rating: number;
  participants: string;
  image: string;
  tags: string[];
  status?: "live" | "ended" | "upcoming";
};

export const concepts: Concept[] = [
  { id: "courtroom", title: "The Courtroom", host: "Samer", hostId: "samer", rating: 4.8, participants: "1.2K", image: courtroom, tags: ["Story", "Competition", "Weekly Series"], status: "live" },
  { id: "voice-roulette", title: "Voice Note Roulette", host: "Samer", hostId: "samer", rating: 4.7, participants: "982", image: voicenote, tags: ["Voice Notes", "Community"], status: "upcoming" },
  { id: "impostor", title: "Impostor League", host: "Basit", hostId: "basit", rating: 4.6, participants: "1.3K", image: impostor, tags: ["Mystery", "Competition"] },
  { id: "escape-beirut", title: "Escape Beirut", host: "Elissa", hostId: "elissa", rating: 4.6, participants: "740", image: beirut, tags: ["Story", "Adventure"] },
  { id: "survivor", title: "Survivor League", host: "Basit", hostId: "basit", rating: 4.8, participants: "2.1K", image: survivor, tags: ["Competition", "Reality"] },
  { id: "excuse-champ", title: "Worst Excuse Championship", host: "Elissa", hostId: "elissa", rating: 4.6, participants: "2.4K", image: excuse, tags: ["Comedy"] },
];

export const episodes = [
  { n: 1, title: "The Accusation", status: "completed", score: 8.2, percentile: "Top 10%", rating: 4.7 },
  { n: 2, title: "The Evidence", status: "completed", score: 8.6, percentile: "Top 5%", rating: 4.8 },
  { n: 3, title: "The Missing Witness", status: "live", score: 8.9, percentile: "Top 5%", rating: 4.8 },
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
