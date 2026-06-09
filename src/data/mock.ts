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
  participation?: {
    ctaLabel?: string;
    closedLabel?: string;
    allowLateEntry?: boolean;
    priceLabel?: string;
    availability?:
      | {
          kind: "capped";
          joinedSpots: number;
          totalSpots: number;
        }
      | {
          kind: "uncapped";
          ticketingClosesAt: string;
          startsAt: string;
        };
  };
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
    participation: {
      priceLabel: "$4.99",
    },
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
    participation: {
      availability: {
        kind: "capped",
        joinedSpots: 56,
        totalSpots: 80,
      },
    },
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
    participation: {
      availability: {
        kind: "capped",
        joinedSpots: 45,
        totalSpots: 60,
      },
    },
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
    participation: {
      availability: {
        kind: "capped",
        joinedSpots: 37,
        totalSpots: 40,
      },
    },
  },
  {
    id: "voice-roulette",
    title: "Voice Note Roulette",
    type: "One Shot Event",
    host: "Samer",
    hostId: "samer",
    rating: 4.7,
    participants: "982",
    image: voicenote,
    tags: ["Voice", "One Shot"],
    status: "upcoming",
    participation: {
      availability: {
        kind: "uncapped",
        ticketingClosesAt: "2026-06-08T18:00:00+03:00",
        startsAt: "2026-06-08T20:00:00+03:00",
      },
    },
  },
  {
    id: "chifomi-duel",
    title: "Chifomi Duel",
    type: "Minigame",
    host: "Basit",
    hostId: "basit",
    rating: 4.5,
    participants: "620",
    image: impostor,
    tags: ["Real-Time", "Duel", "Elimination"],
    status: "upcoming",
    participation: {
      availability: {
        kind: "capped",
        joinedSpots: 93,
        totalSpots: 120,
      },
    },
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
    participation: {
      availability: {
        kind: "capped",
        joinedSpots: 52,
        totalSpots: 64,
      },
    },
  },
];

export type MyConceptStatus = "toSubmit" | "toVote" | "waiting" | "completed";

export type MyConceptItem = {
  id: string;
  conceptId: string;
  status: MyConceptStatus;
  subtitle: string;
  note?: string;
  progress?: number;
};

export const myConceptItems: MyConceptItem[] = [
  {
    id: "courtroom-active",
    conceptId: "courtroom",
    status: "toSubmit",
    subtitle: "Episode 4 in 2 days",
    progress: 70,
  },
  {
    id: "escape-submit",
    conceptId: "escape-beirut",
    status: "toSubmit",
    subtitle: "Episode 2 submission due tonight",
    progress: 35,
  },
  {
    id: "impostor-vote",
    conceptId: "impostor",
    status: "toVote",
    subtitle: "Round 3 — Voting",
    note: "You're qualified",
  },
  {
    id: "voice-waiting",
    conceptId: "voice-roulette",
    status: "waiting",
    subtitle: "Final entries close tomorrow",
  },
  {
    id: "excuse-completed",
    conceptId: "excuse-champ",
    status: "completed",
    subtitle: "You placed Top 5% · Completed on May 4",
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
    subtitle: "Send one voice note before the event locks.",
    type: "One Shot Event",
    host: "Samer",
    hostId: "samer",
    image: voicenote,
    participants: "982 joined",
    availability: { kind: "uncapped", closesIn: "4h" },
  },
  {
    id: "escape-beirut-open",
    conceptId: "escape-beirut",
    title: "Rooftop Escape",
    subtitle: "Join the next episode and solve the route.",
    type: "Episodic Series",
    host: "Elissa",
    hostId: "elissa",
    image: beirut,
    participants: "740 joined",
    availability: { kind: "capped", spotsLeft: 24, totalSpots: 80 },
  },
  {
    id: "impostor-qualifier",
    conceptId: "impostor",
    title: "Impostor Qualifier",
    subtitle: "Enter the next elimination bracket.",
    type: "Competitive Series",
    host: "Basit",
    hostId: "basit",
    image: impostor,
    participants: "1.3K joined",
    availability: { kind: "capped", spotsLeft: 12, totalSpots: 64 },
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
    participants: "2.4K joined",
    availability: { kind: "capped", spotsLeft: 3, totalSpots: 40 },
  },
  {
    id: "chifomi-live-duel",
    conceptId: "chifomi-duel",
    title: "Chifomi Duel",
    subtitle: "Play live once the room fills.",
    type: "Minigame",
    host: "Basit",
    hostId: "basit",
    image: impostor,
    participants: "620 joined",
    availability: { kind: "capped", spotsLeft: 27, totalSpots: 120 },
  },
];

