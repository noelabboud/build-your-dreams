import { Link } from "@tanstack/react-router";
import { Star, UserRound } from "lucide-react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import type { ConceptType, OpenToJoinItem } from "@/data/mock";
import { cn } from "@/lib/utils";

const conceptTypeLabels: Record<ConceptType, string> = {
  "Narrative Series": "Narrative",
  "Episodic Series": "Episodic",
  "Competitive Series": "Competitive",
  "One Shot Event": "One Shot",
  Minigame: "Minigame",
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
  index,
}: {
  item: OpenToJoinItem;
  className?: string;
  variant?: "default" | "compact";
  index?: number;
}) {
  const availability = availabilityPill(item);
  const cappedAvailability = item.availability.kind === "capped" ? item.availability : null;
  const availabilityDetail = cappedAvailability
    ? `${cappedAvailability.spotsLeft} spots left`
    : item.participants;

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "flex min-h-28 overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
          className,
        )}
      >
        <Link
          to="/concept/$id"
          params={{ id: item.conceptId }}
          className="group relative w-28 shrink-0 overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            width={224}
            height={224}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <ConceptFormatBadge type={item.type} className="right-2 h-5 w-3" />
        </Link>
        <div className="min-w-0 flex-1 p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-primary">
            <Star className="h-3.5 w-3.5 fill-primary" />
            {typeof index === "number" ? `Open #${index + 1}` : conceptTypeLabels[item.type]}
          </div>
          <Link
            to="/concept/$id"
            params={{ id: item.conceptId }}
            className="mt-1 block line-clamp-2 text-base font-black leading-tight transition hover:text-primary"
          >
            {item.title}
          </Link>
          <div className="mt-1 truncate text-sm font-medium text-muted-foreground">
            Hosted by {item.host}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <AvailabilityPill availability={availability} />
              <div className="mt-1 truncate text-[11px] font-semibold text-muted-foreground">
                {availabilityDetail}
              </div>
            </div>
            <Link
              to="/concept/$id"
              params={{ id: item.conceptId }}
              className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-black text-primary-foreground shadow-sm transition hover:bg-primary/90"
              aria-label={`Join ${item.title}`}
            >
              Join
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex h-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:bg-muted/30",
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
      <div className="flex flex-1 flex-col p-3 pb-2.5">
        <div
          className={cn(
            "truncate text-[11px] font-semibold uppercase tracking-wide",
            conceptTypeTextColors[item.type],
          )}
        >
          {conceptTypeLabels[item.type]}
        </div>
        <div className="mt-2 h-[4.75rem]">
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
        </div>
        <div className="mt-1.5 h-[4.25rem] space-y-1.5">
          <AvailabilityPill availability={availability} />
          <div className="text-[10px] font-medium leading-tight text-muted-foreground">
            {availabilityDetail}
          </div>
          <div className="-mt-0.5 flex justify-end">
            <HostButton host={item.host} hostId={item.hostId} />
          </div>
        </div>
        <div className="mt-auto pt-1.5">
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

function HostButton({ host, hostId }: { host: string; hostId: string }) {
  return (
    <Link
      to="/host/$id"
      params={{ id: hostId }}
      className="inline-flex max-w-full items-center gap-1.5 text-[11px] font-semibold text-muted-foreground transition hover:text-primary"
    >
      <UserRound className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">by {host}</span>
    </Link>
  );
}

function AvailabilityPill({ availability }: { availability: ReturnType<typeof availabilityPill> }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 max-w-full items-center justify-center gap-1 rounded-full px-2 text-[10px] font-bold leading-none ring-1",
        availability.className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", availability.dotClassName)} />
      <span className="truncate">{availability.label}</span>
    </span>
  );
}
