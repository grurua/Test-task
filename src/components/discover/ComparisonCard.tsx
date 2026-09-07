import { formatGel, formatSignedGel } from "../../lib/format";
import type { RecommendationComparison } from "../../types";

interface ComparisonCardProps {
  comparison: RecommendationComparison;
}

export function ComparisonCard({ comparison }: ComparisonCardProps) {
  const maxReturn = Math.max(comparison.currentReturn, comparison.proposedReturn, 1);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4">
        <p className="text-[10.5px] font-bold tracking-[0.06em] text-(--color-ink-muted)">
          {comparison.currentLabel.toUpperCase()}
        </p>
        <p className="mt-2 text-[20px] font-bold text-(--color-ink)">
          {formatGel(comparison.currentAmount)}
        </p>
        <p className="text-[12px] text-(--color-ink-secondary)">{comparison.currentTerm}</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-(--color-surface-alt)">
          <div
            className="h-full rounded-full bg-(--color-ink-muted)"
            style={{
              width: `${Math.max((comparison.currentReturn / maxReturn) * 100, 4)}%`,
            }}
          />
        </div>
        <p className="mt-2 text-[11px] font-medium text-(--color-ink-muted)">Return</p>
        <p className="text-[15px] font-semibold text-(--color-ink)">
          {formatGel(comparison.currentReturn)}
        </p>
      </div>

      <div className="rounded-(--radius-card) border border-(--color-brand) bg-(--color-brand-soft) p-4">
        <p className="text-[10.5px] font-bold tracking-[0.06em] text-(--color-brand)">
          {comparison.proposedLabel.toUpperCase()}
        </p>
        <p className="mt-2 text-[20px] font-bold text-(--color-ink)">
          {formatGel(comparison.proposedAmount)}
        </p>
        <p className="text-[12px] text-(--color-ink-secondary)">{comparison.proposedTerm}</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
          <div
            className="h-full rounded-full bg-(--color-positive)"
            style={{
              width: `${Math.max((comparison.proposedReturn / maxReturn) * 100, 4)}%`,
            }}
          />
        </div>
        <p className="mt-2 text-[11px] font-medium text-(--color-brand)">Estimated return</p>
        <p className="text-[15px] font-bold text-(--color-positive)">
          {formatSignedGel(comparison.proposedReturn)}
        </p>
      </div>
    </div>
  );
}
