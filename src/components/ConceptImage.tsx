import { cn } from "@/lib/utils";

export function ConceptImage({
  src,
  alt,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : "true"}
      className={cn("overflow-hidden bg-muted", className)}
    >
      <div
        className={cn("h-full w-full bg-cover bg-center", imageClassName)}
        style={{ backgroundImage: `url("${src}")` }}
      />
    </div>
  );
}
