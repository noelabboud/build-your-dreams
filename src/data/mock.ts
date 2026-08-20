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
    id: "midnight-jury",
    title: "Midnight Jury",
    type: "Narrative Series",
    host: "Samer",
    hostId: "samer",
    rating: 4.8,
    participants: "312",
    image: courtroom,
    tags: ["Story", "Connected", "Full Series"],
    status: "upcoming",
    participation: {
      ctaLabel: "Buy Full Story",
      priceLabel: "$4.99",
      availability: {
        kind: "capped",
        joinedSpots: 42,
        totalSpots: 60,
      },
    },
  },
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
      ctaLabel: "Join Full Series",
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
  joinModel: "full_series" | "episode_based" | "single_event" | "instant_round";
  status: "open" | "in_progress" | "closed";
  ctaLabel: string;
  joinScope: string;
  currentEpisode?: number;
  currentRound?: number;
  requiresFullPurchase?: boolean;
  host: string;
  hostId: string;
  image: string;
  participants: string;
  availability:
    | { kind: "capped"; spotsLeft: number; totalSpots: number }
    | { kind: "uncapped"; closesIn: string };
};

const openToJoinOpportunities: OpenToJoinItem[] = [
  {
    id: "courtroom-full-story",
    conceptId: "midnight-jury",
    title: "Midnight Jury",
    subtitle: "Buy the full connected story before episode 1 begins.",
    type: "Narrative Series",
    joinModel: "full_series",
    status: "open",
    ctaLabel: "Buy Full Story",
    joinScope: "Full story",
    requiresFullPurchase: true,
    host: "Samer",
    hostId: "samer",
    image: courtroom,
    participants: "1.2K joined",
    availability: { kind: "uncapped", closesIn: "2d" },
  },
  {
    id: "escape-beirut-open",
    conceptId: "escape-beirut",
    title: "Rooftop Escape",
    subtitle: "Join the next episode and solve the route.",
    type: "Episodic Series",
    joinModel: "episode_based",
    status: "open",
    ctaLabel: "Join Episode",
    joinScope: "Episode 2",
    currentEpisode: 2,
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
    joinModel: "full_series",
    status: "open",
    ctaLabel: "Join Full Series",
    joinScope: "Full series",
    requiresFullPurchase: true,
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
    joinModel: "single_event",
    status: "open",
    ctaLabel: "Join Event",
    joinScope: "One event",
    host: "Elissa",
    hostId: "elissa",
    image: excuse,
    participants: "2.4K joined",
    availability: { kind: "uncapped", closesIn: "4h" },
  },
  {
    id: "chifomi-live-duel",
    conceptId: "chifomi-duel",
    title: "Chifomi Duel",
    subtitle: "Play live once the room fills.",
    type: "Minigame",
    joinModel: "instant_round",
    status: "open",
    ctaLabel: "Play Now",
    joinScope: "Minigame round",
    currentRound: 1,
    host: "Basit",
    hostId: "basit",
    image: impostor,
    participants: "620 joined",
    availability: { kind: "uncapped", closesIn: "12m" },
  },
];

export const openToJoinItems = openToJoinOpportunities.filter((item) => item.status === "open");

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
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
      twitch: "https://twitch.tv",
    },
    socialStats: {
      instagram: "200K",
      tiktok: "520K",
      youtube: "84K",
      twitch: "38K",
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
    socialStats: {
      instagram: "120K",
      tiktok: "310K",
      twitch: "64K",
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
    socialStats: {
      instagram: "80K",
      tiktok: "210K",
      youtube: "46K",
    },
  },
];

export type CreativeCategory = "Acting" | "Writing" | "Comedy" | "Photo" | "Video";

export type SubmissionMediaKind = "Video" | "Script" | "Photo" | "Audio" | "Text";

export type AchievementType =
  | "Winner"
  | "Finalist"
  | "Host Pick"
  | "Judge Pick"
  | "Qualified"
  | "Completed";

export type PassportSubmission = {
  id: string;
  conceptTitle: string;
  seasonLabel?: string;
  category: CreativeCategory;
  kind: SubmissionMediaKind;
  title?: string;
  thumbnail?: string;
  preview?: string;
  date: string;
  hostId: string;
  hostName: string;
  placementLabel?: string;
  recognitionType?: AchievementType;
};

