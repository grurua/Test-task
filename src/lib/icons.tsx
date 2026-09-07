import {
  ArrowLeftRight,
  CreditCard,
  Euro,
  PieChart,
  PiggyBank,
  Plane,
  Repeat,
  Send,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Target,
  Utensils,
} from "lucide-react";
import type { CategoryShortcutId, FeatureUpdate, RecommendationMetadata } from "../types";

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
