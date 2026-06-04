import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { CheckCircle2, ChevronRight, Clock, Lock, Trophy } from "lucide-react";
import { episodes, images } from "@/data/mock";

export const Route = createFileRoute("/episode/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Episode ${params.id} — Wave` },
      { name: "description", content: "Submit your defense, vote, and shape the verdict." },
    ],
  }),
  component: EpisodePage,
});

const tabs = ["Story", "Submit", "Vote", "Results"] as const;

function EpisodePage() {
  const { id } = Route.useParams();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Story");
  const episode = episodes.find((ep) => String(ep.n) === id) ?? episodes[2];
  const completed = episode.status === "completed";
  const live = episode.status === "live";

  return (
    <MobileShell>
      <TopBar back actions="share" title={null} />
      <div className="px-4">
        <div className="flex items-start justify-between gap-3 pt-1">
          <div>
            <div className="text-xs text-muted-foreground">Episode {id}</div>
            <h1 className="text-xl font-bold leading-tight">{episode.title}</h1>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              completed
                ? "bg-muted text-muted-foreground"
                : live
                  ? "bg-success/15 text-success"
                  : "bg-warning/15 text-amber-700"
            }`}
          >
            {completed ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : live ? (
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
            ) : (
              <Clock className="h-3.5 w-3.5" />
            )}
            {completed ? "Completed" : live ? "Live" : "Upcoming"}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {completed ? (
            <>
              <Trophy className="h-3.5 w-3.5" /> Results published · {episode.percentile}
            </>
          ) : (
            <>
              <Clock className="h-3.5 w-3.5" /> ends in 2d 14h
            </>
          )}
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative shrink-0 px-3 pb-2.5 text-sm font-semibold ${
                tab === t ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {tab === "Story" && (
          <div className="pt-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                Case brief
              </div>
              <p className="mt-2 text-sm leading-relaxed">
                The key witness has disappeared. The prosecution claims foul play, but the timeline
                has gaps and the last voice note may contradict the main accusation.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <MiniStat label="Submissions" value="438" />
                <MiniStat label="Format" value="Text/Audio" />
                <MiniStat label="Reward" value="Top 10%" />
              </div>
            </div>
            <img
              src={images.courtroom}
              alt="Courtroom"
              width={1024}
              height={1024}
              loading="lazy"
              className="mt-4 h-44 w-full rounded-2xl object-cover"
            />
            <div className="mt-5">
              <div className="text-sm font-semibold">How to participate</div>
              <ol className="mt-2 space-y-1.5 text-sm">
                <li>
                  <span className="mr-1 inline-grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    1
                  </span>
                  Build a defense using the witness timeline, motive, and missing evidence.
                </li>
                <li>
                  <span className="mr-1 inline-grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    2
                  </span>
                  Audience and Samer score clarity, originality, and persuasion.
                </li>
              </ol>
            </div>
            {!completed && (
              <button className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
                Submit Your Defense
              </button>
            )}
            <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-primary">
              {completed ? "View Final Submissions" : "View Submissions (438)"}{" "}
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3 text-center text-xs">
              <MiniStat label="Rewards" value="Top 10%" />
              <MiniStat label="Your Status" value={completed ? "Closed" : "Submitted"} />
              <MiniStat label="Stage" value={completed ? "Results" : "Live"} />
            </div>
          </div>
        )}

        {tab === "Submit" &&
          (completed ? (
            <ClosedPanel title="Submissions are closed" />
          ) : (
            <Empty title="Submission window is open" cta="Start Submission" />
          ))}
        {tab === "Vote" &&
          (completed ? (
            <ClosedPanel title="Voting is closed" />
          ) : (
            <Empty title="Voting opens after submissions close" cta="Notify me" />
          ))}
        {tab === "Results" &&
          (completed ? (
            <ResultsPanel
              score={episode.score}
              percentile={episode.percentile}
              rating={episode.rating}
            />
          ) : (
            <Empty title="Results coming after voting" cta="See past results" />
          ))}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted px-2 py-2">
      <div className="font-bold text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function ClosedPanel({ title }: { title: string }) {
  return (
    <div className="grid place-items-center gap-3 py-12 text-center">
      <Lock className="h-5 w-5 text-muted-foreground" />
      <div className="text-sm text-muted-foreground">{title}</div>
      <button className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-primary">
        Review entries
      </button>
    </div>
  );
}

function ResultsPanel({
  score,
  percentile,
  rating,
}: {
  score?: number;
  percentile?: string;
  rating: number | null;
}) {
  return (
    <div className="space-y-3 py-5">
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="text-sm font-semibold">Final results</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <MiniStat label="Score" value={score ? String(score) : "—"} />
          <MiniStat label="Rank" value={percentile ?? "—"} />
          <MiniStat label="Rating" value={rating ? String(rating) : "—"} />
        </div>
      </div>
      <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
        View Leaderboard
      </button>
    </div>
  );
}

function Empty({ title, cta }: { title: string; cta: string }) {
  return (
    <div className="grid place-items-center gap-3 py-12 text-center">
      <div className="text-sm text-muted-foreground">{title}</div>
      <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
        {cta}
      </button>
    </div>
  );
}
