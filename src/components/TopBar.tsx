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
    <div className="sticky top-0 z-20 flex h-[calc(3.5rem+env(safe-area-inset-top))] items-center gap-2 border-b border-border/60 bg-background/90 px-3.5 pt-[env(safe-area-inset-top)] backdrop-blur">
      {back && (
        <button
          onClick={() => router.history.back()}
          aria-label="Back"
          className="app-icon-button text-foreground hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <div className="flex-1 truncate text-base font-bold">{title}</div>
      {actions === "share" && (
        <>
          <button className="app-icon-button hover:bg-muted">
            <Bookmark className="h-5 w-5" />
          </button>
          <button className="app-icon-button hover:bg-muted">
            <Share2 className="h-5 w-5" />
          </button>
        </>
      )}
      {actions === "more" && (
        <button className="app-icon-button hover:bg-muted">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      )}
      {typeof actions !== "string" && actions}
    </div>
  );
}

export function SectionHeader({ title, to }: { title: string; to?: string }) {
  return (
    <div className="app-page-x flex items-end justify-between pb-3 pt-5">
      <h2 className="app-section-title">{title}</h2>
      {to && (
        <Link to={to} className="text-sm font-bold text-primary">
          See all
        </Link>
      )}
    </div>
  );
}
