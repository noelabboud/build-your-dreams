import type { Concept } from "@/data/mock";
import { cn } from "@/lib/utils";

const formatBadgeStyles: Record<Concept["type"], string> = {
  "Narrative Series": "bg-sky-400/90",
  "Episodic Series": "bg-violet-400/90",
  "Competitive Series": "bg-amber-400/90",
  "One Shot Event": "bg-emerald-400/90",
  Minigame: "bg-fuchsia-400/90",
};

const formatBadgeLabels: Record<Concept["type"], string> = {
  "Narrative Series": "Narrative",
  "Episodic Series": "Episodic",
  "Competitive Series": "Competitive",
  "One Shot Event": "One Shot",
  Minigame: "Minigame",
};

export function ConceptFormatBadge({
  type,
  className,
  showLabel = false,
}: {
  type: Concept["type"];
  className?: string;
  showLabel?: boolean;
}) {
  const format = formatBadgeStyles[type];

  return (
    <span
      aria-label={showLabel ? formatBadgeLabels[type] : undefined}
      aria-hidden={showLabel ? undefined : "true"}
      className={cn(
        "pointer-events-none absolute right-3 top-0 z-10 block rounded-b-[2px] shadow-sm [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]",
        showLabel
          ? "min-w-24 px-3.5 pb-2.5 pt-2 text-center text-[11px] font-black uppercase leading-none tracking-wide text-white drop-shadow-sm"
          : "h-6 w-3.5",
        format,
        className,
      )}
    >
      {showLabel ? formatBadgeLabels[type] : null}
    </span>
  );
}
