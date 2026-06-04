import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Share2, Star, CheckCircle2, Lock, Trophy, Scale } from "lucide-react";
import { useState } from "react";
import { HostLink } from "@/components/HostLink";
import { MobileShell } from "@/components/MobileShell";
import { concepts, episodes } from "@/data/mock";
import { getConceptStatusLabel, isConceptEnded } from "@/lib/concept-status";

export const Route = createFileRoute("/concept/$id")({
  loader: ({ params }) => {
    const c = concepts.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Concept"} — Wave` },
      {
        name: "description",
        content: `Join ${loaderData?.title} on Wave — submit, vote, and shape the verdict.`,
      },
      { property: "og:image", content: loaderData?.image },
    ],
  }),
  notFoundComponent: () => (
    <MobileShell>
      <div className="p-10 text-center text-muted-foreground">Concept not found.</div>
    </MobileShell>
  ),
  errorComponent: () => (
    <MobileShell>
      <div className="p-10 text-center text-muted-foreground">Something went wrong.</div>
    </MobileShell>
  ),
  component: ConceptPage,
});

function ConceptPage() {
  const c = Route.useLoaderData();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const isSeries =
    c.type === "Narrative Series" ||
    c.type === "Episodic Series" ||
    c.type === "Competitive Series";
  const isMinigame = c.type === "Minigame";
  const conceptTabs = isMinigame
    ? [{ id: "overview", label: "Overview" }]
    : [
        { id: "overview", label: "Overview" },
        { id: "episodes", label: isSeries ? "Episodes" : "Event" },
        { id: "rewards", label: "Rewards" },
        { id: "grading", label: "Grading" },
      ];
  const brief = conceptBriefs[c.type];
  const hasEnded = isConceptEnded(c.status);

  return (
    <MobileShell>
      <div className="relative overflow-hidden">
        <img
          src={c.image}
          alt={c.title}
          width={1024}
          height={1024}
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Save concept"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <Bookmark className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Share concept"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-5 px-5 text-center text-white">
          <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
            {c.type}
          </div>
          <div className="mx-auto mt-2 max-w-sm font-display text-[2rem] font-black leading-none tracking-wide drop-shadow">
            {c.title.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <section className="rounded-2xl border border-border bg-card p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <HostLink
                host={c.host}
                hostId={c.hostId}
                variant="plain"
                className="text-sm font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              />
            </div>
            {hasEnded && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-warning/15 px-2 py-1 text-xs font-bold text-warning">
                <Star className="h-3.5 w-3.5 fill-warning" /> {c.rating}
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
            {isSeries ? (
              <>
                <Stat label="Episodes" value="6" />
                <Stat label="Participants" value="1,245" />
                {hasEnded ? (
                  <Stat label="Completion" value="84%" />
                ) : (
                  <Stat label="Status" value={getConceptStatusLabel(c.status)} />
                )}
              </>
            ) : c.type === "Minigame" ? (
              <>
                <Stat label="Mode" value="Live" />
                <Stat label="Players" value={c.participants} />
                {hasEnded ? (
                  <Stat label="Rating" value={String(c.rating)} />
                ) : (
                  <Stat label="Status" value={getConceptStatusLabel(c.status)} />
                )}
              </>
            ) : (
              <>
                <Stat label="Format" value="Single" />
                <Stat label="Entries" value={c.participants} />
                {hasEnded ? (
                  <Stat label="Rating" value={String(c.rating)} />
                ) : (
                  <Stat label="Status" value={getConceptStatusLabel(c.status)} />
                )}
              </>
            )}
          </div>
        </section>
      </div>

      <div className="no-scrollbar mt-5 flex gap-6 overflow-x-auto border-b border-border px-4">
        {conceptTabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative shrink-0 pb-2.5 text-sm font-semibold transition ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab.label}
              {active && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-4 pt-4">
        {activeTab === "overview" && (
          <div className="space-y-5">
            <section>
              <div className="text-xs font-bold uppercase tracking-wide text-primary">
                Concept brief
              </div>
              <h2 className="mt-1 text-xl font-bold leading-tight">{brief.headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{brief.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tags.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel>How it works</SectionLabel>
              <div className="mt-3 space-y-3">
                {brief.journey.map((step, index) => (
                  <JourneyStep
                    key={step.label}
                    number={index + 1}
                    label={step.label}
                    value={step.value}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <SectionLabel>Useful details</SectionLabel>
              {brief.keyDetails.map((item) => (
                <InfoRow key={item.label} label={item.label} value={item.value} />
              ))}
            </section>

            {isMinigame && (
              <section>
                <SectionLabel>Prize</SectionLabel>
                <div className="mt-2 rounded-xl bg-primary/5 p-3">
                  <div className="text-sm font-bold">{brief.rewards[0].value}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {brief.rewardNotes[0].value}
                  </p>
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === "episodes" && isSeries && (
          <ul className="space-y-2">
            {episodes.map((ep) => (
              <EpisodeRow key={ep.n} episode={ep} />
            ))}
          </ul>
        )}

        {activeTab === "episodes" && !isSeries && (
          <div className="space-y-3 text-sm">
            <div className="font-bold">{c.type === "Minigame" ? "How it plays" : "Event flow"}</div>
            <p className="leading-relaxed text-muted-foreground">
              {c.type === "Minigame"
                ? "Jump into a quick automated round. Score points, climb the live leaderboard, and replay anytime."
                : "A one-time live event. Submit once, get scored by the audience and host, then see where you ranked."}
            </p>
            <InfoRow label="Entry window" value="Open now" />
            <InfoRow label="Result timing" value="Published after voting closes" />
          </div>
        )}

        {activeTab === "rewards" && (
          <div>
            <div className="flex items-center gap-2 text-base font-bold">
              <Trophy className="h-4 w-4 text-primary" />
              Rewards
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {brief.rewardsIntro}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {brief.rewards.map((reward) => (
                <InfoTile key={reward.label} label={reward.label} value={reward.value} />
              ))}
            </div>
            <div className="mt-4 space-y-3 text-sm">
              {brief.rewardNotes.map((reward) => (
                <InfoRow key={reward.label} label={reward.label} value={reward.value} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "grading" && (
          <div>
            <div className="flex items-center gap-2 text-base font-bold">
              <Scale className="h-4 w-4 text-primary" />
              Grading system
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {brief.gradingIntro}
            </p>
            <div className="mt-4 space-y-3">
              {grading[c.type].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{row.label}</span>
                    <span className="font-bold text-primary">{row.weight}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: row.weight }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2 px-4 py-5">
        <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95">
          {c.type === "Minigame"
            ? "Play Now"
            : c.type === "One Shot Event"
              ? "Enter Event"
              : "Join Series"}
        </button>
        {isSeries && (
          <button className="w-full rounded-xl border border-border bg-card py-3 text-sm font-semibold text-primary">
            Buy Full Series — $4.99
          </button>
        )}
      </div>
    </MobileShell>
  );
}

function EpisodeRow({ episode }: { episode: (typeof episodes)[number] }) {
  const live = episode.status === "live";
  const locked = episode.status === "locked" || episode.status === "upcoming";

  return (
    <li>
      <Link
        to="/episode/$id"
        params={{ id: String(episode.n) }}
        disabled={locked}
        className={`flex items-center gap-3 rounded-xl border p-3 transition ${
          live ? "border-primary bg-primary/5" : "border-border bg-card"
        } ${locked ? "opacity-60" : "hover:bg-muted/40"}`}
      >
        <div className="flex-1">
          <div className="text-sm font-semibold">
            Episode {episode.n} — {episode.title}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground capitalize">
            {episode.status === "upcoming" ? "Unlocks in 2 days" : episode.status}
          </div>
        </div>
        {episode.rating && (
          <span className="flex items-center gap-1 text-xs font-medium text-warning">
            <Star className="h-3 w-3 fill-warning" /> {episode.rating}
          </span>
        )}
        {episode.status === "completed" && <CheckCircle2 className="h-4 w-4 text-success" />}
        {locked && <Lock className="h-4 w-4 text-muted-foreground" />}
      </Link>
    </li>
  );
}

type ConceptBrief = {
  headline: string;
  summary: string;
  journey: { label: string; value: string }[];
  keyDetails: { label: string; value: string }[];
  rewardsIntro: string;
  rewards: { label: string; value: string }[];
  rewardNotes: { label: string; value: string }[];
  gradingIntro: string;
};

const conceptBriefs: Record<string, ConceptBrief> = {
  "Narrative Series": {
    headline: "A playable courtroom story where audience choices become canon.",
    summary:
      "Each episode opens a new case file. Players submit defenses, theories, or testimony, then the community votes on which version should shape the next chapter.",
    journey: [
      { label: "Join", value: "Enter the active case and read the witness brief." },
      {
        label: "Submit",
        value: "Send one defense, theory, or testimony before the window closes.",
      },
      { label: "Vote", value: "Compare the strongest arguments once submissions lock." },
      { label: "Results", value: "The winning angle can influence the next episode." },
    ],
    keyDetails: [
      { label: "Open window", value: "Episode 3 is collecting final defenses right now." },
      {
        label: "Best entries usually have",
        value: "A clear claim, one memorable detail, and a believable link to the case.",
      },
      {
        label: "Host review",
        value: "Samer checks whether top-voted entries still make sense inside the story.",
      },
    ],
    rewardsIntro:
      "Rewards are built around story influence: the best players do not only win, they change what happens next.",
    rewards: [
      { label: "Winner", value: "$500" },
      { label: "Canon pick", value: "Credit" },
      { label: "Top 10%", value: "Badge" },
    ],
    rewardNotes: [
      {
        label: "Canon pick",
        value: "The host can adapt the winning submission into the next episode.",
      },
      {
        label: "Finalists",
        value: "Finalist entries receive public placement and a Creative Passport stamp.",
      },
      { label: "Winner reward", value: "Cash prize, winner badge, and profile feature." },
    ],
    gradingIntro:
      "The score favors entries that feel convincing inside the story, not just entries that get loud reactions.",
  },
  "Episodic Series": {
    headline: "A recurring challenge series with a fresh prompt every episode.",
    summary:
      "Every episode is self-contained, so players can join without catching up on the full archive. The format keeps a familiar rhythm while changing the creative task each round.",
    journey: [
      { label: "Join", value: "Pick the active episode and read its standalone prompt." },
      { label: "Submit", value: "Answer the episode challenge before tonight's deadline." },
      { label: "Vote", value: "Return when the episode moves into voting." },
      { label: "Results", value: "Your placement adds to your season history." },
    ],
    keyDetails: [
      { label: "Open window", value: "The active episode accepts submissions until tonight." },
      {
        label: "Best entries usually have",
        value: "A direct answer to the prompt, a distinct idea, and clean execution.",
      },
      {
        label: "Series value",
        value: "You can play one episode at a time while still building a season record.",
      },
    ],
    rewardsIntro:
      "Rewards keep the season moving: strong entries build profile history even when they do not win the whole series.",
    rewards: [
      { label: "Episode win", value: "$250" },
      { label: "Season rank", value: "XP" },
      { label: "Top entry", value: "Feature" },
    ],
    rewardNotes: [
      { label: "Episode win", value: "Best entry in the active episode receives the prize." },
      { label: "Season rank", value: "High placements increase your series ranking." },
      { label: "Profile feature", value: "Selected entries can appear on the host page." },
    ],
    gradingIntro:
      "The grid is tuned per episode, but the strongest submissions are clear, on-prompt, and easy for voters to compare.",
  },
  "Competitive Series": {
    headline: "A round-based competition where players qualify, vote, and advance.",
    summary:
      "Players move through rounds with visible qualification pressure. Each round has its own task, vote window, and cutoff before the field gets smaller.",
    journey: [
      { label: "Join", value: "Enter the league before the current round closes." },
      { label: "Compete", value: "Submit for the active round or protect your position." },
      { label: "Vote", value: "Vote during the round window to help set the cutoff." },
      { label: "Advance", value: "Qualified players continue into the next round." },
    ],
    keyDetails: [
      { label: "Open window", value: "Round 3 voting is live with qualification spots open." },
      {
        label: "Pressure point",
        value: "The cutoff can move while votes are still coming in.",
      },
      {
        label: "Best strategy",
        value: "Strong entries matter, but timing and vote momentum decide close rounds.",
      },
    ],
    rewardsIntro:
      "Rewards are designed for competition: the final winner gets the main prize, while finalists keep visible ranking value.",
    rewards: [
      { label: "Champion", value: "$1K" },
      { label: "Finalists", value: "Rank" },
      { label: "Qualified", value: "Stamp" },
    ],
    rewardNotes: [
      { label: "Champion prize", value: "The final winner receives the main prize." },
      { label: "Finalist value", value: "Finalists keep their rank badge after the season." },
      { label: "Qualified rounds", value: "Qualified rounds are recorded in the Passport." },
    ],
    gradingIntro:
      "The grid balances performance and voting so a player needs both a strong entry and enough audience support.",
  },
  "One Shot Event": {
    headline: "A single event with one entry window, one vote, and one final ranking.",
    summary:
      "This is built for urgency. Players enter once, voters compare entries during the voting window, and the final ranking publishes after the event closes.",
    journey: [
      { label: "Join", value: "Enter the event while spots are still available." },
      { label: "Submit", value: "Send one final entry. There are no extra rounds." },
      { label: "Vote", value: "Entries are compared in one voting window." },
      { label: "Results", value: "A final ranking publishes after the event closes." },
    ],
    keyDetails: [
      { label: "Open window", value: "Final entries are open before the voting lock." },
      {
        label: "Best entries usually have",
        value: "A strong first impression because voters judge everything in one pass.",
      },
      {
        label: "Commitment",
        value: "One entry, one vote window, one final result.",
      },
    ],
    rewardsIntro:
      "Rewards are simple and visible: one winner, a ranked top tier, and a clear event record.",
    rewards: [
      { label: "Winner", value: "$300" },
      { label: "Top 5", value: "Feature" },
      { label: "Entered", value: "Stamp" },
    ],
    rewardNotes: [
      { label: "Winner reward", value: "The winner gets the event prize and top placement." },
      { label: "Top 5", value: "Top entries are featured in the final event recap." },
      { label: "Passport stamp", value: "Completed entries are saved to your Passport." },
    ],
    gradingIntro:
      "The grading favors entries that land quickly, because voters compare everything in one event window.",
  },
  Minigame: {
    headline: "A real-time elimination game played inside the app.",
    summary:
      "Minigames are not submission formats. Once the room starts, players make live choices in the app, survive each round, and keep advancing until one winner remains.",
    journey: [
      { label: "Join", value: "Reserve your spot before the room fills or the timer closes." },
      {
        label: "Start",
        value: "The game begins in real time once the quota or start time is reached.",
      },
      { label: "Play", value: "Pick, duel, or react live based on the game rules." },
      { label: "Survive", value: "Advance round by round until the final winner is left." },
    ],
    keyDetails: [
      { label: "No submissions", value: "You do not upload text, video, photos, or voice notes." },
      {
        label: "Example formats",
        value:
          "Chifomi duels, host up/down picks, instant side choices, and other live eliminations.",
      },
      {
        label: "How winning works",
        value: "Each round removes players. The last remaining player wins the room.",
      },
    ],
    rewardsIntro: "Minigame prizes are usually access-based rather than cash-based.",
    rewards: [
      { label: "Winner", value: "Free entry ticket" },
      { label: "Finalists", value: "XP" },
      { label: "Played", value: "Stamp" },
    ],
    rewardNotes: [
      {
        label: "Free entry ticket",
        value: "The winner usually receives a free ticket for a paid series, concept, or event.",
      },
      { label: "Finalists", value: "Deep runs can earn bonus XP or a Passport stamp." },
      { label: "Played", value: "Participation is saved as a real-time game entry." },
    ],
    gradingIntro:
      "There is no grading grid for Minigames. The app resolves each round live based on the game rules.",
  },
};

const grading: Record<string, { label: string; weight: string }[]> = {
  "Narrative Series": [
    { label: "Story logic", weight: "35%" },
    { label: "Originality", weight: "30%" },
    { label: "Audience vote", weight: "35%" },
  ],
  "Episodic Series": [
    { label: "Episode fit", weight: "30%" },
    { label: "Creativity", weight: "30%" },
    { label: "Audience vote", weight: "40%" },
  ],
  "Competitive Series": [
    { label: "Performance", weight: "40%" },
    { label: "Strategy", weight: "25%" },
    { label: "Audience vote", weight: "35%" },
  ],
  "One Shot Event": [
    { label: "Impact", weight: "40%" },
    { label: "Originality", weight: "30%" },
    { label: "Audience vote", weight: "30%" },
  ],
  Minigame: [
    { label: "Score", weight: "60%" },
    { label: "Speed", weight: "25%" },
    { label: "Streak bonus", weight: "15%" },
  ],
};

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted px-2 py-2">
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}

function JourneyStep({ number, label, value }: { number: number; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        {number}
      </div>
      <div className="min-w-0 border-b border-border pb-3 last:border-b-0 last:pb-0">
        <div className="text-sm font-bold">{label}</div>
        <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-3 first:border-t-0 first:pt-0">
      <div className="text-xs font-bold uppercase tracking-wide text-foreground">{label}</div>
      <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{value}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-base font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
