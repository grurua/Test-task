import { CreditCard, PiggyBank, Target, TrendingUp } from "lucide-react";

const products = [
  {
    icon: TrendingUp,
    title: "Deposits",
    description: "Fixed-term deposits with competitive rates.",
  },
  { icon: PiggyBank, title: "Savings", description: "Flexible savings accounts and goals." },
  { icon: CreditCard, title: "Cards", description: "Debit, credit and virtual cards." },
  { icon: Target, title: "Loans", description: "Personal and consumer loans." },
];

export function Products() {
  return (
    <div className="flex flex-col gap-5 px-4 pt-5 pb-8">
      <h1 className="text-[24px] font-bold tracking-tight text-(--color-ink)">Products</h1>
      <div className="flex flex-col gap-3">
        {products.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-center gap-3.5 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-surface-alt) text-(--color-brand)">
              <Icon size={19} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-semibold text-(--color-ink)">{title}</span>
              <span className="block text-[12.5px] text-(--color-ink-secondary)">
                {description}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
