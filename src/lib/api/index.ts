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
  Paginated,
  UserProfile,
} from "@/lib/types";

const FIVE_MINUTES = 300;

export async function getCategories() {
  return serverGet<ApiEnvelope<Paginated<Category>>>("/categories", {
    revalidate: FIVE_MINUTES,
  });
}

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
