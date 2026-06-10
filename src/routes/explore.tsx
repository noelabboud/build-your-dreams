import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Star, BadgeCheck } from "lucide-react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { ConceptImage } from "@/components/ConceptImage";
import { HostLink } from "@/components/HostLink";
import { MobileShell } from "@/components/MobileShell";
import { SectionHeader } from "@/components/TopBar";
import { concepts, categories, topHosts } from "@/data/mock";
import { getConceptStatusLabel, isConceptEnded } from "@/lib/concept-status";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Wave" },
      {
        name: "description",
        content: "Discover popular concepts, browse categories, and find top hosts.",
      },
    ],
  }),
  component: Explore,
});

function Explore() {
  const trending = concepts.slice(2, 5);

  return (
    <MobileShell
      header={
        <>
          <header className="px-4 pb-1 pt-[calc(1.25rem+env(safe-area-inset-top))]">
            <h1 className="text-2xl font-bold tracking-tight">Explore</h1>
          </header>

          <div className="px-4 pt-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search concepts, hosts, categories…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </>
      }
    >
      <SectionHeader title="Trending Concepts" to="/explore" />
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
        {trending.map((c) => (
          <div key={c.id} className="w-32 shrink-0">
            <Link to="/concept/$id" params={{ id: c.id }} className="block">
              <div className="relative h-40 overflow-hidden rounded-2xl">
                <ConceptImage src={c.image} alt={c.title} className="h-full w-full" />
                <ConceptFormatBadge type={c.type} className="h-6 w-3.5" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="mt-2 text-sm font-semibold leading-tight">{c.title}</div>
            </Link>
            <HostLink host={c.host} hostId={c.hostId} className="mt-1.5" />
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              {isConceptEnded(c.status) ? (
                <>
                  <Star className="h-3 w-3 fill-warning text-warning" /> {c.rating}
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {getConceptStatusLabel(c.status)}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <SectionHeader title="Categories" to="/explore" />
      <div className="grid grid-cols-4 gap-3 px-4">
        {categories.map((c) => (
          <button key={c.id} className="flex flex-col items-center gap-1.5">
            <div
              className="grid h-14 w-14 place-items-center rounded-2xl text-2xl"
              style={{ background: c.color }}
            >
              {c.emoji}
            </div>
            <span className="text-[11px] font-medium text-foreground">{c.label}</span>
          </button>
        ))}
      </div>

      <SectionHeader title="Top Hosts" to="/explore" />
      <ul className="space-y-2 px-4 pb-6">
        {topHosts.map((h) => (
          <li key={h.id}>
            <Link
              to="/host/$id"
              params={{ id: h.id }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5"
            >
              <ConceptImage
                src={h.avatar}
                alt={h.name}
                className="h-11 w-11 shrink-0 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 font-semibold">
                  {h.name} <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">
                  {h.followers} · {h.concepts} concepts
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-warning">
                <Star className="h-3.5 w-3.5 fill-warning" /> {h.rating}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
