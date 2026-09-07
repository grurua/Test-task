import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DiscoverHeader } from "../components/discover/DiscoverHeader";
import { SegmentedNavigation } from "../components/discover/SegmentedNavigation";
import { FilterChip } from "../components/discover/FilterChip";
import { PersonalizedHeroCard } from "../components/discover/PersonalizedHeroCard";
import { RecommendationCard } from "../components/discover/RecommendationCard";
import { RecommendationWhySheet } from "../components/discover/RecommendationWhySheet";
import { EmptyState } from "../components/discover/EmptyState";
import { useAppState } from "../state/AppStateContext";
import type { Recommendation, RecommendationCategory } from "../types";

const filters: { id: RecommendationCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "save-money", label: "Save money" },
  { id: "save-time", label: "Save time" },
  { id: "cards", label: "Cards" },
  { id: "transfers", label: "Transfers" },
];

export function ForYouPage() {
  const navigate = useNavigate();
  const { recommendations, dismissRecommendation, recentlyDismissedRecommendationId } =
    useAppState();
  const [activeFilter, setActiveFilter] = useState<RecommendationCategory | "all">("all");
  const [whyRecommendation, setWhyRecommendation] = useState<Recommendation | null>(null);

  const visible = useMemo(() => {
    return recommendations
      .filter((rec) => rec.status !== "dismissed")
      .filter((rec) => activeFilter === "all" || rec.category === activeFilter)
      .sort((a, b) => a.priority - b.priority);
  }, [recommendations, activeFilter]);

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
        {recentlyDismissedRecommendationId ? (
          <p role="status" className="text-[12.5px] text-(--color-ink-muted)">
            Recommendation dismissed.
          </p>
        ) : null}

        {visible.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="You're all caught up"
            description="We'll show new recommendations here when we find something that may be useful to you."
          />
        ) : (
          visible.map((rec) =>
            rec.metadata.emphasis === "hero" ? (
              <PersonalizedHeroCard
                key={rec.id}
                recommendation={rec}
                onOpen={() => navigate(`/discover/recommendation/${rec.id}`)}
                onWhy={() => setWhyRecommendation(rec)}
              />
            ) : (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onOpen={() => navigate(`/discover/recommendation/${rec.id}`)}
                onDismiss={() => dismissRecommendation(rec.id)}
                onWhy={() => setWhyRecommendation(rec)}
              />
            ),
          )
        )}
      </div>

      <RecommendationWhySheet
        recommendation={whyRecommendation}
        onClose={() => setWhyRecommendation(null)}
      />
    </div>
  );
}
