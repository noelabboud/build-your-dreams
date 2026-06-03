import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Play, Star, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { SectionHeader } from "@/components/TopBar";
import { concepts, images } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wave — Live storytelling concepts" },
      { name: "description", content: "Join interactive storytelling concepts, vote on submissions, and host your own series." },
    ],
  }),
  component: Home,
});

function Home() {
  const continuing = concepts[0];
  const upcoming = concepts[1];
  const trending = concepts.slice(2, 5);

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-4 pb-1 pt-5">
        <div>
          <div className="text-2xl font-extrabold tracking-tight text-primary">wave.</div>
        </div>
        <button aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </header>

      <div className="px-4 pb-2 pt-1">
        <h1 className="text-[22px] font-bold tracking-tight">Good morning, Marc <span className="ml-1">👋</span></h1>
      </div>

      <SectionHeader title="Continue Playing" />
      <div className="px-4">
        <Link to="/concept/$id" params={{ id: continuing.id }} className="block">
          <div className="relative overflow-hidden rounded-2xl">
            <img src={continuing.image} alt={continuing.title} width={1024} height={1024} className="h-52 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="text-lg font-bold drop-shadow">{continuing.title}</div>
              <div className="mt-0.5 text-xs opacity-90">Episode 4 — In 2 days</div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                <div className="h-full w-[70%] rounded-full bg-white" />
              </div>
              <div className="mt-1 text-[11px] opacity-80">70%</div>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg">
                <Play className="h-4 w-4 fill-current" /> Continue
              </button>
            </div>
          </div>
        </Link>
      </div>

      <SectionHeader title="Upcoming Episodes" to="/explore" />
      <div className="px-4">
        <Link to="/concept/$id" params={{ id: upcoming.id }} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <img src={upcoming.image} alt={upcoming.title} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <div className="truncate font-semibold">{upcoming.title}</div>
            <div className="text-xs text-muted-foreground">New episode in 2 days</div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>

      <SectionHeader title="Trending Concepts" to="/explore" />
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-6">
        {trending.map((c) => (
          <Link key={c.id} to="/concept/$id" params={{ id: c.id }} className="w-32 shrink-0">
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <img src={c.image} alt={c.title} width={400} height={500} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="mt-2 text-sm font-semibold leading-tight">{c.title}</div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-warning text-warning" /> {c.rating}
            </div>
          </Link>
        ))}
      </div>
    </MobileShell>
  );
}
