import { ArrowLeftRight, Receipt, Repeat, Send } from "lucide-react";

const actions = [
  { icon: Send, label: "Transfer money" },
  { icon: Receipt, label: "Pay a bill" },
  { icon: Repeat, label: "Scheduled payments" },
  { icon: ArrowLeftRight, label: "Currency exchange" },
];

export function Payments() {
  return (
    <div className="flex flex-col gap-5 px-4 pt-5 pb-8">
      <h1 className="text-[24px] font-bold tracking-tight text-(--color-ink)">Payments</h1>
      <div className="flex flex-col gap-3">
        {actions.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3.5 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-surface-alt) text-(--color-brand)">
              <Icon size={19} aria-hidden="true" />
            </span>
            <span className="text-[14.5px] font-semibold text-(--color-ink)">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
