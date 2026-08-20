import { ChevronRight, Users } from "lucide-react";
import { ConceptImage } from "@/components/ConceptImage";
import type { PassportAchievement, PassportSubmission } from "@/data/mock";
import { achievementTypeIcon } from "./passport-utils";

export function FeaturedAchievementCard({
  achievement,
  submission,
  onSelect,
}: {
  achievement: PassportAchievement;
  submission?: PassportSubmission;
  onSelect: () => void;
}) {
  const Icon = achievementTypeIcon[achievement.type];
  const ctaLabel =
    submission?.kind === "Script" || submission?.kind === "Text"
      ? "View Submission"
      : "View Performance";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="app-card block w-full overflow-hidden text-left transition hover:bg-white/82"
    >
      <div className="relative h-36 w-full overflow-hidden bg-[#10131A]">
        {submission?.thumbnail ? (
          <ConceptImage
            src={submission.thumbnail}
            alt={achievement.conceptTitle}
            className="h-full w-full"
            imageClassName="opacity-90"
          />
        ) : (
          <div className="grid h-full w-full place-items-center px-6">
            <p className="line-clamp-3 text-center font-display text-sm italic leading-snug text-white/80">
              {submission?.preview ?? achievement.conceptTitle}
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />
        <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 px-4 pt-3.5">
          <Icon className="h-4 w-4 shrink-0 text-white" />
          <span className="app-kicker text-white">
            {achievement.type} · {achievement.category}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5">
          <div className="text-lg font-black leading-tight text-white">
            {achievement.conceptTitle}
            {achievement.seasonLabel ? (
              <span className="text-white/70"> — {achievement.seasonLabel}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black text-primary">
            {achievement.placementLabel}
          </span>
          {achievement.entrantCount ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {achievement.entrantCount.toLocaleString()} participants
            </span>
          ) : null}
        </div>

        <div className="mt-2 text-sm font-semibold text-muted-foreground">
          Hosted by {achievement.hostName}
        </div>

        {(achievement.judgeScore || achievement.communityVotePercent) && (
          <div className="mt-2.5 flex flex-wrap gap-4">
            {achievement.judgeScore ? (
              <div>
                <div className="text-sm font-black text-foreground">
                  {achievement.judgeScore}/100
                </div>
                <div className="app-caption text-muted-foreground">Judge score</div>
              </div>
            ) : null}
            {achievement.communityVotePercent ? (
              <div>
                <div className="text-sm font-black text-foreground">
                  {achievement.communityVotePercent}%
                </div>
                <div className="app-caption text-muted-foreground">Community vote</div>
              </div>
            ) : null}
          </div>
        )}

        {achievement.recognitionNote ? (
          <p className="app-body mt-2.5 text-muted-foreground">{achievement.recognitionNote}</p>
        ) : null}

        <div className="mt-3.5 flex items-center justify-between border-t border-border/70 pt-3 text-sm font-black text-primary">
          {ctaLabel}
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
}
