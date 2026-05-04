import axios from "axios";
import { cache } from "react";
import { apiClient } from "@/lib/api/client";
import { serverGet } from "@/lib/api/server";
import type {
  ApiEnvelope,
  AuthPurpose,
  CampaignProduct,
  Category,
  CreateDonationPayload,
  CreateDonationResponse,
  CreatePaymentOrderResponse,
  DonationStatusResponse,
  MyDonationListItem,
  Paginated,
  Story,
  TopDonationsData,
  UserDonationStatistics,
  UserProfile,
} from "@/lib/types";

const ONE_MINUTE = 60;
const FIVE_MINUTES = 300;
// const ONE_HOUR = 3600;
const TWO_HOURS = 7200;
// const SIX_HOURS = 21600;

/** Dedupes within a single request; fetch uses time-based ISR (`revalidate`). */
export const getCategories = cache(async function getCategories() {
  return serverGet<ApiEnvelope<Paginated<Category>>>("/categories", {
    revalidate: FIVE_MINUTES,
  });
});

export async function getCategoryBySlug(slug: string) {
  return serverGet<ApiEnvelope<Category>>(`/categories/slug/${slug}`, {
    revalidate: FIVE_MINUTES,
  });
}

export async function getCampaignProducts(campaignId: number) {
  return serverGet<ApiEnvelope<CampaignProduct[]>>(
    `/campaigns/${campaignId}/products`,
    {
      revalidate: FIVE_MINUTES,
    },
  );
}

export async function getTopDonations() {
  return serverGet<ApiEnvelope<TopDonationsData>>("/donations/top", {
    revalidate: FIVE_MINUTES,
  });
}

export async function getStories(page = 1, limit = 20) {
  return serverGet<ApiEnvelope<Paginated<Story>>>(
    `/stories?page=${page}&limit=${limit}`,
    {
      revalidate: TWO_HOURS,
    },
  );
}

type RequestOtpPayload = {
  email: string;
  purpose: AuthPurpose;
};

export async function requestOtp(payload: RequestOtpPayload) {
  const { data } = await apiClient.post<
    ApiEnvelope<{ message: string }>
  >("/auth/otp/request", payload);
  return data;
}

type VerifyOtpPayload = {
  email: string;
  purpose: AuthPurpose;
  code: string;
  fullName?: string;
  phone?: string;
};

export async function verifyOtp(payload: VerifyOtpPayload) {
  const { data } = await apiClient.post<
    ApiEnvelope<{
      accessToken: string;
      user: UserProfile;
    }>
  >("/auth/otp/verify", payload);
  return data;
}

export async function getCurrentUser() {
  const { data } = await apiClient.get<ApiEnvelope<UserProfile>>("/users/me");
  return data;
}

export async function updateCurrentUser(payload: Partial<UserProfile>) {
  const { data } = await apiClient.patch<ApiEnvelope<UserProfile>>(
    "/users/me",
    payload,
  );
  return data;
}

export async function createDonation(payload: CreateDonationPayload) {
  const { data } = await apiClient.post<ApiEnvelope<CreateDonationResponse>>(
    "/donations",
    payload,
  );
  return data;
}

export async function createPaymentOrder(donationId: number) {
  const { data } = await apiClient.post<ApiEnvelope<CreatePaymentOrderResponse>>(
    "/payments/orders",
    {
      donationId,
    },
  );
  return data;
}

export async function getDonationStatus(receipt: string) {
  const { data } = await apiClient.get<ApiEnvelope<DonationStatusResponse>>(
    "/donations/status",
    {
      params: { receipt },
    },
  );
  return data;
}

export async function getMyDonationStatistics() {
  const { data } = await apiClient.get<ApiEnvelope<UserDonationStatistics>>(
    "/users/me/statistics",
  );
  return data;
}

export async function getMyDonations(page = 1, limit = 20) {
  const { data } = await apiClient.get<ApiEnvelope<Paginated<MyDonationListItem>>>(
    "/users/me/donations",
    {
      params: { page, limit },
    },
  );
  return data;
}

function parseContentDispositionFilename(header: string | undefined, fallback: string) {
  if (!header) return fallback;
  const utf8Match = /filename\*=UTF-8''([^;\s]+)/i.exec(header);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1].replace(/"/g, ""));
    } catch {
      return utf8Match[1];
    }
  }
  const asciiMatch = /filename="([^"]+)"/i.exec(header);
  if (asciiMatch?.[1]) return asciiMatch[1];
  const loose = /filename=([^;\s]+)/i.exec(header);
  if (loose?.[1]) return loose[1].replace(/"/g, "");
  return fallback;
}

export async function download80GCertificate(donationId: number) {
  try {
    const response = await apiClient.get<Blob>(
      `/certificates/80g/donation/${donationId}`,
      {
        responseType: "blob",
      },
    );
    const blob = response.data;
    const type = response.headers["content-type"] ?? "";
    if (type.includes("application/json")) {
      const text = await blob.text();
      let message = "Could not download certificate.";
      try {
        const parsed = JSON.parse(text) as { message?: string };
        if (typeof parsed.message === "string") message = parsed.message;
      } catch {
        /* ignore */
      }
      throw new Error(message);
    }
    const filename = parseContentDispositionFilename(
      response.headers["content-disposition"],
      `80G-${donationId}.pdf`,
    );
    return { blob, filename };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data instanceof Blob) {
      const text = await err.response.data.text();
      let message = "Could not download certificate.";
      try {
        const parsed = JSON.parse(text) as { message?: unknown };
        const m = parsed.message;
        if (typeof m === "string") message = m;
        else if (Array.isArray(m) && m.every((x) => typeof x === "string"))
          message = m.join(" ");
      } catch {
        /* ignore */
      }
      throw new Error(message);
    }
    if (axios.isAxiosError(err) && err.response?.data && typeof err.response.data === "object") {
      const d = err.response.data as { message?: string | string[] };
      const m = d.message;
      const message =
        typeof m === "string"
          ? m
          : Array.isArray(m)
            ? m.join(" ")
            : "Could not download certificate.";
      throw new Error(message);
    }
    throw err;
  }
}
