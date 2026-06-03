import { Link } from "@tanstack/react-router";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import type { ConceptType, OpenToJoinItem } from "@/data/mock";
import { cn } from "@/lib/utils";

const conceptTypeLabels: Record<ConceptType, string> = {
  "Narrative Series": "Narrative",
  "Episodic Series": "Episodic",
  "Competitive Series": "Competitive",
  "One Shot Event": "One Shot",
  Minigame: "Minigames",
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

export function OpenToJoinCard({ item, className }: { item: OpenToJoinItem; className?: string }) {
  const availability = availabilityPill(item);
  const cappedAvailability = item.availability.kind === "capped" ? item.availability : null;

  return (
    <Link
      to="/concept/$id"
      params={{ id: item.conceptId }}
      className={cn(
        "block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:bg-muted/30",
        className,
      )}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          width={400}
          height={500}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <ConceptFormatBadge type={item.type} className="h-6 w-3.5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      <div className="space-y-2.5 p-3">
        <div className="truncate text-[11px] font-semibold uppercase tracking-wide text-primary">
          {conceptTypeLabels[item.type]}
        </div>
        <div>
          <div className="line-clamp-2 text-sm font-bold leading-tight">{item.title}</div>
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
            {item.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
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
        {cappedAvailability && (
          <div className="text-[10px] font-medium text-muted-foreground">
            {cappedAvailability.spotsLeft} spots left
          </div>
        )}
        <div className="pt-0.5">
          <span className="flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm">
            Join Now
          </span>
        </div>
      </div>
    </Link>
  );
}
