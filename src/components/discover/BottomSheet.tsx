import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-(--color-ink)/45 animate-[fade-in_160ms_ease]"
      />
      <div className="relative flex w-full max-w-[430px] items-end">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bottom-sheet-title"
          className="w-full rounded-t-[24px] bg-(--color-surface) px-5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,20,30,0.18)] motion-safe:animate-[sheet-up_220ms_cubic-bezier(0.22,1,0.36,1)]"
        >
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-(--color-border-strong)" />
          <div className="flex items-start justify-between gap-3">
            <h2
              id="bottom-sheet-title"
              className="text-[17px] font-semibold text-(--color-ink)"
            >
              {title}
            </h2>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-surface-alt) text-(--color-ink-secondary) press-scale"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
