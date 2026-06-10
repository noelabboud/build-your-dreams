import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function MobileShell({
  children,
  hideNav,
  header,
}: {
  children: ReactNode;
  hideNav?: boolean;
  header?: ReactNode;
}) {
  return (
    <div className="h-dvh min-h-dvh overflow-hidden bg-surface">
      <div className="relative mx-auto flex h-full min-h-0 max-w-md flex-col overflow-hidden bg-background shadow-[0_0_60px_-20px_rgba(0,0,0,0.15)]">
        {header && <div className="shrink-0 bg-background">{header}</div>}
        <main
          className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch] ${
            hideNav ? "" : "pb-[calc(5.75rem+env(safe-area-inset-bottom))]"
          }`}
        >
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
