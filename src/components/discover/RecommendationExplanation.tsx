interface RecommendationExplanationProps {
  reason: string;
  onGotIt: () => void;
  onOptOut: () => void;
}

export function RecommendationExplanation({
  reason,
  onGotIt,
  onOptOut,
}: RecommendationExplanationProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[14px] leading-relaxed text-(--color-ink-secondary)">{reason}</p>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onGotIt}
          className="rounded-(--radius-control) bg-(--color-brand) py-3 text-[14px] font-semibold text-white press-scale"
        >
          Got it
        </button>
        <button
          type="button"
          onClick={onOptOut}
          className="rounded-(--radius-control) py-3 text-[14px] font-semibold text-(--color-ink-secondary) press-scale hover:bg-(--color-surface-alt)"
        >
          Don't show recommendations like this
        </button>
      </div>
    </div>
  );
}
