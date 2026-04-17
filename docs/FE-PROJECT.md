# FE-PROJECT Ground Truth

This document is the single source of truth for the frontend in `web/`.
Use it as the primary reference for development, onboarding, and AI-assisted work.

---

## 1) Purpose

- Define what the frontend is, how it is built, and how it should evolve.
- Keep implementation aligned with product goals and backend API contracts.
- Reduce drift, confusion, and hallucinations during AI-assisted development.
- Provide a fast understanding of the project without reading the entire codebase.

---

## 2) Scope

### In scope (current frontend)

- Public donation website for donors.
- Core public pages: Home, Category, About, Stories.
- Authentication via OTP modal (login/register).
- Donation flow with category -> campaign mapping.
- Razorpay checkout popup integration.
- Donation status reconciliation page.
- User dashboard area for profile + donation overview/history.

### Out of scope (for this frontend)

- Admin / super-admin dashboard and admin APIs.
- Backend internals (except required API contracts).
- Heavy UI polish/design-system maturity in this phase.

---

## 3) Product Intent and Development Phase

The project is in a functional-first phase:

- Priority order:
  1. Correct end-to-end flow
  2. Contract-safe frontend-backend integration
  3. Reliability and predictable behavior
  4. UI polish later
- UX can be lightweight as long as flows are complete and clear.
- Every new feature should preserve this order unless explicitly changed.

---

## 4) Tech Stack and Runtime

- Framework: Next.js App Router (`next@16.2.1`)
- Language: TypeScript (strict mode)
- React: `19.2.4`
- Styling: Tailwind CSS v4
- HTTP client (client side): Axios
- Server/public data fetching: Next `fetch` via `serverGet`
- Server state: TanStack Query
- Minimal global state: Zustand `persist` (`ngo-auth`)
- Forms/validation libraries available: React Hook Form + Zod
- Deployment target: Vercel (with ISR strategy)

---

## 5) Core Architecture

## 5.1 Directory model

- `web/src/app`: route files and layouts
- `web/src/components`: reusable UI/client components
- `web/src/lib/api`: API integration (`client.ts`, `server.ts`, `index.ts`)
- `web/src/lib/razorpay`: script loader + checkout opener
- `web/src/lib`: env/config/types/utilities/store helpers
- `web/src/types`: global type declarations
- `web/docs`: project documentation

## 5.2 Data fetching strategy

- Default: pre-render public content where possible.
- ISR for public content that changes.
- SSG for static informational pages.
- CSR for user/session-specific pages and workflows.
- Avoid SSR unless explicitly approved and documented here.

## 5.3 API layer split

- `serverGet` (`web/src/lib/api/server.ts`) is used for server-rendered public data.
  - Important: no per-request dynamic headers like `x-request-id` here, to avoid breaking Next data cache and ISR behavior.
- `apiClient` (`web/src/lib/api/client.ts`) is used for client-side API requests.
  - Adds `x-request-id` per request.
  - Uses shared base URL from env.
  - Supports global bearer token injection.
  - Handles global 401 session invalidation via app-registered callback.

## 5.4 Auth/session model (current)

- Access token is stored in Zustand persist store (`ngo-auth`) in localStorage.
- `Providers` syncs token to Axios default Authorization header.
- Any API 401 triggers:
  - clear auth token,
  - remove Authorization header,
  - clear TanStack Query cache.
- This keeps auth invalidation deterministic across UI.

---

## 6) Rendering and Route Matrix (Ground Truth)

| Route | Purpose | Rendering | Status |
|---|---|---|---|
| `/` | Category listing | ISR (`revalidate: 300`) | Implemented |
| `/[slug]` | Category page + donation form | ISR (`revalidate: 300`) | Implemented |
| `/about` | About NGO | SSG | Implemented |
| `/stories` | NGO stories | SSG | Implemented |
| `/donations/status` | Payment result reconciliation | CSR | Implemented |
| `/dashboard` | Redirect entry | Server redirect to `/dashboard/overview` | Implemented |
| `/dashboard/overview` | User donation overview | CSR | Implemented |
| `/dashboard/profile` | User profile edit | CSR | Implemented |

Reserved-route protection exists in dynamic category route for:

- `about`, `stories`, `dashboard`, `donations`, `api`

This prevents conflicts with top-level dynamic slug handling.

---

## 7) End-to-End Feature Flows

## 7.1 Public browsing flow

1. Home fetches categories from `GET /categories`.
2. User opens category page by slug.
3. Category page fetches:
   - `GET /categories/slug/:slug`
   - `GET /donations/top`
4. If `activeCampaignId` exists, fetch campaign products from:
   - `GET /campaigns/:id/products`

## 7.2 Authentication flow (modal based)

1. User opens auth modal from header or dashboard gate.
2. Request OTP:
   - `POST /auth/otp/request`
3. Verify OTP:
   - `POST /auth/otp/verify`
4. On success:
   - save `accessToken` to Zustand,
   - Axios auto-sync applies bearer token.

## 7.3 Donation + payment flow

1. User selects product quantities and/or additional amount.
2. Frontend validates total and required user details.
3. Create donation:
   - `POST /donations`
4. Create payment order:
   - `POST /payments/orders` with returned `donationId`
5. Open Razorpay popup using backend response fields:
   - `keyId`, `gatewayOrderId`, `amount`, `currency`
6. On popup close, navigate to:
   - `/donations/status?receipt=<receiptNumber>`
7. Final outcome depends on:
   - `GET /donations/status` result (`pending`, `success`, `failed`)

