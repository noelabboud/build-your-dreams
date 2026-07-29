import { createFileRoute } from "@tanstack/react-router";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";

export const Route = createFileRoute("/creator/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Creator Studio" },
      { name: "description", content: "Mock settings screen for the creator workspace." },
    ],
  }),
  component: CreatorSettingsPage,
});

function CreatorSettingsPage() {
  return (
    <CreatorStudioShell title="Profile & Settings" subtitle="Mock creator profile settings">
      <div className="card-soft p-5 text-sm text-muted-foreground">
        This is a lightweight mock settings screen copied from the Lovable prototype so the studio feels complete while keeping the app simple.
      </div>
    </CreatorStudioShell>
  );
}
