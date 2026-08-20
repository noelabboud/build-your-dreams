import { ConceptImage } from "@/components/ConceptImage";
import type { PassportSubmission } from "@/data/mock";
import { achievementTypeIcon } from "./passport-utils";

export function WorkCard({
  submission,
  onSelect,
}: {
  submission: PassportSubmission;
  onSelect: () => void;
}) {
  const RecognitionIcon = submission.recognitionType
    ? achievementTypeIcon[submission.recognitionType]
    : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="app-card block w-full overflow-hidden text-left transition hover:bg-white/82"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#10131A]">
        {submission.thumbnail ? (
          <ConceptImage
            src={submission.thumbnail}
            alt={submission.title ?? submission.conceptTitle}
            className="h-full w-full"
          />
        ) : (
          <div className="grid h-full w-full place-items-center px-4">
            <p className="line-clamp-4 text-center font-display text-xs italic leading-snug text-white/80">
              {submission.preview ?? submission.conceptTitle}
            </p>
          </div>
        )}
        {RecognitionIcon && (
          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-primary shadow-sm">
            <RecognitionIcon className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white backdrop-blur-sm">
          {submission.category}
        </span>
      </div>
      <div className="p-2.5">
        <div className="line-clamp-2 text-sm font-extrabold leading-tight">
          {submission.title ?? submission.conceptTitle}
        </div>
        {submission.title && (
          <div className="mt-0.5 truncate text-xs font-semibold text-muted-foreground">
            {submission.conceptTitle}
            {submission.seasonLabel ? ` — ${submission.seasonLabel}` : ""}
          </div>
        )}
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-xs font-semibold text-muted-foreground">
            {submission.hostName} · {submission.date}
          </span>
          {submission.placementLabel && (
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-black text-primary">
              {submission.placementLabel}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
