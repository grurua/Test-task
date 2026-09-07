import { Clock } from "lucide-react";
import { OfferStatusBadge } from "./OfferStatusBadge";
import type { MerchantOffer } from "../../types";

interface MerchantOfferCardProps {
  offer: MerchantOffer;
  onOpen: () => void;
  onActivate: () => void;
  justActivated?: boolean;
}

const toneClasses: Record<MerchantOffer["tone"], string> = {
  dark: "bg-(--color-brand-strong) text-white",
  warm: "bg-[#8a5a2c] text-white",
  cool: "bg-[#2a5a7a] text-white",
  green: "bg-(--color-positive) text-white",
};

export function MerchantOfferCard({
  offer,
  onOpen,
  onActivate,
  justActivated = false,
}: MerchantOfferCardProps) {
  const isInactive = offer.status === "used" || offer.status === "expired";

  return (
    <article
      className={`rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4 ${
        isInactive ? "opacity-70" : ""
      }`}
    >
      <button type="button" onClick={onOpen} className="flex w-full items-start gap-3.5 text-left">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[15px] font-bold ${toneClasses[offer.tone]}`}
          aria-hidden="true"
        >
          {offer.merchantInitial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-[15px] font-semibold text-(--color-ink)">
              {offer.merchant}
            </span>
            <OfferStatusBadge status={offer.status} />
          </span>
          <span className="mt-0.5 block text-[14px] font-semibold text-(--color-positive)">
            {offer.benefitValue}
          </span>
          <span className="mt-1 block text-[12.5px] text-(--color-ink-secondary)">
            {offer.condition}
            {offer.maxBenefit ? ` · ${offer.maxBenefit}` : ""}
          </span>
          <span className="mt-1 flex items-center gap-1 text-[12px] text-(--color-ink-muted)">
            <Clock size={12} aria-hidden="true" />
            {offer.expiresLabel}
          </span>
        </span>
      </button>

      {offer.status === "available" ? (
        <button
          type="button"
          onClick={onActivate}
          className="mt-3.5 w-full rounded-(--radius-control) bg-(--color-brand) py-2.5 text-[13.5px] font-semibold text-white press-scale"
        >
          Activate
        </button>
      ) : justActivated ? (
        <p className="mt-3 text-[12.5px] font-medium text-(--color-positive)">
          Added to your Offer Wallet.
        </p>
      ) : null}
    </article>
  );
}
