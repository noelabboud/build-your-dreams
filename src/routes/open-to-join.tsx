import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { OpenToJoinCard } from "@/components/OpenToJoinCard";
import { TopBar } from "@/components/TopBar";
import { openToJoinItems } from "@/data/mock";

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
  return (
    <MobileShell>
      <TopBar title="Open to Join" />
      <div className="px-4 pb-2 pt-4">
        <h1 className="text-2xl font-bold tracking-tight">Open to Join</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Concepts, episodes, and events currently recruiting participants.
        </p>
      </div>

      <div className="space-y-3 px-4 pb-6 pt-3">
        {openToJoinItems.map((item) => (
          <OpenToJoinCard key={item.id} item={item} />
        ))}
      </div>
    </MobileShell>
  );
}
