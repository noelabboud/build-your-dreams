import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, Bell, ChevronRight, LayoutDashboard, Menu, Plus, Settings, Sparkles, Users, Wallet, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const navItems = [
  { to: "/creator", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/creator/concepts", label: "Concepts", icon: Sparkles },
  { to: "/creator/create", label: "Create Concept", icon: Plus, primary: true },
  { to: "/creator/submissions", label: "Submissions", icon: Users },
  { to: "/creator/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/creator/settings", label: "Settings", icon: Settings },
  { to: "/creator/earnings", label: "Earnings", icon: Wallet },
];

export function CreatorStudioShell({
  children,
  title,
  subtitle,
  action,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return pathname === to;
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-surface/95 lg:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-lg font-semibold text-primary-foreground">M</div>
          <div className="min-w-0">
            <div className="font-display text-lg font-semibold leading-none">Midan</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Creator Studio</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);

            if (item.primary) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="my-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95"
                >
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition " +
                  (active ? "bg-primary-soft text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground")
                }
              >
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-surface/90 px-4 backdrop-blur">
          <button
            onClick={() => setMenuOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="truncate font-display text-lg font-semibold">{title}</div>
            {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
          <div className="flex items-center rounded-xl border border-border bg-surface-2 p-0.5 text-xs font-medium">
            <Link to="/" className={`rounded-lg px-2.5 py-1 ${pathname === "/" ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Participant</Link>
            <Link to="/creator" className={`rounded-lg px-2.5 py-1 ${pathname.startsWith("/creator") ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Creator</Link>
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-foreground/30" onClick={() => setMenuOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-surface p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-display text-lg font-semibold">Midan Studio</div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to, item.exact);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={"flex items-center gap-3 rounded-lg px-3 py-2 text-sm " + (active ? "bg-primary-soft text-primary font-medium" : "text-muted-foreground")}
                    >
                      <Icon className="h-4 w-4" /> {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {action}
    </div>
  );
}

export function SecondaryLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
      {label} <ChevronRight className="h-4 w-4" />
    </Link>
  );
}
