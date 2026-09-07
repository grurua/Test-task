import { useMemo, useState } from "react";
import { Landmark, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DiscoverHeader } from "../components/discover/DiscoverHeader";
import { SegmentedNavigation } from "../components/discover/SegmentedNavigation";
import { SectionHeader } from "../components/discover/SectionHeader";
import { PersonalizedHeroCard } from "../components/discover/PersonalizedHeroCard";
import { RecommendationCard } from "../components/discover/RecommendationCard";
import { RecommendationWhySheet } from "../components/discover/RecommendationWhySheet";
import { FeatureStoryCard } from "../components/discover/FeatureStoryCard";
import { MerchantOfferCard } from "../components/discover/MerchantOfferCard";
import { CategoryShortcut } from "../components/discover/CategoryShortcut";
import { PopularCard } from "../components/discover/PopularCard";
import { EmptyState } from "../components/discover/EmptyState";
import { DiscoverHomeSkeleton } from "../components/discover/Skeleton";
import { useAppState } from "../state/AppStateContext";
import { useSimulatedLoading } from "../lib/useSimulatedLoading";
import { features } from "../data/features";
import type { CategoryShortcutId, Recommendation } from "../types";

const categories: { id: CategoryShortcutId; label: string; to: string }[] = [
  { id: "saving", label: "Saving", to: "/discover/whats-new?category=saving" },
  { id: "cards", label: "Cards", to: "/discover/whats-new?category=cards" },
  { id: "payments", label: "Payments", to: "/discover/whats-new?category=payments" },
  { id: "transfers", label: "Transfers", to: "/discover/whats-new?category=transfers" },
  { id: "travel", label: "Travel", to: "/discover/offers?category=travel" },
  { id: "shopping", label: "Shopping", to: "/discover/offers?category=shopping" },
  { id: "food", label: "Food", to: "/discover/offers?category=food" },
];

export function DiscoverHome() {
  const navigate = useNavigate();
  const {
    recommendations,
    offers,
    dismissRecommendation,
    recentlyDismissedRecommendationId,
    activateOffer,
    recentlyActivatedOfferId,
  } = useAppState();
  const [whyRecommendation, setWhyRecommendation] = useState<Recommendation | null>(null);
  const loading = useSimulatedLoading();

  const active = useMemo(
    () => recommendations.filter((rec) => rec.status !== "dismissed").sort((a, b) => a.priority - b.priority),
    [recommendations],
  );
  const hero = active.find((rec) => rec.metadata.emphasis === "hero");
  const remaining = active.filter((rec) => rec.id !== hero?.id);
  const fallbackPrimary = hero ? undefined : remaining[0];
  const secondary = hero ? remaining[0] : remaining[1];

  const homeFeatures = features.filter((feature) =>
    ["feat-international-transfers", "feat-virtual-card", "feat-card-controls"].includes(feature.id),
  );

  const homeOffers = offers
    .filter((offer) => offer.recommended && offer.status === "available")
    .slice(0, 3);

  const popularOffer = offers.find((offer) => offer.id === "offer-booking");

  return (
    <div className="pb-8">
      <DiscoverHeader title="Discover" subtitle="More ways to get value from your bank" />
      <SegmentedNavigation />

      {loading ? (
        <DiscoverHomeSkeleton />
      ) : (
      <div className="flex flex-col gap-7 px-4">
        <section aria-label="For you" className="flex flex-col gap-3">
          {hero ? (
            <PersonalizedHeroCard
              recommendation={hero}
              onOpen={() => navigate(`/discover/recommendation/${hero.id}`)}
              onWhy={() => setWhyRecommendation(hero)}
            />
          ) : fallbackPrimary ? (
            <RecommendationCard
              recommendation={fallbackPrimary}
              onOpen={() => navigate(`/discover/recommendation/${fallbackPrimary.id}`)}
              onDismiss={() => dismissRecommendation(fallbackPrimary.id)}
              onWhy={() => setWhyRecommendation(fallbackPrimary)}
            />
          ) : (
            <EmptyState
              icon={Sparkles}
              title="You're all caught up"
              description="We'll show new recommendations here when we find something that may be useful to you."
            />
          )}
          {secondary ? (
            <RecommendationCard
              recommendation={secondary}
              onOpen={() => navigate(`/discover/recommendation/${secondary.id}`)}
              onDismiss={() => dismissRecommendation(secondary.id)}
              onWhy={() => setWhyRecommendation(secondary)}
            />
          ) : null}
          {recentlyDismissedRecommendationId ? (
            <p role="status" className="text-[12.5px] text-(--color-ink-muted)">
              Recommendation dismissed. You can adjust this anytime in For You.
            </p>
          ) : null}
        </section>

        <section aria-label="What's new" className="flex flex-col gap-3">
          <SectionHeader
            title="What's new"
            action={{ label: "See all", onClick: () => navigate("/discover/whats-new") }}
          />
          <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {homeFeatures.map((feature) => (
              <FeatureStoryCard
                key={feature.id}
                feature={feature}
                onOpen={() => navigate(`/discover/feature/${feature.id}`)}
              />
            ))}
          </div>
        </section>

        <section aria-label="Offers" className="flex flex-col gap-3">
          <SectionHeader
            title="Offers you might like"
            action={{ label: "See all", onClick: () => navigate("/discover/offers") }}
          />
          <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {homeOffers.map((offer) => (
              <div key={offer.id} className="w-[270px] shrink-0">
                <MerchantOfferCard
                  offer={offer}
                  justActivated={recentlyActivatedOfferId === offer.id}
                  onOpen={() => navigate(`/discover/offer/${offer.id}`)}
                  onActivate={() => activateOffer(offer.id)}
                />
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Explore categories" className="flex flex-col gap-3">
          <SectionHeader title="Explore by category" />
          <div className="-mx-4 flex gap-4 overflow-x-auto no-scrollbar px-4 pb-1">
            {categories.map((category) => (
              <CategoryShortcut
                key={category.id}
                id={category.id}
                label={category.label}
                onClick={() => navigate(category.to)}
              />
            ))}
          </div>
        </section>

        <section aria-label="Popular right now" className="flex flex-col gap-3">
          <SectionHeader title="Popular right now" />
          <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            <PopularCard
              icon={TrendingUp}
              tag="Popular capability"
              title="Spending Insights"
              description="See a monthly breakdown of where your money goes."
              ctaLabel="View insights"
              onClick={() => navigate("/discover/feature/feat-spending-insights")}
            />
            {popularOffer ? (
              <PopularCard
                icon={Landmark}
                tag="Top offer"
                title={`${popularOffer.merchant} · ${popularOffer.benefitValue}`}
                description={popularOffer.condition}
                ctaLabel="View offer"
                onClick={() => navigate(`/discover/offer/${popularOffer.id}`)}
              />
            ) : null}
            <PopularCard
              icon={Sparkles}
              tag="Trending"
              title="Savings Goal"
              description="Customers are setting targets for trips and big purchases."
              ctaLabel="Create a goal"
              onClick={() => navigate("/discover/feature/feat-savings-goal")}
            />
          </div>
        </section>
      </div>
      )}

      <RecommendationWhySheet
        recommendation={whyRecommendation}
        onClose={() => setWhyRecommendation(null)}
      />
    </div>
  );
}
