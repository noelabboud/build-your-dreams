import { createFileRoute } from "@tanstack/react-router";
import { FolderOpen, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { AchievementDetailView } from "@/components/passport/AchievementDetailView";
import { AchievementTimelineItem } from "@/components/passport/AchievementTimelineItem";
import { CreativeRecordCard } from "@/components/passport/CreativeRecordCard";
import { FeaturedAchievementCard } from "@/components/passport/FeaturedAchievementCard";
import { ParticipationMetric } from "@/components/passport/ParticipationMetric";
import { PassportEmptyState } from "@/components/passport/PassportEmptyState";
import { PassportIdentityHeader } from "@/components/passport/PassportIdentityHeader";
import {
  getAchievementForSubmission,
  getCreativeRecord,
  getSubmissionForAchievement,
  groupAchievementsByMonth,
} from "@/components/passport/passport-utils";
import { WorkCard } from "@/components/passport/WorkCard";
import { participantPassport, type CreativeCategory } from "@/data/mock";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Passport — MIDAN" },
      {
        name: "description",
        content: "Marc's verified creative participation record on MIDAN.",
      },
    ],
  }),
  component: Passport,
});

type WorkFilter = "All" | CreativeCategory;

function Passport() {
  const passport = participantPassport;
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [workFilter, setWorkFilter] = useState<WorkFilter>("All");

  const selectedSubmission = selectedSubmissionId
    ? passport.submissions.find((item) => item.id === selectedSubmissionId)
    : undefined;
  const selectedAchievement = selectedSubmission
    ? getAchievementForSubmission(passport, selectedSubmission)
    : undefined;

  const featuredAchievements = passport.achievements.filter((item) => item.featured);
  const creativeRecord = getCreativeRecord(passport);
  const workCategories = Array.from(new Set(passport.submissions.map((item) => item.category)));
  const visibleWork =
    workFilter === "All"
      ? passport.submissions
      : passport.submissions.filter((item) => item.category === workFilter);
  const timelineGroups = groupAchievementsByMonth(passport.achievements);

  return (
    <MobileShell mainClassName="bg-background">
      <PassportIdentityHeader passport={passport} />

      <div className="px-4 py-5">
        {selectedSubmission ? (
          <AchievementDetailView
            submission={selectedSubmission}
            achievement={selectedAchievement}
            onBack={() => setSelectedSubmissionId(null)}
          />
        ) : passport.achievements.length === 0 ? (
          <PassportEmptyState
            icon={Sparkles}
            title="Your Passport is just getting started."
            description="Join Concepts, submit work and earn recognition to build your creative record."
            showExploreCta
          />
        ) : (
          <div className="space-y-7 pb-6">
            <section>
              <h2 className="app-section-title">Featured Proof</h2>
              <div className="mt-4 space-y-3.5">
                {featuredAchievements.length > 0 ? (
                  featuredAchievements.map((achievement) => (
                    <FeaturedAchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      submission={getSubmissionForAchievement(passport, achievement)}
                      onSelect={() => setSelectedSubmissionId(achievement.submissionId)}
                    />
                  ))
                ) : (
                  <PassportEmptyState
                    icon={Trophy}
                    title="No featured work yet"
                    description="Your strongest submissions will appear here as your Midan history grows."
                  />
                )}
              </div>
            </section>

            {creativeRecord.length > 0 && (
              <section>
                <h2 className="app-section-title">Creative Record</h2>
                <div className="mt-4 space-y-3">
                  {creativeRecord.map((entry) => (
                    <CreativeRecordCard key={entry.category} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="app-section-title">Work</h2>
              {workCategories.length > 1 && (
                <div className="no-scrollbar -mx-4 mt-3.5 flex gap-2 overflow-x-auto px-4 pb-1">
                  {(["All", ...workCategories] as WorkFilter[]).map((filter) => {
                    const active = workFilter === filter;

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setWorkFilter(filter)}
                        className={`app-pill shrink-0 rounded-full border transition ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="mt-3.5">
                {visibleWork.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {visibleWork.map((submission) => (
                      <WorkCard
                        key={submission.id}
                        submission={submission}
                        onSelect={() => setSelectedSubmissionId(submission.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <PassportEmptyState
                    icon={FolderOpen}
                    title="No work here yet"
                    description="Submissions in this category will show up here once you take part."
                  />
                )}
              </div>
            </section>

            <section>
              <h2 className="app-section-title">Achievement History</h2>
              <div className="mt-4 space-y-5">
                {timelineGroups.map((group) => (
                  <div key={group.monthLabel}>
                    <div className="app-kicker text-muted-foreground">{group.monthLabel}</div>
                    <div className="mt-2.5 space-y-2.5">
                      {group.items.map((achievement) => (
                        <AchievementTimelineItem
                          key={achievement.id}
                          achievement={achievement}
                          onSelect={() => setSelectedSubmissionId(achievement.submissionId)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="app-section-title">Participation Record</h2>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <ParticipationMetric
                  label="Completion rate"
                  value={`${passport.participation.completionRate}%`}
                />
                <ParticipationMetric
                  label="On-time submissions"
                  value={`${passport.participation.onTimeRate}%`}
                />
                <ParticipationMetric
                  label="Concepts completed"
                  value={`${passport.participation.conceptsCompleted}`}
                />
                <ParticipationMetric
                  label="Average judge rating"
                  value={`${passport.participation.averageJudgeScore}`}
                />
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                <ParticipationMetric
                  label="Voting completion"
                  value={`${passport.participation.votingCompletionRate}%`}
                  subtle
                />
                <ParticipationMetric
                  label="Dropout rate"
                  value={`${passport.participation.dropoutRate}%`}
                  subtle
                />
                <ParticipationMetric
                  label="Returning host participation"
                  value={`${passport.participation.repeatHostRate}%`}
                  subtle
                />
                <ParticipationMetric
                  label={passport.xp.label}
                  value={`${passport.xp.currentXp}/${passport.xp.nextLevelXp} XP`}
                  subtle
                />
              </div>
            </section>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
