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
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => (tab.exact ? pathname === tab.to : pathname.startsWith(tab.to))),
  );

  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6">
      <ul className="pointer-events-auto relative mx-auto flex max-w-md items-center justify-around overflow-hidden rounded-[2rem] border border-white/70 bg-white/58 px-2 py-2 shadow-[0_18px_38px_-34px_rgba(15,23,42,0.46)] backdrop-blur-[28px] backdrop-saturate-150 supports-[backdrop-filter]:bg-white/50">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-white/65"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.46),inset_0_-1px_0_rgba(255,255,255,0.18)]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 top-2 rounded-[1.35rem] bg-[color-mix(in_oklab,var(--primary)_7%,white_88%)]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_10px_20px_-22px_rgba(67,102,232,0.28)] backdrop-blur-xl transition-transform duration-300 ease-out"
          style={{
            left: "0.5rem",
            width: `calc((100% - 1rem) / ${tabs.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <li key={t.to} className="relative z-10 flex-1">
              <Link
                to={t.to}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1.35rem] px-1 py-1.5 text-[11px] font-semibold transition-all duration-200 ease-out active:scale-[0.96] ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground/85 hover:text-foreground active:text-foreground"
                }`}
              >
                <Icon
                  className="h-5 w-5 transition-all duration-200 ease-out"
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <span className="transition-colors duration-200 ease-out">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
