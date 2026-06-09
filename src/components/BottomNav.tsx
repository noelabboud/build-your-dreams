import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, LayoutGrid, BookUser } from "lucide-react";

type Tab = {
  to: "/" | "/explore" | "/my-concepts" | "/passport";
  label: string;
  icon: typeof Home;
  exact?: boolean;
};
const tabs: Tab[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/my-concepts", label: "My Concepts", icon: LayoutGrid },
  { to: "/passport", label: "Passport", icon: BookUser },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 z-30 bg-gradient-to-t from-background via-background/95 to-background/0 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
      <ul className="mx-auto flex max-w-md items-center justify-around rounded-[2rem] border border-border/80 bg-card/90 px-2 py-2 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.65)] backdrop-blur supports-[backdrop-filter]:bg-card/80">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <li key={t.to} className="flex-1">
              <Link
                to={t.to}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1.35rem] px-1 py-1.5 text-[11px] font-semibold transition ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                <span>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
