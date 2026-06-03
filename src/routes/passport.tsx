import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, ChevronRight, Sparkles } from "lucide-react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { MobileShell } from "@/components/MobileShell";
import { SectionHeader } from "@/components/TopBar";
import { concepts, me } from "@/data/mock";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Passport — Wave" },
      { name: "description", content: "Your Wave passport, level, traits, and history." },
    ],
  }),
  component: Passport,
});

function Passport() {
  const traits = Object.entries(me.traits);
  const historyConcept = concepts[0];

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-4 pb-1 pt-5">
        <h1 className="text-2xl font-bold tracking-tight">Passport</h1>
        <button
          aria-label="Settings"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
        >
          <Settings className="h-5 w-5" />
        </button>
      </header>

      <div className="flex items-center gap-3 px-4 pt-3">
        <img
          src={me.avatar}
          alt={me.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/30"
        />
        <div className="min-w-0">
          <div className="text-lg font-bold">{me.name}</div>
          <div className="text-xs text-muted-foreground">{me.handle}</div>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
            <Sparkles className="h-3 w-3" /> {me.badge}
          </span>
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {me.level}
            </div>
            <div className="text-sm font-semibold">Level {me.level}</div>
          </div>
          <div className="text-xs text-muted-foreground">
            {me.xpToNext.toLocaleString()} XP to next
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[62%] rounded-full bg-primary" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 px-4 pt-4 text-center">
        {[
          { v: me.stats.joined, l: "Joined" },
          { v: me.stats.played, l: "Played" },
          { v: me.stats.wins, l: "Wins" },
          { v: me.stats.top10, l: "Top 10%" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-2.5">
            <div className="text-lg font-bold">{s.v}</div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <SectionHeader title="Overall Traits" />
      <div className="mx-4 rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 text-xs text-muted-foreground">Based on all your participations</div>
        <ul className="space-y-2.5">
          {traits.map(([name, v]) => (
            <li key={name}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium">{name}</span>
                <span className="font-semibold">{v.toFixed(1)}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(v / 10) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <SectionHeader title="Concept History" />
      <Link
        to="/concept/$id"
        params={{ id: "courtroom" }}
        className="relative mx-4 mb-6 flex items-center justify-between overflow-hidden rounded-xl border border-border bg-card p-3 pt-5"
      >
        <ConceptFormatBadge type={historyConcept.type} className="h-5 w-3" />
        <div>
          <div className="font-semibold">{historyConcept.title}</div>
          <div className="text-xs text-muted-foreground">8 episodes · ★ 4.8</div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </Link>
    </MobileShell>
  );
}
