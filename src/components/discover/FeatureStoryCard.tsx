import { featureIcons } from "../../lib/icons";
import type { FeatureUpdate } from "../../types";

interface FeatureStoryCardProps {
  feature: FeatureUpdate;
  onOpen: () => void;
}

export function FeatureStoryCard({ feature, onOpen }: FeatureStoryCardProps) {
  const Icon = featureIcons[feature.icon];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-[220px] shrink-0 flex-col rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4 text-left press-scale"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-surface-alt) text-(--color-brand)">
          <Icon size={19} aria-hidden="true" />
        </span>
        {feature.isNew ? (
          <span className="rounded-full bg-(--color-brand-soft) px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-(--color-brand)">
            NEW
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-[14.5px] font-semibold text-(--color-ink)">
        {feature.headline}
      </p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-(--color-ink-secondary)">
        {feature.description}
      </p>
      <span className="mt-3 text-[13px] font-semibold text-(--color-brand)">
        {feature.ctaLabel}
      </span>
    </button>
  );
}
