import { parsePhoneNumberFromString } from "libphonenumber-js";

const DEFAULT_COUNTRY = "IN";

export function normalizePhone(value: string): string {
  return value.trim();
}

export function isValidPhoneFormat(value: string): boolean {
  const normalized = normalizePhone(value);
  if (!normalized) return false;

  const parsedPhone = parsePhoneNumberFromString(normalized, DEFAULT_COUNTRY);
  return Boolean(parsedPhone?.isValid());
}

export function formatPhoneForApi(value: string): string {
  const normalized = normalizePhone(value);
  const parsedPhone = parsePhoneNumberFromString(normalized, DEFAULT_COUNTRY);
  return parsedPhone?.isValid() ? parsedPhone.number : normalized;
}
