import { createFileRoute } from "@tanstack/react-router";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";

export const Route = createFileRoute("/creator/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Creator Studio" },
      { name: "description", content: "A mock analytics view for creator performance." },
    ],
  }),
  component: CreatorAnalyticsPage,
});

function CreatorAnalyticsPage() {
  return (
    <CreatorStudioShell title="Analytics" subtitle="Mock snapshot of participation and growth">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card-soft p-5">
          <div className="text-sm font-semibold">Audience growth</div>
          <div className="mt-3 text-3xl font-semibold">+12.4%</div>
          <div className="mt-2 text-sm text-muted-foreground">This is a mock analytics placeholder from the Lovable reference.</div>
        </div>
        <div className="card-soft p-5">
          <div className="text-sm font-semibold">Average completion</div>
          <div className="mt-3 text-3xl font-semibold">84%</div>
          <div className="mt-2 text-sm text-muted-foreground">Participants are finishing the experience at a healthy pace.</div>
        </div>
      </div>
    </CreatorStudioShell>
  );
}
