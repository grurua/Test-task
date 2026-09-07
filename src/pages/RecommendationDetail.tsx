import { useState } from "react";
import { Check, Info, PackageOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { ComparisonCard } from "../components/discover/ComparisonCard";
import { EmptyState } from "../components/discover/EmptyState";
import { useAppState } from "../state/AppStateContext";

const depositHeadline = "Your money could potentially earn more";

export function RecommendationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecommendation, dismissRecommendation, completeRecommendation } = useAppState();
  const recommendation = id ? getRecommendation(id) : undefined;
  const [justCompleted, setJustCompleted] = useState(false);

  if (!recommendation || recommendation.status === "dismissed") {
    return (
      <div className="flex h-full flex-col">
        <ScreenHeader />
        <div className="px-4 py-6">
          <EmptyState
            icon={PackageOpen}
            title="This recommendation is no longer available"
            description="It may have already been dismissed or acted on."
          />
        </div>
      </div>
    );
  }

  const isDeposit = recommendation.type === "deposit";
  const isCompleted = recommendation.status === "completed" || justCompleted;

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader />
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <h1 className="text-[22px] font-bold tracking-tight text-(--color-ink)">
          {isDeposit ? depositHeadline : recommendation.headline}
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-(--color-ink-secondary)">
          {recommendation.description}
        </p>

        {recommendation.comparison ? (
          <div className="mt-5">
            <ComparisonCard comparison={recommendation.comparison} />
          </div>
        ) : recommendation.supportingText ? (
          <div className="mt-5 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4">
            <p className="text-[14px] font-semibold text-(--color-ink)">
              {recommendation.supportingText}
            </p>
          </div>
        ) : null}

        {recommendation.calculationNote ? (
          <div className="mt-5 flex gap-2.5 rounded-(--radius-card) bg-(--color-surface-alt) p-4">
            <Info size={16} className="mt-0.5 shrink-0 text-(--color-ink-muted)" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-semibold text-(--color-ink)">
                How we calculated this
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-(--color-ink-secondary)">
                {recommendation.calculationNote}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex gap-2.5 rounded-(--radius-card) bg-(--color-surface-alt) p-4">
            <Info size={16} className="mt-0.5 shrink-0 text-(--color-ink-muted)" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-semibold text-(--color-ink)">
                Why we're suggesting this
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-(--color-ink-secondary)">
                {recommendation.reason}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2.5">
          {isCompleted ? (
            <div className="flex items-center justify-center gap-2 rounded-(--radius-control) bg-(--color-positive-soft) py-3 text-[14px] font-semibold text-(--color-positive)">
              <Check size={16} aria-hidden="true" />
              Completed
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  if (isDeposit) {
                    navigate("/products");
                    return;
                  }
                  setJustCompleted(true);
                  completeRecommendation(recommendation.id);
                }}
                className="rounded-(--radius-control) bg-(--color-brand) py-3.5 text-[14.5px] font-semibold text-white press-scale"
              >
                {isDeposit ? "Explore deposit options" : recommendation.ctaLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  dismissRecommendation(recommendation.id);
                  navigate(-1);
                }}
                className="rounded-(--radius-control) py-3 text-[14px] font-semibold text-(--color-ink-secondary) press-scale hover:bg-(--color-surface-alt)"
              >
                Not interested
              </button>
            </>
          )}
        </div>

        {isDeposit ? (
          <p className="mt-4 text-center text-[12px] text-(--color-ink-muted)">
            Estimated returns are approximate and not guaranteed.
          </p>
        ) : null}
      </div>
    </div>
  );
}
