import { ChevronRight } from "lucide-react";
import type { PassportAchievement } from "@/data/mock";
import { achievementTypeIcon } from "./passport-utils";

export function AchievementTimelineItem({
  achievement,
  onSelect,
}: {
  achievement: PassportAchievement;
  onSelect: () => void;
}) {
  const Icon = achievementTypeIcon[achievement.type];
  const isNotable = achievement.type !== "Completed";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="app-card flex w-full items-start gap-3 p-3.5 text-left transition hover:bg-white/82"
    >
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
          isNotable ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-black leading-tight">{achievement.type}</span>
          <span className="text-muted-foreground">—</span>
          <span className="truncate font-black leading-tight">{achievement.conceptTitle}</span>
        </div>
        <div className="mt-0.5 text-sm font-semibold text-muted-foreground">
          {achievement.category}
          {achievement.seasonLabel ? ` · ${achievement.seasonLabel}` : ""}
        </div>
        <div className="mt-1 text-sm font-bold text-foreground">{achievement.placementLabel}</div>
      </div>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
}
