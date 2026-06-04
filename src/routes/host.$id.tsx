import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, ExternalLink, Instagram, Music2, Twitch, Youtube } from "lucide-react";
import { useRef, useState } from "react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
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
  instagram: { label: "Instagram", Icon: Instagram },
  tiktok: { label: "TikTok", Icon: Music2 },
  youtube: { label: "YouTube", Icon: Youtube },
  twitch: { label: "Twitch", Icon: Twitch },
};

type HostLayer = "highlights" | "active" | "all";

const hostLayers: { id: HostLayer; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  { id: "active", label: "Active Concepts" },
  { id: "all", label: "All Concepts" },
];

function HostPage() {
  const host = Route.useLoaderData();
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
      <div className="bg-gradient-to-b from-primary/10 via-background to-background">
        <TopBar back actions="more" title={null} />
        <section className="px-4 pb-4 pt-2">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <img
                src={host.avatar}
                alt={host.name}
                width={80}
                height={80}
                className="h-20 w-20 shrink-0 rounded-full border-4 border-background object-cover shadow-sm"
              />
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center gap-1.5 text-2xl font-bold">
                  <span className="truncate">{host.name}</span>
                  {host.verified && <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />}
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {host.bio}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SocialLinks socials={host.socials} />

      <section className="grid grid-cols-4 gap-2 px-4 pt-4">
        <Stat label="Participants" value={formatCompact(totalParticipants)} />
        <Stat label="Concepts" value={String(hostConcepts.length)} />
        <Stat label="Avg. Rating" value={averageRating} />
        <Stat label="Episodes" value={String(host.completedEpisodes)} />
      </section>

      <section className="pb-6 pt-5">
        <div className="no-scrollbar flex gap-6 overflow-x-auto border-b border-border px-4">
          {hostLayers.map((layer) => (
            <LayerButton
              key={layer.id}
              label={layer.label}
              active={activeLayer === layer.id}
              onClick={() => scrollToLayer(layer.id)}
            />
          ))}
        </div>

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
        <img
          src={concept.image}
          alt={concept.title}
          width={224}
          height={224}
          loading="lazy"
          className="h-full w-full object-cover"
        />
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

function SocialLinks({ socials }: { socials: Partial<Record<keyof typeof socialMeta, string>> }) {
  const entries = Object.entries(socials).filter(([key]) => key in socialMeta);

  if (entries.length === 0) return null;

  return (
    <section className="no-scrollbar flex gap-2 overflow-x-auto px-4">
      {entries.map(([key, href]) => {
        const meta = socialMeta[key as keyof typeof socialMeta];
        const Icon = meta.Icon;

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
          >
            <Icon className="h-3.5 w-3.5" />
            {meta.label}
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
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
        <img
          src={concept.image}
          alt={concept.title}
          width={96}
          height={96}
          loading="lazy"
          className="h-full w-full object-cover"
        />
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
    <div className="rounded-2xl border border-border bg-card px-2 py-2 text-center">
      <div className="text-sm font-bold">{value}</div>
      <div className="mt-0.5 text-[9px] font-semibold uppercase leading-tight text-muted-foreground">
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
  const bestEpisode = episodes
    .filter((episode) => episode.rating)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];
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
      title: bestEpisode.title,
      value: `${bestEpisode.rating}`,
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
