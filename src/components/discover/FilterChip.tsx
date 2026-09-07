interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap press-scale ${
        selected
          ? "border-(--color-brand) bg-(--color-brand-soft) text-(--color-brand)"
          : "border-(--color-border) bg-(--color-surface) text-(--color-ink-secondary)"
      }`}
    >
      {label}
    </button>
  );
}
