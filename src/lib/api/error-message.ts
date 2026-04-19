import axios from "axios";

/** Prefer API `message` from JSON body; otherwise fall back to Error.message. */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err) && err.response?.data && typeof err.response.data === "object") {
    const m = (err.response.data as { message?: unknown }).message;
    if (typeof m === "string" && m.trim()) return m;
    if (Array.isArray(m) && m.every((x) => typeof x === "string"))
      return m.join(" ");
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
