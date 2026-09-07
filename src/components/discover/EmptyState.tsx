import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-(--radius-card) border border-dashed border-(--color-border-strong) bg-(--color-surface) px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-surface-alt) text-(--color-ink-secondary)">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div>
        <p className="text-[15px] font-semibold text-(--color-ink)">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-(--color-ink-secondary)">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
