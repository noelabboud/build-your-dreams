import { Link } from "@tanstack/react-router";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { HostLink } from "@/components/HostLink";
import type { ConceptType, OpenToJoinItem } from "@/data/mock";
import { cn } from "@/lib/utils";

const conceptTypeLabels: Record<ConceptType, string> = {
  "Narrative Series": "Narrative",
  "Episodic Series": "Episodic",
  "Competitive Series": "Competitive",
  "One Shot Event": "One Shot",
  Minigame: "Minigames",
};

const conceptTypeTextColors: Record<ConceptType, string> = {
  "Narrative Series": "text-sky-500",
  "Episodic Series": "text-violet-500",
  "Competitive Series": "text-amber-600",
  "One Shot Event": "text-emerald-500",
  Minigame: "text-fuchsia-500",
};

function availabilityPill(item: OpenToJoinItem) {
  if (item.availability.kind === "uncapped") {
    return {
      label: `Closes in ${item.availability.closesIn}`,
      className: "bg-primary/10 text-primary ring-primary/15",
      dotClassName: "bg-primary",
    };
  }

  const joinedSpots = item.availability.totalSpots - item.availability.spotsLeft;
  const isLow = item.availability.spotsLeft <= 5;

  return {
    label: `${joinedSpots}/${item.availability.totalSpots} joined`,
    className: isLow
      ? "bg-destructive/10 text-destructive ring-destructive/15"
      : "bg-warning/15 text-amber-700 ring-warning/20",
    dotClassName: isLow ? "bg-destructive" : "bg-warning",
  };
}

export function OpenToJoinCard({
  item,
  className,
  variant = "default",
}: {
  item: OpenToJoinItem;
  className?: string;
  variant?: "default" | "compact";
}) {
  const availability = availabilityPill(item);
  const cappedAvailability = item.availability.kind === "capped" ? item.availability : null;

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:bg-muted/30",
          className,
        )}
      >
        <Link
          to="/concept/$id"
          params={{ id: item.conceptId }}
          className="relative w-28 shrink-0 overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            width={240}
            height={260}
            loading="lazy"
            className="h-full min-h-36 w-full object-cover"
          />
          <ConceptFormatBadge type={item.type} className="right-2 h-5 w-3" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </Link>
        <div className="min-w-0 flex-1 p-3">
          <div
            className={cn(
              "truncate text-[10px] font-semibold uppercase tracking-wide",
              conceptTypeTextColors[item.type],
            )}
          >
            {conceptTypeLabels[item.type]}
          </div>
          <Link
            to="/concept/$id"
            params={{ id: item.conceptId }}
            className="mt-1 block line-clamp-1 text-sm font-bold leading-tight"
          >
            {item.title}
          </Link>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{item.subtitle}</p>
          <HostLink host={item.host} hostId={item.hostId} className="mt-2" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold leading-none ring-1",
                availability.className,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", availability.dotClassName)} />
              {availability.label}
            </span>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold leading-none text-muted-foreground">
              {item.participants}
            </span>
          </div>
          <div className="mt-1 text-[10px] font-medium text-muted-foreground">
            {cappedAvailability
              ? `${cappedAvailability.spotsLeft} spots left`
              : "No participant cap"}
          </div>
          <Link
            to="/concept/$id"
            params={{ id: item.conceptId }}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm"
          >
            Join Now
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex h-[23.75rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:bg-muted/30",
        className,
      )}
    >
      <Link
        to="/concept/$id"
        params={{ id: item.conceptId }}
        className="relative h-28 overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.title}
          width={400}
          height={500}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <ConceptFormatBadge type={item.type} className="h-6 w-3.5" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <div
          className={cn(
            "truncate text-[11px] font-semibold uppercase tracking-wide",
            conceptTypeTextColors[item.type],
          )}
        >
          {conceptTypeLabels[item.type]}
        </div>
        <div className="mt-2 min-h-[4rem]">
          <Link
            to="/concept/$id"
            params={{ id: item.conceptId }}
            className="block line-clamp-2 text-sm font-bold leading-tight"
          >
            {item.title}
          </Link>
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
            {item.subtitle}
          </p>
          <HostLink host={item.host} hostId={item.hostId} className="mt-2" />
        </div>
        <div className="mt-1.5 flex min-h-[2.25rem] flex-wrap content-start items-start gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold leading-none ring-1",
              availability.className,
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", availability.dotClassName)} />
            {availability.label}
          </span>
          <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold leading-none text-muted-foreground">
            {item.participants}
          </span>
        </div>
        <div className="mt-0.5 min-h-4 text-[10px] font-medium text-muted-foreground">
          {cappedAvailability ? `${cappedAvailability.spotsLeft} spots left` : "No participant cap"}
        </div>
        <div className="mt-auto pt-2">
          <Link
            to="/concept/$id"
            params={{ id: item.conceptId }}
            className="flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm"
          >
            Join Now
          </Link>
        </div>
      </div>
    </article>
  );
}
