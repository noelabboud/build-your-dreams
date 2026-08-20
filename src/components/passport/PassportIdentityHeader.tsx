import { BadgeCheck, Check, Settings, Share2 } from "lucide-react";
import { useState } from "react";
import { ConceptImage } from "@/components/ConceptImage";
import type { ParticipantPassport } from "@/data/mock";
import { getSummaryCounts } from "./passport-utils";

export function PassportIdentityHeader({ passport }: { passport: ParticipantPassport }) {
  const [copied, setCopied] = useState(false);
  const summary = getSummaryCounts(passport);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = { title: `${passport.name} — MIDAN Passport`, url };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard && url) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const summaryItems = [
    { label: "Concepts", value: summary.concepts },
    { label: "Wins", value: summary.wins },
    { label: "Finalist Placements", value: summary.finalistPlacements },
    { label: "Host Picks", value: summary.hostPicks },
  ];

  return (
    <section className="relative overflow-hidden bg-[#10131A] px-4 pb-5 pt-[calc(1rem+env(safe-area-inset-top))] text-white">
      <div className="relative z-10 flex items-center justify-between">
        <div className="app-kicker text-white/55">MIDAN Passport</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-sm font-bold text-white transition hover:bg-white/15"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? "Link copied" : "Share Passport"}</span>
          </button>
          <button
            type="button"
            aria-label="Settings"
            className="app-icon-button bg-white/10 text-white transition hover:bg-white/15"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-5 flex items-start gap-3.5">
        <ConceptImage
          src={passport.avatar}
          alt={passport.name}
          className="h-[72px] w-[72px] shrink-0 rounded-2xl ring-2 ring-white/25"
        />
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-1.5 text-[1.4rem] font-black leading-none">
            <span className="truncate">{passport.name}</span>
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
          </div>
          <div className="mt-1.5 text-sm font-semibold text-white/55">{passport.handle}</div>
          <div className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1 text-xs font-bold text-white/70">
            {passport.categories.map((category, index) => (
              <span key={category} className="flex items-center gap-1.5">
                {category}
                {index < passport.categories.length - 1 && <span className="text-white/30">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="app-body relative z-10 mt-3.5 text-white/70">{passport.bio}</p>

      <div className="relative z-10 mt-4 grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
        {summaryItems.map((item) => (
          <div key={item.label} className="min-w-0 text-center">
            <div className="text-lg font-black leading-tight">{item.value}</div>
            <div className="mt-0.5 text-[10px] font-bold uppercase leading-tight tracking-wide text-white/50">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
