export function formatGel(amount: number): string {
  const rounded = Math.round(amount);
  return `₾${rounded.toLocaleString("en-US")}`;
}

export function formatSignedGel(amount: number): string {
  const sign = amount > 0 ? "+" : amount < 0 ? "−" : "";
  return `${sign}${formatGel(Math.abs(amount))}`;
}
