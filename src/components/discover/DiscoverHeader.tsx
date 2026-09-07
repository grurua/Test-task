interface DiscoverHeaderProps {
  title: string;
  subtitle: string;
}

export function DiscoverHeader({ title, subtitle }: DiscoverHeaderProps) {
  return (
    <div className="px-4 pt-5 pb-1">
      <h1 className="text-[26px] font-bold tracking-tight text-(--color-ink)">{title}</h1>
      <p className="mt-1 text-[14px] text-(--color-ink-secondary)">{subtitle}</p>
    </div>
  );
}
