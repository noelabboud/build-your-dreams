import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Play, Star } from "lucide-react";
import { useRef, useState } from "react";
import { ConceptFormatBadge } from "@/components/ConceptFormatBadge";
import { HostLink } from "@/components/HostLink";
import { MobileShell } from "@/components/MobileShell";
import { OpenToJoinCard } from "@/components/OpenToJoinCard";
import { SectionHeader } from "@/components/TopBar";
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
  const continuingEvents = [
    { concept: concepts[0], detail: "Episode 4 - In 2 days", progress: 70 },
    { concept: concepts[2], detail: "Round 3 - Voting closes tonight", progress: 55 },
    { concept: concepts[4], detail: "Live room opens soon", progress: 35 },
  ];
  const trending = concepts.slice(2, 5);

  const handleContinueScroll = () => {
    const container = continueScrollRef.current;

    if (!container) {
      return;
    }

    const activeIndex = Math.round(container.scrollLeft / container.clientWidth);
    setActiveContinueIndex(Math.min(activeIndex, continuingEvents.length - 1));
  };

  const scrollToContinueEvent = (index: number) => {
    const container = continueScrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;

    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const handleOpenJoinScroll = () => {
    const container = openJoinScrollRef.current;

    if (!container) {
      return;
    }

    const cards = Array.from(container.children) as HTMLElement[];
    const activeIndex = cards.reduce((closestIndex, card, index) => {
      const closestCard = cards[closestIndex];
      const cardDistance = Math.abs(card.offsetLeft - container.scrollLeft);
      const closestDistance = Math.abs(closestCard.offsetLeft - container.scrollLeft);

      return cardDistance < closestDistance ? index : closestIndex;
    }, 0);

    setActiveOpenJoinIndex(activeIndex);
  };

  const scrollToOpenJoinItem = (index: number) => {
    const container = openJoinScrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;

    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-4 pt-4">
        <div className="text-lg font-extrabold tracking-[0.16em] text-primary">MIDAN</div>
        <button
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </header>

      <div className="px-4 pb-1 pt-2">
        <h1 className="text-[22px] font-bold tracking-tight">
          Good morning, Noel <span className="ml-1">👋</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Ready to continue your next challenge?</p>
      </div>

      <SectionHeader title="Continue Playing" />
      <div
        ref={continueScrollRef}
        onScroll={handleContinueScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
      >
        {continuingEvents.map(({ concept, detail, progress }) => (
          <div key={concept.id} className="block basis-[88%] shrink-0 snap-start scroll-ml-4">
            <div className="relative overflow-hidden rounded-2xl">
              <Link to="/concept/$id" params={{ id: concept.id }} className="block">
                <img
                  src={concept.image}
                  alt={concept.title}
                  width={1024}
                  height={1024}
                  className="h-52 w-full object-cover"
                />
              </Link>
              <ConceptFormatBadge type={concept.type} className="h-6 w-3.5" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <Link
                  to="/concept/$id"
                  params={{ id: concept.id }}
                  className="block text-lg font-bold drop-shadow"
                >
                  {concept.title}
                </Link>
                <div className="mt-0.5 text-xs opacity-90">{detail}</div>
                <HostLink host={concept.host} hostId={concept.hostId} light className="mt-2" />
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                  <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-1 text-[11px] opacity-80">{progress}%</div>
                <Link
                  to="/concept/$id"
                  params={{ id: concept.id }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg"
                >
                  <Play className="h-4 w-4 fill-current" /> Continue
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
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

      <div className="flex items-end justify-between px-4 pb-2 pt-5">
        <h2 className="relative inline-block pb-1 text-[17px] font-bold tracking-tight">
          Open to Join
          <span className="absolute bottom-0 left-0 h-0.5 w-1/2 rounded-full bg-gradient-to-r from-primary/80 to-primary/0" />
        </h2>
        <Link
          to="/open-to-join"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
        >
          See All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div
        ref={openJoinScrollRef}
        onScroll={handleOpenJoinScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
      >
        {openToJoinItems.map((item) => (
          <OpenToJoinCard
            key={item.id}
            item={item}
            className="w-44 shrink-0 snap-start scroll-ml-4"
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
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

      <SectionHeader title="Trending Concepts" to="/explore" />
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-6">
        {trending.map((c) => (
          <div key={c.id} className="w-32 shrink-0">
            <Link to="/concept/$id" params={{ id: c.id }} className="block">
              <div className="relative h-40 overflow-hidden rounded-2xl">
                <img
                  src={c.image}
                  alt={c.title}
                  width={400}
                  height={500}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <ConceptFormatBadge type={c.type} className="h-6 w-3.5" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="mt-2 text-sm font-semibold leading-tight">{c.title}</div>
            </Link>
            <HostLink host={c.host} hostId={c.hostId} className="mt-1.5" />
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-warning text-warning" /> {c.rating}
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}
