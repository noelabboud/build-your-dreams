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
    <nav className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] z-30 mx-auto w-full max-w-md px-4">
      <ul className="pointer-events-auto relative mx-auto flex max-w-md items-center justify-around overflow-hidden rounded-[2rem] border border-white bg-white/72 px-2 py-2 shadow-[0_22px_52px_-30px_rgba(15,23,42,0.68),0_0_0_1px_rgba(36,66,94,0.16)] backdrop-blur-[30px] backdrop-saturate-150 supports-[backdrop-filter]:bg-white/64">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-px h-px bg-white/95"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-[1.95rem] border border-white/80"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(54,78,102,0.2)]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 top-2 rounded-[1.35rem] bg-[color-mix(in_oklab,var(--primary)_10%,white_86%)]/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_10px_22px_-22px_rgba(67,102,232,0.38)] backdrop-blur-xl transition-transform duration-300 ease-out"
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
                className={`flex min-h-[3.75rem] flex-col items-center justify-center gap-1 rounded-[1.35rem] px-1 py-2 text-xs font-bold transition-all duration-200 ease-out active:scale-[0.96] ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground/85 hover:text-foreground active:text-foreground"
                }`}
              >
                <Icon
                  className="h-5.5 w-5.5 transition-all duration-200 ease-out"
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
