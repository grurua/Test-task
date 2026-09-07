import { featureIcons } from "../../lib/icons";
import type { FeatureUpdate } from "../../types";

interface FeatureCardProps {
  feature: FeatureUpdate;
  onOpen: () => void;
}

export function FeatureCard({ feature, onOpen }: FeatureCardProps) {
  const Icon = featureIcons[feature.icon];

  return (
    <article className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4">
      <div className="flex items-start gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-surface-alt) text-(--color-brand)">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold text-(--color-ink)">{feature.title}</h3>
            {feature.isNew ? (
              <span className="shrink-0 rounded-full bg-(--color-brand-soft) px-2 py-0.5 text-[10px] font-bold tracking-wide text-(--color-brand)">
                NEW
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-[13.5px] leading-relaxed text-(--color-ink-secondary)">
            {feature.description}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3.5 w-full rounded-(--radius-control) bg-(--color-surface-alt) py-2.5 text-[13.5px] font-semibold text-(--color-ink) press-scale"
      >
        {feature.ctaLabel}
      </button>
    </article>
  );
}
