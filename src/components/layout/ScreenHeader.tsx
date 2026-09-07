import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
  trailing?: ReactNode;
}

export function ScreenHeader({ title, onBack, trailing }: ScreenHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-(--color-border) bg-(--color-app-bg)/95 px-3 py-3 backdrop-blur">
      <button
        type="button"
        aria-label="Go back"
        onClick={() => (onBack ? onBack() : navigate(-1))}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-(--color-ink) press-scale hover:bg-(--color-surface-alt)"
      >
        <ArrowLeft size={20} strokeWidth={2} aria-hidden="true" />
      </button>
      {title ? (
        <h1 className="min-w-0 flex-1 truncate text-[15px] font-semibold text-(--color-ink)">
          {title}
        </h1>
      ) : (
        <div className="flex-1" />
      )}
      {trailing}
    </header>
  );
}
