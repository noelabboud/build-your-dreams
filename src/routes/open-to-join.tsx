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
        content: "Join formats currently recruiting participants on MIDAN.",
      },
    ],
  }),
  component: OpenToJoinPage,
});

function OpenToJoinPage() {
  return (
    <MobileShell
      header={
        <>
          <TopBar title="Open to Join" />
          <div className="px-4 pb-1 pt-3">
            <h1 className="text-xl font-bold tracking-tight">Open Formats</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Formats currently recruiting participants.
            </p>
          </div>
        </>
      }
    >
      <div className="space-y-3 px-4 pb-6 pt-4">
        {openToJoinItems.map((item, index) => (
          <OpenToJoinCard key={item.id} item={item} variant="compact" index={index} />
        ))}
      </div>
    </MobileShell>
  );
}
