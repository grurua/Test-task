import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BannerCardProps {
  tone: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  value?: string;
  description?: string;
  badge?: string;
  ctaLabel?: string;
  onCta?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  onOpen?: () => void;
  onDismiss?: () => void;
  width?: string;
}

export function BannerCard({
  tone,
  icon: Icon,
  eyebrow,
  headline,
  value,
  description,
  badge,
  ctaLabel,
  onCta,
  secondaryLabel,
  onSecondary,
  onOpen,
  onDismiss,
  width = "w-full",
}: BannerCardProps) {
  return (
    <article
      className={`relative flex ${width} shrink-0 flex-col overflow-hidden rounded-3xl p-5 text-white press-scale`}
      style={{ background: tone }}
    >
      <Icon
        size={148}
        strokeWidth={1.25}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-8 text-white/15"
      />

      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss recommendation"
          onClick={(event) => {
            event.stopPropagation();
            onDismiss();
          }}
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white press-scale"
        >
          <X size={14} aria-hidden="true" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={onOpen}
        disabled={!onOpen}
        className="relative flex flex-1 flex-col items-start text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-[11px] font-bold tracking-[0.08em] text-white/80">
            {eyebrow.toUpperCase()}
          </span>
          {badge ? (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-bold tracking-wide">
              {badge}
            </span>
          ) : null}
        </div>

        <h3 className="mt-2 text-[19px] leading-snug font-bold">{headline}</h3>
        {value ? (
          <p className="mt-1 text-[34px] leading-none font-bold">{value}</p>
        ) : null}
        {description ? (
          <p className="mt-2 text-[13px] leading-relaxed text-white/80">{description}</p>
        ) : null}
      </button>

      {ctaLabel ? (
        <div className="relative mt-4 flex flex-col items-start gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onCta?.();
            }}
            className="rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold press-scale"
            style={{ color: tone }}
          >
            {ctaLabel}
          </button>
          {secondaryLabel ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSecondary?.();
              }}
              className="text-[12.5px] font-medium text-white/75 underline underline-offset-2 press-scale"
            >
              {secondaryLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
