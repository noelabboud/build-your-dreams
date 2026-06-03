import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Star } from "lucide-react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { MobileShell } from "@/components/MobileShell";
import { TopBar, SectionHeader } from "@/components/TopBar";
import { concepts, topHosts } from "@/data/mock";

export const Route = createFileRoute("/host/$id")({
  loader: ({ params }) => {
    const h = topHosts.find((x) => x.id === params.id);
    if (!h) throw notFound();
    return h;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Host"} — Wave` },
      { name: "description", content: `Concepts and series hosted by ${loaderData?.name}.` },
    ],
  }),
  notFoundComponent: () => (
    <MobileShell>
      <div className="p-10 text-center text-muted-foreground">Host not found.</div>
    </MobileShell>
  ),
  errorComponent: () => (
    <MobileShell>
      <div className="p-10 text-center text-muted-foreground">Something went wrong.</div>
    </MobileShell>
  ),
  component: HostPage,
});

function HostPage() {
  const h = Route.useLoaderData();
  const active = concepts.filter((c) => c.hostId === h.id).slice(0, 2);
  const ended = concepts.filter((c) => c.hostId === h.id).slice(0, 3);

  return (
    <MobileShell>
      <div className="relative bg-wave-sky pb-4">
        <TopBar back actions="more" title={null} />
        <div className="flex items-center gap-3 px-4 pt-2">
          <img
            src={h.avatar}
            alt={h.name}
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-cover ring-4 ring-background"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-lg font-bold">
              {h.name} <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">@{h.id}.mind</div>
            <div className="mt-1 flex items-center gap-3 text-xs">
              <span>
                <b>{h.followers.replace("K", "K")}</b>{" "}
                <span className="text-muted-foreground">followers</span>
              </span>
              <span>
                <b>520K</b> <span className="text-muted-foreground">likes</span>
              </span>
            </div>
          </div>
          <button className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
            Follow
          </button>
        </div>

        <div className="mx-4 mt-4 grid grid-cols-4 gap-2 rounded-2xl bg-card p-3 text-center shadow-sm">
          <Stat label="Concepts" value={String(h.concepts)} />
          <Stat label="Participants" value="8.2K" />
          <Stat label="Avg. Rating" value={String(h.rating)} />
          <Stat label="Completion" value="84%" />
        </div>
      </div>

      <SectionHeader title="Active Concepts" to="/explore" />
      <ul className="space-y-2 px-4">
        {active.map((c) => (
          <Row key={c.id} c={c} live />
        ))}
      </ul>

      <SectionHeader title="Ended Concepts" to="/explore" />
      <ul className="space-y-2 px-4 pb-6">
        {ended.map((c) => (
          <Row key={c.id + "e"} c={c} />
        ))}
      </ul>
    </MobileShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-base font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function Row({ c, live }: { c: (typeof concepts)[number]; live?: boolean }) {
  return (
    <li>
      <Link
        to="/concept/$id"
        params={{ id: c.id }}
        className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5"
      >
        <div className="relative shrink-0 overflow-hidden rounded-lg">
          <img
            src={c.image}
            alt={c.title}
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <ConceptFormatBadge type={c.type} className="right-2 h-4 w-2.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="truncate font-semibold">{c.title}</div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            {live ? (
              <span className="flex items-center gap-1 text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> live
              </span>
            ) : (
              <span>ended</span>
            )}
            <span>· {c.participants} participants</span>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-warning">
          <Star className="h-3 w-3 fill-warning" /> {c.rating}
        </span>
      </Link>
    </li>
  );
}
