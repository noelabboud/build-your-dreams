import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Star, BadgeCheck } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { SectionHeader } from "@/components/TopBar";
import { concepts, categories, topHosts } from "@/data/mock";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Wave" },
      { name: "description", content: "Discover popular concepts, browse categories, and find top hosts." },
    ],
  }),
  component: Explore,
});

function Explore() {
  return (
    <MobileShell>
      <header className="px-4 pb-1 pt-5">
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

      <SectionHeader title="Popular Concepts" to="/explore" />
      <ul className="space-y-2 px-4">
        {concepts.slice(0, 3).map((c) => (
          <li key={c.id}>
            <Link to="/concept/$id" params={{ id: c.id }} className="flex items-center gap-3 rounded-xl bg-card p-2.5 border border-border">
              <img src={c.image} alt={c.title} width={48} height={48} loading="lazy" className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-semibold">{c.title}</span>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-warning"><Star className="h-3 w-3 fill-warning" /> {c.rating}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>by {c.host}</span>
                  <span>{c.participants} participants</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <SectionHeader title="Categories" to="/explore" />
      <div className="grid grid-cols-4 gap-3 px-4">
        {categories.map((c) => (
          <button key={c.id} className="flex flex-col items-center gap-1.5">
            <div className="grid h-14 w-14 place-items-center rounded-2xl text-2xl" style={{ background: c.color }}>
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
            <Link to="/host/$id" params={{ id: h.id }} className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5">
              <img src={h.avatar} alt={h.name} width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 font-semibold">{h.name} <BadgeCheck className="h-4 w-4 text-primary" /></div>
                <div className="text-xs text-muted-foreground">{h.followers} · {h.concepts} concepts</div>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-warning"><Star className="h-3.5 w-3.5 fill-warning" /> {h.rating}</span>
            </Link>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
