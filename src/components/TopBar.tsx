import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Share2, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

export function TopBar({
  title,
  back = true,
  actions,
}: {
  title?: ReactNode;
  back?: boolean;
  actions?: "share" | "more" | ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border/60 bg-background/90 px-3 backdrop-blur">
      {back && (
        <button
          onClick={() => router.history.back()}
          aria-label="Back"
          className="grid h-9 w-9 place-items-center rounded-full text-foreground hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <div className="flex-1 truncate text-base font-semibold">{title}</div>
      {actions === "share" && (
        <>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"><Bookmark className="h-5 w-5" /></button>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"><Share2 className="h-5 w-5" /></button>
        </>
      )}
      {actions === "more" && (
        <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"><MoreHorizontal className="h-5 w-5" /></button>
      )}
      {typeof actions !== "string" && actions}
    </div>
  );
}

export function SectionHeader({ title, to }: { title: string; to?: string }) {
  return (
    <div className="flex items-center justify-between px-4 pb-2 pt-5">
      <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
      {to && (
        <Link to={to} className="text-xs font-medium text-primary">See all</Link>
      )}
    </div>
  );
}
