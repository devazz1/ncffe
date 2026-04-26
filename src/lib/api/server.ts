import { env } from "@/lib/env";

/**
 * Server-side `fetch` for RSC / ISR (see `getCategories`, `getCategoryBySlug`, etc.).
 *
 * Do **not** add per-request headers such as `x-request-id` here. Next.js includes
 * request headers in the Data Cache key for `fetch`; a unique ID on every call
 * creates a cache miss every time and breaks ISR/revalidate behavior for dynamic
 * routes like `/[slug]`. Client-side API calls (`api/client.ts`) still send
 * `x-request-id` for correlation with backend logs.
 */

type FetchOptions = {
  revalidate?: number;
};

export class ServerHttpError extends Error {
  status: number;
  path: string;

  constructor(status: number, path: string) {
    super(`Server fetch failed: ${status} ${path}`);
    this.name = "ServerHttpError";
    this.status = status;
    this.path = path;
  }
}

export async function serverGet<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = `${env.apiBaseUrl}${path}`;
  const response = await fetch(url, {
    next: options.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (!response.ok) {
    throw new ServerHttpError(response.status, path);
  }

  return (await response.json()) as T;
}
