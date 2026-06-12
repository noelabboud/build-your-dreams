import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { ConceptImage } from "@/components/ConceptImage";
import { cn } from "@/lib/utils";

export function HostLink({
  host,
  hostId,
  avatar,
  className,
  light,
  variant = "pill",
}: {
  host: string;
  hostId: string;
  avatar?: string;
  className?: string;
  light?: boolean;
  variant?: "pill" | "plain";
}) {
  const isPlain = variant === "plain";
  const showProfileRow = isPlain && Boolean(avatar);

  return (
    <Link
      to="/host/$id"
      params={{ id: hostId }}
      className={cn(
        "group inline-flex max-w-full items-center transition",
        showProfileRow
          ? "gap-3 py-1.5 text-foreground hover:text-primary"
          : isPlain
            ? "text-sm font-semibold text-muted-foreground hover:text-primary"
            : cn(
                "gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold",
                light
                  ? "bg-white/15 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/25"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              ),
        className,
      )}
    >
      {avatar ? (
        <ConceptImage
          src={avatar}
          alt=""
          className={cn(
            "shrink-0 rounded-full",
            isPlain ? "h-8 w-8 bg-muted" : "h-5 w-5 ring-1 ring-current/15",
          )}
        />
      ) : (
        <UserRound className={cn("shrink-0", isPlain ? "h-4 w-4" : "h-3.5 w-3.5")} />
      )}
      {showProfileRow ? (
        <span className="min-w-0 truncate text-base font-semibold text-muted-foreground">
          Hosted by{" "}
          <span className="font-bold text-foreground transition-colors group-hover:text-primary">
            {host}
          </span>
        </span>
      ) : (
        <span className="truncate">{isPlain ? `Hosted by ${host}` : `by ${host}`}</span>
      )}
    </Link>
  );
}
