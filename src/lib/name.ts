const NAME_REGEX = /^[\p{L}\s.'-]+$/u;

export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function isValidNameFormat(value: string): boolean {
  const normalized = normalizeName(value);
  if (normalized.length < 2 || normalized.length > 100) return false;
  return NAME_REGEX.test(normalized);
}