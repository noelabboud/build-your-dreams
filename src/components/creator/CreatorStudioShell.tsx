import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Plus,
  Settings,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const navItems = [
  { to: "/creator", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/creator/concepts", label: "Concepts", icon: Sparkles },
  { to: "/creator/submissions", label: "Submissions", icon: Users },
  { to: "/creator/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/creator/earnings", label: "Earnings", icon: Wallet },
  { to: "/creator/settings", label: "Settings", icon: Settings },
];

export function CreatorStudioShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="grid h-screen min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_rgba(86,155,255,.16),_transparent_42%),var(--app-gradient)] supports-[height:100dvh]:h-dvh supports-[height:100dvh]:min-h-dvh sm:p-4">
      <div className="relative flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-background shadow-[0_28px_90px_-30px_rgba(15,23,42,.42)] sm:h-[calc(100dvh-2rem)] sm:max-h-[900px] sm:rounded-[2rem] sm:border sm:border-white/80">
        <header className="relative z-20 flex min-h-16 shrink-0 items-center gap-3 bg-surface/90 px-4 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary font-display text-sm font-black text-primary-foreground shadow-soft">
            M
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-base font-bold">Creator Studio</div>
            <div className="truncate text-[11px] font-medium text-muted-foreground">
              {pathname === "/creator" ? "Home" : title}
            </div>
          </div>
          <button
            className="relative grid h-10 w-10 place-items-center rounded-full bg-white/80 shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
        </header>

        {menuOpen && (
          <div className="absolute inset-0 z-40">
            <button
              className="absolute inset-0 w-full bg-foreground/35"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            />
            <div className="absolute inset-y-0 left-0 w-[82%] rounded-r-[2rem] bg-surface px-5 pb-6 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="font-display text-xl font-bold">Midan</div>
                  <div className="text-xs font-medium text-muted-foreground">Creator Studio</div>
                </div>
                <button
                  className="grid h-10 w-10 place-items-center rounded-full bg-white"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Link
                to="/creator/create"
                onClick={() => setMenuOpen(false)}
                className="mb-5 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-4 font-bold text-primary-foreground shadow-soft"
              >
                <Plus className="h-5 w-5" /> Create concept
              </Link>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to, item.exact);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm ${
                        active ? "bg-primary-soft font-bold text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {item.label}
                    </Link>
                  );
                })}
              </nav>
              <Link
                to="/"
                className="absolute bottom-7 left-5 right-5 rounded-xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-muted-foreground"
              >
                Switch to participant
              </Link>
            </div>
          </div>
        )}

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-4">
          <div className="space-y-5">{children}</div>
        </main>

        <nav className="pointer-events-none absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] z-30 px-3">
          <div className="pointer-events-auto grid h-[4.25rem] grid-cols-5 items-stretch rounded-[1.5rem] border border-white bg-white/72 px-1.5 py-1.5 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.68),0_0_0_1px_rgba(36,66,94,0.14)] backdrop-blur-[24px] backdrop-saturate-150 supports-[backdrop-filter]:bg-white/64">
            <MobileNavLink
              to="/creator"
              label="Home"
              icon={LayoutDashboard}
              active={isActive("/creator", true)}
            />
            <MobileNavLink
              to="/creator/concepts"
              label="Concepts"
              icon={Sparkles}
              active={isActive("/creator/concepts")}
            />
            <Link
              to="/creator/create"
              aria-label="Create concept"
              className="group flex h-full flex-col items-center justify-center gap-0.5 rounded-[1.1rem] text-[10px] font-bold text-primary transition active:scale-[0.96]"
            >
              <span className="grid h-8 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <Plus className="h-5 w-5" />
              </span>
              Create
            </Link>
            <MobileNavLink
              to="/creator/submissions"
              label="Entries"
              icon={Users}
              active={isActive("/creator/submissions")}
            />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-full flex-col items-center justify-center gap-0.5 rounded-[1.1rem] text-[10px] font-semibold text-muted-foreground transition active:scale-[0.96]"
            >
              <Menu className="h-5 w-5" />
              More
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function MobileNavLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex h-full flex-col items-center justify-center gap-0.5 rounded-[1.1rem] text-[10px] font-semibold transition active:scale-[0.96] ${
        active ? "bg-primary/10 text-primary" : "text-muted-foreground"
      }`}
    >
      <span
        className="grid h-8 w-12 place-items-center rounded-full"
      >
        <Icon className="h-5 w-5" />
      </span>
      {label}
    </Link>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
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
