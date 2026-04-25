# Stories — API Contract

## Base URL

| Environment | URL pattern |
|---------------|-------------|
| Local (default) | `http://localhost:3000/api` |
| Production | `https://<your-host>/api` |

All paths below are relative to `/api`. Interactive docs: `GET /docs` (Swagger UI), e.g. `http://localhost:3000/api/docs`.

---

## Common conventions (stories)

### Response envelope

Success responses use the app envelope:

```json
{
  "success": true,
  "data": { },
  "message": "Optional"
}
```

Failures use the standard Nest `HttpException` body (`statusCode`, `message`, `error`) — not this envelope. See [API Contract — Error handling](./API_CONTRACT.md#error-handling).


### Public routes

`GET /stories` is **public** (no `Authorization` needed).

### Pagination (list)

Query parameters (same as platform-wide; see [API Contract — Pagination](./API_CONTRACT.md#pagination)):

| Param | Type | Default | Rules |
|-------|------|---------|--------|
| `page` | integer | `1` | ≥ 1 |
| `limit` | integer | `20` | 1–100 |

Paginated success payload `data` shape:

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

# Module: Stories

**Base path:** `/stories`

**Purpose:** Admins create and manage **stories** for the public site; visitors read them without logging in.

**Story resource fields (as returned on GET, and as stored)**

| API field (camelCase) | Type | DB | Notes |
|----------------------|------|-----|--------|
| `storyId` | number | `story_id` (PK) | |
| `heroVideo` | string \| null | `hero_video` | Optional. |
| `heroPoster` | string \| null | `hero_poster` | Optional. |
| `title` | string | | Required on create. |
| `description` | string | `TEXT` | Required on create. |
| `bodyDetails` | object \| null | JSONB | Optional. Arbitrary JSON object; validate shape on the client. |
| `createdAt` | string (ISO datetime) | | |
| `updatedAt` | string (ISO datetime) | | |

List order: **`createdAt` descending** (newest first).

---

### List stories (public)

| | |
|---|---|
| **Endpoint** | `GET /stories` |
| **Description** | Paginated list of all stories. |
| **Authentication** | **Public** |

**Query params** — `page`, `limit` (see [Pagination](#pagination-list)).

**Success response** (`200`)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "storyId": 1,
        "heroVideo": "https://cdn.example.com/videos/hero.mp4",
        "heroPoster": "https://cdn.example.com/images/poster.jpg",
        "title": "Annual health camp",
        "description": "Short blurb for cards and meta.",
        "bodyDetails": {
          "sections": [
            { "type": "paragraph", "text": "…" }
          ]
        },
        "createdAt": "2025-01-15T10:00:00.000Z",
        "updatedAt": "2025-01-20T12:00:00.000Z"
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

- `heroVideo`, `heroPoster`, and `bodyDetails` may be **`null`** if omitted on create.
- `bodyDetails` is stored as **JSONB**; structure is not enforced by the API (use a consistent object shape in your front-end admin).
