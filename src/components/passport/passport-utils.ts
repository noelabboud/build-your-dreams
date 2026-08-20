import {
  Award,
  CheckCircle2,
  Medal,
  ShieldCheck,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type {
  AchievementType,
  CreativeCategory,
  ParticipantPassport,
  PassportAchievement,
  PassportSubmission,
} from "@/data/mock";

export const achievementTypeIcon: Record<AchievementType, LucideIcon> = {
  Winner: Trophy,
  Finalist: Medal,
  "Host Pick": Star,
  "Judge Pick": Award,
  Qualified: ShieldCheck,
  Completed: CheckCircle2,
};

export function getSummaryCounts(passport: ParticipantPassport) {
  const conceptTitles = new Set([
    ...passport.achievements.map((item) => item.conceptTitle),
    ...passport.submissions.map((item) => item.conceptTitle),
  ]);

  return {
    concepts: conceptTitles.size,
    wins: passport.achievements.filter((item) => item.type === "Winner").length,
    finalistPlacements: passport.achievements.filter((item) => item.type === "Finalist").length,
    hostPicks: passport.achievements.filter(
      (item) => item.type === "Host Pick" || item.type === "Judge Pick",
    ).length,
  };
}

export type CreativeRecordEntry = {
  category: CreativeCategory;
  concepts: number;
  wins: number;
  finals: number;
  hostPicks: number;
  bestResultLabel: string;
  bestJudgeScore?: number;
};

export function getCreativeRecord(passport: ParticipantPassport): CreativeRecordEntry[] {
  const categories = Array.from(
    new Set([
      ...passport.categories,
      ...passport.achievements.map((item) => item.category),
      ...passport.submissions.map((item) => item.category),
    ]),
  );

  return categories
    .map((category) => {
      const achievements = passport.achievements.filter((item) => item.category === category);
      const conceptTitles = new Set([
        ...achievements.map((item) => item.conceptTitle),
        ...passport.submissions
          .filter((item) => item.category === category)
          .map((item) => item.conceptTitle),
      ]);
      const best = [...achievements].sort((a, b) => a.placementRank - b.placementRank)[0];
      const judgeScores = achievements
        .map((item) => item.judgeScore)
        .filter((score): score is number => typeof score === "number");

      return {
        category,
        concepts: conceptTitles.size,
        wins: achievements.filter((item) => item.type === "Winner").length,
        finals: achievements.filter((item) => item.type === "Finalist").length,
        hostPicks: achievements.filter(
          (item) => item.type === "Host Pick" || item.type === "Judge Pick",
        ).length,
        bestResultLabel: best ? best.placementLabel : "Recorded",
        bestJudgeScore: judgeScores.length > 0 ? Math.max(...judgeScores) : undefined,
      };
    })
    .filter((entry) => entry.concepts > 0);
}

export function groupAchievementsByMonth(achievements: PassportAchievement[]) {
  const sorted = [...achievements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const groups = new Map<string, PassportAchievement[]>();

  sorted.forEach((item) => {
    const monthLabel = new Date(item.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    groups.set(monthLabel, [...(groups.get(monthLabel) ?? []), item]);
  });

  return Array.from(groups, ([monthLabel, items]) => ({ monthLabel, items }));
}

export function getSubmissionForAchievement(
  passport: ParticipantPassport,
  achievement: PassportAchievement,
): PassportSubmission | undefined {
  return passport.submissions.find((item) => item.id === achievement.submissionId);
}

export function getAchievementForSubmission(
  passport: ParticipantPassport,
  submission: PassportSubmission,
): PassportAchievement | undefined {
  return passport.achievements.find((item) => item.submissionId === submission.id);
}
