import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { CreatorStudioShell, PageHeader, SectionHeader } from "@/components/creator/CreatorStudioShell";
import { ConceptCard, Section } from "@/components/creator/CreatorPrimitives";
import { concepts } from "@/lib/creator-data";

export const Route = createFileRoute("/creator/concepts")({
  head: () => ({
    meta: [
      { title: "My Concepts — Creator Studio" },
      { name: "description", content: "View and manage your creator concepts." },
    ],
  }),
  component: CreatorConceptsPage,
});

function CreatorConceptsPage() {
  return (
    <CreatorStudioShell title="My Concepts" subtitle="Browse your current concepts and drafts" action={<Link to="/creator/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft"><Plus className="h-4 w-4" /> New concept</Link>}>
      <Section title="All concepts">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {concepts.map((concept) => <ConceptCard key={concept.id} concept={concept} />)}
        </div>
      </Section>
    </CreatorStudioShell>
  );
}
