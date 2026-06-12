import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Hourglass, Send, Vote } from "lucide-react";
import { useState } from "react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { ConceptImage } from "@/components/ConceptImage";
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
    <MobileShell
      header={
        <>
          <header className="app-page-x flex items-center justify-between pb-2 pt-[calc(1.35rem+env(safe-area-inset-top))]">
            <div>
              <h1 className="text-[2rem] font-black leading-tight tracking-tight">My Concepts</h1>
              <p className="mt-1.5 text-[15px] font-medium text-muted-foreground">
                Your next actions, organized.
              </p>
            </div>
            <button aria-label="Notifications" className="app-icon-button hover:bg-muted">
              <Bell className="h-5.5 w-5.5" />
            </button>
          </header>

          <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-5 py-3.5">
            {tabs.map((tab) => {
              const active = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`app-pill shrink-0 rounded-full transition ${
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
        </>
      }
    >
      <ul className="space-y-3 px-5 pb-7 pt-1">
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
      <div className="app-card flex min-h-[5.8rem] items-center gap-3 p-3.5">
        <Link
          to="/concept/$id"
          params={{ id: concept.id }}
          className="relative shrink-0 overflow-hidden rounded-lg"
        >
          <ConceptImage src={concept.image} alt={concept.title} className="h-14 w-14 rounded-xl" />
          <ConceptFormatBadge type={concept.type} className="right-2 h-4.5 w-3" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              to="/concept/$id"
              params={{ id: concept.id }}
              className="min-w-0 truncate text-base font-extrabold leading-tight"
            >
              {concept.title}
            </Link>
          </div>
          <div className="mt-0.5">
            <HostLink host={concept.host} hostId={concept.hostId} className="px-2.5 py-1 text-xs" />
          </div>
          <div className="mt-1.5 text-sm font-medium leading-snug text-muted-foreground">
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
        <div className="flex w-26 shrink-0 justify-end">
          <Link
            to="/concept/$id"
            params={{ id: concept.id }}
            className={`inline-flex min-h-11 w-26 items-center justify-center gap-1.5 rounded-full px-2.5 text-sm font-bold shadow-sm ${meta.buttonClassName}`}
          >
            <Icon className="h-4 w-4" />
            {meta.label}
          </Link>
        </div>
      </div>
    </li>
  );
}
