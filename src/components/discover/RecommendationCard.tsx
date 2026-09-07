import { Check, X } from "lucide-react";
import { recommendationIcons } from "../../lib/icons";
import type { Recommendation } from "../../types";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onOpen: () => void;
  onDismiss: () => void;
  onWhy: () => void;
}

export function RecommendationCard({
  recommendation,
  onOpen,
  onDismiss,
  onWhy,
}: RecommendationCardProps) {
  const Icon = recommendationIcons[recommendation.metadata.icon];
  const isCompact = recommendation.metadata.emphasis === "compact";
  const isCompleted = recommendation.status === "completed";

  return (
    <article
      className={`relative rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) press-scale ${
        isCompact ? "p-3.5" : "p-4"
      }`}
    >
      {!isCompleted ? (
        <button
          type="button"
          aria-label="Dismiss recommendation"
          onClick={(event) => {
            event.stopPropagation();
            onDismiss();
          }}
          className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full text-(--color-ink-muted) press-scale hover:bg-(--color-surface-alt)"
        >
          <X size={15} aria-hidden="true" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={onOpen}
        className={`flex w-full text-left ${isCompact ? "items-center gap-3" : "flex-col gap-3"}`}
      >
        <span
          className={`flex shrink-0 items-center justify-center rounded-full bg-(--color-brand-soft) text-(--color-brand) ${
            isCompact ? "h-10 w-10" : "h-11 w-11"
          }`}
        >
          <Icon size={isCompact ? 18 : 20} aria-hidden="true" />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block pr-6 font-semibold text-(--color-ink) ${
              isCompact ? "text-[14px]" : "text-[15px]"
            }`}
          >
            {recommendation.headline}
          </span>
          <span
            className={`mt-0.5 block text-(--color-ink-secondary) ${
              isCompact ? "text-[12.5px]" : "text-[13.5px] leading-relaxed"
            }`}
          >
            {recommendation.description}
          </span>
          {!isCompact && recommendation.supportingText ? (
            <span className="mt-1.5 block text-[12.5px] font-medium text-(--color-ink)">
              {recommendation.supportingText}
            </span>
          ) : null}
        </span>
      </button>

      <div className={`flex items-center justify-between gap-2 ${isCompact ? "mt-2.5 pl-[52px]" : "mt-3.5"}`}>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-positive-soft) px-3 py-1.5 text-[12.5px] font-semibold text-(--color-positive)">
            <Check size={13} aria-hidden="true" />
            Completed
          </span>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full bg-(--color-brand-soft) px-3.5 py-2 text-[13px] font-semibold text-(--color-brand) press-scale"
          >
            {recommendation.ctaLabel}
          </button>
        )}
        {!isCompleted ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onWhy();
            }}
            className="shrink-0 text-[12.5px] font-medium text-(--color-ink-muted) press-scale"
          >
            Why this?
          </button>
        ) : null}
      </div>
    </article>
  );
}
