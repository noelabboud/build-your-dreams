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
        <section className="app-page-x pb-4 pt-[calc(1.35rem+env(safe-area-inset-top))]">
          <header>
            <h1 className="text-[2rem] font-black leading-tight tracking-tight">Explore</h1>
          </header>

          <div className="mt-5">
            <div className="app-card flex min-h-14 items-center gap-3 rounded-[1.35rem] px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                placeholder="Search concepts, hosts, categories..."
                className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground"
              />
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </section>
      }
    >
      <div className="app-page-x flex items-end justify-between pb-3 pt-3">
        <h2 className="app-section-title">Trending Concepts</h2>
      </div>
      <div className="no-scrollbar flex gap-3.5 overflow-x-auto px-5">
        {trending.map((c) => (
          <div key={c.id} className="w-40 shrink-0">
            <Link to="/concept/$id" params={{ id: c.id }} className="block">
              <div className="relative h-48 overflow-hidden rounded-[1.35rem]">
                <ConceptImage src={c.image} alt={c.title} className="h-full w-full" />
                <ConceptFormatBadge type={c.type} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="mt-2.5 text-base font-extrabold leading-tight">{c.title}</div>
            </Link>
            <HostLink host={c.host} hostId={c.hostId} className="mt-1.5" />
            <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
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
      <div className="grid grid-cols-4 gap-3.5 px-5">
        {categories.map((c) => (
          <button key={c.id} className="flex min-h-24 flex-col items-center gap-2">
            <div
              className="grid h-16 w-16 place-items-center rounded-[1.35rem] text-[1.75rem] shadow-[0_14px_30px_-26px_rgba(15,23,42,0.6)]"
              style={{ background: c.color }}
            >
              {c.emoji}
            </div>
            <span className="text-xs font-bold text-foreground">{c.label}</span>
          </button>
        ))}
      </div>

      <SectionHeader title="Top Hosts" to="/explore" />
      <ul className="space-y-3 px-5 pb-7">
        {topHosts.map((h) => (
          <li key={h.id}>
            <Link
              to="/host/$id"
              params={{ id: h.id }}
              className="app-card flex min-h-[4.75rem] items-center gap-3.5 p-3.5"
            >
              <ConceptImage
                src={h.avatar}
                alt={h.name}
                className="h-13 w-13 shrink-0 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-base font-extrabold">
                  {h.name} <BadgeCheck className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="mt-0.5 text-sm font-medium text-muted-foreground">
                  {h.followers} · {h.concepts} concepts
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-warning">
                <Star className="h-4 w-4 fill-warning" /> {h.rating}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