## 7.4 Donation status flow

- Reads `receipt` from query param.
- Calls `GET /donations/status`.
- Retry strategy:
  - automatic retries for fetch failures (`MAX_AUTO_RETRIES = 2`, delay `3000ms`)
  - manual recheck button available
- Missing receipt shows explicit guidance state.

## 7.5 Dashboard flow

- Dashboard route gate checks token presence.
- If not authenticated:
  - show dashboard login prompt + login modal.
- If authenticated:
  - Overview:
    - `GET /users/me/statistics`
    - `GET /users/me/donations` (paginated)
    - supports certificate download action.
  - Profile:
    - `GET /users/me`
    - `PATCH /users/me`

---

## 8) API Contract Integration (Frontend-focused)

Current integrated endpoints:

- Auth:
  - `POST /auth/otp/request`
  - `POST /auth/otp/verify`
- Users:
  - `GET /users/me`
  - `PATCH /users/me`
  - `GET /users/me/statistics`
  - `GET /users/me/donations`
- Categories/Campaign:
  - `GET /categories`
  - `GET /categories/slug/:slug`
  - `GET /campaigns/:id/products`
- Donations/Payments:
  - `GET /donations/top`
  - `POST /donations`
  - `POST /payments/orders`
  - `GET /donations/status`
- Certificates:
  - `GET /certificates/80g/donation/:donationId` (PDF blob)

Key contract rules:

- Use `campaignId` for donation creation (category donates through its `activeCampaignId`).
- Product lines must use `campaignProductId` from campaign-products response.
- Donation amount truth is backend-calculated.
- Payment order amount is minor units; use backend value directly.
- Donation status API is the source of truth for success/failed/pending.

---

## 9) Current Implementation Notes (Important)

- `withCredentials` is not enabled currently; auth transport is Bearer token.
- Env fallback API base URL is `http://localhost:5151/api` when env not set.
- Header auth UI behavior:
  - logged out: Register/Login
  - logged in: Dashboard/Logout
- Donation form includes:
  - once/monthly tabs (monthly UI present but not complete business flow),
  - product quantity controls,
  - additional amount,
  - 80G conditional PAN + address validation.
- Dashboard includes donation table with 80G certificate download action.

---

## 10) Rules for Future Development

## 10.1 Non-negotiable rules

- Keep API contract compatibility first.
- Do not add a frontend BFF/API proxy layer.
- Do not bypass this document for architectural decisions.
- Keep auth/session behavior centralized (do not duplicate token logic in components).
- Preserve rendering strategy (SSG/ISR/CSR) unless justified and documented.

## 10.2 When adding features

For every feature change:

1. Update code.
2. Update this document in the same PR/task.
3. Add/adjust endpoint mapping if API changes.
4. Mark route rendering behavior if changed.
5. Add known limitations if not fully complete.

## 10.3 How to document changes here

Always update these sections when applicable:

- Route matrix
- End-to-end flow steps
- Integrated endpoint list
- Current implementation notes
- Known gaps and planned next work

---

## 11) Definition of Done (Feature/Change)

Any feature or refactor is complete only when all are true:

- Code is aligned with API contract behavior.
- Route rendering type (SSG/ISR/CSR) is intentional and documented.
- Error states and empty states are covered in UI.
- Auth-sensitive behavior is validated for logged-in and logged-out paths.
- This document is updated for any architecture/flow/endpoint change.

---

## 12) Known Gaps / Planned Next Work

- Monthly donation flow is only partially represented in UI.
- Automated tests are still limited (manual flow validation remains primary).
- User messaging and UI polish can be improved after flow stability.
- Potential future auth transport migration to httpOnly cookie model.
- OpenAPI-driven type generation can further strengthen contract safety.

---

## 13) Operational Risks and Guardrails

- ISR cache regression risk:
  - Never add dynamic request headers in `serverGet` fetch calls.
  - Keep revalidation strategy stable for public routes.
- Session invalidation risk:
  - Do not bypass `setApiAccessToken` / `setApiUnauthorizedHandler`.
  - Avoid token handling directly in individual page components.
- Payment routing risk:
  - Never route final payment UX solely from Razorpay client handler payload.
  - Always route through `/donations/status` reconciliation.
- Contract drift risk:
  - When backend API changes, update endpoint mapping and flow sections in this file in the same task.

---

## 14) AI Agent Usage Guidance

If an AI agent is working on this frontend:

1. Read this file first.
2. Then read `API_CONTRACT.md` for endpoint-level detail.
3. Validate changes against:
   - route strategy,
   - API compatibility,
   - auth/session behavior,
   - donation status source-of-truth rule.
4. Avoid assumptions that contradict this doc.
5. If code and this doc differ, treat code as current truth and update this doc immediately.

---

## 15) Change Log

- 2026-04-17:
  - Created comprehensive frontend ground-truth document.
  - Added architecture, rendering matrix, flow mapping, API integration map, and maintenance rules.
- 2026-04-17 (review improvement pass):
  - Corrected `/dashboard` route behavior to server redirect.
  - Added feature Definition of Done checklist.
  - Added operational risks/guardrails section.
  - Added explicit changelog section for future traceability.

---

## 16) Related References

- `Frontend-Requirement-doc.md`
- `Frontend-technical-doc.md`
- `PROJECT.md`
- `API_CONTRACT.md`

---

## Last Updated

- Date: 2026-04-17
- Updated for: review pass, route accuracy fix, DoD, guardrails, and changelog.
