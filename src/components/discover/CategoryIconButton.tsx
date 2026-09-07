import type { LucideIcon } from "lucide-react";

interface CategoryIconButtonProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function CategoryIconButton({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="flex w-16 shrink-0 flex-col items-center gap-1.5 press-scale"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full border ${
          selected
            ? "border-(--color-brand) bg-(--color-brand-soft) text-(--color-brand)"
            : "border-(--color-border) bg-(--color-surface) text-(--color-ink-secondary)"
        }`}
      >
        <Icon size={19} aria-hidden="true" />
      </span>
      <span
        className={`text-center text-[11.5px] leading-tight font-medium ${
          selected ? "text-(--color-brand)" : "text-(--color-ink-secondary)"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
