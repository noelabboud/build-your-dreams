import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, Hourglass, Trophy } from "lucide-react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { MobileShell } from "@/components/MobileShell";
import { SectionHeader } from "@/components/TopBar";
import { concepts, type Concept } from "@/data/mock";

export const Route = createFileRoute("/my-concepts")({
  head: () => ({
    meta: [
      { title: "My Concepts — Wave" },
      { name: "description", content: "Your active, waiting, and completed concepts." },
    ],
  }),
  component: MyConcepts,
});

function MyConcepts() {
  return (
    <MobileShell>
      <header className="flex items-center justify-between px-4 pb-1 pt-5">
        <h1 className="text-2xl font-bold tracking-tight">My Concepts</h1>
        <button
          aria-label="Notifications"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
        </button>
      </header>

      <SectionHeader title="Active" to="/my-concepts" />
      <ul className="space-y-2 px-4">
        <Row
          id="courtroom"
          image={concepts[0].image}
          title="The Courtroom"
          type={concepts[0].type}
          subtitle="Episode 4 in 2 days"
          pct={70}
        />
        <Row
          id="impostor"
          image={concepts[2].image}
          title="Impostor League"
          type={concepts[2].type}
          subtitle={
            <>
              Round 3 — Voting · <span className="text-success">You're qualified</span>
            </>
          }
        />
      </ul>

      <SectionHeader title="Waiting for Results" />
      <ul className="space-y-2 px-4">
        <Row
          id="voice-roulette"
          image={concepts[1].image}
          title="Voice Note Roulette"
          type={concepts[4].type}
          subtitle="Voting ends tomorrow"
          icon={<Hourglass className="h-4 w-4 text-warning" />}
        />
      </ul>

      <SectionHeader title="Completed" />
      <ul className="space-y-2 px-4 pb-6">
        <Row
          id="excuse-champ"
          image={concepts[5].image}
          title="Worst Excuse Championship"
          type={concepts[3].type}
          subtitle="You placed Top 5% · Completed on May 4"
          icon={<Trophy className="h-4 w-4 text-warning" />}
        />
      </ul>
    </MobileShell>
  );
}

function Row({
  id,
  image,
  title,
  type,
  subtitle,
  pct,
  icon,
}: {
  id: string;
  image: string;
  title: string;
  type: Concept["type"];
  subtitle: React.ReactNode;
  pct?: number;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <Link
        to="/concept/$id"
        params={{ id }}
        className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5"
      >
        <div className="relative shrink-0 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <ConceptFormatBadge type={type} className="right-2 h-4 w-2.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 font-semibold">
            {title}
            {icon}
          </div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
          {pct !== undefined && (
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </Link>
    </li>
  );
}
