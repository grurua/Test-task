import { Check, Heart, PackageOpen } from "lucide-react";
import { useParams } from "react-router-dom";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { OfferStatusBadge } from "../components/discover/OfferStatusBadge";
import { EmptyState } from "../components/discover/EmptyState";
import { useAppState } from "../state/AppStateContext";

const toneClasses: Record<string, string> = {
  dark: "bg-(--color-brand-strong) text-white",
  warm: "bg-[#8a5a2c] text-white",
  cool: "bg-[#2a5a7a] text-white",
  green: "bg-(--color-positive) text-white",
};

export function OfferDetail() {
  const { id } = useParams<{ id: string }>();
  const { getOffer, activateOffer, recentlyActivatedOfferId, isFavoriteOffer, toggleFavoriteOffer } =
    useAppState();
  const offer = id ? getOffer(id) : undefined;

  if (!offer) {
    return (
      <div className="flex h-full flex-col">
        <ScreenHeader />
        <div className="px-4 py-6">
          <EmptyState
            icon={PackageOpen}
            title="Offer not found"
            description="This offer is no longer available."
          />
        </div>
      </div>
    );
  }

  const isActionable = offer.status === "available";
  const isActive = offer.status === "activated";

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        trailing={
          <button
            type="button"
            aria-label={isFavoriteOffer(offer.id) ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavoriteOffer(offer.id)}
            onClick={() => toggleFavoriteOffer(offer.id)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-(--color-ink) press-scale hover:bg-(--color-surface-alt)"
          >
            <Heart
              size={19}
              className={isFavoriteOffer(offer.id) ? "text-(--color-danger)" : undefined}
              fill={isFavoriteOffer(offer.id) ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="flex items-center gap-3.5">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[17px] font-bold ${toneClasses[offer.tone]}`}
            aria-hidden="true"
          >
            {offer.merchantInitial}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[19px] font-bold text-(--color-ink)">
                {offer.merchant}
              </h1>
              <OfferStatusBadge status={offer.status} />
            </div>
            <p className="text-[13px] text-(--color-ink-secondary)">{offer.condition}</p>
          </div>
        </div>

        <div className="mt-5 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4">
          <p className="text-[12px] font-semibold tracking-wide text-(--color-ink-muted)">
            BENEFIT
          </p>
          <p className="mt-1 text-[26px] font-bold text-(--color-positive)">
            {offer.benefitValue}
          </p>
          {offer.maxBenefit ? (
            <p className="mt-1 text-[13px] text-(--color-ink-secondary)">
              Maximum {offer.benefitType}: {offer.maxBenefit.replace(/^Up to /i, "").replace(/ cashback$/i, "")}
            </p>
          ) : null}
          <p className="mt-2 text-[13px] text-(--color-ink-secondary)">
            Valid until: {offer.expiresDate}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-[13px] font-semibold text-(--color-ink)">Eligible cards</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {offer.eligibleCards.map((card) => (
              <li key={card} className="text-[13.5px] text-(--color-ink-secondary)">
                {card}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <p className="text-[13px] font-semibold text-(--color-ink)">How it works</p>
          <ol className="mt-2 flex flex-col gap-2.5">
            {offer.howItWorks.map((step, index) => (
              <li key={step} className="flex items-start gap-2.5 text-[13.5px] text-(--color-ink-secondary)">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-surface-alt) text-[11px] font-bold text-(--color-ink)">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7">
          {isActionable ? (
            <button
              type="button"
              onClick={() => activateOffer(offer.id)}
              className="w-full rounded-(--radius-control) bg-(--color-brand) py-3.5 text-[14.5px] font-semibold text-white press-scale"
            >
              Activate offer
            </button>
          ) : isActive ? (
            <div className="flex items-center justify-center gap-2 rounded-(--radius-control) bg-(--color-positive-soft) py-3.5 text-[14.5px] font-semibold text-(--color-positive)">
              <Check size={17} aria-hidden="true" />
              {recentlyActivatedOfferId === offer.id ? "Offer activated" : "Activated"}
            </div>
          ) : (
            <div className="rounded-(--radius-control) bg-(--color-surface-alt) py-3.5 text-center text-[14px] font-medium text-(--color-ink-muted)">
              {offer.status === "used" ? "This offer has already been used" : "This offer has expired"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
