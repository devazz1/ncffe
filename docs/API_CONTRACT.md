# NGO Donation Platform — API Contract

Frontend-oriented reference for the NestJS REST API. **Scope:** endpoints explicitly included in the current contract (see [Out of scope](#out-of-scope)).

---

## Base URL

| Environment | URL pattern |
|-------------|-------------|
| Local (default port `5151`) | `http://localhost:5151/api` |
| Production | `https://<your-host>/api` |

All paths below are relative to `/api`.

**Interactive docs:** `GET /docs` (Swagger UI), e.g. `http://localhost:5151/api/docs`.

---

## Authentication

### JWT (Bearer)

Most routes are protected by a global JWT guard. Send:

```http
Authorization: Bearer <accessToken>
```

Obtain `accessToken` from **`POST /auth/otp/verify`** with `purpose: "login"` or `"register"`.

JWT payload (for reference; do not decode for security decisions on the client):

- `sub` — user id  
- `email`  
- `role` — e.g. `donor`, `admin`, `super_admin`  
- `donorId` — optional, when user is linked to a donor  

### Public routes

Routes marked **Public** skip JWT. All others in this document require a valid JWT unless labeled Public.

### Admin

Not used by any endpoint in **this** contract. Documented for consistency: `admin` / `super_admin` roles exist for other modules. (admin dashboard website; a separate stand-alone platform; we are not building admin dashboard; our only focus is to build end user platform.)

---

## Common response format

Successful responses use the app envelope:

```json
{
  "success": true,
  "data": { },
  "message": "Optional human-readable message"
}
```

- `data` may be `null` on some admin-style responses (not in this contract’s list).  
- `message` is optional; some endpoints always set it.

Failure responses from Nest **do not** use this envelope by default (see [Error handling](#error-handling)).

---

## Error handling

### HTTP exceptions (4xx / 5xx)

Typical Nest `HttpException` body:

```json
{
  "statusCode": 400,
  "message": "No account found for this email. Please register first.",
  "error": "Bad Request"
}
```

- `message` is sometimes a **string**, sometimes an **array of strings** (validation).  
- `error` is a short label (e.g. `Bad Request`, `Not Found`, `Conflict`).

**Common status codes in this API**

| Code | Meaning |
|------|---------|
| `400` | Bad request, business rule violation, invalid OTP, donation not payable, etc. |
| `404` | Resource not found (category, campaign, donation, user, …) |
| `409` | Conflict (e.g. slug exists) — rare in the scoped endpoints |
| `401` | Missing or invalid JWT (protected routes) |

### Validation (`400`)

`ValidationPipe` is global (`whitelist`, `forbidNonWhitelisted`, `transform`). Unknown query/body keys may be rejected.

Example:

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "purpose must be one of the following values: login, register, verify_email"
  ],
  "error": "Bad Request"
}
```

---

## Pagination

Query parameters (when supported):

| Param | Type | Default | Rules |
|-------|------|---------|--------|
| `page` | integer | `1` | ≥ 1 |
| `limit` | integer | `20` | 1–100 |

Paginated **success** payload shape inside `data`:

```json
{
  "items": [ ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

---

## Out of scope

The following modules are listed for navigation but **have no endpoints in this contract**: **Donors** (standalone CRUD), **Webhooks**, **Certificates**. **Campaign products** (catalog) are covered only via **`GET /campaigns/:id/products`** under Campaigns.

Additional routes exist in the codebase (e.g. list campaigns, admin mutations); integrate from Swagger or a future revision of this doc if needed.

---

# Module: Auth

Base path: `/auth`

---

### Request OTP

| | |
|---|---|
| **Endpoint** | `POST /auth/otp/request` |
| **Description** | Sends a one-time passcode to the user’s email for login, registration, or email verification. |
| **Authentication** | **Public** |

**Request body (JSON)**

```json
{
  "email": "donor@example.com",
  "purpose": "login"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|--------|
| `email` | string (email) | yes | Normalized to lowercase server-side |
| `purpose` | string (enum) | yes | `login` \| `register` \| `verify_email` |

**Purpose rules**

- `login` — user **must** already exist; otherwise `400`.  
- `register` — user **must not** exist; otherwise `400`.  
- `verify_email` — no existence check in this step (per current service logic).

**Success response** (`200`, envelope)

```json
{
  "success": true,
  "data": {
    "message": "OTP sent to your email"
  },
  "message": "OTP sent to your email"
}
```

**Error examples**

```json
{
  "statusCode": 400,
  "message": "No account found for this email. Please register first.",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "An account already exists for this email. Please log in.",
  "error": "Bad Request"
}
```

**Notes** 
- OTP length = 6. 
- OTP expiry = 5 Minutes. 
- OTP Max Attempts = 5. 
- configure it through env.

---

### Verify OTP

| | |
|---|---|
| **Endpoint** | `POST /auth/otp/verify` |
| **Description** | Validates the OTP for a given `purpose` and completes the flow: email verification only, or login/register with JWT + user payload. |
| **Authentication** | **Public** |

**Request body (JSON)**

```json
{
  "email": "donor@example.com",
  "purpose": "login" | "register" | "verify_email",
  "code": "123456",
  "fullName": "Jane Donor",
  "phone": "+919876543210"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|--------|
| `email` | string (email) | yes | |
| `purpose` | string (enum) | yes | `login` | `register` | `verify_email` |
| `code` | string | yes | Length 6 (OTP) |
| `fullName` | string | optional | Recommended for `register` (1–255 chars if sent) |
| `phone` | string | optional | `+` optional; 10–15 digits |

**Success — `purpose` was `verify_email`**

```json
{
  "success": true,
  "data": {
    "verified": true,
    "message": "Email verified"
  }
}
```

**Success — `purpose` was `login` or `register`**

```json
{
  "success": true,
  "data": {
    "accessToken": "<jwt>",
    "user": {
      "userId": 1,
      "email": "donor@example.com",
      "phone": "+919876543210",
      "fullName": "Jane Donor",
      "address": "123 Street, City",
      "pan": "ABCDE1234F"
    }
  }
}
```

| Field | Notes |
|-------|--------|
| `userId`, `email`, `phone` | From the user row (`phone` may be `null`). |
| `fullName`, `address`, `pan` | From the linked donor when it exists; otherwise `null`. |


**Error examples**

```json
{
  "statusCode": 400,
  "message": "Invalid or expired OTP",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "OTP has expired",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "Too many attempts. Request a new OTP.",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "Invalid OTP",
  "error": "Bad Request"
}
```

**Notes**

- The **latest unused** OTP for `email + purpose` is checked; attempts increment on wrong code.  
- For **`register`**, if `fullName` / `phone` are omitted, the server derives defaults (see service: name from email local-part; phone optional).  
- For safety purpose, for **`register`** make `fullName` and `phone` required fields on the frontend
- Store `accessToken` securely; use it as Bearer token for protected routes.
- we might switch to httponly token so make it flexible to change over time

---

# Module: Users

Base path: `/users`

---

### Get current user profile

| | |
|---|---|
| **Endpoint** | `GET /users/me` |
| **Description** | Returns a flat profile for the authenticated user (same shape as `user` after OTP login). |
| **Authentication** | **JWT** |

**Query params** — none.

**Success response** (`200`)

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "email": "donor@example.com",
    "phone": "+919876543210",
    "fullName": "Jane Donor",
    "address": "123 Street, City",
    "pan": "ABCDE1234F"
  }
}
```

`phone`, `fullName`, `address`, and `pan` come from the linked donor when present; otherwise `null`.

**Error examples**

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

**Notes**

- Requires valid JWT; same guard as rest of app.

---

### Update current user profile

| | |
|---|---|
| **Endpoint** | `PATCH /users/me` |
| **Description** | Updates authenticated user profile fields. |
| **Authentication** | **JWT** |

**Request body (JSON)**

```json
{
  "fullName": "Jane Donor",
  "phone": "+919876543210",
  "address": "123 Street, City",
  "pan": "ABCDE1234F"
}
```

All fields are optional. Validation:

- `fullName`, `phone`, `address`, `pan` are strings if provided.
- `email` cannot be changed via this endpoint (omit it).

**Success response** (`200`)

Same flat `data` shape as `GET /users/me` (see above).

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "email": "jane@example.com",
    "phone": "+919876543210",
    "fullName": "Jane Donor",
    "address": "123 Street, City",
    "pan": "ABCDE1234F"
  },
  "message": "Profile updated"
}
```

**Error examples**

```json
{
  "statusCode": 404,
  "message": "User has no linked donor",
  "error": "Not Found"
}
```

---

### Get current user donation statistics

| | |
|---|---|
| **Endpoint** | `GET /users/me/statistics` |
| **Description** | Returns aggregate donation statistics for the authenticated user. |
| **Authentication** | **JWT** |

**Query params** — none.

**Computation scope**

**Success response** (`200`)

```json
{
  "success": true,
  "data": {
    "successDonationCount": 12,
    "totalAmountDonated": "12500.50",
    "campaignsSupportedCount": 4
  }
}
```

**Field details**

- `successDonationCount`: count of successful donations for the linked donor.
- `totalAmountDonated`: sum of successful donation amounts, returned as string to preserve decimal precision.
- `campaignsSupportedCount`: count of distinct `campaignId` across successful donations.

---

### Get current user donations (paginated)

| | |
|---|---|
| **Endpoint** | `GET /users/me/donations` |
| **Description** | Returns paginated **successful** donations for the authenticated user's linked donor, with a trimmed donation shape. |
| **Authentication** | **JWT** |

**Scope**

- `donorId` comes from authenticated user context (`@CurrentUser()`), not from client input.
- Only rows with `status = "success"` are included.

**Query params**

| Param | Type | Default | Rules |
|-------|------|---------|-------|
| `page` | integer | `1` | >= 1 |
| `limit` | integer | `20` | 1-100 |

**Success response** (`200`)

Items are ordered by donation **`createdAt` descending** (most recent first).

Each item includes: `donationId`, `amount` (string, decimal), `currency`, `isMonthly`, `is80GRequested`, `updatedAt`, and nested `campaign`: `{ name, slug }`.

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "donationId": 10,
        "amount": "50000.00",
        "currency": "INR",
        "isMonthly": false,
        "is80GRequested": true,
        "updatedAt": "2025-01-15T10:30:00.000Z",
        "campaign": {
          "name": "School drive",
          "slug": "school-drive"
        }
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
}
```

---

# Module: Certificates

Base path: `/certificates`

Responses are **raw PDF** (`Content-Type: application/pdf`), not the standard `{ success, data }` JSON envelope. Use `Authorization: Bearer <token>`.

---

### Download 80G certificate for one donation

| | |
|---|---|
| **Endpoint** | `GET /certificates/80g/donation/:donationId` |
| **Description** | Streams a PDF certificate for a single **successful** donation where **80G was requested** at donation time. |
| **Authentication** | **JWT** |

**Path params**

| Param | Type | Description |
|-------|------|-------------|
| `donationId` | integer | Donation primary key |

**Authorization rules**

- **`donor` role:** May download only if `donation.donorId` matches the authenticated user’s linked `donorId`.
- **`admin` / `super_admin`:** May download for any donor’s donation (subject to eligibility below).

**Eligibility (server)**

- Donation must exist with `status = "success"`.
- Donation must have `is80GRequested = true` (otherwise certificate is not generated).

**Success** (`200`)

- Headers: `Content-Type: application/pdf`, `Content-Disposition: attachment; filename="80G-<donationId>.pdf"`.
- Body: PDF bytes.

**Error responses (JSON)**

| Status | When |
|--------|------|
| `401` | Missing or invalid JWT. |
| `403` | `donor` user attempted to download another donor’s donation. Example body: `{ "success": false, "message": "You can only download certificates for your own donations" }`. |
| `404` | Donation not found, not successful, or 80G was not requested for that donation (message from server, e.g. `Donation not found or not successful` or `Certificate not requested`). |


---

# Module: Categories

Base path: `/categories`

---

### List categories (paginated)

| | |
|---|---|
| **Endpoint** | `GET /categories` |
| **Description** | Lists categories with optional nested **active** campaign summary and success-donation stats for that campaign. |
| **Authentication** | **Public** |

**Query params**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `limit` | integer | `20` | Page size (max 100) |

**Success response** (`200`)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "categoryId": 1,
        "name": "Education",
        "slug": "education",
        "description": "…",
        "displayOrder": 0,
        "heroVideo": "https://cdn.example.com/campaign/1/Screen-Recording-2026-02-08-134552-18f5cb04.mp4",
        "heroPoster": "https://cdn.example.com/sample-img-kid-25ffed3e.webp",
        "bodyDetails": null,
        "activeCampaignId": 10,
        "activeCampaign": {
          "campaignId": 10,
          "categoryId": 1,
          "name": "School drive",
          "slug": "school-drive",
          "description": "…",
          "goalAmount": "100000",
          "startDate": "2025-01-01T00:00:00.000Z",
          "endDate": null,
          "allowDonationBeforeStart": false,
          "allowDonationAfterEnd": false,
          "campaignStatus": "published",
          "heroVideo": null,
          "heroPoster": null,
          "bodyDetails": null,
          "successDonations": {
            "count": 42,
            "totalAmount": "50000"
          }
        }
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
}
```

**Notes**

- `activeCampaign` can be `null` if no active campaign is set.  
- Decimal/numeric fields from Prisma may appear as **strings** in JSON (e.g. `goalAmount`, `totalAmount`). Parse as needed.
- `bodyDetails` (category and nested `activeCampaign`): **JSON object or `null`** (Prisma `Json?` / JSONB). Shape is application-defined;

---

### Get category by slug

| | |
|---|---|
| **Endpoint** | `GET /categories/slug/:slug` |
| **Description** | Same payload shape as get-by-id, keyed by URL slug. |
| **Authentication** | **Public** |

**Path params**

| Param | Description |
|-------|-------------|
| `slug` | Category slug (e.g. `education`) |

**Success response** (`200`) — same category object as in list item (single object in `data`, not wrapped in `items`).

```json
{
  "success": true,
  "data": {
    "categoryId": 1,
    "name": "Health",
    "slug": "health",
    "description": "Health and medical support campaigns",
    "displayOrder": 1,
    "heroVideo": null,
    "heroPoster": null,
    "bodyDetails": null,
    "activeCampaignId": 1,
    "activeCampaign": {
      "campaignId": 1,
      "categoryId": 1,
      "name": "General Health Fund 2025",
      "slug": "health-general-2025",
      "description": "Support general health initiatives",
      "goalAmount": "1000000",
      "startDate": "2025-01-01T00:00:00.000Z",
      "endDate": "2025-12-31T00:00:00.000Z",
      "allowDonationBeforeStart": false,
      "allowDonationAfterEnd": false,
      "campaignStatus": "published",
      "heroVideo": null,
      "heroPoster": null,
      "bodyDetails": null,
      "successDonations": {
        "count": 8,
        "totalAmount": "16521"
      }
    }
  }
}
```

**Error examples**

```json
{
  "statusCode": 404,
  "message": "Category not found",
  "error": "Not Found"
}
```

**Notes**

- Route is defined **before** `GET /categories/:id` so `slug` is not parsed as an integer id.

---

### Get category by ID

| | |
|---|---|
| **Endpoint** | `GET /categories/:id` |
| **Description** | Single category with active campaign + `successDonations` stats. |
| **Authentication** | **Public** |

**Path params**

| Param | Type | Description |
|-------|------|-------------|
| `id` | integer | Category id |

**Success response** (`200`) — `data` is one category object (same shape as category by slug).

**Error examples**

```json
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 404,
  "message": "Category not found",
  "error": "Not Found"
}
```

---

# Module: Campaigns

Base path: `/campaigns`

---

### Get campaign by ID

| | |
|---|---|
| **Endpoint** | `GET /campaigns/:id` |
| **Description** | Public campaign details plus aggregated successful donation count and total amount. |
| **Authentication** | **Public** |

**Path params**

| Param | Type | Description |
|-------|------|-------------|
| `id` | integer | Campaign id |

**Success response** (`200`)

```json
{
  "success": true,
  "data": {
    "campaignId": 10,
    "categoryId": 1,
    "name": "School drive",
    "slug": "school-drive",
    "description": "…",
    "allowMonthly": true,
    "allowForeignDonation": false,
    "goalAmount": "100000",
    "startDate": "2025-01-01T00:00:00.000Z",
    "endDate": null,
    "allowDonationBeforeStart": false,
    "allowDonationAfterEnd": false,
    "campaignStatus": "published",
    "heroVideo": null,
    "heroPoster": null,
    "bodyDetails": null,
    "successDonations": {
      "count": 42,
      "totalAmount": "50000"
    }
  }
}
```

**Error examples**

```json
{
  "statusCode": 404,
  "message": "Campaign not found",
  "error": "Not Found"
}
```

**Notes**

- `campaignStatus`: `draft` \| `published` \| `paused` \| `archived`.  
- **Donations** are only accepted when status is **`published`** (see Donations module).

---

# Module: Campaign products

Products are exposed as a sub-resource of a campaign (no separate base path in this contract).

---

### List active products for a campaign (public)

| | |
|---|---|
| **Endpoint** | `GET /campaigns/:id/products` |
| **Description** | Returns **active** catalog items. Only when campaign is **`published`** or **`paused`**; otherwise returns an empty list (not 404). |
| **Authentication** | **Public** |

**Path params**

| Param | Type | Description |
|-------|------|-------------|
| `id` | integer | Campaign id |

**Success response** (`200`)

```json
{
  "success": true,
  "data": [
    {
      "campaignProductId": 101,
      "name": "School kit",
      "unitPrice": 500,
      "targetQuantity": 100,
      "collectedQuantity": 20,
      "displayOrder": 0,
      "imageUrl": "https://…"
    }
  ]
}
```

**Empty list** — campaign exists but is `draft` / `archived`:

```json
{
  "success": true,
  "data": []
}
```

**Error examples**

```json
{
  "statusCode": 404,
  "message": "Campaign not found",
  "error": "Not Found"
}
```

**Notes**

- Use `campaignProductId` from this response directly as **`campaignProductId`** in **`POST /donations`** line items.  
- `imageUrl` may be `""` if unset.

---

# Module: Donations

Base path: `/donations`

---

### Create donation

| | |
|---|---|
| **Endpoint** | `POST /donations` |
| **Description** | Creates a **pending** donation, resolves donor by **email** (find or create), computes amount from products and/or lump sum, stores donor snapshot fields for receipts/80G. Client should then call **`POST /payments/orders`** with returned `donationId`. |
| **Authentication** | **Public** |

**Request body (JSON)**

**A) Donation with catalog products**

```json
{
  "campaignId": 10,
  "amount": 0,
  "products": [
    { "campaignProductId": 101, "quantity": 2 }
  ],
  "currency": "INR",
  "isMonthly": false,
  "displayPublicly": false,
  "fullName": "Jane Donor",
  "email": "jane@example.com",
  "phone": "+919876543210",
  "isIndian": true,
  "is80GRequested": false
}
```

**B) Lump-sum only (no `products`)**

