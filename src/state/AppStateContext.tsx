import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { recommendations as baseRecommendations } from "../data/recommendations";
import { offers as baseOffers } from "../data/offers";
import type {
  MerchantOffer,
  Recommendation,
  RecommendationStatus,
  RecommendationType,
} from "../types";

interface AppStateValue {
  recommendations: Recommendation[];
  offers: MerchantOffer[];
  dismissRecommendation: (id: string) => void;
  completeRecommendation: (id: string) => void;
  optOutRecommendationType: (type: RecommendationType) => void;
  activateOffer: (id: string) => void;
  toggleFavoriteOffer: (id: string) => void;
  isFavoriteOffer: (id: string) => boolean;
  getRecommendation: (id: string) => Recommendation | undefined;
  getOffer: (id: string) => MerchantOffer | undefined;
  recentlyActivatedOfferId: string | null;
  recentlyDismissedRecommendationId: string | null;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, RecommendationStatus>
  >({});
  const [optedOutTypes, setOptedOutTypes] = useState<Set<RecommendationType>>(
    new Set(),
  );
  const [offerStatusOverrides, setOfferStatusOverrides] = useState<
    Record<string, MerchantOffer["status"]>
  >({});
  const [recentlyActivatedOfferId, setRecentlyActivatedOfferId] = useState<
    string | null
  >(null);
  const [recentlyDismissedRecommendationId, setRecentlyDismissedRecommendationId] =
    useState<string | null>(null);
  const [favoriteOfferIds, setFavoriteOfferIds] = useState<Set<string>>(new Set());

  const recommendations = useMemo<Recommendation[]>(() => {
    return baseRecommendations.map((rec) => {
      if (optedOutTypes.has(rec.type)) {
        return { ...rec, status: "dismissed" as const };
      }
      const override = statusOverrides[rec.id];
      return override ? { ...rec, status: override } : rec;
    });
  }, [statusOverrides, optedOutTypes]);

  const offers = useMemo<MerchantOffer[]>(() => {
    return baseOffers.map((offer) => {
      const override = offerStatusOverrides[offer.id];
      return override ? { ...offer, status: override } : offer;
    });
  }, [offerStatusOverrides]);

  const dismissRecommendation = useCallback((id: string) => {
    setStatusOverrides((prev) => ({ ...prev, [id]: "dismissed" }));
    setRecentlyDismissedRecommendationId(id);
    window.setTimeout(() => {
      setRecentlyDismissedRecommendationId((current) =>
        current === id ? null : current,
      );
    }, 2400);
  }, []);

  const completeRecommendation = useCallback((id: string) => {
    setStatusOverrides((prev) => ({ ...prev, [id]: "completed" }));
  }, []);

  const optOutRecommendationType = useCallback((type: RecommendationType) => {
    setOptedOutTypes((prev) => new Set(prev).add(type));
  }, []);

  const activateOffer = useCallback((id: string) => {
    setOfferStatusOverrides((prev) => ({ ...prev, [id]: "activated" }));
    setRecentlyActivatedOfferId(id);
    window.setTimeout(() => {
      setRecentlyActivatedOfferId((current) => (current === id ? null : current));
    }, 2400);
  }, []);

  const toggleFavoriteOffer = useCallback((id: string) => {
    setFavoriteOfferIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFavoriteOffer = useCallback(
    (id: string) => favoriteOfferIds.has(id),
    [favoriteOfferIds],
  );

  const getRecommendation = useCallback(
    (id: string) => recommendations.find((rec) => rec.id === id),
    [recommendations],
  );

  const getOffer = useCallback(
    (id: string) => offers.find((offer) => offer.id === id),
    [offers],
  );

  const value: AppStateValue = {
    recommendations,
    offers,
    dismissRecommendation,
    completeRecommendation,
    optOutRecommendationType,
    activateOffer,
    toggleFavoriteOffer,
    isFavoriteOffer,
    getRecommendation,
    getOffer,
    recentlyActivatedOfferId,
    recentlyDismissedRecommendationId,
  };

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
