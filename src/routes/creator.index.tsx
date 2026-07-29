import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, Inbox, Plus, Sparkles, TrendingUp, Users, Vote } from "lucide-react";
import { CreatorStudioShell, SecondaryLink } from "@/components/creator/CreatorStudioShell";
import { ConceptCard, Section, StatCard } from "@/components/creator/CreatorPrimitives";
import { activity, attentionItems, concepts } from "@/lib/creator-data";

export const Route = createFileRoute("/creator/")({
  head: () => ({
    meta: [
      { title: "Creator Studio — Midan" },
      { name: "description", content: "Overview of your creator workspace and active concepts." },
    ],
  }),
  component: CreatorOverviewPage,
});

function CreatorOverviewPage() {
  const active = concepts.filter((concept) => ["open_to_join", "accepting_submissions", "voting_live", "action_required"].includes(concept.status));

  return (
    <CreatorStudioShell title="Creator Studio" subtitle="Overview of concepts, activity, and immediate actions" action={<Link to="/creator/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft"><Plus className="h-4 w-4" /> Create Concept</Link>}>
      <div className="card-soft relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-soft" />
        <div className="absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-accent/10" />
        <div className="relative grid gap-4 sm:flex sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary"><Sparkles className="h-3 w-3" /> Wednesday, 29 July</div>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Good morning, Rae.</h1>
            <p className="mt-1 max-w-lg text-sm text-muted-foreground sm:text-base">You have <span className="font-semibold text-foreground">4 Concepts live</span> and <span className="font-semibold text-foreground">2 actions</span> waiting.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Active Concepts" value="4" delta="+1 this week" icon={Sparkles} />
        <StatCard label="Participants" value="3,599" delta="+248 (7d)" icon={Users} />
        <StatCard label="Pending review" value="18" icon={Inbox} />
        <StatCard label="Votes received" value="13,946" delta="+2.1k (7d)" icon={Vote} />
        <StatCard label="Audience growth" value="+12.4%" delta="last 30 days" icon={TrendingUp} />
        <StatCard label="Est. earnings" value="$3,740" delta="This quarter" icon={DollarSign} />
      </div>

      <Section title="Needs your attention" action={<SecondaryLink to="/creator/submissions" label="View all" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {attentionItems.map((item) => (
            <div key={item.id} className="card-soft flex items-start gap-4 p-4">
              <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg ${item.tone === "warning" ? "bg-warning/20 text-warning-foreground" : item.tone === "info" ? "bg-info/10 text-info" : item.tone === "success" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                <span className="h-2 w-2 rounded-full bg-current" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{item.detail}</div>
              </div>
              <Link to={item.href} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-secondary">
                {item.action}
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Active concepts" action={<SecondaryLink to="/creator/concepts" label="See all" />}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {active.map((concept) => <ConceptCard key={concept.id} concept={concept} />)}
        </div>
      </Section>

      <Section title="Recent activity">
        <div className="card-soft divide-y divide-border">
          {activity.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="min-w-0 truncate">{item.text}</span>
              <span className="ml-4 shrink-0 text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </Section>
    </CreatorStudioShell>
  );
}
