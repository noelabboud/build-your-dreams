export function ParticipationMetric({
  label,
  value,
  subtle,
}: {
  label: string;
  value: string;
  subtle?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-3.5 text-center ${subtle ? "bg-background" : "bg-muted"}`}>
      <div
        className={`text-xl font-black leading-none ${subtle ? "text-foreground" : "text-primary"}`}
      >
        {value}
      </div>
      <div className="app-caption mt-1.5 text-muted-foreground">{label}</div>
    </div>
  );
}
