import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { OpenToJoinCard } from "@/components/OpenToJoinCard";
import { TopBar } from "@/components/TopBar";
import { openToJoinItems, type ConceptType } from "@/data/mock";

type Filter = "all" | ConceptType;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Narrative", value: "Narrative Series" },
  { label: "Episodic", value: "Episodic Series" },
  { label: "Competitive", value: "Competitive Series" },
  { label: "One Shot", value: "One Shot Event" },
  { label: "Minigame", value: "Minigame" },
];

export const Route = createFileRoute("/open-to-join")({
  head: () => ({
    meta: [
      { title: "Open to Join — MIDAN" },
      {
        name: "description",
        content: "Join currently open concepts, episodes, and live events on MIDAN.",
      },
    ],
  }),
  component: OpenToJoinPage,
});

function OpenToJoinPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const filteredItems =
    activeFilter === "all"
      ? openToJoinItems
      : openToJoinItems.filter((item) => item.type === activeFilter);

  return (
    <MobileShell>
      <TopBar title="Open to Join" />
      <div className="px-4 pb-1 pt-3">
        <h1 className="text-xl font-bold tracking-tight">All Events</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Concepts, episodes, and events currently recruiting participants.
        </p>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3 px-4 pb-6 pt-2">
        {filteredItems.map((item) => (
          <OpenToJoinCard key={item.id} item={item} variant="compact" />
        ))}
      </div>
    </MobileShell>
  );
}
