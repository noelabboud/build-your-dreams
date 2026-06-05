import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChevronRight,
  Flame,
  Medal,
  Settings,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { MobileShell } from "@/components/MobileShell";
import { concepts, me } from "@/data/mock";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Passport — Wave" },
      { name: "description", content: "Your Wave passport, traits, stats, and history." },
    ],
  }),
  component: Passport,
});

const statCards = [
  { key: "joined", label: "Joined", Icon: Sparkles },
  { key: "played", label: "Played", Icon: Flame },
  { key: "wins", label: "Wins", Icon: Trophy },
  { key: "top10", label: "Top 10%", Icon: Medal },
] as const;

function Passport() {
  const traits = Object.entries(me.traits).sort(([, a], [, b]) => b - a);
  const featuredConcepts = concepts.slice(0, 4);
  const strongestTrait = traits[0];
  const averageTrait =
    traits.reduce((total, [, value]) => total + value, 0) / Math.max(traits.length, 1);

  return (
    <MobileShell>
      <section className="relative overflow-hidden bg-[#10131A] px-4 pb-5 pt-4 text-white">
        <img
          src={concepts[0].image}
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-[#10131A]/88 to-[#10131A]" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-white/55">
              Wave Passport
            </div>
            <h1 className="text-2xl font-black leading-tight">Player Identity</h1>
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="relative z-10 mt-5 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.07] p-4 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3.5">
            <img
              src={me.avatar}
              alt={me.name}
              width={76}
              height={76}
              className="h-[76px] w-[76px] rounded-2xl object-cover ring-2 ring-white/25"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[1.65rem] font-black leading-none">
                <span className="truncate">{me.name}</span>
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/55">{me.handle}</div>
              <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#111827]">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="truncate">{me.badge}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <CredentialMetric label="Played" value={String(me.stats.played)} />
            <CredentialMetric label="Wins" value={String(me.stats.wins)} />
            <CredentialMetric label="Top 10%" value={String(me.stats.top10)} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <CredentialDetail label="Signature Trait" value={strongestTrait[0]} />
            <CredentialDetail label="Trait Avg." value={averageTrait.toFixed(1)} />
          </div>
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className="grid grid-cols-4 gap-2">
          {statCards.map(({ key, label, Icon }) => (
            <div key={key} className="rounded-xl border border-border bg-card p-2.5 text-center">
              <Icon className="mx-auto h-4 w-4 text-primary" />
              <div className="mt-1 text-lg font-black leading-none">{me.stats[key]}</div>
              <div className="mt-1 truncate text-[9px] font-bold uppercase text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-5">
        <SectionTitle kicker="Performance" title="Trait Map" />
        <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {traits.map(([name, value]) => (
              <TraitMeter key={name} name={name} value={value} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-5">
        <SectionTitle kicker="Recent play" title="Concept History" />
        <div className="mt-3 space-y-3 pb-6">
          {featuredConcepts.map((concept, index) => (
            <Link
              key={concept.id}
              to="/concept/$id"
              params={{ id: concept.id }}
              className="group relative flex min-h-28 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:bg-muted/40"
            >
              <div className="relative w-28 shrink-0 overflow-hidden">
                <img
                  src={concept.image}
                  alt={concept.title}
                  width={224}
                  height={224}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <ConceptFormatBadge type={concept.type} className="right-2 h-5 w-3" />
              </div>
              <div className="min-w-0 flex-1 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                  <Star className="h-3.5 w-3.5 fill-primary" />
                  Entry #{index + 1}
                </div>
                <div className="mt-1 line-clamp-2 text-base font-black leading-tight">
                  {concept.title}
                </div>
                <div className="mt-1 truncate text-xs font-medium text-muted-foreground">
                  Hosted by {concept.host}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
                  <span>{concept.rating.toFixed(1)} rating</span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}

function CredentialDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
      <div className="text-[9px] font-bold uppercase tracking-wide text-white/45">{label}</div>
      <div className="mt-0.5 truncate text-sm font-black">{value}</div>
    </div>
  );
}

function CredentialMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] px-2 py-2">
      <div className="text-lg font-black leading-none">{value}</div>
      <div className="mt-1 truncate text-[9px] font-bold uppercase tracking-wide text-white/45">
        {label}
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-primary">{kicker}</div>
      <h2 className="text-xl font-black leading-tight">{title}</h2>
    </div>
  );
}

function TraitMeter({ name, value }: { name: string; value: number }) {
  const percent = `${Math.round(value * 10)}%`;

  return (
    <div className="min-w-0 rounded-xl bg-muted p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="truncate text-xs font-bold">{name}</div>
        <div className="text-xs font-black text-primary">{value.toFixed(1)}</div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
        <div className="h-full rounded-full bg-primary" style={{ width: percent }} />
      </div>
    </div>
  );
}
