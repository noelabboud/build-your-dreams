import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

export function MobileShell({
  children,
  hideNav,
  header,
  headerClassName,
  mainClassName,
}: {
  children: ReactNode;
  hideNav?: boolean;
  header?: ReactNode;
  headerClassName?: string;
  mainClassName?: string;
}) {
  const scrollSurfaceClassName = mainClassName ?? "bg-transparent";

  return (
    <div className="app-gradient-surface h-dvh min-h-dvh overflow-hidden">
      <div className="app-gradient-surface relative mx-auto flex h-full min-h-0 max-w-md flex-col overflow-hidden shadow-[0_0_60px_-20px_rgba(0,0,0,0.15)]">
        {header && <div className={cn("shrink-0 bg-background/80", headerClassName)}>{header}</div>}
        <main
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]",
            !hideNav && "pb-[calc(6.75rem+env(safe-area-inset-bottom))]",
            scrollSurfaceClassName,
          )}
        >
          {children}
        </main>
        {!hideNav && (
          <div
            aria-hidden="true"
            className="app-gradient-surface pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[calc(5.5rem+env(safe-area-inset-bottom))]"
          />
        )}
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
