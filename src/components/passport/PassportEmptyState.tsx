import { Link } from "@tanstack/react-router";
import { Sparkles, type LucideIcon } from "lucide-react";

export function PassportEmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  showExploreCta,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  showExploreCta?: boolean;
}) {
  return (
    <div className="app-card flex flex-col items-center gap-2.5 p-6 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-base font-black">{title}</div>
      <p className="app-body text-muted-foreground">{description}</p>
      {showExploreCta && (
        <Link
          to="/explore"
          className="mt-1.5 flex min-h-10 items-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm"
        >
          Explore Concepts
        </Link>
      )}
    </div>
  );
}
