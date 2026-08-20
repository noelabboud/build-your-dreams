import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  CircleAlert,
  Inbox,
  LayoutGrid,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";
import { ConceptCard } from "@/components/creator/CreatorPrimitives";
import { attentionItems, concepts } from "@/lib/creator-data";

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
  const active = concepts
    .filter((concept) =>
      ["open_to_join", "accepting_submissions", "voting_live", "action_required"].includes(
        concept.status,
      ),
    )
    .slice(0, 2);
  const urgent = attentionItems.slice(0, 2);
  const totalParticipants = concepts.reduce((sum, concept) => sum + concept.participants, 0);
  const pendingSubmissions = concepts
    .filter((concept) => concept.status === "action_required")
    .reduce((sum, concept) => sum + concept.submissions, 0);

  return (
    <CreatorStudioShell
      title="Creator Studio"
      subtitle="Your concepts at a glance"
      action={
        <Link
          to="/creator/create"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          <Plus className="h-4 w-4" /> Create
        </Link>
      }
    >
      <section className="pt-1">
        <div className="px-1">
          <p className="text-sm font-semibold text-muted-foreground">Good morning, Noel</p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight">What are we building today?</h1>
        </div>
        <Link
          to="/creator/create"
          className="group relative mt-4 flex min-h-[7.5rem] items-center overflow-hidden rounded-[1.4rem] bg-primary p-5 text-primary-foreground shadow-lift transition active:scale-[.99]"
        >
          <span className="absolute -right-7 -top-10 h-36 w-36 rounded-full bg-white/10" />
          <span className="absolute -bottom-12 right-20 h-28 w-28 rounded-full bg-white/5" />
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-soft">
            <Plus className="h-6 w-6 stroke-[2.5]" />
          </span>
          <span className="relative ml-4 min-w-0 flex-1">
            <strong className="block text-lg">Create a concept</strong>
            <span className="mt-1 block text-xs leading-relaxed text-white/70">
              Start from an idea or use a template
            </span>
          </span>
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 transition group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </section>

      <section className="-mt-1">
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-base font-bold">Your studio</h2>
          <Link to="/creator/analytics" className="text-xs font-bold text-primary">
            View insights
          </Link>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border/80 bg-white/80 shadow-soft">
          <Metric
            icon={Sparkles}
            label="Live"
            value={String(active.length)}
            href="/creator/concepts"
          />
          <Metric
            icon={Users}
            label="People"
            value={totalParticipants.toLocaleString()}
            href="/creator/analytics"
          />
          <Metric
            icon={Inbox}
            label="To review"
            value={pendingSubmissions.toLocaleString()}
            href="/creator/submissions"
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between px-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-600">
              Next up
            </p>
            <h2 className="mt-0.5 text-lg font-bold sm:text-xl">Needs your attention</h2>
          </div>
          <Link to="/creator/submissions" className="text-sm font-semibold text-primary">
            View all
          </Link>
        </div>
        <div className="grid gap-3">
          {urgent.map((item, index) => (
            <Link
              key={item.id}
              to={item.href}
              className="group flex min-h-[5rem] items-center gap-3 rounded-2xl border border-border/80 bg-white/85 p-3.5 shadow-soft transition hover:border-primary/30 hover:shadow-lift"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                  index === 0 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-primary"
                }`}
              >
                {index === 0 ? <CircleAlert className="h-5 w-5" /> : <Inbox className="h-5 w-5" />}
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm">{item.title}</strong>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {item.detail}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between px-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              In progress
            </p>
            <h2 className="mt-0.5 text-lg font-bold sm:text-xl">Active concepts</h2>
          </div>
          <Link
            to="/creator/concepts"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            All concepts <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4">
          {active.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 text-base font-bold">Explore your studio</h2>
        <div className="grid gap-2">
          <QuickLink
            to="/creator/concepts"
            icon={LayoutGrid}
            label="All concepts"
            detail="Drafts, live events, and history"
          />
          <QuickLink
            to="/creator/submissions"
            icon={Inbox}
            label="Submissions"
            detail="Review participant entries"
          />
          <QuickLink
            to="/creator/analytics"
            icon={BarChart3}
            label="Analytics"
            detail="Audience and performance"
          />
        </div>
      </section>
    </CreatorStudioShell>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link to={href} className="min-w-0 px-2 py-3.5 text-center transition hover:bg-primary/5">
      <Icon className="mx-auto h-4 w-4 text-primary" />
      <strong className="mt-1.5 block text-lg">{value}</strong>
      <span className="mt-0.5 block truncate text-[10px] font-semibold text-muted-foreground">
        {label}
      </span>
    </Link>
  );
}

function QuickLink({
  to,
  icon: Icon,
  label,
  detail,
}: {
  to: string;
  icon: typeof Sparkles;
  label: string;
  detail: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl border border-border/70 bg-white/60 px-4 py-3 transition hover:bg-white"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block text-sm">{label}</strong>
        <span className="block truncate text-[11px] text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
