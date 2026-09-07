import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  subtitle?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  action,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h2 className="text-[17px] font-semibold tracking-tight text-(--color-ink)">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 text-[13px] text-(--color-ink-secondary)">{subtitle}</p>
        ) : null}
      </div>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="shrink-0 rounded-full px-2 py-1 text-[13px] font-semibold text-(--color-brand) press-scale hover:bg-(--color-surface-alt)"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
