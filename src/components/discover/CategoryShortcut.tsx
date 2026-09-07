import { categoryIcons } from "../../lib/icons";
import type { CategoryShortcutId } from "../../types";

interface CategoryShortcutProps {
  id: CategoryShortcutId;
  label: string;
  onClick: () => void;
}

export function CategoryShortcut({ id, label, onClick }: CategoryShortcutProps) {
  const Icon = categoryIcons[id];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-16 shrink-0 flex-col items-center gap-1.5 press-scale"
    >
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface) text-(--color-brand)">
        <Icon size={20} aria-hidden="true" />
      </span>
      <span className="text-[11.5px] font-medium text-(--color-ink-secondary)">{label}</span>
    </button>
  );
}
