import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function MobileShell({ children, hideNav }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-dvh bg-surface">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background shadow-[0_0_60px_-20px_rgba(0,0,0,0.15)]">
        <main className="flex-1">{children}</main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
