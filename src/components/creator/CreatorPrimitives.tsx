import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ComponentType, ReactNode } from "react";
import { ArrowUpRight, Clock, Eye, Inbox, Share2, Users } from "lucide-react";
import type { Concept, ConceptStatus } from "@/lib/creator-data";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="card-soft p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        {Icon && (
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
      {delta && <div className="mt-1 text-xs text-success">{delta}</div>}
    </div>
  );
}

const statusMeta: Record<ConceptStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  scheduled: { label: "Scheduled", className: "bg-info/10 text-info" },
  open_to_join: { label: "Open to join", className: "bg-success/10 text-success" },
  accepting_submissions: { label: "Accepting submissions", className: "bg-accent/10 text-accent" },
  voting_live: { label: "Voting live", className: "bg-accent/10 text-accent" },
  action_required: { label: "Action required", className: "bg-warning/20 text-warning-foreground" },
  results_published: { label: "Results published", className: "bg-success/10 text-success" },
  completed: { label: "Completed", className: "bg-muted text-muted-foreground" },
  archived: { label: "Archived", className: "bg-muted text-muted-foreground" },
};

export function StatusPill({ status }: { status: ConceptStatus }) {
  const meta = statusMeta[status];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{meta.label}</span>;
}

export function FormatBadge({ format }: { format: Concept["format"] }) {
  const labels: Record<Concept["format"], string> = {
    narrative: "Narrative",
    competitive: "Competitive",
    episodic: "Episodic",
    one_shot: "One-shot",
    minigame: "Minigame",
  };
  return <span className="inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{labels[format]}</span>;
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-secondary">
      <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
    </div>
  );
}

export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <Link to="/creator/concepts/$id" params={{ id: concept.id }} className="group card-soft overflow-hidden transition hover:shadow-lift">
      <div className={`relative h-32 ${concept.cover}`}>
        <div className="absolute right-3 top-3"><StatusPill status={concept.status} /></div>
        <div className="absolute bottom-3 left-3"><FormatBadge format={concept.format} /></div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate font-display text-lg font-semibold">{concept.title}</h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{concept.phase}</div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" /> Participants</div>
            <div className="mt-0.5 font-semibold text-foreground">{concept.participants.toLocaleString()}{concept.capacity ? ` / ${concept.capacity}` : ""}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground"><Inbox className="h-3 w-3" /> Entries</div>
            <div className="mt-0.5 font-semibold text-foreground">{concept.submissions.toLocaleString()}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> Time</div>
            <div className="mt-0.5 font-semibold text-foreground">{concept.timeRemaining}</div>
          </div>
        </div>
        <div className="mt-4"><Progress value={concept.progress} /></div>
        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Manage</span>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground"><Eye className="h-3.5 w-3.5" /></span>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground"><Share2 className="h-3.5 w-3.5" /></span>
        </div>
      </div>
    </Link>
  );
}

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "outline" }) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:opacity-95 shadow-soft",
    secondary: "bg-secondary text-secondary-foreground hover:bg-primary-soft",
    ghost: "text-foreground hover:bg-secondary",
    outline: "border border-border bg-surface hover:bg-secondary",
  }[variant];

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
