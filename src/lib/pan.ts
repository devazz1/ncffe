const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export function normalizePan(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase().slice(0, 10);
}

export function isValidPanFormat(value: string): boolean {
  return PAN_REGEX.test(normalizePan(value));
}
