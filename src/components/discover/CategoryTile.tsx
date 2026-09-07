import { categoryIcons } from "../../lib/icons";
import type { CategoryShortcutId } from "../../types";

interface CategoryTileProps {
  id: CategoryShortcutId;
  label: string;
  tone: string;
  onClick: () => void;
}

export function CategoryTile({ id, label, tone, onClick }: CategoryTileProps) {
  const Icon = categoryIcons[id];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[104px] flex-col justify-between rounded-2xl border border-(--color-border) bg-(--color-surface) p-3.5 text-left press-scale"
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${tone}1f`, color: tone }}
      >
        <Icon size={19} aria-hidden="true" />
      </span>
      <span className="text-[13.5px] font-semibold text-(--color-ink)">{label}</span>
    </button>
  );
}
