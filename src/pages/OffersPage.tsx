import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, SearchX, Wallet } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DiscoverHeader } from "../components/discover/DiscoverHeader";
import { SegmentedNavigation } from "../components/discover/SegmentedNavigation";
import { SectionHeader } from "../components/discover/SectionHeader";
import { SearchField } from "../components/discover/SearchField";
import { FilterChip } from "../components/discover/FilterChip";
import { MerchantOfferCard } from "../components/discover/MerchantOfferCard";
import { OfferBannerCard } from "../components/discover/OfferBannerCard";
import { OfferHeroCarousel } from "../components/discover/OfferHeroCarousel";
import { CategoryIconButton } from "../components/discover/CategoryIconButton";
import { PartnerTile } from "../components/discover/PartnerTile";
import { EmptyState } from "../components/discover/EmptyState";
import { useAppState } from "../state/AppStateContext";
import { offerCategoryIcons } from "../lib/icons";
import { toneForIndex } from "../lib/palette";
import type { OfferCategory } from "../types";

const filters: { id: OfferCategory; label: string }[] = [
  { id: "for-you", label: "For You" },
  { id: "popular", label: "Popular" },
  { id: "nearby", label: "Nearby" },
  { id: "new", label: "New" },
  { id: "expiring-soon", label: "Expiring Soon" },
  { id: "cashback", label: "Cashback" },
  { id: "discounts", label: "Discounts" },
  { id: "travel", label: "Travel" },
  { id: "food", label: "Food" },
  { id: "shopping", label: "Shopping" },
  { id: "entertainment", label: "Entertainment" },
];

const quickCategories: { id: OfferCategory; label: string }[] = [
  { id: "travel", label: "Travel" },
  { id: "food", label: "Food" },
  { id: "shopping", label: "Shopping" },
  { id: "entertainment", label: "Entertainment" },
  { id: "cashback", label: "Cashback" },
  { id: "discounts", label: "Discounts" },
];

const partnerIds = [
  "offer-nike",
  "offer-zara",
  "offer-wizzair",
  "offer-carrefour",
  "offer-agora",
  "offer-adjara-cinema",
];

