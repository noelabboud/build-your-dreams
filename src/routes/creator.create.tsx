import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";

const steps = ["Concept basics", "Format & structure", "Launch setup"];
const coverOptions = ["gradient-cover-1", "gradient-cover-2", "gradient-cover-3", "gradient-cover-4", "gradient-cover-5", "gradient-cover-6"];

export const Route = createFileRoute("/creator/create")({
  head: () => ({
    meta: [
      { title: "Create Concept — Creator Studio" },
      { name: "description", content: "A mock concept builder for the Midan creator experience." },
    ],
  }),
  component: CreatorCreatePage,
});

function CreatorCreatePage() {
  return (
    <CreatorStudioShell title="Create a Concept" subtitle="Mock concept builder" action={<span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">Draft saved</span>}>
      <section className="card-soft p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, index) => (
            <div key={step} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              <span className="grid h-5 w-5 place-items-center rounded-full border border-white/60 text-[11px]">{index + 1}</span>
              {step}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-4">
            <div className="rounded-[1.25rem] border border-border/70 bg-surface/70 p-4">
              <div className="text-sm font-semibold">Concept title</div>
              <input className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none" placeholder="What should this experience be called?" />
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-surface/70 p-4">
              <div className="text-sm font-semibold">Prompt or brief</div>
              <textarea className="mt-2 min-h-28 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none" placeholder="Describe the concept, challenge, or story arc for participants." />
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-surface/70 p-4">
              <div className="text-sm font-semibold">Audience access</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Open to join', 'Invite only', 'Preview'].map((option) => (
                  <button key={option} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground">{option}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.25rem] border border-border/70 bg-surface/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Cover style</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {coverOptions.map((option) => (
                  <div key={option} className={`h-16 rounded-xl ${option}`} />
                ))}
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-surface/70 p-4">
              <div className="text-sm font-semibold">Review checklist</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Clear invite language</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Format ready</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Timeline shared</li>
              </ul>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </CreatorStudioShell>
  );
}
