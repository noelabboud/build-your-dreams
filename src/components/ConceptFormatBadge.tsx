import type { Concept } from "@/data/mock";
import { cn } from "@/lib/utils";

const formatBadgeStyles: Record<Concept["type"], string> = {
  "Narrative Series": "bg-sky-400/90",
  "Episodic Series": "bg-violet-400/90",
  "Competitive Series": "bg-amber-400/90",
  "One Shot Event": "bg-emerald-400/90",
  Minigame: "bg-fuchsia-400/90",
};

export function ConceptFormatBadge({
  type,
  className,
}: {
  type: Concept["type"];
  className?: string;
}) {
  const format = formatBadgeStyles[type];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute right-3 top-0 z-10 block h-5 w-3 rounded-b-[2px] shadow-sm [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]",
        format,
        className,
      )}
    />
  );
}
