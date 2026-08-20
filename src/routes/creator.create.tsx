import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Gamepad2,
  Gift,
  Globe2,
  Image as ImageIcon,
  LayoutGrid,
  LockKeyhole,
  Medal,
  MessageSquareText,
  MonitorPlay,
  Rocket,
  Scale,
  Sparkles,
  Swords,
  Trophy,
  Tv,
  Upload,
  UserRound,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import conceptCover from "@/assets/concept-courtroom.jpg";
import avatar from "@/assets/avatar-marc.jpg";
import { CreatorStudioShell } from "@/components/creator/CreatorStudioShell";

const steps = [
  { label: "Format", icon: LayoutGrid },
  { label: "Basics", icon: Sparkles },
  { label: "Participation", icon: Users },
  { label: "Structure", icon: Swords },
  { label: "Evaluation", icon: Scale },
  { label: "Rewards", icon: Gift },
  { label: "Schedule", icon: CalendarDays },
  { label: "Review", icon: ClipboardCheck },
  { label: "Publish", icon: Rocket },
];

const formats = [
  { label: "Narrative", icon: BookOpen, description: "Story-led journey" },
  { label: "Competitive", icon: Trophy, description: "Entries compete" },
  { label: "Episodic", icon: Tv, description: "Recurring series" },
  { label: "One-shot", icon: Zap, description: "Single activity" },
  { label: "Minigame", icon: Gamepad2, description: "Quick and playful" },
];

const templates = [
  { label: "Quick Challenge", icon: Zap, description: "Fast submissions, one winner" },
  { label: "Tournament", icon: Swords, description: "Bracket-style elimination" },
  { label: "Community Vote", icon: Users, description: "Audience picks the winner" },
  { label: "Judge Panel", icon: Scale, description: "Expert-led evaluation" },
];

type BuilderData = {
  format: string;
  template: string;
  name: string;
  category: string;
  description: string;
  access: string;
  capacity: string;
  deadline: string;
  entryLimit: string;
  submissionType: string;
  competitionType: string;
  advancement: string;
  tieBreaker: string;
  scoring: string;
  creatorWeight: number;
  prize: string;
  registration: string;
  submission: string;
  finalists: string;
  voting: string;
  winner: string;
};

const initialData: BuilderData = {
  format: "Competitive",
  template: "Quick Challenge",
  name: "Worst Advice Club",
  category: "Comedy",
  description: "Participants submit the worst possible advice for a first date.",
  access: "Open to everyone",
  capacity: "Up to 300 participants",
  deadline: "2026-08-12T20:00",
  entryLimit: "1 entry per user",
  submissionType: "Text",
  competitionType: "Single Round",
  advancement: "Top 10 entries shortlisted by the creator move to audience voting.",
  tieBreaker: "Highest audience vote",
  scoring: "Hybrid Scoring",
  creatorWeight: 60,
  prize: "200",
  registration: "2026-08-05",
  submission: "2026-08-12",
  finalists: "2026-08-13",
  voting: "2026-08-18",
  winner: "2026-08-20",
};

export const Route = createFileRoute("/creator/create")({
  head: () => ({
    meta: [
      { title: "Create Concept — Creator Studio" },
      { name: "description", content: "Build and publish a Midan concept." },
    ],
  }),
  component: CreatorCreatePage,
});

function CreatorCreatePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [published, setPublished] = useState(false);

  const update = <K extends keyof BuilderData>(key: K, value: BuilderData[K]) =>
    setData((current) => ({ ...current, [key]: value }));

  const readiness = useMemo(() => {
    const required = [
      data.format,
      data.template,
      data.name,
      data.category,
      data.description,
      data.deadline,
      data.prize,
      data.winner,
    ];
    return Math.round((required.filter(Boolean).length / required.length) * 100);
  }, [data]);

  const goNext = () => {
    if (activeStep === steps.length - 1) {
      setPublished(true);
      return;
    }
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (published) {
    return (
      <CreatorStudioShell title="Create Concept" subtitle="Your concept is ready for the community">
        <div className="mx-auto grid min-h-[72vh] max-w-2xl place-items-center">
          <div className="card-soft w-full px-6 py-12 text-center sm:px-12">
            <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-11 w-11 stroke-[3]" />
              <Sparkles className="absolute -right-4 -top-2 h-7 w-7 text-amber-400" />
              <Sparkles className="absolute -left-5 bottom-0 h-5 w-5 text-primary" />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              You’re live
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Concept published!</h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              {data.name} is now open for the Midan community. You can manage submissions from
              Creator Studio.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground">
                View concept
              </button>
              <button
                onClick={() => setPublished(false)}
                className="rounded-xl border border-border bg-white px-6 py-3 font-semibold"
              >
                Back to builder
              </button>
            </div>
          </div>
        </div>
      </CreatorStudioShell>
    );
  }

  return (
    <CreatorStudioShell
      title="Create Concept"
      subtitle="Turn your idea into an event people want to join"
      action={
        <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
          Draft saved
        </span>
      }
    >
      <div className="overflow-hidden rounded-[1.35rem] border border-border/80 bg-white/80 shadow-soft">
        <div className="border-b border-border/80 px-4 py-5 sm:px-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Concept builder
              </p>
              <h1 className="mt-1 text-xl font-bold sm:text-2xl">{steps[activeStep].label}</h1>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {activeStep + 1} of {steps.length}
            </p>
          </div>
          <div className="no-scrollbar mt-5 flex overflow-x-auto pb-1">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const complete = index < activeStep;
              const active = index === activeStep;
              return (
                <button
                  key={step.label}
                  onClick={() => setActiveStep(index)}
                  className="group relative flex min-w-[88px] flex-1 flex-col items-center gap-2"
                  aria-label={`Go to ${step.label}`}
                >
                  {index > 0 && (
                    <span
                      className={`absolute right-1/2 top-4 h-0.5 w-full ${index <= activeStep ? "bg-primary" : "bg-border"}`}
                    />
                  )}
                  <span
                    className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border-2 transition ${
                      complete
                        ? "border-primary bg-primary text-white"
                        : active
                          ? "border-primary bg-white text-primary shadow-[0_0_0_4px_rgba(36,126,255,.12)]"
                          : "border-border bg-white text-muted-foreground"
                    }`}
                  >
                    {complete ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid">
          <div className="min-w-0 p-5 sm:p-8">
            <StepContent step={activeStep} data={data} update={update} readiness={readiness} />
          </div>
          <ConceptSummary data={data} step={activeStep} readiness={readiness} />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/80 bg-slate-50/80 px-5 py-4 sm:px-8">
          <button
            onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
            disabled={activeStep === 0}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button className="hidden rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted-foreground sm:block">
              Save draft
            </button>
            <button
              onClick={goNext}
              data-testid="builder-next"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5"
            >
              {activeStep === steps.length - 1 ? "Publish concept" : "Continue"}
              {activeStep === steps.length - 1 ? (
                <Rocket className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </CreatorStudioShell>
  );
}

function StepContent({
  step,
  data,
  update,
  readiness,
}: {
  step: number;
  data: BuilderData;
  update: <K extends keyof BuilderData>(key: K, value: BuilderData[K]) => void;
  readiness: number;
}) {
  if (step === 0)
    return (
      <StepFrame
        eyebrow="Start with the shape of your idea"
        title="Choose your event format"
        description="We’ll adapt the rest of the builder to the kind of experience you want to create."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {formats.map((format) => (
            <ChoiceCard
              key={format.label}
              {...format}
              selected={data.format === format.label}
              onClick={() => update("format", format.label)}
            />
          ))}
        </div>
        <div className="mt-8">
          <FieldLabel>Choose a {data.format.toLowerCase()} template</FieldLabel>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {templates.map((template) => (
              <ChoiceCard
                key={template.label}
                {...template}
                selected={data.template === template.label}
                horizontal
                onClick={() => update("template", template.label)}
              />
            ))}
          </div>
        </div>
        <InfoBar icon={WandSparkles}>
          This flow adapts to show only the settings that matter for your{" "}
          {data.template.toLowerCase()}.
        </InfoBar>
      </StepFrame>
    );

  if (step === 1)
    return (
      <StepFrame
        eyebrow="Make it instantly understandable"
        title="Tell us the basics"
        description="Give people a sharp reason to stop scrolling and join."
      >
        <div className="grid gap-5">
          <TextField
            label="Concept name"
            value={data.name}
            onChange={(value) => update("name", value)}
            placeholder="Give your concept a memorable name"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Category"
              value={data.category}
              onChange={(value) => update("category", value)}
              options={["Comedy", "Culture", "Music", "Food", "Sport", "Lifestyle"]}
            />
            <TextField label="Type" value={`${data.format} · ${data.template}`} disabled />
          </div>
          <label>
            <FieldLabel>Short description</FieldLabel>
            <textarea
              value={data.description}
              onChange={(event) => update("description", event.target.value)}
              maxLength={160}
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            <span className="mt-1 block text-right text-xs text-muted-foreground">
              {data.description.length}/160
            </span>
          </label>
          <div>
            <FieldLabel>Cover image</FieldLabel>
            <div className="mt-2 flex flex-col gap-3 rounded-xl border border-border bg-slate-50 p-3 sm:flex-row sm:items-center">
              <img
                src={conceptCover}
                alt=""
                className="h-24 w-full rounded-lg object-cover sm:w-36"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">Make your concept recognisable</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Recommended: 1600 × 900, JPG or PNG
                </p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold">
                <Upload className="h-4 w-4" /> Change
              </button>
            </div>
          </div>
        </div>
      </StepFrame>
    );

  if (step === 2)
    return (
      <StepFrame
        eyebrow="Set expectations upfront"
        title="Set participation rules"
        description="Control who can join, what they submit, and how often."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Access"
            value={data.access}
            onChange={(value) => update("access", value)}
            options={["Open to everyone", "Followers only", "Invite only"]}
            icon={Globe2}
          />
          <SelectField
            label="Capacity"
            value={data.capacity}
            onChange={(value) => update("capacity", value)}
            options={["Up to 100 participants", "Up to 300 participants", "Unlimited"]}
            icon={Users}
          />
          <TextField
            label="Registration deadline"
            type="datetime-local"
            value={data.deadline}
            onChange={(value) => update("deadline", value)}
            icon={CalendarDays}
          />
          <SelectField
            label="Entry limit"
            value={data.entryLimit}
            onChange={(value) => update("entryLimit", value)}
            options={["1 entry per user", "Up to 3 entries", "Unlimited entries"]}
            icon={UserRound}
          />
        </div>
        <div className="mt-6">
          <FieldLabel>Submission type</FieldLabel>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <ChoiceCard
              label="Text"
              description="Short written response"
              icon={MessageSquareText}
              selected={data.submissionType === "Text"}
              onClick={() => update("submissionType", "Text")}
              horizontal
            />
            <ChoiceCard
              label="30-second video"
              description="Quick vertical video"
              icon={MonitorPlay}
              selected={data.submissionType === "30-second video"}
              onClick={() => update("submissionType", "30-second video")}
              horizontal
            />
          </div>
        </div>
        <InfoBar icon={Globe2}>Open access lets anyone register until capacity is reached.</InfoBar>
      </StepFrame>
    );

  if (step === 3)
    return (
      <StepFrame
        eyebrow="Create a satisfying journey"
        title="Design the competition structure"
        description="Decide how entries advance from submission to winner."
      >
        <FieldLabel>Competition type</FieldLabel>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {["Single Round", "Multi-Round"].map((type) => (
            <ChoiceCard
              key={type}
              label={type}
              description={
                type === "Single Round"
                  ? "One clear path to a winner"
                  : "Multiple elimination stages"
              }
              icon={type === "Single Round" ? Zap : Swords}
              selected={data.competitionType === type}
              onClick={() => update("competitionType", type)}
              horizontal
            />
          ))}
        </div>
        <div className="mt-7">
          <FieldLabel>Flow overview</FieldLabel>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2">
            {[
              { label: "Submit", icon: Upload },
              { label: "Shortlist", icon: UserRound },
              { label: "Vote", icon: Users },
              { label: "Winner", icon: Trophy },
            ].map((item, index) => (
              <div className="contents" key={item.label}>
                <div className="rounded-xl border border-border bg-white p-3 text-center">
                  <item.icon className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 text-xs font-semibold">{item.label}</p>
                </div>
                {index < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-5">
          <TextField
            label="Advancement rule"
            value={data.advancement}
            onChange={(value) => update("advancement", value)}
          />
          <SelectField
            label="Tie-breaker"
            value={data.tieBreaker}
            onChange={(value) => update("tieBreaker", value)}
            options={["Highest audience vote", "Highest creator score", "Creator decides"]}
          />
        </div>
      </StepFrame>
    );

  if (step === 4) {
    const audienceWeight = 100 - data.creatorWeight;
    return (
      <StepFrame
        eyebrow="Make winning feel fair"
        title="How will entries be evaluated?"
        description="Set who scores entries and what matters most."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {["Creator Only", "Audience Only", "Hybrid Scoring"].map((method) => (
            <ChoiceCard
              key={method}
              label={method}
              description={
                method === "Hybrid Scoring"
                  ? "Balance both perspectives"
                  : method.replace(" Only", " decides")
              }
              icon={
                method === "Audience Only" ? Users : method === "Creator Only" ? UserRound : Scale
              }
              selected={data.scoring === method}
              onClick={() => update("scoring", method)}
            />
          ))}
        </div>
        <div className="mt-7 rounded-2xl border border-border bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <FieldLabel>Scoring weight</FieldLabel>
            <span className="text-xs font-semibold text-muted-foreground">Must total 100%</span>
          </div>
          <input
            aria-label="Creator score weight"
            type="range"
            min="10"
            max="90"
            step="10"
            value={data.creatorWeight}
            onChange={(event) => update("creatorWeight", Number(event.target.value))}
            className="mt-5 w-full accent-[var(--primary)]"
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <ScoreBox label="Creator score" value={data.creatorWeight} icon={UserRound} />
            <ScoreBox label="Audience score" value={audienceWeight} icon={Users} />
          </div>
        </div>
        <div className="mt-6">
          <FieldLabel>Scoring criteria</FieldLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Originality", "Humour", "Relevance"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
              >
                {item}
              </span>
            ))}
            <button className="rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              + Add criteria
            </button>
          </div>
        </div>
      </StepFrame>
    );
  }

  if (step === 5)
    return (
      <StepFrame
        eyebrow="Give people something to chase"
        title="Define rewards & Passport impact"
        description="Combine a tangible prize with lasting recognition on Midan."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <Gift className="h-6 w-6 text-emerald-600" />
            <h3 className="mt-4 font-bold">Winner prize</h3>
            <label className="mt-4 flex items-center rounded-xl border border-emerald-200 bg-white px-3 focus-within:ring-4 focus-within:ring-emerald-100">
              <CircleDollarSign className="h-5 w-5 text-emerald-600" />
              <input
                value={data.prize}
                onChange={(event) => update("prize", event.target.value)}
                inputMode="numeric"
                className="w-full bg-transparent px-3 py-3 text-2xl font-bold text-emerald-700 outline-none"
              />
            </label>
            <p className="mt-4 text-xs leading-relaxed text-emerald-800">
              Plus a feature on your creator page and a repost on the Midan story.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
            <Award className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-bold">Passport impact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <RewardItem icon={Award} label="Participation badge" />
              <RewardItem icon={Medal} label="Finalist badge" />
              <RewardItem icon={Trophy} label="Winner badge" highlighted />
              <RewardItem icon={Sparkles} label="Comedy score update" />
            </ul>
          </div>
        </div>
        <InfoBar icon={Gift}>
          Rewards and Passport impact help attract more committed participants.
        </InfoBar>
      </StepFrame>
    );

  if (step === 6)
    return (
      <StepFrame
        eyebrow="Set the pace"
        title="Build your event timeline"
        description="Give every moment enough room, from opening day to the winner reveal."
      >
        <div className="relative grid gap-4">
          {[
            ["Registration opens", "registration", data.registration],
            ["Submission deadline", "submission", data.submission],
            ["Finalists announced", "finalists", data.finalists],
            ["Voting opens", "voting", data.voting],
            ["Winner announced", "winner", data.winner],
          ].map(([label, key, value], index) => (
            <label
              key={key}
              className="relative z-10 rounded-xl border border-border bg-white p-3 text-center shadow-sm"
            >
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="mt-3 block min-h-8 text-xs font-semibold">{label}</span>
              <input
                aria-label={label}
                type="date"
                value={value}
                onChange={(event) => update(key as keyof BuilderData, event.target.value)}
                className="mt-2 w-full rounded-lg border border-border px-2 py-2 text-[11px] outline-none focus:border-primary"
              />
            </label>
          ))}
        </div>
        <InfoBar icon={Clock3}>All dates use your local time zone: Asia/Beirut.</InfoBar>
      </StepFrame>
    );

  if (step === 7)
    return (
      <StepFrame
        eyebrow="One last quality check"
        title="Review your concept"
        description="Everything looks ready. Jump back to any section if you want to fine-tune it."
      >
        <div className="grid gap-5">
          <div className="overflow-hidden rounded-2xl border border-border">
            {steps.slice(0, 7).map((item, index) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-b-0"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                <span className="flex-1 text-sm font-semibold">{item.label}</span>
                <span className="text-xs font-medium text-emerald-600">Looks good</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-slate-50 p-5 text-center">
            <div
              className="mx-auto grid h-32 w-32 place-items-center rounded-full p-2"
              style={{ background: `conic-gradient(var(--primary) ${readiness}%, #e7edf3 0)` }}
            >
              <div className="grid h-full w-full place-items-center rounded-full bg-white">
                <div>
                  <strong className="text-3xl">{readiness}%</strong>
                  <p className="text-[11px] font-semibold text-emerald-600">Excellent</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold">Readiness score</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your concept is clear, complete, and ready to launch.
            </p>
          </div>
        </div>
      </StepFrame>
    );

  return (
    <StepFrame
      eyebrow="Ready when you are"
      title="Publish your concept"
      description="Choose how you want to launch. You can still save this version as a draft."
    >
      <div className="rounded-2xl border border-border bg-slate-50 p-4 sm:p-6">
        <div className="flex flex-col gap-5">
          <img src={conceptCover} alt="" className="aspect-video w-full rounded-xl object-cover" />
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                {data.format}
              </span>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                {data.category}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold">{data.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{data.description}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="h-4 w-4" /> {data.access}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {data.capacity}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CircleDollarSign className="h-4 w-4" /> ${data.prize} prize
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 text-left">
          <LockKeyhole className="h-5 w-5 text-muted-foreground" />
          <span>
            <strong className="block text-sm">Save as draft</strong>
            <span className="text-xs text-muted-foreground">Keep editing privately</span>
          </span>
        </button>
        <button className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 text-left">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <span>
            <strong className="block text-sm">Schedule launch</strong>
            <span className="text-xs text-muted-foreground">Pick a future date</span>
          </span>
        </button>
      </div>
      <InfoBar icon={Rocket}>
        Publishing makes this concept visible and opens registration immediately.
      </InfoBar>
    </StepFrame>
  );
}

function StepFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
      <p className="mt-2 mb-7 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
    </div>
  );
}

function ChoiceCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
  horizontal = false,
}: {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  selected: boolean;
  onClick: () => void;
  horizontal?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl border-2 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${horizontal ? "flex items-center gap-3" : "text-center"} ${selected ? "border-primary bg-primary/5" : "border-border bg-white"}`}
    >
      {selected && (
        <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-white">
          <Check className="h-3 w-3 stroke-[3]" />
        </span>
      )}
      <span
        className={`grid shrink-0 place-items-center rounded-lg ${horizontal ? "h-10 w-10" : "mx-auto h-11 w-11"} ${selected ? "bg-primary text-white" : "bg-slate-100 text-foreground"}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className={horizontal ? "" : "mt-3 block"}>
        <strong className="block text-sm">{label}</strong>
        <span className="mt-0.5 block text-[11px] text-muted-foreground">{description}</span>
      </span>
    </button>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="block text-sm font-semibold text-foreground">{children}</span>;
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <label>
      <FieldLabel>{label}</FieldLabel>
      <span className="relative mt-2 block">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-xl border border-border bg-white py-3 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-slate-50 disabled:text-muted-foreground ${Icon ? "pl-10" : "pl-4"}`}
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <label>
      <FieldLabel>{label}</FieldLabel>
      <span className="relative mt-2 block">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full appearance-none rounded-xl border border-border bg-white py-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 ${Icon ? "pl-10" : "pl-4"}`}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  );
}