```json
{
  "campaignId": 10,
  "amount": 1000,
  "fullName": "Jane Donor",
  "email": "jane@example.com",
  "phone": "+919876543210"
}
```

**C) Donation via category’s active campaign**
**Note** 
avoid this case; we will always have `campaignId` (e.g., `activeCampaignId` from the category response). So we will always use `campaignId` and avoid donating through `categoryId`. 

```json
{
  "categoryId": 1,
  "amount": 500,
  "fullName": "Jane Donor",
  "email": "jane@example.com",
  "phone": "+919876543210"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|--------|
| `campaignId` | integer | conditional | Use **either** `campaignId` **or** `categoryId` |
| `categoryId` | integer | conditional | Resolves to category’s **active** campaign; category must have one configured |
| `amount` | number | conditional | With `products`: optional extra on top (default `0`). **Without** `products`: required, **> 0** |
| `products` | array | optional | `{ campaignProductId, quantity }`; quantities ≥ 1; products must belong to campaign and be **active** |
| `currency` | string | optional | Default `INR` |
| `isMonthly` | boolean | optional | Default `false`; campaign must allow monthly |
| `displayPublicly` | boolean | optional | Default `false` |
| `fullName` | string | yes | Trimmed; snapshot on donation |
| `email` | string | yes | Normalized; donor lookup key |
| `phone` | string | yes | 10–15 digits, optional leading `+` |
| `isIndian` | boolean | optional | Default `true` |
| `is80GRequested` | boolean | optional | Default `false` |
| `pan` | string | conditional | Required if `is80GRequested: true` |
| `address` | string | conditional | Required if `is80GRequested: true` |

**Success response** (`200` — controller does not set `201`)

Envelope with donation + relations (illustrative):

```json
{
  "success": true,
  "data": {
    "donationId": 500,
    "donorId": 2,
    "campaignId": 10,
    "amount": "1500",
    "currency": "INR",
    "isMonthly": false,
    "displayPublicly": false,
    "status": "pending",
    "receiptNumber": "RCP-…",
    "donorNameAtTime": "Jane Donor",
    "donorEmailAtTime": "jane@example.com",
    "donorPhoneAtTime": "+919876543210",
    "isIndian": true,
    "is80GRequested": false,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "campaign": { "name": "School drive", "slug": "school-drive" },
    "productAllocations": [
      {
        "donationProductAllocationId": 1,
        "donationId": 500,
        "campaignProductId": 101,
        "quantity": 2,
        "unitPriceAtTime": "500",
        "totalAmount": "1000",
        "campaignProduct": { "name": "School kit", "unitPrice": "500" }
      }
    ]
  },
  "message": "Donation created. Proceed to payment."
}
```

**Error examples**

```json
{
  "statusCode": 400,
  "message": "Either campaignId or categoryId is required",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "Campaign is not published and cannot accept donations",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "This category has no active campaign set. Cannot accept donations by category.",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 404,
  "message": "Campaign not found",
  "error": "Not Found"
}
```

```json
{
  "statusCode": 400,
  "message": "Product 999 not found, not in this campaign, or inactive",
  "error": "Bad Request"
}
```

**Notes**

- Final amount = sum(product lines × unit price) + (`amount` or 0 when products present). 
- Final amount will be calculated at backend. From frontend we need to pass products and `amount` (additional amount for donation).
- we get `receiptNumber` in response. it is important and will be used in donation status api
- Next step: **`POST /payments/orders`** with `donationId`. after creating donation we need to create order and then need to proceed for checkout

---

### Check donation status

**Note**
We can use this donation payment status for Thank-you and Sorry pages.

| | |
|---|---|
| **Endpoint** | `GET /donations/status` |
| **Description** | Returns donation `status` (`pending` / `success` / `failed`) for a donation identified by `receipt`. |
| **Authentication** | **Public** |

**Query parameters**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `receipt` | string | yes | Example: `RCP-<timestamp>-<random6>` |

**Success response** (`200`)

```json
{
  "success": true,
  "data": {
    "status": "success"
  }
}
```

**Error examples**

```json
{
  "statusCode": 400,
  "message": "receipt is required",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "Invalid receipt format",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 404,
  "message": "Donation not found for this receipt",
  "error": "Not Found"
}
```

---

# Module: Payments

Base path: `/payments`

---

### Top donations by amount (public)

| | |
|---|---|
| **Endpoint** | `GET /donations/top` |
| **Description** | Returns up to **seven** donations with the **largest** `amount` values (successful donations only), ordered **high to low**. Each item exposes only **`name`** and **`amount`** (sanitized). |
| **Authentication** | **Public** |

**Query parameters**

None.

**Success response** (`200`)

Standard envelope. `data` shape:

```json
{
  "success": true,
  "data": {
    "items": [
      { "name": "Jane Donor", "amount": "50000" },
      { "name": "Anonymous", "amount": "10000" }
    ]
  }
}
```

| Field | Type | Notes |
|-------|------|--------|
| `data.items` | array | Length ≤ 7; **may be empty** if there are no successful donations yet; otherwise shorter than 7 when fewer than seven successful rows exist. |
| `items[].name` | string |  name string of user whow donated  |
| `items[].amount` | string | Decimal donation amount as a **string** (e.g. `"50000.00"` or `"50000"` depending on scale). Matches the stored `donations.amount` value. Currency is not repeated per row; it is the same currency stored on each donation row (typically **`INR`**). |

**Error responses**

None specific to this route; invalid paths fall through to normal Nest **404** handling. This endpoint does not return **400** for missing query params (there are none).




### Create payment order

| | |
|---|---|
| **Endpoint** | `POST /payments/orders` |
| **Description** | Creates or reuses a gateway order for a **pending** donation. Returns ids and **`amount` in smallest currency unit** (e.g. paise for INR) plus **`keyId`** for the client SDK. |
| **Authentication** | **Public** |

**Request body (JSON)**

```json
{
  "donationId": 500
}
```

| Field | Type | Required |
|-------|------|----------|
| `donationId` | integer (≥ 1) | yes |

**Success response** (`200`)

```json
{
  "success": true,
  "data": {
    "paymentOrderId": 99,
    "gatewayOrderId": "order_xxx",
    "gateway": "razorpay",
    "amount": 150000,
    "currency": "INR",
    "keyId": "rzp_test_xxx"
  },
  "message": "Order created. Use gatewayOrderId and keyId on frontend."
}
```

**Error examples**

```json
{
  "statusCode": 404,
  "message": "Donation not found",
  "error": "Not Found"
}
```

```json
{
  "statusCode": 400,
  "message": "Donation is not payable",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "Amount too small",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 400,
  "message": "Razorpay is not configured",
  "error": "Bad Request"
}
```

**Notes**

- **`amount`** is in **minor units** (e.g. paise). Match your gateway’s checkout API.  
- If an order already exists for the same donation + gateway with status `created`, the API returns that order (same shape) instead of creating a duplicate.  
- Default gateway comes from server config (`payment.defaultGateway`, e.g. `razorpay`).

---

# Module: Webhooks

No endpoints documented in this contract. Used by payment providers server-to-server (e.g. signature verification with raw body).

---

## Quick reference (this contract)

| Method | Path | Auth |
|--------|------|------|
| `POST` | `/auth/otp/request` | Public |
| `POST` | `/auth/otp/verify` | Public |
| `GET` | `/users/me` | JWT |
| `PATCH` | `/users/me` | JWT |
| `GET` | `/categories` | Public |
| `GET` | `/categories/slug/:slug` | Public |
| `GET` | `/categories/:id` | Public |
| `GET` | `/campaigns/:id` | Public |
| `GET` | `/campaigns/:id/products` | Public |
| `POST` | `/donations` | Public |
| `GET` | `/donations/status` | Public |
| `POST` | `/payments/orders` | Public |

---

*Generated from the NestJS codebase. Prefer Swagger at `/api/docs` for exhaustive schemas when this contract lags the implementation.*
