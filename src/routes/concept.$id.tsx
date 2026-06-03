import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Users, CheckCircle2, Lock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { concepts, episodes } from "@/data/mock";

export const Route = createFileRoute("/concept/$id")({
  loader: ({ params }) => {
    const c = concepts.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Concept"} — Wave` },
      { name: "description", content: `Join ${loaderData?.title} on Wave — submit, vote, and shape the verdict.` },
      { property: "og:image", content: loaderData?.image },
    ],
  }),
  notFoundComponent: () => <MobileShell><div className="p-10 text-center text-muted-foreground">Concept not found.</div></MobileShell>,
  errorComponent: () => <MobileShell><div className="p-10 text-center text-muted-foreground">Something went wrong.</div></MobileShell>,
  component: ConceptPage,
});

function ConceptPage() {
  const c = Route.useLoaderData();
  return (
    <MobileShell>
      <div className="relative">
        <img src={c.image} alt={c.title} width={1024} height={1024} className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <div className="absolute inset-x-0 top-0">
          <TopBar back actions="share" />
        </div>
        <div className="absolute inset-x-0 bottom-3 px-4 text-center text-white">
          <div className="font-display text-3xl font-bold tracking-wide drop-shadow">{c.title.toUpperCase()}</div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold">{c.title}</h1>
        <div className="mt-0.5 text-sm text-muted-foreground">by {c.host}</div>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-semibold text-warning"><Star className="h-4 w-4 fill-warning" /> {c.rating}</span>
          <span className="text-muted-foreground">({c.participants})</span>
          <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-4 w-4" /> 1,245 participants</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          A courtroom story where YOU decide the fate. Submit your defense, vote on others, and shape the verdict.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {c.tags.map((t: string) => (
            <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{t}</span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3 text-center">
          <Stat label="Episodes" value="8" />
          <Stat label="Completion" value="84%" />
          <Stat label="Rating" value="4.8" />
        </div>
      </div>

      <div className="px-4 pt-5">
        <h2 className="mb-2 text-[15px] font-semibold">Episodes</h2>
        <ul className="space-y-2">
          {episodes.map((ep) => {
            const live = ep.status === "live";
            const locked = ep.status === "locked" || ep.status === "upcoming";
            return (
              <li key={ep.n}>
                <Link
                  to="/episode/$id"
                  params={{ id: String(ep.n) }}
                  disabled={locked}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                    live ? "border-primary bg-primary/5" : "border-border bg-card"
                  } ${locked ? "opacity-60" : "hover:bg-muted/40"}`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Episode {ep.n} — {ep.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground capitalize">
                      {ep.status === "upcoming" ? "Unlocks in 2 days" : ep.status}
                    </div>
                  </div>
                  {ep.rating && (
                    <span className="flex items-center gap-1 text-xs font-medium text-warning">
                      <Star className="h-3 w-3 fill-warning" /> {ep.rating}
                    </span>
                  )}
                  {ep.status === "completed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-2 px-4 py-5">
        <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95">
          Join Series
        </button>
        <button className="w-full rounded-xl border border-border bg-card py-3 text-sm font-semibold text-primary">
          Buy Full Series — $4.99
        </button>
      </div>
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
