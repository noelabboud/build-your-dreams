import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Play } from "lucide-react";
import { useRef, useState } from "react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { ConceptImage } from "@/components/ConceptImage";
import { HostLink } from "@/components/HostLink";
import { MobileShell } from "@/components/MobileShell";
import { OpenToJoinCard } from "@/components/OpenToJoinCard";
import { concepts, openToJoinItems } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wave — Live storytelling concepts" },
      {
        name: "description",
        content:
          "Join interactive storytelling concepts, vote on submissions, and host your own series.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [activeContinueIndex, setActiveContinueIndex] = useState(0);
  const [activeOpenJoinIndex, setActiveOpenJoinIndex] = useState(0);
  const continueScrollRef = useRef<HTMLDivElement>(null);
  const openJoinScrollRef = useRef<HTMLDivElement>(null);
  const courtroom = concepts.find((concept) => concept.id === "courtroom") ?? concepts[0];
  const survivor = concepts.find((concept) => concept.id === "survivor") ?? concepts[2];
  const chifomi = concepts.find((concept) => concept.id === "chifomi-duel") ?? concepts[4];
  const continuingEvents = [
    { concept: courtroom, detail: "Episode 4 - In 2 days", progress: 70, ctaLabel: "Continue" },
    {
      concept: survivor,
      detail: "Round 3 - Voting closes tonight",
      progress: 55,
      ctaLabel: "View Round",
    },
    { concept: chifomi, detail: "Live room opens soon", progress: 35, ctaLabel: "Play Now" },
  ];

  const handleContinueScroll = () => {
    const container = continueScrollRef.current;

    if (!container) {
      return;
    }

    const activeIndex = getClosestCardIndex(container);
    setActiveContinueIndex(Math.min(activeIndex, continuingEvents.length - 1));
  };

  const scrollToContinueEvent = (index: number) => {
    const container = continueScrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;

    scrollCardIntoView(container, card);
  };

  const handleOpenJoinScroll = () => {
    const container = openJoinScrollRef.current;

    if (!container) {
      return;
    }

    setActiveOpenJoinIndex(getClosestCardIndex(container));
  };

  const scrollToOpenJoinItem = (index: number) => {
    const container = openJoinScrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;

    scrollCardIntoView(container, card);
  };

  return (
    <MobileShell>
      <section className="app-page-x relative pb-6 pt-[calc(1rem+env(safe-area-inset-top))]">
        <header className="relative flex items-center justify-between">
          <div className="text-lg font-black tracking-[0.16em] text-primary">MIDAN</div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-border bg-white/70 p-0.5 text-xs font-medium shadow-[0_14px_30px_-24px_rgba(15,23,42,0.55)] backdrop-blur">
              <Link to="/" className="rounded-lg bg-primary px-3 py-1.5 text-primary-foreground">Participant</Link>
              <Link to="/creator" className="rounded-lg px-3 py-1.5 text-muted-foreground">Creator</Link>
            </div>
            <button
              aria-label="Notifications"
              className="app-icon-button relative bg-white/58 text-foreground shadow-[0_14px_30px_-24px_rgba(15,23,42,0.55)] backdrop-blur transition hover:bg-white/75"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>

        <div className="relative pt-3">
          <h1 className="text-[22px] font-black leading-tight tracking-tight">
            Good morning, Noel <span className="ml-1">👋</span>
          </h1>
          <p className="mt-1.5 text-sm font-medium text-muted-foreground">
            Ready to continue your next challenge?
          </p>
        </div>
      </section>

      <section className="-mt-4 pt-3">
        <div className="app-page-x flex items-end justify-between pb-3">
          <h2 className="app-section-title">Continue Playing</h2>
        </div>
      </section>
      <div
        ref={continueScrollRef}
        onScroll={handleContinueScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
      >
        {continuingEvents.map(({ concept, detail, progress, ctaLabel }) => (
          <div key={concept.id} className="block basis-[86%] shrink-0 snap-start scroll-ml-4">
            <div className="relative overflow-hidden rounded-2xl">
              <Link to="/concept/$id" params={{ id: concept.id }} className="block">
                <ConceptImage src={concept.image} alt={concept.title} className="h-52 w-full" />
              </Link>
              <ConceptFormatBadge type={concept.type} showLabel />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <Link
                  to="/concept/$id"
                  params={{ id: concept.id }}
                  className="block text-lg font-black drop-shadow"
                >
                  {concept.title}
                </Link>
                <div className="mt-1 text-sm font-medium opacity-90">{detail}</div>
                <HostLink host={concept.host} hostId={concept.hostId} light className="mt-2.5" />
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                  <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-1 text-xs font-semibold opacity-80">{progress}%</div>
                <Link
                  to="/concept/$id"
                  params={{ id: concept.id }}
                  className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground shadow-lg"
                >
                  <Play className="h-4.5 w-4.5 fill-current" /> {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 pt-3.5">
        {continuingEvents.map(({ concept }, index) => (
          <button
            key={concept.id}
            type="button"
            aria-label={`Show ${concept.title}`}
            aria-current={activeContinueIndex === index ? "true" : undefined}
            onClick={() => scrollToContinueEvent(index)}
            className={`h-2 rounded-full transition-all ${
              activeContinueIndex === index ? "w-5 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      <div className="app-page-x flex items-end justify-between pb-3 pt-5">
        <h2 className="app-section-title">Open to Join</h2>
        <Link
          to="/open-to-join"
          className="inline-flex items-center gap-1 text-sm font-bold text-primary"
        >
          See All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div
        ref={openJoinScrollRef}
        onScroll={handleOpenJoinScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3"
      >
        {openToJoinItems.map((item) => (
          <OpenToJoinCard
            key={item.id}
            item={item}
            className="w-48 shrink-0 snap-start scroll-ml-4"
          />
        ))}
      </div>
      <div className="flex justify-center gap-1.5 pb-7 pt-2.5">
        {openToJoinItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={activeOpenJoinIndex === index ? "true" : undefined}
            onClick={() => scrollToOpenJoinItem(index)}
            className={`h-2 rounded-full transition-all ${
              activeOpenJoinIndex === index ? "w-5 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </MobileShell>
  );
}

function getClosestCardIndex(container: HTMLElement) {
  const cards = Array.from(container.children) as HTMLElement[];
  const viewportCenter = container.scrollLeft + container.clientWidth / 2;

  return cards.reduce((closestIndex, card, index) => {
    const closestCard = cards[closestIndex];
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;

    return Math.abs(cardCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter)
      ? index
      : closestIndex;
  }, 0);
}

function scrollCardIntoView(container?: HTMLElement | null, card?: HTMLElement) {
  if (!container || !card) {
    return;
  }

  container.scrollTo({
    left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
    behavior: "smooth",
  });
}
