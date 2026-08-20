import type { CreativeRecordEntry } from "./passport-utils";

export function CreativeRecordCard({ entry }: { entry: CreativeRecordEntry }) {
  const stats = [
    { label: entry.concepts === 1 ? "Concept" : "Concepts", value: entry.concepts },
    ...(entry.wins > 0 ? [{ label: entry.wins === 1 ? "Win" : "Wins", value: entry.wins }] : []),
    ...(entry.finals > 0
      ? [{ label: entry.finals === 1 ? "Final" : "Finals", value: entry.finals }]
      : []),
    ...(entry.hostPicks > 0
      ? [{ label: entry.hostPicks === 1 ? "Host Pick" : "Host Picks", value: entry.hostPicks }]
      : []),
  ];

  return (
    <section className="app-card p-4">
      <div className="text-base font-black">{entry.category}</div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-xl font-black leading-none text-primary">{stat.value}</div>
            <div className="app-caption mt-1 text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/70 pt-2.5 text-sm font-semibold text-muted-foreground">
        <span>
          Best result: <span className="font-black text-foreground">{entry.bestResultLabel}</span>
        </span>
        {entry.bestJudgeScore ? (
          <span>
            Best judge score:{" "}
            <span className="font-black text-foreground">{entry.bestJudgeScore}/100</span>
          </span>
        ) : null}
      </div>
    </section>
  );
}
