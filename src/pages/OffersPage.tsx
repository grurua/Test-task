import { useEffect, useMemo, useState } from "react";
import { SearchX, Wallet } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DiscoverHeader } from "../components/discover/DiscoverHeader";
import { SegmentedNavigation } from "../components/discover/SegmentedNavigation";
import { SearchField } from "../components/discover/SearchField";
import { FilterChip } from "../components/discover/FilterChip";
import { MerchantOfferCard } from "../components/discover/MerchantOfferCard";
import { EmptyState } from "../components/discover/EmptyState";
import { useAppState } from "../state/AppStateContext";
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

export function OffersPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { offers, activateOffer, recentlyActivatedOfferId } = useAppState();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<OfferCategory>>(new Set());

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

  return (
    <div className="pb-8">
      <DiscoverHeader title="Discover" subtitle="More ways to get value from your bank" />
      <SegmentedNavigation />

      <div className="flex flex-col gap-3 px-4">
        <div className="flex items-center gap-2">
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
      </div>

      <div className="mt-4 flex flex-col gap-3 px-4">
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
          visible.map((offer) => (
            <MerchantOfferCard
              key={offer.id}
              offer={offer}
              justActivated={recentlyActivatedOfferId === offer.id}
              onOpen={() => navigate(`/discover/offer/${offer.id}`)}
              onActivate={() => activateOffer(offer.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
