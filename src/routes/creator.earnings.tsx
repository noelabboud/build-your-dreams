import { createFileRoute } from "@tanstack/react-router";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";

export const Route = createFileRoute("/creator/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings — Creator Studio" },
      { name: "description", content: "Mock earnings view for the creator workspace." },
    ],
  }),
  component: CreatorEarningsPage,
});

function CreatorEarningsPage() {
  return (
    <CreatorStudioShell title="Earnings" subtitle="Mock earnings snapshot">
      <div className="card-soft p-5 text-sm text-muted-foreground">
        This placeholder mirrors the Lovable prototype’s creator monetization area with mock values for now.
      </div>
    </CreatorStudioShell>
  );
}
