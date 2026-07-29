export type ConceptStatus =
  | "draft"
  | "scheduled"
  | "open_to_join"
  | "accepting_submissions"
  | "voting_live"
  | "action_required"
  | "results_published"
  | "completed"
  | "archived";

export type ConceptFormat = "narrative" | "competitive" | "episodic" | "one_shot" | "minigame";

export interface Concept {
  id: string;
  title: string;
  format: ConceptFormat;
  status: ConceptStatus;
  phase: string;
  cover: string;
  participants: number;
  capacity?: number;
  submissions: number;
  votes?: number;
  timeRemaining: string;
  progress: number;
  earnings?: number;
  updated: string;
  nextDeadline?: string;
  description: string;
}

export const concepts: Concept[] = [
  {
    id: "style-remix",
    title: "Style Remix Challenge",
    format: "competitive",
    status: "action_required",
    phase: "Review submissions",
    cover: "gradient-cover-1",
    participants: 342,
    capacity: 500,
    submissions: 218,
    votes: 1_284,
    timeRemaining: "18h until voting",
    progress: 68,
    earnings: 0,
    updated: "2h ago",
    nextDeadline: "Voting opens tomorrow, 10:00",
    description:
      "Participants create a complete outfit built around one statement accessory. The community votes on styling, the creator picks the winner.",
  },
  {
    id: "midnight-tales",
    title: "Midnight Tales — Episode 4",
    format: "episodic",
    status: "accepting_submissions",
    phase: "Episode 4 of 8",
    cover: "gradient-cover-2",
    participants: 1_128,
    submissions: 604,
    votes: 3_910,
    timeRemaining: "3d 4h left",
    progress: 42,
    earnings: 1_240,
    updated: "yesterday",
    nextDeadline: "Publish Episode 5 in 6 days",
    description: "A weekly narrative unfolding across 8 episodes, driven by participant choices.",
  },
  {
    id: "60-second-city",
    title: "60-Second City",
    format: "minigame",
    status: "voting_live",
    phase: "Community voting",
    cover: "gradient-cover-3",
    participants: 2_042,
    submissions: 1_501,
    votes: 8_712,
    timeRemaining: "6h left to vote",
    progress: 84,
    earnings: 320,
    updated: "45m ago",
    nextDeadline: "Results in 6 hours",
    description: "A lightning-round minigame: capture your city in a 60-second clip.",
  },
  {
    id: "founders-pitch",
    title: "Founders Pitch Night",
    format: "one_shot",
    status: "open_to_join",
    phase: "Registration open",
    cover: "gradient-cover-4",
    participants: 87,
    capacity: 120,
    submissions: 0,
    timeRemaining: "Opens in 5 days",
    progress: 22,
    earnings: 0,
    updated: "3d ago",
    nextDeadline: "Registration closes in 5 days",
    description: "A one-night pitch event with guest judges.",
  },
  {
    id: "cover-song-arc",
    title: "Cover Song Arc",
    format: "narrative",
    status: "scheduled",
    phase: "Scheduled to launch",
    cover: "gradient-cover-5",
    participants: 0,
    submissions: 0,
    timeRemaining: "Launches in 12 days",
    progress: 8,
    earnings: 0,
    updated: "1w ago",
    description: "A guided story where participants complete cover songs in sequence.",
  },
  {
    id: "sketch-a-day",
    title: "Sketch-a-Day",
    format: "episodic",
    status: "completed",
    phase: "Wrapped",
    cover: "gradient-cover-6",
    participants: 894,
    submissions: 4_120,
    votes: 12_040,
    timeRemaining: "Completed",
    progress: 100,
    earnings: 2_180,
    updated: "3w ago",
    description: "30 daily prompts, 30 sketches, one winner per week.",
  },
];

export const attentionItems = [
  {
    id: "a1",
    title: "18 new submissions to review",
    detail: "Style Remix Challenge — voting opens in 18 hours",
    action: "Review submissions",
    href: "/creator/submissions",
    tone: "warning" as const,
  },
  {
    id: "a2",
    title: "Voting closes in 6 hours",
    detail: "60-Second City — pick your creator’s choice winner",
    action: "Open voting",
    href: "/creator/concepts/60-second-city",
    tone: "info" as const,
  },
  {
    id: "a3",
    title: "Episode 5 needs to be published",
    detail: "Midnight Tales — scheduled for Friday",
    action: "Prepare episode",
    href: "/creator/concepts/midnight-tales",
    tone: "info" as const,
  },
  {
    id: "a4",
    title: "Winner must be selected",
    detail: "Sketch-a-Day — community vote complete",
    action: "Select winner",
    href: "/creator/concepts/sketch-a-day",
    tone: "success" as const,
  },
];

export const activity = [
  { id: "1", text: "Amelia J. joined Style Remix Challenge", time: "2m ago" },
  { id: "2", text: "New submission on 60-Second City by ptc_2891", time: "12m ago" },
  { id: "3", text: "Midnight Tales passed 1,000 votes", time: "1h ago" },
  { id: "4", text: "Founders Pitch Night shared 24 times", time: "3h ago" },
];

export const submissions = Array.from({ length: 8 }).map((_, i) => ({
  id: `sub_${i + 1}`,
  code: `PTC-${(2891 + i).toString()}`,
  title: [
    "Sunset in wool",
    "Statement earring, monochrome fit",
    "Denim on denim, gold anchor",
    "Silk scarf, matte tailoring",
    "Neon belt, quiet palette",
    "Vintage watch, modern lines",
    "Beaded bag, structured coat",
    "Bold ring, soft knits",
  ][i],
  cover: (["gradient-cover-1", "gradient-cover-2", "gradient-cover-3", "gradient-cover-4", "gradient-cover-5", "gradient-cover-6"] as const)[i % 6],
  response:
    "I wanted to build the entire look around a single vintage brooch my grandmother wore — everything else stays quiet so the accessory does the talking.",
  scores: { creativity: 0, execution: 0, originality: 0, relevance: 0 },
  status: (["new", "new", "shortlisted", "new", "approved", "new", "new", "flagged"] as const)[i],
  submittedAt: `${i + 1}h ago`,
}));

export function getCreatorConceptById(id: string) {
  return concepts.find((concept) => concept.id === id);
}
