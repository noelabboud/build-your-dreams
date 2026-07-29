import { createFileRoute } from "@tanstack/react-router";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";
import { submissions } from "@/lib/creator-data";

export const Route = createFileRoute("/creator/submissions")({
  head: () => ({
    meta: [
      { title: "Submissions — Creator Studio" },
      { name: "description", content: "Review mock submissions for your concepts." },
    ],
  }),
  component: CreatorSubmissionsPage,
});

function CreatorSubmissionsPage() {
  return (
    <CreatorStudioShell title="Submissions" subtitle="Mock review queue for concept submissions">
      <div className="card-soft divide-y divide-border">
        {submissions.map((submission) => (
          <div key={submission.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold">{submission.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{submission.code} · {submission.response}</div>
            </div>
            <div className="text-sm font-medium text-primary">{submission.status}</div>
          </div>
        ))}
      </div>
    </CreatorStudioShell>
  );
}