export const episodes = [
  {
    conceptId: "courtroom",
    n: 1,
    title: "The Accusation",
    status: "completed",
    score: 8.2,
    percentile: "Top 10%",
    rating: 4.7,
  },
  {
    conceptId: "courtroom",
    n: 2,
    title: "The Evidence",
    status: "completed",
    score: 8.6,
    percentile: "Top 5%",
    rating: 4.8,
  },
  {
    conceptId: "courtroom",
    n: 3,
    title: "The Missing Witness",
    status: "live",
    score: 8.9,
    percentile: "Top 5%",
    rating: 4.8,
  },
  { conceptId: "courtroom", n: 4, title: "The Final Argument", status: "upcoming", rating: null },
  { conceptId: "courtroom", n: 5, title: "The Verdict", status: "locked", rating: null },
  { conceptId: "courtroom", n: 6, title: "Aftermath", status: "locked", rating: null },
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
  {
    id: "samer",
    name: "Samer",
    followers: "200K",
    concepts: 12,
    rating: 4.8,
    avatar: samer,
    coverImage: courtroom,
    verified: true,
    completedEpisodes: 18,
    bio: "Interactive fiction host building courtroom stories, voice events, and audience-shaped mysteries across MIDAN.",
    socials: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      twitch: "https://twitch.tv",
    },
  },
  {
    id: "basit",
    name: "Basit",
    followers: "120K",
    concepts: 8,
    rating: 4.7,
    avatar: marc,
    coverImage: impostor,
    verified: true,
    completedEpisodes: 11,
    bio: "Competition designer focused on elimination formats, live rooms, and quick games with clear winners.",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      twitch: "https://twitch.tv",
    },
  },
  {
    id: "elissa",
    name: "Elissa",
    followers: "80K",
    concepts: 6,
    rating: 4.6,
    avatar: samer,
    coverImage: beirut,
    verified: false,
    completedEpisodes: 9,
    bio: "Episode host creating adventure prompts, comedy events, and one-shot challenges for fast community play.",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
    },
  },
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

export type PassportFormat = "Narrative" | "Episodic" | "Competitive" | "One Shot" | "Minigames";

export type PassportHistoryItem = {
  id: string;
  format: PassportFormat;
  conceptTitle: string;
  episodeLabel?: string;
  status: "Completed" | "Submitted" | "Qualified" | "Played";
  date: string;
  result?: string;
  xp: number;
  badges: string[];
  submission: {
    kind: "Text" | "Image" | "Video" | "Live Action";
    preview: string;
  };
  score?: number;
  averageScore?: number;
  rank?: string;
  hostFeedback?: string;
  communityRating?: number;
};

