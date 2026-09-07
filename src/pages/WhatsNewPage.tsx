import { useEffect, useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DiscoverHeader } from "../components/discover/DiscoverHeader";
import { SegmentedNavigation } from "../components/discover/SegmentedNavigation";
import { FilterChip } from "../components/discover/FilterChip";
import { FeatureCard } from "../components/discover/FeatureCard";
import { EmptyState } from "../components/discover/EmptyState";
import { features } from "../data/features";
import type { FeatureCategory } from "../types";

type FilterId = "featured" | "new" | FeatureCategory;

const filters: { id: FilterId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New" },
  { id: "cards", label: "Cards" },
  { id: "payments", label: "Payments" },
  { id: "transfers", label: "Transfers" },
  { id: "saving", label: "Saving" },
];

const validCategoryParams: FilterId[] = ["cards", "payments", "transfers", "saving"];

export function WhatsNewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterId>("featured");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && (validCategoryParams as string[]).includes(category)) {
      setActiveFilter(category as FilterId);
    }
  }, [searchParams]);

  const visible = useMemo(() => {
    if (activeFilter === "featured") return features;
    if (activeFilter === "new") return features.filter((feature) => feature.isNew);
    return features.filter((feature) => feature.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="pb-8">
      <DiscoverHeader title="Discover" subtitle="More ways to get value from your bank" />
      <SegmentedNavigation />

      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-1">
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            selected={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 px-4">
        {visible.length === 0 ? (
          <EmptyState
            icon={LayoutGrid}
            title="Nothing here yet"
            description="Check back soon for new features in this category."
          />
        ) : (
          visible.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onOpen={() => navigate(`/discover/feature/${feature.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
