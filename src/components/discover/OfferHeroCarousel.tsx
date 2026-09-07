import { Heart } from "lucide-react";
import { useRef, useState } from "react";
import { toneForIndex } from "../../lib/palette";
import type { MerchantOffer } from "../../types";

interface OfferHeroCarouselProps {
  offers: MerchantOffer[];
  isFavoriteOffer: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (id: string) => void;
}

export function OfferHeroCarousel({
  offers,
  isFavoriteOffer,
  onToggleFavorite,
  onOpen,
}: OfferHeroCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  }

  if (offers.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
      >
        {offers.map((offer, index) => (
          <button
            key={offer.id}
            type="button"
            onClick={() => onOpen(offer.id)}
            className="relative h-[180px] w-full shrink-0 snap-center overflow-hidden rounded-3xl text-left press-scale"
            style={{ background: toneForIndex(index) }}
          >
            <div
              className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full border-[16px] border-white/10"
              aria-hidden="true"
            />
            <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11.5px] font-bold text-(--color-ink)">
              {offer.benefitValue}
            </span>
            <span
              role="button"
              tabIndex={0}
              aria-label={isFavoriteOffer(offer.id) ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavoriteOffer(offer.id)}
              onClick={(event) => {
                event.stopPropagation();
                onToggleFavorite(offer.id);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();
                  onToggleFavorite(offer.id);
                }
              }}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 press-scale"
            >
              <Heart
                size={16}
                className="text-white"
                fill={isFavoriteOffer(offer.id) ? "currentColor" : "none"}
                aria-hidden="true"
              />
            </span>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[11px] font-bold tracking-[0.08em] text-white/75">
                {offer.merchant.toUpperCase()}
              </p>
              <p className="mt-1 text-[19px] leading-snug font-bold text-white">
                {offer.condition}
              </p>
            </div>
          </button>
        ))}
      </div>

      {offers.length > 1 ? (
        <div className="flex items-center justify-center gap-1.5" role="tablist" aria-label="Featured offers">
          {offers.map((offer, index) => (
            <span
              key={offer.id}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-5 bg-(--color-brand)"
                  : "w-1.5 bg-(--color-border-strong)"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
