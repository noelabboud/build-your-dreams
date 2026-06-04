import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function HostLink({
  host,
  hostId,
  className,
  light,
  variant = "pill",
}: {
  host: string;
  hostId: string;
  className?: string;
  light?: boolean;
  variant?: "pill" | "plain";
}) {
  const isPlain = variant === "plain";

  return (
    <Link
      to="/host/$id"
      params={{ id: hostId }}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 transition",
        isPlain
          ? "text-xs font-medium text-muted-foreground hover:text-primary"
          : cn(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold",
              light
                ? "bg-white/15 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/25"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            ),
        className,
      )}
    >
      <UserRound className={cn("shrink-0", isPlain ? "h-3.5 w-3.5" : "h-3 w-3")} />
      <span className="truncate">{isPlain ? `Hosted by ${host}` : `by ${host}`}</span>
    </Link>
  );
}
