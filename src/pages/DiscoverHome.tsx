import { useMemo, useState } from "react";
import { Landmark, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DiscoverHeader } from "../components/discover/DiscoverHeader";
import { SegmentedNavigation } from "../components/discover/SegmentedNavigation";
import { SectionHeader } from "../components/discover/SectionHeader";
import { BannerCard } from "../components/discover/BannerCard";
import { RecommendationWhySheet } from "../components/discover/RecommendationWhySheet";
import { OfferBannerCard } from "../components/discover/OfferBannerCard";
import { CategoryTile } from "../components/discover/CategoryTile";
import { EmptyState } from "../components/discover/EmptyState";
import { DiscoverHomeSkeleton } from "../components/discover/Skeleton";
import { useAppState } from "../state/AppStateContext";
import { useSimulatedLoading } from "../lib/useSimulatedLoading";
import { features } from "../data/features";
import { recommendationIcons, featureIcons } from "../lib/icons";
import { toneForIndex } from "../lib/palette";
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
  const forYouSlides = [hero ?? fallbackPrimary, secondary].filter(
    (rec): rec is Recommendation => Boolean(rec),
  );

  const homeFeatures = features.filter((feature) =>
    ["feat-international-transfers", "feat-virtual-card", "feat-card-controls"].includes(feature.id),
  );

  const homeOffers = offers.filter((offer) => offer.recommended).slice(0, 4);

  const popularOffer = offers.find((offer) => offer.id === "offer-booking");

  return (
    <div className="pb-8">
      <DiscoverHeader title="Discover" subtitle="More ways to get value from your bank" />
      <SegmentedNavigation />

      {loading ? (
        <DiscoverHomeSkeleton />
      ) : (
      <div className="flex flex-col gap-8 px-4">
        <section aria-label="For you" className="flex flex-col gap-3">
          <SectionHeader title="For you" />
          {forYouSlides.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="You're all caught up"
              description="We'll show new recommendations here when we find something that may be useful to you."
            />
          ) : (
            <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
              {forYouSlides.map((rec, index) => {
                const isHeroSlide = rec.metadata.emphasis === "hero";
                const isCompleted = rec.status === "completed";
                return (
                  <BannerCard
                    key={rec.id}
                    tone={toneForIndex(index)}
                    icon={recommendationIcons[rec.metadata.icon]}
                    eyebrow="For you"
                    headline={rec.headline}
                    value={isHeroSlide ? rec.value : undefined}
                    description={rec.description}
                    badge={isCompleted ? "COMPLETED" : undefined}
                    width={isHeroSlide ? "w-[82%]" : "w-[78%]"}
                    onOpen={() => navigate(`/discover/recommendation/${rec.id}`)}
                    onDismiss={isCompleted ? undefined : () => dismissRecommendation(rec.id)}
                    ctaLabel={isCompleted ? undefined : rec.ctaLabel}
                    onCta={() => navigate(`/discover/recommendation/${rec.id}`)}
                    secondaryLabel={isCompleted ? undefined : "Why am I seeing this?"}
                    onSecondary={() => setWhyRecommendation(rec)}
                  />
                );
              })}
            </div>
          )}
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
            {homeFeatures.map((feature, index) => (
              <BannerCard
                key={feature.id}
                tone={toneForIndex(index + 2)}
                icon={featureIcons[feature.icon]}
                eyebrow="What's new"
                headline={feature.headline}
                description={feature.description}
                badge={feature.isNew ? "NEW" : undefined}
                width="w-[76%]"
                onOpen={() => navigate(`/discover/feature/${feature.id}`)}
                ctaLabel={feature.ctaLabel}
                onCta={() => navigate(`/discover/feature/${feature.id}`)}
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
            {homeOffers.map((offer, index) => (
              <OfferBannerCard
                key={offer.id}
                offer={offer}
                tone={toneForIndex(index + 1)}
                justActivated={recentlyActivatedOfferId === offer.id}
                onOpen={() => navigate(`/discover/offer/${offer.id}`)}
                onActivate={() => activateOffer(offer.id)}
              />
            ))}
          </div>
        </section>

        <section aria-label="Explore categories" className="flex flex-col gap-3">
          <SectionHeader title="Explore by category" />
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <CategoryTile
                key={category.id}
                id={category.id}
                label={category.label}
                tone={toneForIndex(index)}
                onClick={() => navigate(category.to)}
              />
            ))}
          </div>
        </section>

        <section aria-label="Popular right now" className="flex flex-col gap-3">
          <SectionHeader title="Popular right now" />
          <div className="-mx-4 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            <BannerCard
              tone={toneForIndex(3)}
              icon={TrendingUp}
              eyebrow="Popular capability"
              headline="Spending Insights"
              description="See a monthly breakdown of where your money goes."
              width="w-[72%]"
              ctaLabel="View insights"
              onOpen={() => navigate("/discover/feature/feat-spending-insights")}
              onCta={() => navigate("/discover/feature/feat-spending-insights")}
            />
            {popularOffer ? (
              <BannerCard
                tone={toneForIndex(4)}
                icon={Landmark}
                eyebrow="Top offer"
                headline={`${popularOffer.merchant} · ${popularOffer.benefitValue}`}
                description={popularOffer.condition}
                width="w-[72%]"
                ctaLabel="View offer"
                onOpen={() => navigate(`/discover/offer/${popularOffer.id}`)}
                onCta={() => navigate(`/discover/offer/${popularOffer.id}`)}
              />
            ) : null}
            <BannerCard
              tone={toneForIndex(0)}
              icon={Sparkles}
              eyebrow="Trending"
              headline="Savings Goal"
              description="Customers are setting targets for trips and big purchases."
              width="w-[72%]"
              ctaLabel="Create a goal"
              onOpen={() => navigate("/discover/feature/feat-savings-goal")}
              onCta={() => navigate("/discover/feature/feat-savings-goal")}
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
