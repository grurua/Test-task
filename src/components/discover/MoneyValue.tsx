import { formatGel, formatSignedGel } from "../../lib/format";

interface MoneyValueProps {
  amount: number;
  signed?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "ink" | "positive" | "muted";
  className?: string;
}

const sizeClasses: Record<NonNullable<MoneyValueProps["size"]>, string> = {
  sm: "text-[13px] font-semibold",
  md: "text-[17px] font-semibold",
  lg: "text-[28px] font-bold tracking-tight",
  xl: "text-[40px] font-bold tracking-tight",
};

const toneClasses: Record<NonNullable<MoneyValueProps["tone"]>, string> = {
  ink: "text-(--color-ink)",
  positive: "text-(--color-positive)",
  muted: "text-(--color-ink-secondary)",
};

export function MoneyValue({
  amount,
  signed = false,
  size = "md",
  tone = "ink",
  className = "",
}: MoneyValueProps) {
  return (
    <span className={`${sizeClasses[size]} ${toneClasses[tone]} ${className}`}>
      {signed ? formatSignedGel(amount) : formatGel(amount)}
    </span>
  );
}
