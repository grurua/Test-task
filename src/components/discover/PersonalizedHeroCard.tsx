import type { Recommendation } from "../../types";

interface PersonalizedHeroCardProps {
  recommendation: Recommendation;
  onOpen: () => void;
  onWhy: () => void;
}

export function PersonalizedHeroCard({
  recommendation,
  onOpen,
  onWhy,
}: PersonalizedHeroCardProps) {
  return (
    <section className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-5 shadow-[0_1px_2px_rgba(15,20,30,0.04)]">
      <p className="text-[11px] font-bold tracking-[0.08em] text-(--color-brand)">
        FOR YOU
      </p>
      <h2 className="mt-2 text-[15px] font-medium text-(--color-ink-secondary)">
        {recommendation.headline}
      </h2>
      <p className="mt-1 text-[44px] leading-none font-bold tracking-tight text-(--color-positive)">
        {recommendation.value}
      </p>
      <p className="mt-3 text-[14px] leading-relaxed text-(--color-ink)">
        {recommendation.description}
      </p>
      {recommendation.supportingText ? (
        <p className="mt-2 text-[12.5px] leading-relaxed text-(--color-ink-muted)">
          {recommendation.supportingText}
        </p>
      ) : null}
      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={onOpen}
          className="flex-1 rounded-(--radius-control) bg-(--color-brand) py-3 text-center text-[14px] font-semibold text-white press-scale"
        >
          {recommendation.ctaLabel}
        </button>
      </div>
      <button
        type="button"
        onClick={onWhy}
        className="mt-3 text-[13px] font-medium text-(--color-ink-secondary) underline decoration-(--color-border-strong) underline-offset-2 press-scale"
      >
        Why am I seeing this?
      </button>
    </section>
  );
}
