import type { LucideIcon } from "lucide-react";

interface PopularCardProps {
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  ctaLabel: string;
  onClick: () => void;
}

export function PopularCard({
  icon: Icon,
  tag,
  title,
  description,
  ctaLabel,
  onClick,
}: PopularCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[200px] shrink-0 flex-col rounded-(--radius-card) bg-(--color-surface-alt) p-4 text-left press-scale"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-surface) text-(--color-ink)">
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="mt-3 text-[10.5px] font-bold tracking-[0.06em] text-(--color-ink-muted)">
        {tag.toUpperCase()}
      </span>
      <span className="mt-1 text-[14px] font-semibold text-(--color-ink)">{title}</span>
      <span className="mt-1 text-[12.5px] leading-relaxed text-(--color-ink-secondary)">
        {description}
      </span>
      <span className="mt-3 text-[12.5px] font-semibold text-(--color-brand)">{ctaLabel}</span>
    </button>
  );
}
