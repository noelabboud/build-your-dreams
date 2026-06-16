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
      headerClassName="bg-transparent"
      header={
        <section className="app-page-x pb-3 pt-[calc(1rem+env(safe-area-inset-top))]">
          <header>
            <h1 className="text-[1.6rem] font-black leading-tight tracking-tight">Explore</h1>
          </header>

          <div className="mt-4">
            <div className="app-card flex min-h-12 items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
              <Search className="h-4.5 w-4.5 text-muted-foreground" />
              <input
                placeholder="Search concepts, hosts, categories..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
              />
              <SlidersHorizontal className="h-4.5 w-4.5 text-muted-foreground" />
            </div>
          </div>
        </section>
      }
    >
      <div className="app-page-x flex items-end justify-between pb-3 pt-3">
        <h2 className="app-section-title">Trending Concepts</h2>
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
        {trending.map((c) => (
          <div key={c.id} className="w-36 shrink-0">
            <Link to="/concept/$id" params={{ id: c.id }} className="block">
              <div className="relative h-40 overflow-hidden rounded-2xl">
                <ConceptImage src={c.image} alt={c.title} className="h-full w-full" />
                <ConceptFormatBadge type={c.type} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="mt-2 text-sm font-extrabold leading-tight">{c.title}</div>
            </Link>
            <HostLink host={c.host} hostId={c.hostId} className="mt-1.5" />
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              {isConceptEnded(c.status) ? (
                <>
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {c.rating}
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-primary" />
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
          <button key={c.id} className="flex min-h-20 flex-col items-center gap-1.5">
            <div
              className="grid h-13 w-13 place-items-center rounded-2xl text-[1.4rem] shadow-[0_14px_30px_-26px_rgba(15,23,42,0.6)]"
              style={{ background: c.color }}
            >
              {c.emoji}
            </div>
            <span className="text-xs font-bold text-foreground">{c.label}</span>
          </button>
        ))}
      </div>

      <SectionHeader title="Top Hosts" to="/explore" />
      <ul className="space-y-2.5 px-4 pb-7">
        {topHosts.map((h) => (
          <li key={h.id}>
            <Link
              to="/host/$id"
              params={{ id: h.id }}
              className="app-card flex min-h-[4.25rem] items-center gap-3 p-3"
            >
              <ConceptImage
                src={h.avatar}
                alt={h.name}
                className="h-12 w-12 shrink-0 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-extrabold">
                  {h.name} <BadgeCheck className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                  {h.followers} · {h.concepts} concepts
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-warning">
                <Star className="h-4 w-4 fill-warning" /> {h.rating}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
