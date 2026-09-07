import { useState } from "react";
import { Check, PackageOpen } from "lucide-react";
import { useParams } from "react-router-dom";
import { ScreenHeader } from "../components/layout/ScreenHeader";
import { EmptyState } from "../components/discover/EmptyState";
import { featureIcons } from "../lib/icons";
import { features } from "../data/features";

export function FeatureDetail() {
  const { id } = useParams<{ id: string }>();
  const feature = features.find((item) => item.id === id);
  const [activated, setActivated] = useState(false);

  if (!feature) {
    return (
      <div className="flex h-full flex-col">
        <ScreenHeader />
        <div className="px-4 py-6">
          <EmptyState
            icon={PackageOpen}
            title="Feature not found"
            description="This feature is no longer available."
          />
        </div>
      </div>
    );
  }

  const Icon = featureIcons[feature.icon];
  const isVirtualCard = feature.icon === "virtual-card";

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader />
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {isVirtualCard ? (
          <div className="mx-auto flex h-44 w-full max-w-[300px] flex-col justify-between rounded-2xl bg-(--color-brand-strong) p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold tracking-wide">Virtual Card</span>
              <Icon size={20} aria-hidden="true" />
            </div>
            <div className="flex gap-2 text-[15px] tracking-[0.15em]">
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span>4821</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-white/70">
              <span>Online use only</span>
              <span>VIRTUAL</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-(--color-surface-alt) text-(--color-brand)">
            <Icon size={36} aria-hidden="true" />
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-2">
          {feature.isNew ? (
            <span className="rounded-full bg-(--color-brand-soft) px-2.5 py-0.5 text-[10.5px] font-bold tracking-wide text-(--color-brand)">
              NEW
            </span>
          ) : null}
        </div>
        <h1 className="mt-2 text-center text-[21px] font-bold tracking-tight text-(--color-ink)">
          {feature.headline}
        </h1>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <p className="text-[13px] font-semibold text-(--color-ink)">What it does</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-(--color-ink-secondary)">
              {feature.detail.whatItDoes}
            </p>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-(--color-ink)">Why it may be useful</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-(--color-ink-secondary)">
              {feature.detail.whyUseful}
            </p>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-(--color-ink)">Key benefits</p>
            <ul className="mt-2 flex flex-col gap-2">
              {feature.detail.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-[13.5px] leading-relaxed text-(--color-ink-secondary)"
                >
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-(--color-positive)"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7">
          {activated ? (
            <div className="flex items-center justify-center gap-2 rounded-(--radius-control) bg-(--color-positive-soft) py-3.5 text-[14.5px] font-semibold text-(--color-positive)">
              <Check size={17} aria-hidden="true" />
              {isVirtualCard ? "Virtual card created" : "Done"}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setActivated(true)}
              className="w-full rounded-(--radius-control) bg-(--color-brand) py-3.5 text-[14.5px] font-semibold text-white press-scale"
            >
              {feature.ctaLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
