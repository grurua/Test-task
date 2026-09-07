import { useMemo, useState } from "react";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { MerchantOfferCard } from "../components/discover/MerchantOfferCard";
import { EmptyState } from "../components/discover/EmptyState";
import { useAppState } from "../state/AppStateContext";
import type { OfferStatus } from "../types";

const tabs: { id: Extract<OfferStatus, "activated" | "used" | "expired">; label: string }[] = [
  { id: "activated", label: "Activated" },
  { id: "used", label: "Used" },
  { id: "expired", label: "Expired" },
];

export function OfferWallet() {
  const navigate = useNavigate();
  const { offers } = useAppState();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("activated");

  const visible = useMemo(
    () => offers.filter((offer) => offer.status === activeTab),
    [offers, activeTab],
  );

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Offer Wallet" />
      <div role="tablist" aria-label="Offer wallet tabs" className="flex gap-2 px-4 py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-full py-2 text-[13px] font-semibold press-scale ${
              activeTab === tab.id
                ? "bg-(--color-brand) text-white"
                : "bg-(--color-surface-alt) text-(--color-ink-secondary)"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {visible.length === 0 ? (
          <EmptyState
            icon={Ticket}
            title={`No ${activeTab} offers`}
            description={
              activeTab === "activated"
                ? "Offers you activate will appear here."
                : activeTab === "used"
                  ? "Offers you've used will appear here."
                  : "Offers that have expired will appear here."
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {visible.map((offer) => (
              <MerchantOfferCard
                key={offer.id}
                offer={offer}
                onOpen={() => navigate(`/discover/offer/${offer.id}`)}
                onActivate={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
