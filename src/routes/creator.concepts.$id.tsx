import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PencilLine, Sparkles } from "lucide-react";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";
import { getCreatorConceptById } from "@/lib/creator-data";

export const Route = createFileRoute("/creator/concepts/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Concept ${params.id} — Creator Studio` },
      { name: "description", content: "Inspect a concept detail view for creator management." },
    ],
  }),
  component: ConceptDetailPage,
});

function ConceptDetailPage() {
  const { id } = Route.useParams();
  const concept = getCreatorConceptById(id);

  if (!concept) {
    return (
      <CreatorStudioShell title="Concept not found" subtitle="The selected concept is not available in this mock workspace.">
        <div className="card-soft p-4 text-sm text-muted-foreground">This concept could not be found.</div>
      </CreatorStudioShell>
    );
  }

  return (
    <CreatorStudioShell title={concept.title} subtitle={concept.description} action={<Link to="/creator/concepts" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft"><PencilLine className="h-4 w-4" /> Edit draft</Link>}>
      <section className="card-soft rounded-[1.25rem] p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-sm font-black">Concept status</div>
            <div className="mt-1 text-xs font-semibold text-muted-foreground">Current stage · {concept.phase}</div>
          </div>
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">{concept.status}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1rem] border border-border/70 bg-white/70 p-3">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">Participants</div>
            <div className="mt-2 text-[1.15rem] font-black">{concept.participants}</div>
          </div>
          <div className="rounded-[1rem] border border-border/70 bg-white/70 p-3">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">Submissions</div>
            <div className="mt-2 text-[1.15rem] font-black">{concept.submissions}</div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[1rem] font-black">Lifecycle</div>
          <span className="text-sm font-bold text-primary">{concept.nextDeadline}</span>
        </div>
        <div className="card-soft rounded-[1.15rem] p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-black">What happens next</div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">{concept.timeRemaining}</span>
          </div>
          <div className="mt-3 text-sm font-medium text-muted-foreground">The creator workspace is ready for the next lifecycle phase, and the primary action updates with the current concept stage.</div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-[1rem] font-black">Management areas</div>
        {[
          "Participants",
          "Teams",
          "Submissions",
          "Shortlist",
          "Voting",
          "Schedule",
          "Rewards",
          "Analytics",
          "Settings",
        ].map((item) => (
          <div key={item} className="card-soft flex items-center justify-between rounded-[1.1rem] p-3 text-sm font-semibold">
            <span>{item}</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        ))}
      </section>
    </CreatorStudioShell>
  );
}
