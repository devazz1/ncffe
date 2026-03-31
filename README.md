# NGO Frontend Bootstrap

Production-grade bootstrap for the public NGO website using Next.js App Router.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- Zustand

## Setup

1. Copy env:

```bash
cp .env.example .env.local
```

2. Install and run:

```bash
npm install
npm run dev
```

## Implemented routes

- `/` - Home (ISR)
- `/[slug]` - Category page (ISR)
- `/about` - Static
- `/stories` - Static
- `/dashboard` - CSR guarded by login modal
- `/donations/status?receipt=...` - CSR status page with auto retry + manual recheck

## API request correlation

Client-side API calls (Axios) send `x-request-id` as `fe-<uuid>` for Nest/Pino correlation. Server-side `fetch` used for ISR **does not** set that header, because Next.js would treat each request as a distinct cache key and break Data Cache / revalidate for routes like `/[slug]`.

## Notes

- **Donation / payment UX** is specified in the repo root `Frontend-technical-doc.md` section **Payment UX spec (Razorpay Checkout)**.
- Flow: `POST /donations` → `POST /payments/orders` → open **Razorpay Checkout** (browser `checkout.js` popup) using `keyId` + `gatewayOrderId` + `amount` + `currency` from the API → then navigate to `/donations/status?receipt=...`. Razorpay **order creation** stays on Nest; the Next app does not use the Razorpay server SDK for orders.
- If the Razorpay checkout script fails to load, the app shows an error and does not navigate; otherwise closing the popup routes the user to `/donations/status?receipt=...`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
