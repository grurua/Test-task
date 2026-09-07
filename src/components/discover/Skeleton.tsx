export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-(--radius-control) bg-(--color-surface-alt) ${className}`}
    />
  );
}

export function DiscoverHomeSkeleton() {
  return (
    <div className="flex flex-col gap-5 px-4 py-4">
      <Skeleton className="h-48 w-full rounded-(--radius-card)" />
      <div className="flex gap-3">
        <Skeleton className="h-28 w-[220px] rounded-(--radius-card)" />
        <Skeleton className="h-28 w-[220px] rounded-(--radius-card)" />
      </div>
      <Skeleton className="h-32 w-full rounded-(--radius-card)" />
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((key) => (
          <Skeleton key={key} className="h-16 w-16 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
