import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function HostLink({
  host,
  hostId,
  className,
  light,
}: {
  host: string;
  hostId: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      to="/host/$id"
      params={{ id: hostId }}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition",
        light
          ? "bg-white/15 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/25"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      <UserRound className="h-3 w-3 shrink-0" />
      <span className="truncate">by {host}</span>
    </Link>
  );
}
