import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Instagram,
  MoreHorizontal,
  Music2,
  Twitch,
  Youtube,
} from "lucide-react";
import { useRef, useState } from "react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { ConceptImage } from "@/components/ConceptImage";
import { MobileShell } from "@/components/MobileShell";
import { concepts, episodes, topHosts, type Concept, type ConceptType } from "@/data/mock";
import { isConceptEnded } from "@/lib/concept-status";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/host/$id")({
  loader: ({ params }) => {
    const h = topHosts.find((x) => x.id === params.id);
    if (!h) throw notFound();
    return h;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Host"} — MIDAN` },
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

const categoryMeta: Record<
  ConceptType,
  { label: string; folderLabel: string; color: string; itemName: string }
> = {
  "Narrative Series": {
    label: "Narrative Series",
    folderLabel: "Narrative Series",
    color: "from-[#7C3AED] to-[#4C1D95]",
    itemName: "concepts",
  },
  "Episodic Series": {
    label: "Episodic Series",
    folderLabel: "Episodic Series",
    color: "from-[#1E3A5F] to-[#0F172A]",
    itemName: "concepts",
  },
  "Competitive Series": {
    label: "Competitive Series",
    folderLabel: "Competitive Series",
    color: "from-[#D97706] to-[#92400E]",
    itemName: "concepts",
  },
  "One Shot Event": {
    label: "One Shot Events",
    folderLabel: "One Shot Events",
    color: "from-[#0D9488] to-[#115E59]",
    itemName: "events",
  },
  Minigame: {
    label: "Minigames",
    folderLabel: "Minigames",
    color: "from-[#2563EB] to-[#1E40AF]",
    itemName: "events",
  },
};

const socialMeta = {
  instagram: { label: "Instagram", Icon: Instagram, iconClassName: "text-pink-500" },
  tiktok: { label: "TikTok", Icon: Music2, iconClassName: "text-slate-950" },
  youtube: { label: "YouTube", Icon: Youtube, iconClassName: "text-red-600" },
  twitch: { label: "Twitch", Icon: Twitch, iconClassName: "text-violet-600" },
};

type HostLayer = "highlights" | "active" | "all";

const hostLayers: { id: HostLayer; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  { id: "active", label: "Active Concepts" },
  { id: "all", label: "All Concepts" },
];

function HostPage() {
  const host = Route.useLoaderData();
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState<HostLayer>("highlights");
  const layerScrollRef = useRef<HTMLDivElement>(null);
  const hostConcepts = concepts.filter((concept) => concept.hostId === host.id);
  const activeConcepts = hostConcepts.filter((concept) => !isConceptEnded(concept.status));
  const completedConcepts = hostConcepts.filter((concept) => isConceptEnded(concept.status));
  const averageRating = completedConcepts.length
    ? (
        completedConcepts.reduce((total, concept) => total + concept.rating, 0) /
        completedConcepts.length
      ).toFixed(1)
    : "—";
  const totalParticipants = hostConcepts.reduce(
    (total, concept) => total + parseParticipantCount(concept.participants),
    0,
  );
  const groupedConcepts = groupByType(hostConcepts);
  const highlights = getHighlights(hostConcepts, host.completedEpisodes);
  const visibleFolders = (Object.keys(categoryMeta) as ConceptType[])
    .map((type) => ({ type, items: groupedConcepts[type] ?? [] }))
    .filter(({ items }) => items.length > 0);

  const scrollToLayer = (layer: HostLayer) => {
    const container = layerScrollRef.current;
    const targetIndex = hostLayers.findIndex((item) => item.id === layer);
    const panel = container?.children[targetIndex] as HTMLElement | undefined;

    setActiveLayer(layer);
    panel?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const handleLayerScroll = () => {
    const container = layerScrollRef.current;
    if (!container) return;

    const activeIndex = Math.round(container.scrollLeft / container.clientWidth);
    setActiveLayer(hostLayers[activeIndex]?.id ?? "highlights");
  };

  return (
    <MobileShell>
      <section className="relative overflow-hidden bg-muted/30 pb-5">
        <div className="relative h-72 overflow-hidden bg-muted">
          <ConceptImage
            src={host.coverImage}
            alt=""
            className="absolute inset-0 h-full w-full opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/55 to-muted/30" />
        </div>

        <div className="absolute inset-x-0 top-0 z-20 flex h-[calc(3.5rem+env(safe-area-inset-top))] items-center justify-between px-4 pt-[env(safe-area-inset-top)]">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur transition hover:bg-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="More actions"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur transition hover:bg-white"
          >
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>

        <div className="relative z-10 -mt-48 px-5">
          <div className="rounded-[1.75rem] border border-border/80 bg-card/95 p-4 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.65)] backdrop-blur">
            <div className="flex items-end gap-4">
              <ConceptImage
                src={host.avatar}
                alt={host.name}
                className="h-24 w-24 shrink-0 rounded-full border-4 border-card shadow-lg shadow-slate-900/15"
              />
              <div className="min-w-0 flex-1 pb-2">
                <div className="flex items-center gap-1.5 text-3xl font-black leading-none tracking-tight">
                  <span className="truncate">{host.name}</span>
                  {host.verified && <BadgeCheck className="h-6 w-6 shrink-0 text-primary" />}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Host portfolio
                </div>
              </div>
            </div>

            <div className="mt-4">
              <SocialLinks socials={host.socials} socialStats={host.socialStats} />
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {host.bio}
            </p>

            <div className="mt-4 grid grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-background p-3 shadow-sm">
              <Stat label="Concepts" value={String(hostConcepts.length)} />
              <Stat label="Episodes" value={String(host.completedEpisodes)} />
              <Stat label="Participants" value={formatCompact(totalParticipants)} />
              <Stat label="Avg. Rating" value={averageRating} />
            </div>
          </div>
        </div>
      </section>

      <div className="no-scrollbar flex gap-6 overflow-x-auto border-b border-border bg-background px-4 pt-4">
        {hostLayers.map((layer) => (
          <LayerButton
            key={layer.id}
            label={layer.label}
            active={activeLayer === layer.id}
            onClick={() => scrollToLayer(layer.id)}
          />
        ))}
      </div>
      <section className="bg-background pb-6">
        <div
          ref={layerScrollRef}
          onScroll={handleLayerScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          <div className="w-full shrink-0 snap-start px-4 pt-3">
            <HighlightsCard highlights={highlights} />
          </div>
          <div className="w-full shrink-0 snap-start px-4 pt-3">
            <div className="space-y-3">
              {activeConcepts.map((concept) => (
                <ActiveConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          </div>
          <div className="w-full shrink-0 snap-start px-4 pt-3">
            <div className="grid grid-cols-2 gap-3">
              {visibleFolders.map(({ type, items }) => (
                <FolderCard key={type} type={type} items={items} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </MobileShell>
  );
}

function LayerButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-2.5 text-sm font-bold transition ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {label}
      {active && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
    </button>
  );
}

function HighlightsCard({ highlights }: { highlights: ReturnType<typeof getHighlights> }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {highlights.map((highlight) => (
        <Link
          key={highlight.label}
          to={highlight.to}
          params={highlight.params}
          className="min-h-32 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:bg-muted/40"
        >
          <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {highlight.label}
          </div>
          <div className="mt-4 text-2xl font-black leading-none">{highlight.value}</div>
          <div className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-muted-foreground">
            {highlight.title}
          </div>
        </Link>
      ))}
    </div>
  );
}

function ActiveConceptCard({ concept }: { concept: Concept }) {
  const status = concept.status === "upcoming" ? "Opening soon" : "Live now";

  return (
    <Link
      to="/concept/$id"
      params={{ id: concept.id }}
      className="flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:bg-muted/40"
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden">
        <ConceptImage src={concept.image} alt={concept.title} className="h-full w-full" />
        <ConceptFormatBadge type={concept.type} className="right-2 h-5 w-3" />
      </div>
      <div className="min-w-0 flex-1 p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {status}
        </div>
        <div className="mt-1 line-clamp-2 text-base font-bold leading-tight">{concept.title}</div>
        <div className="mt-1 text-xs font-medium text-muted-foreground">
          {categoryMeta[concept.type].label}
        </div>
        <div className="mt-3 text-xs font-semibold text-muted-foreground">
          {concept.participants} participants
        </div>
      </div>
    </Link>
  );
}

function SocialLinks({
  socials,
  socialStats,
}: {
  socials: Partial<Record<keyof typeof socialMeta, string>>;
  socialStats: Partial<Record<keyof typeof socialMeta, string>>;
}) {
  const entries = (Object.keys(socialMeta) as Array<keyof typeof socialMeta>)
    .filter((key) => socials[key])
    .map((key) => [key, socials[key]] as const);

  if (entries.length === 0) return null;

  return (
    <section className="grid grid-cols-4 gap-2">
      {entries.map(([key, href]) => {
        const meta = socialMeta[key];
        const Icon = meta.Icon;
        const count = socialStats[key];

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${meta.label} profile`}
            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1.5 text-xs font-bold text-foreground shadow-sm"
          >
            <Icon className={cn("h-3.5 w-3.5", meta.iconClassName)} />
            <span className="truncate">{count}</span>
          </a>
        );
      })}
    </section>
  );
}

function FolderCard({ type, items }: { type: ConceptType; items: Concept[] }) {
  const meta = categoryMeta[type];
  const active = items.some((item) => item.status === "live" || item.status === "upcoming");
  const threeLayer =
    type === "Narrative Series" || type === "Episodic Series" || type === "Competitive Series";
  const countLabel = `${items.length} ${threeLayer ? meta.itemName : meta.itemName}`;

  return (
    <details className="group">
      <summary
        className={cn(
          "relative flex min-h-32 cursor-pointer list-none flex-col items-center justify-center rounded-2xl bg-gradient-to-br p-4 text-center text-white shadow-sm [&::-webkit-details-marker]:hidden",
          meta.color,
        )}
      >
        {active && (
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-emerald-300 ring-2 ring-white/30" />
        )}
        <div className="text-base font-bold leading-tight">{meta.folderLabel}</div>
        <div className="mt-1 text-xs font-medium text-white/80">{countLabel}</div>
      </summary>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <PortfolioItem key={item.id} concept={item} showEpisodes={threeLayer} />
        ))}
      </div>
    </details>
  );
}

function PortfolioItem({ concept, showEpisodes }: { concept: Concept; showEpisodes: boolean }) {
  return (
    <Link
      to="/concept/$id"
      params={{ id: concept.id }}
      className="flex items-center gap-2 rounded-xl border border-border bg-card p-2 transition hover:bg-muted/40"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
        <ConceptImage src={concept.image} alt={concept.title} className="h-full w-full" />
        <ConceptFormatBadge type={concept.type} className="right-1.5 h-4 w-2.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold">{concept.title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {showEpisodes ? "Episodes inside" : `${concept.participants} participants`}
        </div>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-1.5 py-1 text-center">
      <div className="truncate text-lg font-black leading-tight text-foreground">{value}</div>
      <div className="mt-1 truncate text-[10px] font-semibold leading-tight text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function groupByType(items: Concept[]) {
  return items.reduce<Partial<Record<ConceptType, Concept[]>>>((groups, item) => {
    groups[item.type] = [...(groups[item.type] ?? []), item];
    return groups;
  }, {});
}

function getHighlights(hostConcepts: Concept[], completedEpisodes: number) {
  const bestConcept = [...hostConcepts].sort((a, b) => b.rating - a.rating)[0] ?? hostConcepts[0];
  const mostParticipated =
    [...hostConcepts].sort(
      (a, b) => parseParticipantCount(b.participants) - parseParticipantCount(a.participants),
    )[0] ?? hostConcepts[0];
  const hostConceptIds = new Set(hostConcepts.map((concept) => concept.id));
  const bestEpisode = episodes
    .filter((episode) => episode.score && hostConceptIds.has(episode.conceptId))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];
  const bestEpisodeConcept = hostConcepts.find((concept) => concept.id === bestEpisode?.conceptId);
  const firstActiveConcept = hostConcepts.find((concept) => !isConceptEnded(concept.status));
  const activeCount = hostConcepts.filter((concept) => !isConceptEnded(concept.status)).length;

  return [
    bestConcept && {
      label: "Highest rated concept",
      title: bestConcept.title,
      value: `${bestConcept.rating}`,
      to: "/concept/$id" as const,
      params: { id: bestConcept.id },
    },
    mostParticipated && {
      label: "Most participated",
      title: mostParticipated.title,
      value: formatCompact(parseParticipantCount(mostParticipated.participants)),
      to: "/concept/$id" as const,
      params: { id: mostParticipated.id },
    },
    bestEpisode && {
      label: "Top episode score",
      title: `${bestEpisode.title}${
        bestEpisodeConcept ? ` (${bestEpisodeConcept.title}, Episode ${bestEpisode.n})` : ""
      }`,
      value: `${bestEpisode.score}`,
      to: "/episode/$id" as const,
      params: { id: String(bestEpisode.n) },
    },
    {
      label: "Active now",
      title: `${completedEpisodes} completed episodes in the archive`,
      value: String(activeCount),
      to: "/concept/$id" as const,
      params: { id: firstActiveConcept?.id ?? bestConcept.id },
    },
  ].filter(Boolean);
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
