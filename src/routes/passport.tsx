import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  ChevronRight,
  Clock3,
  Medal,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { ConceptImage } from "@/components/ConceptImage";
import { MobileShell } from "@/components/MobileShell";
import {
  concepts,
  me,
  passportProfile,
  type PassportFormat,
  type PassportHistoryItem,
} from "@/data/mock";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Passport — Wave" },
      { name: "description", content: "Your Wave passport, traits, stats, and history." },
    ],
  }),
  component: Passport,
});

type PassportTab = "highlights" | "badges" | "history";
type HistoryFilter = "All" | PassportFormat;

const tabs: { id: PassportTab; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  { id: "badges", label: "Badges" },
  { id: "history", label: "History" },
];

const formats: HistoryFilter[] = [
  "All",
  "Narrative",
  "Episodic",
  "Competitive",
  "One Shot",
  "Minigames",
];

const badgeIcons = [Trophy, Medal, Star, Clock3, ShieldCheck, Award];

function groupHistoryByConcept(items: PassportHistoryItem[]) {
  const groups = new Map<string, PassportHistoryItem[]>();

  items.forEach((item) => {
    groups.set(item.conceptTitle, [...(groups.get(item.conceptTitle) ?? []), item]);
  });

  return Array.from(groups, ([conceptTitle, groupItems]) => ({ conceptTitle, items: groupItems }));
}

function getBestHistoryResult(items: PassportHistoryItem[]) {
  const priority = ["Winner", "First", "Top 5%", "Top 10%", "Final", "Qualified", "Completed"];
  const results = items.flatMap((item) => (item.result ? [item.result] : []));

  return (
    results.sort((a, b) => {
      const aIndex = priority.findIndex((label) => a.includes(label));
      const bIndex = priority.findIndex((label) => b.includes(label));

      return (
        (aIndex === -1 ? priority.length : aIndex) - (bIndex === -1 ? priority.length : bIndex)
      );
    })[0] ?? "Recorded"
  );
}

function getBadgeSummary(items: PassportHistoryItem[]) {
  return getBadgeCounts(items)
    .map(([badge, count]) => `${badge} x${count}`)
    .join(" | ");
}

function getBadgeCounts(items: PassportHistoryItem[]) {
  const counts = new Map<string, number>();

  items
    .flatMap((item) => item.badges)
    .forEach((badge) => {
      counts.set(badge, (counts.get(badge) ?? 0) + 1);
    });

  return Array.from(counts);
}

function getCompletedLabel(format: PassportFormat) {
  return format === "Narrative" || format === "Episodic" ? "episodes" : "entries";
}

function Passport() {
  const [activeTab, setActiveTab] = useState<PassportTab>("highlights");
  const [activeFormat, setActiveFormat] = useState<HistoryFilter>("All");
  const [selectedConceptTitle, setSelectedConceptTitle] = useState<string | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const progressPercent = Math.round(
    (passportProfile.progress.currentXp / passportProfile.progress.nextLevelXp) * 100,
  );
  const visibleHistory =
    activeFormat === "All"
      ? passportProfile.history
      : passportProfile.history.filter((item) => item.format === activeFormat);
  const visibleHistoryGroups = groupHistoryByConcept(visibleHistory);

  return (
    <MobileShell mainClassName="bg-[#10131A]">
      <section className="relative overflow-hidden bg-[#10131A] px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] text-white">
        <ConceptImage
          src={concepts[0].image}
          alt=""
          className="absolute inset-x-0 top-0 h-44 w-full opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-[#10131A]/88 to-[#10131A]" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="app-kicker text-white/55">MIDAN Passport</div>
            <h1 className="text-[1.6rem] font-black leading-tight">Profile</h1>
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="app-icon-button bg-white/10 text-white transition hover:bg-white/15"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="relative z-10 mt-5 rounded-2xl border border-white/12 bg-white/[0.07] p-4 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3">
            <ConceptImage
              src={me.avatar}
              alt={me.name}
              className="h-[72px] w-[72px] shrink-0 rounded-2xl ring-2 ring-white/25"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[1.35rem] font-black leading-none">
                <span className="truncate">{me.name}</span>
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              </div>
              <div className="mt-1.5 text-sm font-semibold text-white/55">{me.handle}</div>
              <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#111827]">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="truncate">{me.badge}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-background px-4 pt-3">
        <div className="no-scrollbar flex gap-5 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`app-tab relative shrink-0 transition ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-background px-4 py-4">
        {activeTab === "highlights" && <Highlights progressPercent={progressPercent} />}
        {activeTab === "badges" && <Badges />}
        {activeTab === "history" && (
          <History
            activeFormat={activeFormat}
            setActiveFormat={setActiveFormat}
            visibleHistoryGroups={visibleHistoryGroups}
            selectedConceptTitle={selectedConceptTitle}
            setSelectedConceptTitle={setSelectedConceptTitle}
            selectedEpisodeId={selectedEpisodeId}
            setSelectedEpisodeId={setSelectedEpisodeId}
          />
        )}
      </div>
    </MobileShell>
  );
}

