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

/** Network/DNS/TLS failures — `fetch` throws before `response.ok` (e.g. ECONNREFUSED). */
export class ServerNetworkError extends Error {
  readonly path: string;

  constructor(path: string, options?: { cause?: unknown }) {
    super(`Server fetch failed (network): ${path}`);
    this.name = "ServerNetworkError";
    this.path = path;
    if (options?.cause !== undefined) {
      this.cause = options.cause;
    }
  }
}

export async function serverGet<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = `${env.apiBaseUrl}${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      next: options.revalidate ? { revalidate: options.revalidate } : undefined,
    });
  } catch (cause) {
    throw new ServerNetworkError(path, { cause });
  }

  if (!response.ok) {
    throw new ServerHttpError(response.status, path);
  }

  return (await response.json()) as T;
}
