/** Rich media block for campaign storytelling (CMS/API later). */
export type CampaignAboutItem = {
  videoUrl?: string | null;
  imageUrl?: string | null;
  heading?: string | null;
  description?: string | null;
};

export type CampaignFaqEntry = {
  question: string;
  answer: string;
};

/** Placeholder until About content is driven by category or CMS. */
export const ABOUT_CAMPAIGN_DUMMY: CampaignAboutItem[] = [
  {
    videoUrl:
      "https://cdnncf.imglily.com/campaign/1/Screen-Recording-2026-02-08-134552-a13efa01.mp4",
    imageUrl:
      "https://cdnncf.imglily.com/sample-img-kid-25ffed3e0.webp",
    heading: "No One Sleeps Hungry",
    description:
      "Stories of families and individuals who received nutritious meals, dignity, and hope during their most difficult times.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1469571486292-0ba58bef3c36?auto=format&fit=crop&w=1600&q=80",
    heading: "Community at the centre",
    description:
      "Local partners and volunteers help us reach neighbourhoods where support matters most.",
  },
];

/** Placeholder until FAQs come from the API or CMS. */
export const CAMPAIGN_FAQ_DUMMY: CampaignFaqEntry[] = [
  {
    question: "How can I Donate For this Project ?",
    answer:
      "Nand Care Foundation works closely with children aged 3–18 years who face challenging life circumstances. This includes children from economically weaker families, differently abled children, disaster-affected children, abandoned and street children, as well as those living in tribal regions, remote villages, and hard-to-reach areas. Through a holistic and child-centric approach, the foundation strives to create a safe, supportive, and enabling environment where every child can learn, grow, and thrive.",
  },
  {
    question: "Is my donation eligible for tax benefits under 80G?",
    answer:
      "Indian taxpayers can request an 80G receipt where applicable. During checkout, select the option for an 80G receipt and provide your PAN and correspondence address so we can issue the certificate.",
  },
  {
    question: "How will I know my donation reached the programme?",
    answer:
      "You will receive an acknowledgement email after payment. Our team publishes periodic impact summaries on this site and associated channels so supporters can see how funds are used.",
  },
  {
    question: "Can I donate if I live outside India?",
    answer:
      "International card payments may be supported depending on our payment partner and campaign rules. If your card is declined, please contact support with your location and we will suggest alternatives where possible.",
  },
  {
    question: "Who can I contact if I need help with my donation?",
    answer:
      "Write to our support desk from the email you used at checkout, or use the contact details listed on the About page. Include your transaction reference if you have one so we can assist quickly.",
  },
];

/** Placeholder until copy is driven by category or CMS. */
export type HowWeWorkStep = {
  title: string;
  description: string;
};

export const HOW_WE_WORK_DUMMY: HowWeWorkStep[] = [
  {
    title: "Identify Community Needs",
    description:
      "We study local challenges to focus on the most urgent issues.",
  },
  {
    title: "Design Impactful Programs",
    description:
      "We create targeted initiatives for education, livelihood, hunger relief, and elderly care.",
  },
  {
    title: "Deliver Support on Ground",
    description:
      "Our team and volunteers ensure help reaches the right people.",
  },
  {
    title: "Measure & Improve Impact",
    description:
      "We track results to improve effectiveness and transparency.",
  },
];

/** Trusted inline SVG from your API/CMS (same-origin / sanitized upstream). */
export type CampaignImpactStat = {
  value: string;
  label: string;
  /** Raw `<svg>...</svg>` markup; optional when the API omits or uses another shape later. */
  iconSvg?: string | null;
};

/** Inline icons for local demo (Lucide-aligned paths); replace with API `iconSvg` when live. */
const IMPACT_ICON_EDUCATION = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7c01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`;

const IMPACT_ICON_OUTCOME = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ff7c01" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;

/** Placeholder until impact metrics are driven by category or CMS. */
export const IMPACT_DUMMY: CampaignImpactStat[] = [
  {
    value: "2,500+",
    label: "People trained in job skill",
    iconSvg: IMPACT_ICON_EDUCATION,
  },
  {
    value: "1,200+",
    label: "families now financially independent",
    iconSvg: null,
  },
  {
    value: "80%",
    label: "beneficiaries earning sustainable income",
    iconSvg: IMPACT_ICON_OUTCOME,
  },
];
