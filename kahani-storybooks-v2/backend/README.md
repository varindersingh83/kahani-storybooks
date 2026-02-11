# Kahani v2 Backend

Backend service for auth, order workflow, comments, and payments.

## Setup

1. Copy root env values into `../.env.local` (already used by backend by default).
2. Install backend dependencies:

```bash
npm --prefix backend install
```

3. Create local database and run migrations:

```bash
createdb kahani_v2
npm run prisma:migrate
```

4. Start backend:

```bash
npm run dev:backend
```

## Key Endpoints

- `GET /health`
- `POST /api/orders/draft`
- `POST /api/orders/:orderId/approve` (blocked if unresolved comments exist)
- `GET /api/orders/:orderId/comments`
- `POST /api/orders/:orderId/comments`
- `POST /api/comments/:commentId/replies`
- `POST /api/comments/:commentId/resolve`
- `POST /api/comments/:commentId/reopen`
- `POST /api/admin/orders/:orderId/discounts`
- `POST /api/admin/orders/:orderId/refunds`
- `POST /api/payments/checkout-session`
- `POST /webhooks/stripe`
