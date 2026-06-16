import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ConceptImage } from "@/components/ConceptImage";
import { MobileShell } from "@/components/MobileShell";
import { ArrowLeft, ChevronRight, Lock } from "lucide-react";
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
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Story");
  const episode = episodes.find((ep) => String(ep.n) === id) ?? episodes[2];
  const completed = episode.status === "completed";

  return (
    <MobileShell>
      <div className="px-4 pt-[calc(1.35rem+env(safe-area-inset-top))]">
        <div className="grid grid-cols-[2.5rem_1fr] items-start gap-3">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Back"
            className="app-icon-button -ml-1 text-foreground transition hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="text-sm font-semibold text-muted-foreground">Episode {id}</div>
            <h1 className="text-[1.55rem] font-black leading-tight tracking-tight">
              {episode.title}
            </h1>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`app-tab relative min-w-0 px-2 text-center ${
                tab === t ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {tab === "Story" && (
          <div className="pt-4">
            <div className="app-card p-4">
              <div className="app-kicker text-primary">Case brief</div>
              <p className="app-body mt-2.5">
                The key witness has disappeared. The prosecution claims foul play, but the timeline
                has gaps and the last voice note may contradict the main accusation.
              </p>
              <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
                <MiniStat label="Submissions" value="438" />
                <MiniStat label="Format" value="Text/Audio" />
                <MiniStat label="Reward" value="Top 10%" />
              </div>
            </div>
            <ConceptImage
              src={images.courtroom}
              alt="Courtroom"
              className="mt-4 h-44 w-full rounded-2xl"
            />
            <div className="mt-5">
              <div className="text-base font-bold">How to participate</div>
              <ol className="mt-3 space-y-2 text-sm leading-relaxed">
                <li>
                  <span className="mr-1.5 inline-grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-xs font-black text-primary">
                    1
                  </span>
                  Build a defense using the witness timeline, motive, and missing evidence.
                </li>
                <li>
                  <span className="mr-1.5 inline-grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-xs font-black text-primary">
                    2
                  </span>
                  Audience and Samer score clarity, originality, and persuasion.
                </li>
              </ol>
            </div>
            {!completed && (
              <button className="mt-5 min-h-10 w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground">
                Submit Your Defense
              </button>
            )}
            <button className="mt-2.5 flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2.5 text-sm font-bold text-primary">
              {completed ? "View Final Submissions" : "View Submissions (438)"}{" "}
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="app-card mt-5 grid grid-cols-3 gap-2 p-3 text-center">
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
    <div className="rounded-2xl bg-muted px-2.5 py-2.5">
      <div className="text-sm font-black text-foreground">{value}</div>
      <div className="app-caption mt-0.5 text-muted-foreground">{label}</div>
    </div>
  );
}

function ClosedPanel({ title }: { title: string }) {
  return (
    <div className="grid place-items-center gap-3.5 py-14 text-center">
      <Lock className="h-6 w-6 text-muted-foreground" />
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <button className="min-h-11 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-primary">
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
      <div className="app-card p-4">
        <div className="text-base font-bold">Final results</div>
        <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
          <MiniStat label="Score" value={score ? String(score) : "—"} />
          <MiniStat label="Rank" value={percentile ?? "—"} />
          <MiniStat label="Rating" value={rating ? String(rating) : "—"} />
        </div>
      </div>
      <button className="min-h-10 w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground">
        View Leaderboard
      </button>
    </div>
  );
}

function Empty({ title, cta }: { title: string; cta: string }) {
  return (
    <div className="grid place-items-center gap-3.5 py-14 text-center">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <button className="min-h-11 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">
        {cta}
      </button>
    </div>
  );
}
