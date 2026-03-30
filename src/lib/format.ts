export function toNumber(input: number | string) {
  if (typeof input === "number") return input;
  const parsed = Number(input);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatCurrencyINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
