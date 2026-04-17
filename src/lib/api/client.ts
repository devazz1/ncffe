import axios from "axios";
import { env } from "@/lib/env";
import { generateFrontendRequestId } from "@/lib/request-id";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let onUnauthorized: (() => void) | null = null;

/** Register once from app root (e.g. Providers). Clears session on any API 401. */
export function setApiUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

apiClient.interceptors.request.use((config) => {
  config.headers.set("x-request-id", generateFrontendRequestId());
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error);
    }
    onUnauthorized?.();
    return Promise.reject(error);
  },
);

export function setApiAccessToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}
