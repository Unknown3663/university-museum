# Exhibits API Route

## Endpoint

`GET /api/exhibits`

## Features

- ✅ Fetches only published exhibits
- ✅ Category filtering
- ✅ Full-text search (title & description)
- ✅ Multiple sorting options
- ✅ Server-side pagination
- ✅ Fresh data (no caching)
- ✅ Structured error handling

## Query Parameters

| Parameter | Type   | Default  | Description                                       |
| --------- | ------ | -------- | ------------------------------------------------- |
| category  | string | -        | Filter by category (e.g., "Art", "History")       |
| search    | string | -        | Search in title or description (case-insensitive) |
| sort      | string | "newest" | Sort order: "newest", "oldest", "az", "za"        |
| page      | number | 1        | Page number (starts at 1)                         |
| limit     | number | 6        | Items per page (max 100)                          |

## Response Format

```json
{
  "exhibits": [
    {
      "id": "uuid",
      "title": "Ancient Artifacts",
      "description": "Collection from...",
      "category": "History",
      "image_url": "https://...",
      "published": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 6,
    "total": 24,
    "totalPages": 4,
    "hasMore": true
  }
}
```

## Usage Examples

### Basic - Get all published exhibits

```javascript
const res = await fetch("/api/exhibits");
const data = await res.json();
```

### Filter by category

```javascript
const res = await fetch("/api/exhibits?category=Art");
const data = await res.json();
```

### Search exhibits

```javascript
const res = await fetch("/api/exhibits?search=ancient");
const data = await res.json();
```

### Sort alphabetically

```javascript
const res = await fetch("/api/exhibits?sort=az");
const data = await res.json();
```

### Pagination

```javascript
const res = await fetch("/api/exhibits?page=2&limit=12");
const data = await res.json();
```

### Combined filters

```javascript
const res = await fetch(
  "/api/exhibits?category=History&search=ancient&sort=newest&page=1&limit=6"
);
const data = await res.json();
```

## Error Responses

### 400 - Bad Request

```json
{
  "error": "Invalid pagination parameters"
}
```

### 500 - Server Error

```json
{
  "error": "Failed to fetch exhibits",
  "message": "Detailed error message"
}
```

## Notes

- All exhibits returned are `published: true`
- Search is case-insensitive and matches both title and description
- Pagination starts at page 1
- Maximum limit per page is 100
- Fresh data is always returned (no caching)