function InfoBar({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <div className="mt-7 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs font-medium text-blue-700">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function ConceptSummary({
  data,
  step,
  readiness,
}: {
  data: BuilderData;
  step: number;
  readiness: number;
}) {
  return (
    <aside className="hidden border-l border-border/80 bg-slate-50/70 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
        Live preview
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <div className="relative">
          <img src={conceptCover} alt="" className="aspect-[16/10] w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-primary backdrop-blur">
            {data.format}
          </span>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-600">
            {data.category}
          </p>
          <h3 className="mt-1 font-bold">{data.name || "Untitled concept"}</h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {data.description || "Your description will appear here."}
          </p>
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
            <img src={avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
            <div>
              <p className="text-[11px] font-semibold">@marccreates</p>
              <p className="text-[9px] text-muted-foreground">Host</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-border bg-white p-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Concept readiness</span>
          <span className="text-primary">{readiness}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${readiness}%` }}
          />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          {step < 7
            ? "Keep going — your changes are saved automatically."
            : "Your concept has everything it needs to launch."}
        </p>
      </div>
    </aside>
  );
}

function ScoreBox({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold">{value}%</p>
      <div className="mt-2 h-1.5 rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function RewardItem({
  icon: Icon,
  label,
  highlighted,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  highlighted?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`grid h-8 w-8 place-items-center rounded-lg ${highlighted ? "bg-amber-100 text-amber-600" : "bg-white text-primary"}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="font-medium">{label}</span>
      <Check className="ml-auto h-4 w-4 text-emerald-500" />
    </li>
  );
}
