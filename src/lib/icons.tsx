import {
  ArrowLeftRight,
  Clapperboard,
  Clock,
  CreditCard,
  Euro,
  Flame,
  MapPin,
  PieChart,
  PiggyBank,
  Plane,
  Percent,
  Repeat,
  Send,
  ShoppingBag,
  Sparkles,
  SlidersHorizontal,
  Star,
  Tag,
  Target,
  Utensils,
} from "lucide-react";
import type {
  CategoryShortcutId,
  FeatureUpdate,
  OfferCategory,
  RecommendationMetadata,
} from "../types";

export const recommendationIcons: Record<RecommendationMetadata["icon"], typeof PiggyBank> = {
  deposit: PiggyBank,
  autopay: Repeat,
  eur: Euro,
  favorite: Star,
  savings: Target,
};

export const featureIcons: Record<FeatureUpdate["icon"], typeof PiggyBank> = {
  transfer: ArrowLeftRight,
  "virtual-card": CreditCard,
  "card-controls": SlidersHorizontal,
  goal: Target,
  insights: PieChart,
};

export const categoryIcons: Record<CategoryShortcutId, typeof PiggyBank> = {
  saving: PiggyBank,
  cards: CreditCard,
  payments: ArrowLeftRight,
  transfers: Send,
  travel: Plane,
  shopping: ShoppingBag,
  food: Utensils,
};

export const offerCategoryIcons: Record<OfferCategory, typeof PiggyBank> = {
  "for-you": Star,
  popular: Flame,
  nearby: MapPin,
  new: Sparkles,
  "expiring-soon": Clock,
  cashback: Percent,
  discounts: Tag,
  travel: Plane,
  food: Utensils,
  shopping: ShoppingBag,
  entertainment: Clapperboard,
};
