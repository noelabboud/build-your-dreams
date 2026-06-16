import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  ChevronRight,
  Funnel,
  Instagram,
  MoreHorizontal,
  Music2,
  Star,
  Twitch,
  Youtube,
} from "lucide-react";
import { ConceptImage } from "@/components/ConceptImage";
import { MobileShell } from "@/components/MobileShell";
import { concepts, topHosts, type Concept, type ConceptType } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/host/$id")({
  loader: ({ params }) => {
    const h = topHosts.find((x) => x.id === params.id);
    if (!h) throw notFound();
    return h;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Host"} - MIDAN` },
      { name: "description", content: `Public host profile for ${loaderData?.name}.` },
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

const socialMeta = {
  instagram: { label: "Instagram", Icon: Instagram, iconClassName: "text-pink-500" },
  tiktok: { label: "TikTok", Icon: Music2, iconClassName: "text-slate-950" },
  youtube: { label: "YouTube", Icon: Youtube, iconClassName: "text-red-600" },
  twitch: { label: "Twitch", Icon: Twitch, iconClassName: "text-violet-600" },
};

const categoryMeta: Record<ConceptType, { label: string; text: string; chip: string }> = {
  "Narrative Series": {
    label: "Narrative Series",
    text: "text-sky-600",
    chip: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  "Episodic Series": {
    label: "Episodic",
    text: "text-violet-600",
    chip: "bg-violet-50 text-violet-700 ring-violet-100",
  },
  "Competitive Series": {
    label: "Competitive",
    text: "text-amber-600",
    chip: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  "One Shot Event": {
    label: "One-Shot Event",
    text: "text-emerald-600",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  Minigame: {
    label: "Minigame",
    text: "text-fuchsia-600",
    chip: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100",
  },
};

const reviews = [
  {
    name: "Amina K.",
    rating: "5.0",
    quote: "Midnight Jury is one of the most immersive experiences I've had.",
  },
  {
    name: "Leo R.",
    rating: "5.0",
    quote: "Samer's storytelling keeps everyone on the edge.",
  },
];

function HostPage() {
  const host = Route.useLoaderData();
  const router = useRouter();
  const hostConcepts = concepts.filter((concept) => concept.hostId === host.id);
  const averageRating = getAverageRating(hostConcepts);
  const totalParticipants = hostConcepts.reduce(
    (total, concept) => total + parseParticipantCount(concept.participants),
    0,
  );

  return (
    <MobileShell mainClassName="bg-white">
      <section className="relative">
        <div className="relative h-[14rem] overflow-hidden bg-slate-950">
          <ConceptImage
            src={host.coverImage}
            alt=""
            className="absolute inset-0 h-full w-full opacity-95"
            imageClassName="bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-slate-900/15 to-slate-900/50" />
        </div>

        <div className="absolute inset-x-0 top-0 z-20 flex h-[calc(3.75rem+env(safe-area-inset-top))] items-center justify-between px-4 pt-[env(safe-area-inset-top)]">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Back"
            className="app-icon-button bg-white/95 text-foreground shadow-sm backdrop-blur transition active:scale-95"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="More actions"
            className="app-icon-button bg-white/95 text-foreground shadow-sm backdrop-blur transition active:scale-95"
          >
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>

        <div className="relative z-10 -mt-24 px-4">
          <div className="rounded-[1.5rem] border border-white/90 bg-white/95 p-4 shadow-[0_22px_54px_-34px_rgba(15,23,42,0.72)] backdrop-blur">
            <div className="flex items-center gap-3">
              <ConceptImage
                src={host.avatar}
                alt={host.name}
                className="h-[5.25rem] w-[5.25rem] shrink-0 rounded-full border-[5px] border-white shadow-lg shadow-slate-900/15"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[1.95rem] font-black leading-none">
                  <span className="truncate">{host.name}</span>
                  {host.verified && <BadgeCheck className="h-5 w-5 shrink-0 text-blue-500" />}
                </div>
                <div className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                  Host portfolio
                </div>
              </div>
            </div>

            <SocialLinks socials={host.socials} socialStats={host.socialStats} />

            <p className="mt-4 text-[15px] font-medium leading-6 text-slate-600">{host.bio}</p>

            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-[1.15rem] border border-slate-200 bg-slate-50/70 px-2 py-3 shadow-sm">
              <Stat label="Concepts" value={String(hostConcepts.length)} />
              <Stat label="Participants" value={formatCompact(totalParticipants)} />
              <Stat label="Avg. Rating" value={averageRating} />
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6 px-4 pb-8 pt-5">
        <SectionHeader count={hostConcepts.length} title="Concepts" />
        <div className="space-y-3">
          {hostConcepts.map((concept) => (
            <ConceptRow key={concept.id} concept={concept} />
          ))}
        </div>
        <Reviews averageRating={averageRating} />
      </div>
    </MobileShell>
  );
}

function SectionHeader({ count, title }: { count: number; title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-black leading-tight">
        {title} <span className="ml-1 text-base font-bold text-slate-500">({count})</span>
      </h2>
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-bold text-primary"
        aria-label="Filter concepts"
      >
        Filter
        <Funnel className="h-4 w-4" />
      </button>
    </div>
  );
}

function SocialLinks({
  socials,
  socialStats,
}: {
  socials: Partial<Record<keyof typeof socialMeta, string>>;
  socialStats: Partial<Record<keyof typeof socialMeta, string>>;
}) {
  const entries = (Object.keys(socialMeta) as Array<keyof typeof socialMeta>).filter(
    (key) => socials[key],
  );

  return (
    <section className="mt-4 grid grid-cols-4 gap-2">
      {entries.map((key) => {
        const meta = socialMeta[key];
        const Icon = meta.Icon;

        return (
          <a
            key={key}
            href={socials[key]}
            target="_blank"
            rel="noreferrer"
            aria-label={`${meta.label} profile`}
            className="inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 text-xs font-black text-slate-950 shadow-sm"
          >
            <Icon className={cn("h-3.5 w-3.5", meta.iconClassName)} />
            <span className="truncate">{socialStats[key]}</span>
          </a>
        );
      })}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-1 py-1 text-center">
      <div className="truncate text-[1.12rem] font-black leading-tight">{value}</div>
      <div className="mt-0.5 truncate text-[11px] font-bold text-slate-500">{label}</div>
    </div>
  );
}

function ConceptRow({ concept }: { concept: Concept }) {
  const meta = categoryMeta[concept.type];
  const status =
    concept.status === "upcoming" ? "Opening soon" : concept.status === "live" ? "Live" : "Open";

  return (
    <Link
      to="/concept/$id"
      params={{ id: concept.id }}
      className="app-card group flex min-h-[6.85rem] items-center gap-3 overflow-hidden p-2.5 transition active:scale-[0.99]"
    >
      <div className="relative h-[5.75rem] w-[8rem] shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <ConceptImage src={concept.image} alt={concept.title} className="h-full w-full" />
        <span
          className={cn(
            "absolute left-2 top-2 rounded-full bg-white/92 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide shadow-sm ring-1 backdrop-blur",
            meta.chip,
          )}
        >
          {status}
        </span>
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 pr-1">
        <div className="min-w-0 flex-1">
          <div className="line-clamp-1 text-lg font-black leading-tight">{concept.title}</div>
          <div className={cn("mt-1 line-clamp-1 text-sm font-extrabold", meta.text)}>
            {meta.label}
          </div>
          <div className="mt-1.5 truncate text-sm font-semibold text-slate-500">
            {concept.participants} participants
          </div>
          <div className="mt-1.5 inline-flex items-center gap-1 text-sm font-bold text-slate-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {concept.rating}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-500 shadow-sm"
            aria-hidden="true"
          >
            <Bookmark className="h-4.5 w-4.5" />
          </span>
          <ChevronRight className="h-4.5 w-4.5 text-slate-400 transition group-active:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function Reviews({ averageRating }: { averageRating: string }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-black leading-tight">Reviews</h2>
        <Link to="/explore" className="text-sm font-bold text-primary">
          View all
        </Link>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
        <div className="w-36 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black leading-none">{averageRating}</div>
          <div className="mt-2 flex gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-500">From 1.6K reviews</div>
        </div>
        {reviews.map((review) => (
          <article
            key={review.name}
            className="w-60 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-black">{review.name}</div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {review.rating}
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-slate-600">
              "{review.quote}"
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function getAverageRating(items: Concept[]) {
  if (items.length === 0) return "-";
  return (items.reduce((total, concept) => total + concept.rating, 0) / items.length).toFixed(1);
}

function parseParticipantCount(value: string) {
  const normalized = value.trim().toUpperCase();
  const multiplier = normalized.endsWith("K") ? 1000 : 1;
  return Math.round(Number.parseFloat(normalized) * multiplier);
}

function formatCompact(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return String(value);
}
