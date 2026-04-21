export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type AuthPurpose = "login" | "register" | "verify_email";

export type UserProfile = {
  userId: number;
  email: string;
  phone: string | null;
  fullName: string | null;
  address: string | null;
  pan: string | null;
};

export type CampaignProduct = {
  campaignProductId: number;
  name: string;
  unitPrice: number | string;
  targetQuantity: number;
  collectedQuantity: number;
  displayOrder: number;
  imageUrl: string;
};

export type CampaignSuccessDonations = {
  count: number;
  totalAmount: string;
};

// category/campaign body details
export type BodyAboutItem = {
  videoUrl?: string | null;
  imageUrl?: string | null;
  heading?: string | null;
  description?: string | null;
};

export type BodyImpactItem = {
  value: string;
  label: string;
  iconSvg?: string | null;
};

export type BodyHowWeWorkItem = {
  title: string;
  description: string;
};

export type BodyFaqItem = {
  question: string;
  answer: string;
};

export type BodyDetails = {
  about: ReadonlyArray<BodyAboutItem>;
  impact: ReadonlyArray<BodyImpactItem>;
  howWeWork: ReadonlyArray<BodyHowWeWorkItem>;
  faq: ReadonlyArray<BodyFaqItem>;
};
// ... //

export type CampaignSummary = {
  campaignId: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string | null;
  goalAmount: string;
  startDate: string;
  endDate: string | null;
  allowDonationBeforeStart: boolean;
  allowDonationAfterEnd: boolean;
  campaignStatus: "draft" | "published" | "paused" | "archived";
  heroVideo: string | null;
  heroPoster: string | null;
  bodyDetails: BodyDetails | null;
  successDonations: CampaignSuccessDonations;
  allowMonthly?: boolean;
  allowForeignDonation?: boolean;
};

export type Category = {
  categoryId: number;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
  heroVideo: string | null;
  heroPoster: string | null;
  bodyDetails: BodyDetails | null;
  activeCampaignId: number | null;
  activeCampaign: CampaignSummary | null;
};

export type Paginated<T> = {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type DonationStatus = "pending" | "success" | "failed";

export type DonationStatusResponse = {
  status: DonationStatus;
};

export type DonationProductInput = {
  campaignProductId: number;
  quantity: number;
};

export type CreateDonationPayload = {
  campaignId: number;
  amount: number;
  products?: DonationProductInput[];
  currency?: string;
  isMonthly?: boolean;
  displayPublicly?: boolean;
  fullName: string;
  email: string;
  phone: string;
  isIndian?: boolean;
  is80GRequested?: boolean;
  pan?: string;
  address?: string;
};

export type CreateDonationResponse = {
  donationId: number;
  receiptNumber: string;
  amount: string;
  currency: string;
  status: DonationStatus;
};

export type CreatePaymentOrderResponse = {
  paymentOrderId: number;
  gatewayOrderId: string;
  gateway: string;
  amount: number;
  currency: string;
  keyId: string;
};

export type TopDonationItem = {
  name: string;
  amount: string;
};

export type TopDonationsData = {
  items: TopDonationItem[];
};

export type UserDonationStatistics = {
  successDonationCount: number;
  totalAmountDonated: string;
  campaignsSupportedCount: number;
};

export type MyDonationListItem = {
  donationId: number;
  amount: string;
  currency: string;
  isMonthly: boolean;
  is80GRequested: boolean;
  updatedAt: string;
  campaign: {
    name: string;
    slug: string;
  };
};
