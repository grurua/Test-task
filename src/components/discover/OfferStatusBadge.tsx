import { CheckCircle2, CircleSlash, History } from "lucide-react";
import type { OfferStatus } from "../../types";

interface OfferStatusBadgeProps {
  status: OfferStatus;
}

const config: Record<
  Exclude<OfferStatus, "available">,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  activated: {
    label: "Activated",
    icon: CheckCircle2,
    className: "bg-(--color-positive-soft) text-(--color-positive)",
  },
  used: {
    label: "Used",
    icon: History,
    className: "bg-(--color-surface-alt) text-(--color-ink-secondary)",
  },
  expired: {
    label: "Expired",
    icon: CircleSlash,
    className: "bg-(--color-surface-alt) text-(--color-ink-muted)",
  },
};

export function OfferStatusBadge({ status }: OfferStatusBadgeProps) {
  if (status === "available") return null;
  const { label, icon: Icon, className } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${className}`}
    >
      <Icon size={13} aria-hidden="true" />
      {label}
    </span>
  );
}
