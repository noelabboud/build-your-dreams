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
          <div className="px-5 pb-2 pt-4">
            <h1 className="text-[1.45rem] font-black tracking-tight">Open Formats</h1>
            <p className="app-body mt-1 text-muted-foreground">
              Formats currently recruiting participants.
            </p>
          </div>
        </>
      }
    >
      <div className="space-y-3.5 px-5 pb-7 pt-4">
        {openToJoinItems.map((item, index) => (
          <OpenToJoinCard key={item.id} item={item} variant="compact" index={index} />
        ))}
      </div>
    </MobileShell>
  );
}
