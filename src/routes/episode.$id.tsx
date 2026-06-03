import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { ChevronRight, Clock } from "lucide-react";
import { images } from "@/data/mock";

export const Route = createFileRoute("/episode/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Episode ${params.id} — Wave` }, { name: "description", content: "Submit your defense, vote, and shape the verdict." }],
  }),
  component: EpisodePage,
});

const tabs = ["Story", "Submit", "Vote", "Results"] as const;

function EpisodePage() {
  const { id } = Route.useParams();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Story");

  return (
    <MobileShell>
      <TopBar back actions="share" title={null} />
      <div className="px-4">
        <div className="flex items-start justify-between gap-3 pt-1">
          <div>
            <div className="text-xs text-muted-foreground">Episode {id}</div>
            <h1 className="text-xl font-bold leading-tight">The Missing Witness</h1>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-2 py-1 text-xs font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> ends in 2d 14h
        </div>

        <div className="mt-4 flex gap-5 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-2.5 text-sm font-medium ${tab === t ? "text-primary" : "text-muted-foreground"}`}
            >
              {t}
              {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>

        {tab === "Story" && (
          <div className="pt-4">
            <p className="text-sm leading-relaxed">
              The key witness has disappeared. The prosecution claims foul play. It's your turn to defend the accused. What's your argument?
            </p>
            <img src={images.courtroom} alt="Courtroom" width={1024} height={1024} loading="lazy" className="mt-4 h-44 w-full rounded-2xl object-cover" />
            <div className="mt-5">
              <div className="text-sm font-semibold">How to participate</div>
              <ol className="mt-2 space-y-1.5 text-sm">
                <li><span className="mr-1 inline-grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">1</span> Submit your best defense.</li>
                <li><span className="mr-1 inline-grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">2</span> Audience and Samer will score your submission.</li>
              </ol>
            </div>
            <button className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">Submit Your Defense</button>
            <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-primary">
              View Submissions (438) <ChevronRight className="h-4 w-4" />
            </button>

            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3 text-center text-xs">
              <div><div className="font-bold text-foreground">Top 10%</div><div className="text-muted-foreground">Rewards</div></div>
              <div><div className="font-bold text-foreground">Submitted</div><div className="text-muted-foreground">Your Status</div></div>
              <div><div className="font-bold text-foreground">Text / Audio / Video</div><div className="text-muted-foreground">Format</div></div>
            </div>
          </div>
        )}

        {tab === "Submit" && <Empty title="Submission window is open" cta="Start Submission" />}
        {tab === "Vote" && <Empty title="Voting opens after submissions close" cta="Notify me" />}
        {tab === "Results" && <Empty title="Results coming after voting" cta="See past results" />}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}

function Empty({ title, cta }: { title: string; cta: string }) {
  return (
    <div className="grid place-items-center gap-3 py-12 text-center">
      <div className="text-sm text-muted-foreground">{title}</div>
      <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{cta}</button>
    </div>
  );
}