function Highlights({ progressPercent }: { progressPercent: number }) {
  const progress = passportProfile.progress;
  const [conceptsJoined, episodesCompleted, submissionsMade, completionRate] =
    passportProfile.coreStats;
  const [onTime, voting, dropout] = passportProfile.reliability;
  const [wins, topPlacements, featuredEntries, averageRating] = passportProfile.recognition;

  return (
    <div className="space-y-4 pb-6">
      <section className="app-card p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[1.15rem] font-black leading-tight">{progress.label}</div>
            <p className="app-body mt-1.5 text-muted-foreground">
              XP is earned from verified participation: completed episodes, submitted entries,
              voting, and host-recognized contributions.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-bold">Progress to Level {progress.nextLevel}</span>
            <span className="font-black text-primary">
              {progress.currentXp.toLocaleString()} / {progress.nextLevelXp.toLocaleString()} XP
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      <section className="app-card p-4">
        <SectionTitle icon={<Sparkles className="h-5 w-5" />} title="Activity" />
        <div className="mt-3 space-y-2">
          <InsightRow
            label={conceptsJoined.label}
            value={conceptsJoined.value}
            description="Distinct concepts entered. A 7-episode series still counts as one concept."
          />
          <InsightRow
            label={episodesCompleted.label}
            value={episodesCompleted.value}
            description="Individual episodes, rounds, events, or rooms finished."
          />
          <InsightRow
            label={submissionsMade.label}
            value={submissionsMade.value}
            description="Verified text, image, video, voice, or live-action contributions."
          />
          <InsightRow
            label={completionRate.label}
            value={completionRate.value}
            description="Share of joined commitments that were completed."
          />
        </div>
      </section>

      <section className="app-card p-4">
        <SectionTitle icon={<ShieldCheck className="h-5 w-5" />} title="Trust Signals" />
        <div className="mt-3 space-y-2">
          <InsightRow
            label={onTime.label}
            value={onTime.value}
            description="Entries submitted before their deadline."
          />
          <InsightRow
            label={voting.label}
            value={voting.value}
            description="Voting rounds completed after joining."
          />
          <InsightRow
            label={dropout.label}
            value={dropout.value}
            description="Joined experiences left unfinished."
            subtle
          />
        </div>
      </section>

      <section className="app-card p-4">
        <SectionTitle icon={<Trophy className="h-5 w-5" />} title="Quality Signals" />
        <div className="mt-3.5 grid grid-cols-2 gap-2.5">
          {[
            { ...wins, description: "First-place finishes where the format had a winner." },
            {
              ...topPlacements,
              description: "High finishes across competitive and judged formats.",
            },
            { ...featuredEntries, description: "Entries highlighted by hosts." },
            { ...averageRating, description: "Average rating from completed public records." },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-muted p-3.5">
              <div className="text-xl font-black leading-tight text-primary">{item.value}</div>
              <div className="mt-1 text-sm font-black leading-tight">{item.label}</div>
              <div className="app-caption mt-1.5 text-muted-foreground">{item.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Badges() {
  return (
    <div className="space-y-3 pb-6">
      {passportProfile.badges.map((badge, index) => {
        const Icon = badgeIcons[index % badgeIcons.length];

        return (
          <div key={badge.id} className="app-card p-4">
            <div className="flex items-start gap-3.5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="truncate text-lg font-black">{badge.name}</div>
                  <span className="shrink-0 rounded-full bg-muted px-3 py-1.5 text-xs font-black text-primary">
                    x{badge.count}
                  </span>
                </div>
                <p className="app-body mt-1.5 text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function History({
  activeFormat,
  setActiveFormat,
  visibleHistoryGroups,
  selectedConceptTitle,
  setSelectedConceptTitle,
  selectedEpisodeId,
  setSelectedEpisodeId,
}: {
  activeFormat: HistoryFilter;
  setActiveFormat: (format: HistoryFilter) => void;
  visibleHistoryGroups: { conceptTitle: string; items: PassportHistoryItem[] }[];
  selectedConceptTitle: string | null;
  setSelectedConceptTitle: (title: string | null) => void;
  selectedEpisodeId: string | null;
  setSelectedEpisodeId: (id: string | null) => void;
}) {
  const selectedGroup = selectedConceptTitle
    ? visibleHistoryGroups.find((group) => group.conceptTitle === selectedConceptTitle)
    : undefined;
  const selectedEpisode = selectedEpisodeId
    ? selectedGroup?.items.find((item) => item.id === selectedEpisodeId)
    : undefined;

  if (selectedGroup && selectedEpisode) {
    return (
      <EpisodeDetailView
        item={selectedEpisode}
        onHistory={() => {
          setSelectedConceptTitle(null);
          setSelectedEpisodeId(null);
        }}
        onConcept={() => setSelectedEpisodeId(null)}
      />
    );
  }

  if (selectedGroup) {
    return (
      <ConceptRecordView
        group={selectedGroup}
        onHistory={() => {
          setSelectedConceptTitle(null);
          setSelectedEpisodeId(null);
        }}
        onSelectEpisode={(id) => setSelectedEpisodeId(id)}
      />
    );
  }

  return (
    <div className="pb-6">
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-3.5">
        {formats.map((format) => {
          const active = activeFormat === format;

          return (
            <button
              key={format}
              type="button"
              onClick={() => {
                setActiveFormat(format);
                setSelectedConceptTitle(null);
                setSelectedEpisodeId(null);
              }}
              className={`app-pill shrink-0 rounded-full border transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {format}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {visibleHistoryGroups.map((group) => (
          <HistoryConceptCard
            key={group.conceptTitle}
            group={group}
            onView={() => setSelectedConceptTitle(group.conceptTitle)}
          />
        ))}
      </div>
    </div>
  );
}

function HistoryConceptCard({
  group,
  onView,
}: {
  group: { conceptTitle: string; items: PassportHistoryItem[] };
  onView: () => void;
}) {
  const format = group.items[0]?.format ?? "Narrative";
  const totalXp = group.items.reduce((total, item) => total + item.xp, 0);
  const latest = group.items[0];
  const best = getBestHistoryResult(group.items);
  const badgeSummary = getBadgeSummary(group.items);
  const completedLabel = getCompletedLabel(format);

  return (
    <button
      type="button"
      onClick={onView}
      className="app-card w-full p-4 text-left transition hover:bg-muted/35"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="min-w-0 truncate text-lg font-black leading-tight">
              {group.conceptTitle}
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1.5 text-xs font-black text-primary">
              {format}
            </span>
          </div>
          <div className="mt-1 text-sm font-bold text-muted-foreground">
            {group.items.length} {completedLabel} completed
          </div>
        </div>
        <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
      </div>

      <div className="mt-3.5 space-y-2 rounded-2xl bg-muted px-3.5 py-3">
        <HistoryFact label="Best" value={best} />
        <HistoryFact label="Latest" value={latest?.date ?? "Recorded"} />
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0 text-sm font-semibold text-muted-foreground">
          {badgeSummary ? (
            <span className="line-clamp-1">{badgeSummary}</span>
          ) : (
            <span>No badge preview yet</span>
          )}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-base font-black text-primary">+{totalXp} XP</div>
          <div className="mt-0.5 text-sm font-black text-primary">View record</div>
        </div>
      </div>
    </button>
  );
}

function ConceptRecordView({
  group,
  onHistory,
  onSelectEpisode,
}: {
  group: { conceptTitle: string; items: PassportHistoryItem[] };
  onHistory: () => void;
  onSelectEpisode: (id: string) => void;
}) {
  const format = group.items[0]?.format ?? "Narrative";
  const totalXp = group.items.reduce((total, item) => total + item.xp, 0);
  const latest = group.items[0];
  const best = getBestHistoryResult(group.items);
  const badgeCounts = getBadgeCounts(group.items);
  const completedLabel = getCompletedLabel(format);
  const recordsTitle = completedLabel === "episodes" ? "Completed Episodes" : "Completed Entries";

  return (
    <div className="space-y-4 pb-6">
      <HistoryBreadcrumb
        items={[{ label: "History", onClick: onHistory }, { label: group.conceptTitle }]}
      />

      <section className="space-y-3">
        <div>
          <div className="app-kicker text-primary">Concept Record</div>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h2 className="min-w-0 text-2xl font-black leading-tight">{group.conceptTitle}</h2>
            <span className="mt-1 shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black text-primary">
              {format}
            </span>
          </div>
        </div>

        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <ConceptSummaryChip value={`${group.items.length} ${completedLabel} completed`} />
          <ConceptSummaryChip value={`${best} best result`} />
          <ConceptSummaryChip value={`+${totalXp} XP earned`} />
          <ConceptSummaryChip value={`Latest ${latest?.date ?? "Recorded"}`} />
        </div>
      </section>

      <section>
        <div className="mb-2.5">
          <div className="text-sm font-black">{recordsTitle}</div>
          {badgeCounts.length > 0 && (
            <div className="mt-1 truncate text-sm font-semibold text-muted-foreground">
              {getBadgeSummary(group.items)}
            </div>
          )}
        </div>
        <div className="space-y-2.5">
          {group.items.map((item) => (
            <EpisodeRecordRow key={item.id} item={item} onView={() => onSelectEpisode(item.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ConceptSummaryChip({ value }: { value: string }) {
  return (
    <span className="shrink-0 rounded-full border border-border bg-background px-3.5 py-2.5 text-sm font-black text-foreground shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      {value}
    </span>
  );
}

function EpisodeRecordRow({ item, onView }: { item: PassportHistoryItem; onView: () => void }) {
  return (
    <button
      type="button"
      onClick={onView}
      className="app-card w-full px-4 py-3.5 text-left transition hover:border-primary/35 hover:bg-primary/[0.03]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-base font-black leading-tight">
            {item.episodeLabel ?? item.conceptTitle}
          </div>
          <div className="mt-1 text-sm font-semibold text-muted-foreground">
            {item.status} - {item.date}
          </div>
          {item.result && (
            <div className="mt-1 text-sm font-bold text-foreground">{item.result}</div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-full bg-primary/10 px-2.5 py-1.5 text-xs font-black text-primary">
            +{item.xp} XP
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div className="mt-2.5 border-t border-border/70 pt-2.5 text-sm font-black text-primary">
        View submission
      </div>
    </button>
  );
}

type HistoryBreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

function HistoryBreadcrumb({ items }: { items: HistoryBreadcrumbItem[] }) {
  return (
    <div className="flex min-w-0 items-center gap-1 text-xs font-bold text-muted-foreground">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
          {index > 0 && <span className="text-muted-foreground/60">&rsaquo;</span>}
          {item.onClick ? (
            <button
              type="button"
              onClick={item.onClick}
              className="shrink-0 text-primary transition hover:text-primary/80"
            >
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 1 ? "truncate text-foreground" : "shrink-0"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function HistoryFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 py-1.5 last:border-b-0">
      <div className="text-sm font-bold text-muted-foreground">{label}</div>
      <div className="min-w-0 truncate text-right text-sm font-black text-foreground">{value}</div>
    </div>
  );
}

function EpisodeDetailView({
  item,
  onHistory,
  onConcept,
}: {
  item: PassportHistoryItem;
  onHistory: () => void;
  onConcept: () => void;
}) {
  return (
    <div className="space-y-4 pb-6">
      <HistoryBreadcrumb
        items={[
          { label: "History", onClick: onHistory },
          { label: item.conceptTitle, onClick: onConcept },
          { label: item.episodeLabel ?? item.conceptTitle },
        ]}
      />

      <section className="app-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="app-kicker text-primary">Submission detail</div>
            <h2 className="mt-1.5 text-[1.2rem] font-black leading-tight">
              {item.episodeLabel ?? item.conceptTitle}
            </h2>
            <div className="mt-1.5 text-sm font-semibold text-muted-foreground">
              {item.status} - {item.date}
              {item.result ? ` - ${item.result}` : ""}
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-black text-primary">
            +{item.xp} XP
          </span>
        </div>
      </section>

      <section className="app-card p-4">
        <SectionTitle icon={<Star className="h-5 w-5" />} title="Performance" />
        <div className="mt-3.5 rounded-2xl bg-muted px-3.5 py-3">
          <HistoryFact label="User score" value={item.score ? String(item.score) : "N/A"} />
          <HistoryFact
            label="Average score"
            value={item.averageScore ? String(item.averageScore) : "N/A"}
          />
          <HistoryFact label="Rank / position" value={item.rank ?? "N/A"} />
          <HistoryFact
            label="Community rating"
            value={item.communityRating ? item.communityRating.toFixed(1) : "N/A"}
          />
        </div>
      </section>

      <section className="app-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="app-kicker text-primary">Your submission</div>
          <span className="rounded-full bg-card px-2.5 py-1.5 text-xs font-black text-primary">
            {item.submission.kind}
          </span>
        </div>
        <SubmissionPreview item={item} />
      </section>

      {item.hostFeedback && (
        <section className="app-card p-4">
          <SectionTitle icon={<ShieldCheck className="h-5 w-5" />} title="Feedback" />
          <p className="app-body mt-3 text-muted-foreground">{item.hostFeedback}</p>
        </section>
      )}

      <section className="app-card p-4">
        <SectionTitle icon={<Trophy className="h-5 w-5" />} title="Badges earned" />
        {item.badges.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-primary/10 px-2.5 py-1.5 text-xs font-black text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            No badges earned for this record.
          </p>
        )}
      </section>
    </div>
  );
}

function InsightRow({
  label,
  value,
  description,
  subtle,
}: {
  label: string;
  value: string;
  description: string;
  subtle?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-muted p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-base font-black">{label}</div>
          <div className="app-caption mt-1.5 text-muted-foreground">{description}</div>
        </div>
        <div
          className={`shrink-0 rounded-full px-2.5 py-1 text-sm font-black ${
            subtle ? "bg-background text-muted-foreground" : "bg-primary/10 text-primary"
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function SubmissionPreview({ item }: { item: PassportHistoryItem }) {
  if (item.submission.kind === "Image") {
    return (
      <div className="mt-3.5 overflow-hidden rounded-2xl border border-border bg-muted">
        <div className="grid h-32 place-items-center bg-primary/10 text-center text-sm font-bold text-primary">
          Image preview placeholder
        </div>
        <div className="app-body p-3.5 text-foreground">{item.submission.preview}</div>
      </div>
    );
  }

  if (item.submission.kind === "Video") {
    return (
      <div className="mt-3.5 overflow-hidden rounded-2xl border border-border bg-muted">
        <div className="grid h-32 place-items-center bg-[#10131A] text-center text-sm font-bold text-white">
          Video preview placeholder
        </div>
        <div className="app-body p-3.5 text-foreground">{item.submission.preview}</div>
      </div>
    );
  }

  return (
    <div className="app-body mt-3.5 rounded-2xl bg-muted p-3.5 text-foreground">
      {item.submission.preview}
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