export const passportProfile = {
  progress: {
    level: 6,
    label: "Level 6 Creator",
    currentXp: 1240,
    nextLevelXp: 1500,
    nextLevel: 7,
  },
  coreStats: [
    { label: "Concepts joined", value: "14" },
    { label: "Episodes completed", value: "37" },
    { label: "Submissions made", value: "42" },
    { label: "Completion rate", value: "91%" },
  ],
  reliability: [
    { label: "On-time submissions", value: "94%" },
    { label: "Voting completion", value: "88%" },
    { label: "Dropout rate", value: "4%" },
  ],
  recognition: [
    { label: "Wins", value: "12" },
    { label: "Top placements", value: "25" },
    { label: "Featured entries", value: "7" },
    { label: "Average rating", value: "4.8" },
  ],
  badges: [
    {
      id: "first-place",
      name: "First Place",
      count: 3,
      description: "Finished at the top of ranked concepts.",
    },
    {
      id: "top-10",
      name: "Top 10%",
      count: 9,
      description: "Placed in the top tier across judged episodes.",
    },
    {
      id: "featured-host",
      name: "Featured by Host",
      count: 4,
      description: "Selected by a host for standout contribution.",
    },
    {
      id: "fast-finisher",
      name: "Fast Finisher",
      count: 5,
      description: "Submitted high-quality work early.",
    },
    {
      id: "reliable",
      name: "Reliable Participant",
      count: 12,
      description: "Consistently completed entries and votes.",
    },
    {
      id: "community-favorite",
      name: "Community Favorite",
      count: 2,
      description: "Earned strong audience support.",
    },
  ],
  history: [
    {
      id: "courtroom-ep3",
      format: "Narrative",
      conceptTitle: "The Courtroom",
      episodeLabel: "Episode 3 - The Missing Witness",
      status: "Completed",
      date: "May 28, 2026",
      result: "Top 5%",
      xp: 180,
      badges: ["Top 10%", "Featured by Host"],
      submission: {
        kind: "Text",
        preview:
          "The witness did not disappear after the argument. The voice note proves he was still near the courthouse at 9:42 PM, which breaks the prosecution timeline.",
      },
      score: 8.9,
      averageScore: 7.1,
      rank: "18 / 438",
      hostFeedback: "Strong timeline logic with a clean final argument.",
      communityRating: 4.8,
    },
    {
      id: "courtroom-ep2",
      format: "Narrative",
      conceptTitle: "The Courtroom",
      episodeLabel: "Episode 2 - The Evidence",
      status: "Completed",
      date: "May 21, 2026",
      result: "Top 10%",
      xp: 140,
      badges: ["Top 10%"],
      submission: {
        kind: "Text",
        preview:
          "The missing evidence label matters because the room log and the witness statement disagree by eleven minutes.",
      },
      score: 8.6,
      averageScore: 7.0,
      rank: "31 / 421",
      hostFeedback: "Persuasive and easy for voters to follow.",
      communityRating: 4.7,
    },
    {
      id: "escape-ep2",
      format: "Episodic",
      conceptTitle: "Escape Beirut",
      episodeLabel: "Episode 2 - Rooftop Route",
      status: "Submitted",
      date: "June 2, 2026",
      result: "Completed",
      xp: 90,
      badges: ["Reliable Participant"],
      submission: {
        kind: "Image",
        preview: "Mock image submission: annotated rooftop route with three escape checkpoints.",
      },
      score: 7.8,
      averageScore: 7.3,
      hostFeedback: "Practical idea with a memorable visual hook.",
      communityRating: 4.4,
    },
    {
      id: "impostor-r3",
      format: "Competitive",
      conceptTitle: "Impostor League",
      episodeLabel: "Round 3 - Voting",
      status: "Qualified",
      date: "June 4, 2026",
      result: "Qualified",
      xp: 160,
      badges: ["Fast Finisher"],
      submission: {
        kind: "Text",
        preview:
          "Basit’s round-three pattern points to a late alliance shift: the safest player voted second, not last.",
      },
      score: 8.1,
      averageScore: 7.4,
      rank: "22 / 128",
      hostFeedback: "Smart strategy, especially the timing callout.",
      communityRating: 4.5,
    },
    {
      id: "excuse-final",
      format: "One Shot",
      conceptTitle: "Worst Excuse Championship",
      status: "Completed",
      date: "May 4, 2026",
      result: "Top 5%",
      xp: 130,
      badges: ["Community Favorite"],
      submission: {
        kind: "Video",
        preview:
          "Mock video submission: 34-second comedy clip explaining three impossible family emergencies.",
      },
      score: 8.4,
      averageScore: 6.9,
      rank: "9 / 220",
      hostFeedback: "Funny, specific, and instantly readable.",
      communityRating: 4.9,
    },
    {
      id: "chifomi-live",
      format: "Minigames",
      conceptTitle: "Chifomi Duel",
      episodeLabel: "Live Room 12",
      status: "Played",
      date: "June 6, 2026",
      result: "Final 16",
      xp: 55,
      badges: ["Fast Finisher"],
      submission: {
        kind: "Live Action",
        preview: "Live game log: rock, paper, paper, scissors, rock, rock, scissors.",
      },
      score: 7.2,
      averageScore: 6.8,
      rank: "14 / 120",
      communityRating: 4.2,
    },
  ] satisfies PassportHistoryItem[],
};