export type PassportAchievement = {
  id: string;
  type: AchievementType;
  category: CreativeCategory;
  conceptTitle: string;
  seasonLabel?: string;
  hostId: string;
  hostName: string;
  date: string;
  placementLabel: string;
  placementRank: number;
  entrantCount?: number;
  judgeScore?: number;
  communityVotePercent?: number;
  recognitionNote?: string;
  evaluationMethod?: string;
  stageProgression?: string[];
  featured?: boolean;
  submissionId: string;
};

export type ParticipantPassport = {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  categories: CreativeCategory[];
  xp: {
    level: number;
    label: string;
    currentXp: number;
    nextLevelXp: number;
  };
  achievements: PassportAchievement[];
  submissions: PassportSubmission[];
  participation: {
    completionRate: number;
    onTimeRate: number;
    conceptsCompleted: number;
    averageJudgeScore: number;
    votingCompletionRate: number;
    dropoutRate: number;
    repeatHostRate: number;
  };
};

export const participantPassport: ParticipantPassport = {
  name: "Marc El Hage",
  handle: "@marc",
  avatar: marc,
  bio: "Performer and writer chasing courtroom dramas, twist endings, and anything with a live audience.",
  categories: ["Acting", "Writing", "Comedy"],
  xp: {
    level: 6,
    label: "Participant Level 6",
    currentXp: 1240,
    nextLevelXp: 1500,
  },
  achievements: [
    {
      id: "last-night-alive",
      type: "Finalist",
      category: "Acting",
      conceptTitle: "Last Night Alive",
      seasonLabel: "Season 2",
      hostId: "samer",
      hostName: "Samer",
      date: "Aug 2, 2026",
      placementLabel: "Top 8 / 624",
      placementRank: 8,
      entrantCount: 624,
      judgeScore: 91,
      evaluationMethod: "Host judge panel scored live performance rounds.",
      stageProgression: ["Open Call", "Callback", "Semifinal", "Final Eight"],
      featured: true,
      submissionId: "sub-last-night-alive",
    },
    {
      id: "write-my-ending",
      type: "Winner",
      category: "Writing",
      conceptTitle: "Write My Ending",
      hostId: "elissa",
      hostName: "Elissa",
      date: "Jul 14, 2026",
      placementLabel: "1st / 318",
      placementRank: 1,
      entrantCount: 318,
      communityVotePercent: 68,
      recognitionNote: "Creator Pick + Audience Finalist",
      evaluationMethod: "Host creator pick, decided by audience vote.",
      stageProgression: ["Entry", "Shortlist", "Audience Vote", "Winner"],
      featured: true,
      submissionId: "sub-write-my-ending",
    },
    {
      id: "character-switch",
      type: "Winner",
      category: "Acting",
      conceptTitle: "Character Switch",
      hostId: "basit",
      hostName: "Basit",
      date: "Jun 20, 2026",
      placementLabel: "1st / 410",
      placementRank: 1,
      entrantCount: 410,
      judgeScore: 95,
      evaluationMethod: "Judged by host panel across two performance rounds.",
      stageProgression: ["Entry", "Quarterfinal", "Final"],
      featured: true,
      submissionId: "sub-character-switch",
    },
    {
      id: "impro-nights",
      type: "Finalist",
      category: "Acting",
      conceptTitle: "Impro Nights",
      hostId: "samer",
      hostName: "Samer",
      date: "Mar 9, 2026",
      placementLabel: "Top 10 / 180",
      placementRank: 10,
      entrantCount: 180,
      judgeScore: 87,
      submissionId: "sub-impro-nights",
    },
    {
      id: "two-truths-one-lie",
      type: "Finalist",
      category: "Acting",
      conceptTitle: "Two Truths One Lie",
      hostId: "basit",
      hostName: "Basit",
      date: "Feb 18, 2026",
      placementLabel: "Top 12 / 300",
      placementRank: 12,
      entrantCount: 300,
      judgeScore: 84,
      submissionId: "sub-two-truths-one-lie",
    },
    {
      id: "silent-room",
      type: "Completed",
      category: "Acting",
      conceptTitle: "Silent Room",
      hostId: "elissa",
      hostName: "Elissa",
      date: "Apr 11, 2026",
      placementLabel: "Completed",
      placementRank: 999,
      entrantCount: 150,
      submissionId: "sub-silent-room",
    },
    {
      id: "impostors-voice",
      type: "Completed",
      category: "Acting",
      conceptTitle: "The Impostor's Voice",
      hostId: "elissa",
      hostName: "Elissa",
      date: "Jan 24, 2026",
      placementLabel: "Completed",
      placementRank: 999,
      entrantCount: 210,
      submissionId: "sub-impostors-voice",
    },
    {
      id: "plot-twist-lab",
      type: "Finalist",
      category: "Writing",
      conceptTitle: "Plot Twist Lab",
      hostId: "samer",
      hostName: "Samer",
      date: "May 6, 2026",
      placementLabel: "Top 15 / 210",
      placementRank: 15,
      entrantCount: 210,
      judgeScore: 93,
      submissionId: "sub-plot-twist-lab",
    },
    {
      id: "midnight-confessions",
      type: "Finalist",
      category: "Writing",
      conceptTitle: "Midnight Confessions",
      hostId: "samer",
      hostName: "Samer",
      date: "Jun 3, 2026",
      placementLabel: "Top 10 / 240",
      placementRank: 10,
      entrantCount: 240,
      judgeScore: 88,
      submissionId: "sub-midnight-confessions",
    },
    {
      id: "cliffhanger-club",
      type: "Completed",
      category: "Writing",
      conceptTitle: "Cliffhanger Club",
      hostId: "elissa",
      hostName: "Elissa",
      date: "Mar 27, 2026",
      placementLabel: "Completed",
      placementRank: 999,
      entrantCount: 130,
      submissionId: "sub-cliffhanger-club",
    },
    {
      id: "60-second-comedy",
      type: "Host Pick",
      category: "Comedy",
      conceptTitle: "60 Second Comedy",
      hostId: "basit",
      hostName: "Basit",
      date: "May 30, 2026",
      placementLabel: "Top 5 / 190",
      placementRank: 5,
      entrantCount: 190,
      recognitionNote: "Selected by host for standout timing.",
      submissionId: "sub-60-second-comedy",
    },
    {
      id: "worst-alibi-ever",
      type: "Completed",
      category: "Comedy",
      conceptTitle: "Worst Alibi Ever",
      hostId: "basit",
      hostName: "Basit",
      date: "Apr 2, 2026",
      placementLabel: "Completed",
      placementRank: 999,
      entrantCount: 260,
      submissionId: "sub-worst-alibi-ever",
    },
    {
      id: "roast-battle-royale",
      type: "Completed",
      category: "Comedy",
      conceptTitle: "Roast Battle Royale",
      hostId: "basit",
      hostName: "Basit",
      date: "Feb 9, 2026",
      placementLabel: "Completed",
      placementRank: 999,
      entrantCount: 340,
      submissionId: "sub-roast-battle-royale",
    },
    {
      id: "cold-open-challenge",
      type: "Completed",
      category: "Comedy",
      conceptTitle: "Cold Open Challenge",
      hostId: "elissa",
      hostName: "Elissa",
      date: "Jan 12, 2026",
      placementLabel: "Completed",
      placementRank: 999,
      entrantCount: 175,
      submissionId: "sub-cold-open-challenge",
    },
    {
      id: "punchline-sprint",
      type: "Completed",
      category: "Comedy",
      conceptTitle: "Punchline Sprint",
      hostId: "basit",
      hostName: "Basit",
      date: "Jun 16, 2026",
      placementLabel: "Completed",
      placementRank: 999,
      entrantCount: 145,
      submissionId: "sub-punchline-sprint",
    },
  ],
  submissions: [
    {
      id: "sub-last-night-alive",
      conceptTitle: "Last Night Alive",
      seasonLabel: "Season 2",
      category: "Acting",
      kind: "Video",
      title: "Final Eight performance",
      thumbnail: survivor,
      date: "Aug 2, 2026",
      hostId: "samer",
      hostName: "Samer",
      placementLabel: "Top 8",
      recognitionType: "Finalist",
    },
    {
      id: "sub-write-my-ending",
      conceptTitle: "Write My Ending",
      category: "Writing",
      kind: "Script",
      title: "The ending they didn't see coming",
      preview:
        "She didn't leave because she stopped loving the house. She left because the house finally told the truth about who built it.",
      date: "Jul 14, 2026",
      hostId: "elissa",
      hostName: "Elissa",
      placementLabel: "1st",
      recognitionType: "Winner",
    },
    {
      id: "sub-character-switch",
      conceptTitle: "Character Switch",
      category: "Acting",
      kind: "Video",
      title: "Final round performance",
      thumbnail: impostor,
      date: "Jun 20, 2026",
      hostId: "basit",
      hostName: "Basit",
      placementLabel: "1st",
      recognitionType: "Winner",
    },
    {
      id: "sub-impro-nights",
      conceptTitle: "Impro Nights",
      category: "Acting",
      kind: "Video",
      thumbnail: courtroom,
      date: "Mar 9, 2026",
      hostId: "samer",
      hostName: "Samer",
      placementLabel: "Top 10",
      recognitionType: "Finalist",
    },
    {
      id: "sub-two-truths-one-lie",
      conceptTitle: "Two Truths One Lie",
      category: "Acting",
      kind: "Video",
      thumbnail: beirut,
      date: "Feb 18, 2026",
      hostId: "basit",
      hostName: "Basit",
      placementLabel: "Top 12",
      recognitionType: "Finalist",
    },
    {
      id: "sub-silent-room",
      conceptTitle: "Silent Room",
      category: "Acting",
      kind: "Video",
      thumbnail: excuse,
      date: "Apr 11, 2026",
      hostId: "elissa",
      hostName: "Elissa",
    },
    {
      id: "sub-impostors-voice",
      conceptTitle: "The Impostor's Voice",
      category: "Acting",
      kind: "Audio",
      preview: "Voice performance: a witness statement that slowly reveals it was rehearsed.",
      date: "Jan 24, 2026",
      hostId: "elissa",
      hostName: "Elissa",
    },
    {
      id: "sub-plot-twist-lab",
      conceptTitle: "Plot Twist Lab",
      category: "Writing",
      kind: "Script",
      title: "The last witness",
      preview:
        "The jury never saw the second letter. It was postmarked the day before the murder, not after.",
      date: "May 6, 2026",
      hostId: "samer",
      hostName: "Samer",
      placementLabel: "Top 15",
      recognitionType: "Finalist",
    },
    {
      id: "sub-midnight-confessions",
      conceptTitle: "Midnight Confessions",
      category: "Writing",
      kind: "Script",
      preview:
        "He confessed to the wrong crime on purpose, to protect the person who committed the right one.",
      date: "Jun 3, 2026",
      hostId: "samer",
      hostName: "Samer",
      placementLabel: "Top 10",
      recognitionType: "Finalist",
    },
    {
      id: "sub-cliffhanger-club",
      conceptTitle: "Cliffhanger Club",
      category: "Writing",
      kind: "Script",
      preview: "The call was coming from inside the courtroom.",
      date: "Mar 27, 2026",
      hostId: "elissa",
      hostName: "Elissa",
    },
    {
      id: "sub-60-second-comedy",
      conceptTitle: "60 Second Comedy",
      category: "Comedy",
      kind: "Video",
      title: "60 seconds, three excuses",
      thumbnail: excuse,
      date: "May 30, 2026",
      hostId: "basit",
      hostName: "Basit",
      placementLabel: "Top 5",
      recognitionType: "Host Pick",
    },
    {
      id: "sub-worst-alibi-ever",
      conceptTitle: "Worst Alibi Ever",
      category: "Comedy",
      kind: "Video",
      thumbnail: voicenote,
      date: "Apr 2, 2026",
      hostId: "basit",
      hostName: "Basit",
    },
    {
      id: "sub-roast-battle-royale",
      conceptTitle: "Roast Battle Royale",
      category: "Comedy",
      kind: "Video",
      thumbnail: impostor,
      date: "Feb 9, 2026",
      hostId: "basit",
      hostName: "Basit",
    },
    {
      id: "sub-cold-open-challenge",
      conceptTitle: "Cold Open Challenge",
      category: "Comedy",
      kind: "Audio",
      preview: "Cold open: a wedding toast that slowly turns into a confession.",
      date: "Jan 12, 2026",
      hostId: "elissa",
      hostName: "Elissa",
    },
    {
      id: "sub-punchline-sprint",
      conceptTitle: "Punchline Sprint",
      category: "Comedy",
      kind: "Video",
      thumbnail: courtroom,
      date: "Jun 16, 2026",
      hostId: "basit",
      hostName: "Basit",
    },
    {
      id: "sub-rooftop-frames",
      conceptTitle: "Rooftop Frames",
      category: "Photo",
      kind: "Photo",
      thumbnail: beirut,
      date: "May 15, 2026",
      hostId: "elissa",
      hostName: "Elissa",
    },
    {
      id: "sub-late-night-report",
      conceptTitle: "Field Report: Late Night",
      category: "Video",
      kind: "Video",
      thumbnail: survivor,
      date: "Jul 1, 2026",
      hostId: "samer",
      hostName: "Samer",
    },
  ],
  participation: {
    completionRate: 94,
    onTimeRate: 96,
    conceptsCompleted: 23,
    averageJudgeScore: 4.8,
    votingCompletionRate: 88,
    dropoutRate: 4,
    repeatHostRate: 71,
  },
};
