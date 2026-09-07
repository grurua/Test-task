// Core domain types for the Discover experience.
// Data is intentionally kept separate from presentation components.

export interface CustomerProfile {
  firstName: string;
  currentAccountBalance: number;
  averageSixMonthBalance: number;
  unusedStableAmount: number;
  eurTransactionsLastMonth: number;
  electricityBillMonthsPaidManually: number;
  transfersToFavorite: {
    name: string;
    count: number;
    periodMonths: number;
  };
  recentTravelCountries: string[];
  unusedFeatures: string[];
}

export type RecommendationCategory =
  | "save-money"
  | "save-time"
  | "cards"
  | "transfers";

export type RecommendationType =
  | "deposit"
  | "autopay"
  | "eur-account"
  | "favorite-recipient"
  | "savings";

export type RecommendationStatus = "active" | "dismissed" | "completed";

export interface RecommendationMetadata {
  icon: "deposit" | "autopay" | "eur" | "favorite" | "savings";
  accent: "primary" | "neutral";
  emphasis: "hero" | "standard" | "compact";
}

export interface RecommendationComparison {
  currentLabel: string;
  currentAmount: number;
  currentTerm: string;
  currentReturn: number;
  proposedLabel: string;
  proposedAmount: number;
  proposedTerm: string;
  proposedReturn: number;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  category: RecommendationCategory;
  headline: string;
  description: string;
  value?: string;
  supportingText?: string;
  calculationNote?: string;
  reason: string;
  ctaLabel: string;
  secondaryLabel?: string;
  priority: number;
  status: RecommendationStatus;
  metadata: RecommendationMetadata;
  comparison?: RecommendationComparison;
}

export type FeatureCategory =
  | "featured"
  | "new"
  | "cards"
  | "payments"
  | "transfers"
  | "saving";

export interface FeatureDetail {
  whatItDoes: string;
  whyUseful: string;
  benefits: string[];
}

export interface FeatureUpdate {
  id: string;
  category: FeatureCategory;
  title: string;
  headline: string;
  benefit: string;
  description: string;
  isNew: boolean;
  ctaLabel: string;
  icon: "transfer" | "virtual-card" | "card-controls" | "goal" | "insights";
  detail: FeatureDetail;
}

export type OfferCategory =
  | "for-you"
  | "popular"
  | "nearby"
  | "new"
  | "expiring-soon"
  | "cashback"
  | "discounts"
  | "travel"
  | "food"
  | "shopping"
  | "entertainment";

export type OfferStatus = "available" | "activated" | "used" | "expired";

export type BenefitType = "cashback" | "discount";

export interface MerchantOffer {
  id: string;
  merchant: string;
  merchantInitial: string;
  tone: "dark" | "warm" | "cool" | "green";
  categories: OfferCategory[];
  benefitType: BenefitType;
  benefitValue: string;
  maxBenefit?: string;
  condition: string;
  expiresLabel: string;
  expiresDate: string;
  status: OfferStatus;
  featured: boolean;
  recommended: boolean;
  eligibleCards: string[];
  howItWorks: string[];
}

export type CategoryShortcutId =
  | "saving"
  | "cards"
  | "payments"
  | "transfers"
  | "travel"
  | "shopping"
  | "food";
