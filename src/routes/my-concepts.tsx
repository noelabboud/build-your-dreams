import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Hourglass, Send, Vote } from "lucide-react";
import { useState } from "react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { HostLink } from "@/components/HostLink";
import { MobileShell } from "@/components/MobileShell";
import {
  concepts,
  myConceptItems,
  type Concept,
  type MyConceptItem,
  type MyConceptStatus,
} from "@/data/mock";

export const Route = createFileRoute("/my-concepts")({
  head: () => ({
    meta: [
      { title: "My Concepts — Wave" },
      { name: "description", content: "Your active concepts and current actions." },
    ],
  }),
  component: MyConcepts,
});

type Tab = "all" | Exclude<MyConceptStatus, "completed">;
type ActiveMyConceptItem = MyConceptItem & {
  status: Exclude<MyConceptStatus, "completed">;
};

const tabs: { label: string; value: Tab }[] = [
  { label: "All Active", value: "all" },
  { label: "To Submit", value: "toSubmit" },
  { label: "To Vote", value: "toVote" },
  { label: "Waiting", value: "waiting" },
];

const statusMeta: Record<
  Exclude<MyConceptStatus, "completed">,
  { label: string; icon: typeof Send; buttonClassName: string }
> = {
  toSubmit: {
    label: "Submit",
    icon: Send,
    buttonClassName: "bg-primary text-primary-foreground",
  },
  toVote: {
    label: "Vote",
    icon: Vote,
    buttonClassName: "bg-success text-white",
  },
  waiting: {
    label: "Waiting",
    icon: Hourglass,
    buttonClassName: "bg-warning/15 text-amber-700 ring-1 ring-warning/20",
  },
};

function conceptById(id: string) {
  return concepts.find((concept) => concept.id === id);
}

function isActiveItem(item: MyConceptItem): item is ActiveMyConceptItem {
  return item.status !== "completed";
}

function MyConcepts() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const activeItems = myConceptItems.filter(isActiveItem);
  const visibleItems =
    activeTab === "all" ? activeItems : activeItems.filter((item) => item.status === activeTab);

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-4 pb-1 pt-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Concepts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your next actions, organized.</p>
        </div>
        <button
          aria-label="Notifications"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
        </button>
      </header>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
        {tabs.map((tab) => {
          const active = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <ul className="space-y-2 px-4 pb-6 pt-1">
        {visibleItems.map((item) => {
          const concept = conceptById(item.conceptId);

          if (!concept) {
            return null;
          }

          return <Row key={item.id} concept={concept} item={item} />;
        })}
      </ul>
    </MobileShell>
  );
}

function Row({ concept, item }: { concept: Concept; item: ActiveMyConceptItem }) {
  const meta = statusMeta[item.status];
  const Icon = meta.icon;

  return (
    <li>
      <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-2.5">
        <Link
          to="/concept/$id"
          params={{ id: concept.id }}
          className="relative shrink-0 overflow-hidden rounded-lg"
        >
          <img
            src={concept.image}
            alt={concept.title}
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <ConceptFormatBadge type={concept.type} className="right-2 h-4 w-2.5" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              to="/concept/$id"
              params={{ id: concept.id }}
              className="min-w-0 truncate text-[15px] font-bold leading-tight"
            >
              {concept.title}
            </Link>
          </div>
          <div className="mt-0.5">
            <HostLink
              host={concept.host}
              hostId={concept.hostId}
              className="px-2 py-0.5 text-[10px]"
            />
          </div>
          <div className="mt-1 text-xs leading-snug text-muted-foreground">
            {item.subtitle}
            {item.note && <span className="text-success"> · {item.note}</span>}
          </div>
          {item.progress !== undefined && (
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          )}
        </div>
        <div className="flex w-24 shrink-0 justify-end">
          <Link
            to="/concept/$id"
            params={{ id: concept.id }}
            className={`inline-flex h-9 w-24 items-center justify-center gap-1 rounded-full px-2 text-xs font-bold shadow-sm ${meta.buttonClassName}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {meta.label}
          </Link>
        </div>
      </div>
    </li>
  );
}
