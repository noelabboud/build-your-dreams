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
    <div className="app-gradient-surface h-screen min-h-screen overflow-hidden supports-[height:100dvh]:h-dvh supports-[height:100dvh]:min-h-dvh">
      <div className="app-gradient-surface relative mx-auto flex h-full min-h-0 w-full max-w-[430px] flex-col overflow-hidden shadow-[0_0_48px_-24px_rgba(0,0,0,0.16)]">
        {header && <div className={cn("shrink-0 bg-background/80", headerClassName)}>{header}</div>}
        <main
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]",
            !hideNav && "pb-[calc(5.75rem+env(safe-area-inset-bottom))]",
            scrollSurfaceClassName,
          )}
        >
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
