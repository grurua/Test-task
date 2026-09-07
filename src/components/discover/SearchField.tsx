import { Search, X } from "lucide-react";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchField({ value, onChange, placeholder }: SearchFieldProps) {
  return (
    <div className="flex items-center gap-2 rounded-(--radius-control) border border-(--color-border) bg-(--color-surface) px-3 py-2.5">
      <Search size={18} className="shrink-0 text-(--color-ink-muted)" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? "Search"}
        aria-label={placeholder ?? "Search"}
        className="min-w-0 flex-1 bg-transparent text-[14px] text-(--color-ink) placeholder:text-(--color-ink-muted) focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-surface-alt) text-(--color-ink-secondary) press-scale"
        >
          <X size={14} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
