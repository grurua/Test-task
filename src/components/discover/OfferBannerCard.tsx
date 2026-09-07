import { Clock, ExternalLink, Heart } from "lucide-react";
import { OfferStatusBadge } from "./OfferStatusBadge";
import type { MerchantOffer } from "../../types";

interface OfferBannerCardProps {
  offer: MerchantOffer;
  tone: string;
  onOpen: () => void;
  onActivate: () => void;
  justActivated?: boolean;
  width?: string;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export function OfferBannerCard({
  offer,
  tone,
  onOpen,
  onActivate,
  justActivated = false,
  width = "w-[230px]",
  isFavorited,
  onToggleFavorite,
}: OfferBannerCardProps) {
  return (
    <article
      className={`flex ${width} shrink-0 flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface)`}
    >
      <button type="button" onClick={onOpen} className="flex flex-col text-left">
        <div
          className="relative flex h-28 items-center justify-center overflow-hidden"
          style={{ background: tone }}
        >
          <span className="text-[40px] leading-none font-bold text-white/25" aria-hidden="true">
            {offer.merchantInitial}
          </span>
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11.5px] font-bold text-(--color-ink)">
            {offer.merchant}
            <ExternalLink size={11} aria-hidden="true" />
          </span>
          {onToggleFavorite ? (
            <span
              role="button"
              tabIndex={0}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavorited}
              onClick={(event) => {
                event.stopPropagation();
                onToggleFavorite();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();
                  onToggleFavorite();
                }
              }}
              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 press-scale"
            >
              <Heart
                size={14}
                className={isFavorited ? "text-(--color-danger)" : "text-(--color-ink-secondary)"}
                fill={isFavorited ? "currentColor" : "none"}
                aria-hidden="true"
              />
            </span>
          ) : null}
        </div>
        <div className="px-3 pt-2.5">
          <p className="text-[13.5px] font-semibold text-(--color-positive)">
            {offer.benefitValue}
          </p>
          <p className="mt-0.5 text-[12px] leading-snug text-(--color-ink-secondary)">
            {offer.condition}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[11.5px] text-(--color-ink-muted)">
            <Clock size={11} aria-hidden="true" />
            {offer.expiresLabel}
          </p>
        </div>
      </button>

      <div className="mt-2.5 px-3 pb-3">
        {offer.status === "available" ? (
          <button
            type="button"
            onClick={onActivate}
            className="w-full rounded-full bg-(--color-brand) py-2 text-[12.5px] font-semibold text-white press-scale"
          >
            Activate
          </button>
        ) : justActivated ? (
          <p className="text-[11.5px] font-medium text-(--color-positive)">Added to wallet</p>
        ) : (
          <OfferStatusBadge status={offer.status} />
        )}
      </div>
    </article>
  );
}
