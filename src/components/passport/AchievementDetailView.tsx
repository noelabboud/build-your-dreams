import type { ReactNode } from "react";
import { Star, Trophy, Users } from "lucide-react";
import { ConceptImage } from "@/components/ConceptImage";
import { HostLink } from "@/components/HostLink";
import type { PassportAchievement, PassportSubmission } from "@/data/mock";
import { achievementTypeIcon } from "./passport-utils";

export function AchievementDetailView({
  achievement,
  submission,
  onBack,
}: {
  achievement?: PassportAchievement;
  submission: PassportSubmission;
  onBack: () => void;
}) {
  const Icon = achievement ? achievementTypeIcon[achievement.type] : Star;

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
        <button
          type="button"
          onClick={onBack}
          className="text-primary transition hover:text-primary/80"
        >
          Passport
        </button>
        <span className="text-muted-foreground/60">&rsaquo;</span>
        <span className="truncate text-foreground">{submission.conceptTitle}</span>
      </div>

      <section className="app-card overflow-hidden">
        <div className="relative h-40 w-full overflow-hidden bg-[#10131A]">
          {submission.thumbnail ? (
            <ConceptImage
              src={submission.thumbnail}
              alt={submission.title ?? submission.conceptTitle}
              className="h-full w-full"
            />
          ) : (
            <div className="grid h-full w-full place-items-center px-6">
              <p className="line-clamp-4 text-center font-display text-sm italic leading-snug text-white/80">
                {submission.preview ?? submission.conceptTitle}
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5">
            {achievement && (
              <div className="mb-1 flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-white" />
                <span className="app-kicker text-white">
                  {achievement.type} · {achievement.category}
                </span>
              </div>
            )}
            <div className="text-lg font-black leading-tight text-white">
              {submission.conceptTitle}
              {submission.seasonLabel ? (
                <span className="text-white/70"> — {submission.seasonLabel}</span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-4">
          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black text-primary">
            {achievement?.placementLabel ?? submission.placementLabel ?? "Completed"}
          </span>
          {achievement?.entrantCount ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {achievement.entrantCount.toLocaleString()} participants
            </span>
          ) : null}
          <span className="text-xs font-bold text-muted-foreground">
            {achievement?.date ?? submission.date}
          </span>
        </div>
      </section>

      <section className="app-card p-4">
        <SectionTitle icon={<Trophy className="h-5 w-5" />} title="Evaluation" />
        <div className="mt-3.5 rounded-2xl bg-muted px-3.5 py-3">
          <Fact label="Result" value={achievement?.placementLabel ?? "Recorded"} />
          {achievement?.judgeScore ? (
            <Fact label="Judge score" value={`${achievement.judgeScore}/100`} />
          ) : null}
          {achievement?.communityVotePercent ? (
            <Fact label="Community vote" value={`${achievement.communityVotePercent}%`} />
          ) : null}
          <Fact label="Evaluation method" value={achievement?.evaluationMethod ?? "Host review"} />
          <Fact
            label="Hosted by"
            value=""
            valueSlot={
              <HostLink
                host={achievement?.hostName ?? submission.hostName}
                hostId={achievement?.hostId ?? submission.hostId}
              />
            }
          />
        </div>
      </section>

      {achievement?.stageProgression && achievement.stageProgression.length > 0 && (
        <section className="app-card p-4">
          <SectionTitle icon={<Star className="h-5 w-5" />} title="Stage progression" />
          <div className="mt-3.5 flex flex-wrap gap-2">
            {achievement.stageProgression.map((stage, index) => (
              <span
                key={stage}
                className={`rounded-full px-3 py-1.5 text-xs font-black ${
                  index === achievement.stageProgression!.length - 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {stage}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="app-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="app-kicker text-primary">Submission</div>
          <span className="rounded-full bg-card px-2.5 py-1.5 text-xs font-black text-primary">
            {submission.kind}
          </span>
        </div>
        {submission.thumbnail ? (
          <div className="mt-3.5 overflow-hidden rounded-2xl border border-border">
            <ConceptImage
              src={submission.thumbnail}
              alt={submission.title ?? submission.conceptTitle}
              className="h-40 w-full"
            />
          </div>
        ) : (
          <div className="app-body mt-3.5 rounded-2xl bg-muted p-3.5 italic text-foreground">
            {submission.preview}
          </div>
        )}
      </section>

      {achievement?.recognitionNote && (
        <section className="app-card p-4">
          <SectionTitle icon={<Star className="h-5 w-5" />} title="Recognition" />
          <p className="app-body mt-3 text-muted-foreground">{achievement.recognitionNote}</p>
        </section>
      )}
    </div>
  );
}

function Fact({
  label,
  value,
  valueSlot,
}: {
  label: string;
  value: string;
  valueSlot?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 py-1.5 last:border-b-0">
      <div className="text-sm font-bold text-muted-foreground">{label}</div>
      {valueSlot ?? (
        <div className="min-w-0 truncate text-right text-sm font-black text-foreground">
          {value}
        </div>
      )}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-base font-black">
      <span className="text-primary">{icon}</span>
      {title}
    </div>
  );
}