export function OffersPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    offers,
    activateOffer,
    recentlyActivatedOfferId,
    isFavoriteOffer,
    toggleFavoriteOffer,
  } = useAppState();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<OfferCategory>>(new Set());
  const allOffersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && filters.some((filter) => filter.id === category)) {
      setSelected(new Set([category as OfferCategory]));
    }
  }, [searchParams]);

  function toggleFilter(id: OfferCategory) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function jumpToAllOffers(withFilter?: OfferCategory) {
    if (withFilter) setSelected(new Set([withFilter]));
    allOffersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return offers.filter((offer) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        offer.merchant.toLowerCase().includes(normalizedQuery) ||
        offer.benefitValue.toLowerCase().includes(normalizedQuery);
      const matchesFilters =
        selected.size === 0 || offer.categories.some((category) => selected.has(category));
      return matchesQuery && matchesFilters;
    });
  }, [offers, query, selected]);

  const featuredOffers = offers.filter((offer) => offer.featured);
  const recommendedOffers = offers.filter((offer) => offer.recommended);
  const partners = partnerIds
    .map((id) => offers.find((offer) => offer.id === id))
    .filter((offer): offer is (typeof offers)[number] => Boolean(offer));
  const favoriteOffers = offers.filter((offer) => isFavoriteOffer(offer.id));

  return (
    <div className="pb-8">
      <DiscoverHeader title="Discover" subtitle="More ways to get value from your bank" />
      <SegmentedNavigation />

      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-2 px-4">
          <div className="flex-1">
            <SearchField value={query} onChange={setQuery} placeholder="Search merchants or offers" />
          </div>
          <button
            type="button"
            onClick={() => navigate("/discover/offers/wallet")}
            aria-label="Open Offer Wallet"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-control) border border-(--color-border) bg-(--color-surface) text-(--color-brand) press-scale"
          >
            <Wallet size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="px-4">
          <OfferHeroCarousel
            offers={featuredOffers}
            isFavoriteOffer={isFavoriteOffer}
            onToggleFavorite={toggleFavoriteOffer}
            onOpen={(id) => navigate(`/discover/offer/${id}`)}
          />
        </div>

        <section aria-label="Recommended" className="flex flex-col gap-3">
          <div className="px-4">
            <SectionHeader
              title="Recommended"
              action={{ label: "View all", onClick: () => jumpToAllOffers("for-you") }}
            />
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {recommendedOffers.map((offer, index) => (
              <OfferBannerCard
                key={offer.id}
                offer={offer}
                tone={toneForIndex(index + 1)}
                justActivated={recentlyActivatedOfferId === offer.id}
                isFavorited={isFavoriteOffer(offer.id)}
                onToggleFavorite={() => toggleFavoriteOffer(offer.id)}
                onOpen={() => navigate(`/discover/offer/${offer.id}`)}
                onActivate={() => activateOffer(offer.id)}
              />
            ))}
          </div>
        </section>

        <section aria-label="Offers by category" className="flex flex-col gap-3">
          <div className="px-4">
            <SectionHeader title="Offers by category" />
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {quickCategories.map((category) => (
              <CategoryIconButton
                key={category.id}
                icon={offerCategoryIcons[category.id]}
                label={category.label}
                selected={selected.has(category.id)}
                onClick={() => jumpToAllOffers(category.id)}
              />
            ))}
          </div>
        </section>

        <section ref={allOffersRef} aria-label="All offers" className="flex scroll-mt-4 flex-col gap-3 px-4">
          <SectionHeader title="All offers" />
          <div className="-mx-4 flex gap-2 overflow-x-auto no-scrollbar px-4 pb-1">
            {filters.map((filter) => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                selected={selected.has(filter.id)}
                onClick={() => toggleFilter(filter.id)}
              />
            ))}
          </div>

          {recentlyActivatedOfferId ? (
            <p role="status" className="text-[12.5px] font-medium text-(--color-positive)">
              Offer activated. Find it in your Offer Wallet.
            </p>
          ) : null}

          {visible.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No offers found"
              description="Try a different search term or clear a filter."
            />
          ) : (
            <div className="flex flex-col gap-3">
              {visible.map((offer) => (
                <MerchantOfferCard
                  key={offer.id}
                  offer={offer}
                  justActivated={recentlyActivatedOfferId === offer.id}
                  onOpen={() => navigate(`/discover/offer/${offer.id}`)}
                  onActivate={() => activateOffer(offer.id)}
                />
              ))}
            </div>
          )}
        </section>

        <section aria-label="Our partners" className="flex flex-col gap-3">
          <div className="px-4">
            <SectionHeader title="Our partners" />
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {partners.map((offer, index) => (
              <PartnerTile
                key={offer.id}
                merchant={offer.merchant}
                benefitValue={offer.benefitValue}
                tone={toneForIndex(index)}
                onClick={() => navigate(`/discover/offer/${offer.id}`)}
              />
            ))}
          </div>
        </section>

        <section aria-label="Your favorites" className="flex flex-col gap-3 px-4">
          <SectionHeader title="Your favorites" />
          {favoriteOffers.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No favorites yet"
              description="Tap the heart on an offer to save it here for later."
            />
          ) : (
            <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
              {favoriteOffers.map((offer, index) => (
                <OfferBannerCard
                  key={offer.id}
                  offer={offer}
                  tone={toneForIndex(index + 3)}
                  justActivated={recentlyActivatedOfferId === offer.id}
                  isFavorited={isFavoriteOffer(offer.id)}
                  onToggleFavorite={() => toggleFavoriteOffer(offer.id)}
                  onOpen={() => navigate(`/discover/offer/${offer.id}`)}
                  onActivate={() => activateOffer(offer.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
