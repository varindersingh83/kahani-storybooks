# Render Deploy Checklist (Kahani v2)

Use this after creating services from `render.yaml`.

## 1) Backend env vars to set manually

- `FRONTEND_URL=https://<your-frontend-service>.onrender.com`
- `BACKEND_PUBLIC_URL=https://<your-backend-service>.onrender.com`
- `STRIPE_SECRET_KEY=sk_test_...`
- `GOOGLE_CLIENT_ID=...`
- `GOOGLE_CLIENT_SECRET=...`
- `ADMIN_BOOTSTRAP_EMAILS=you@example.com`
- `RESEND_API_KEY=...` (optional in staging)

Keep `STRIPE_WEBHOOK_SECRET` blank until webhook endpoint is created.

## 2) Frontend env vars to set manually

- `VITE_BACKEND_URL=https://<your-backend-service>.onrender.com`
- `BACKEND_URL=https://<your-backend-service>.onrender.com`

## 3) Stripe webhook

In Stripe test mode:

1. Add endpoint `https://<your-backend-service>.onrender.com/webhooks/stripe`
2. Subscribe:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
3. Copy signing secret and set `STRIPE_WEBHOOK_SECRET` on backend
4. Redeploy backend

## 4) Google OAuth

Add to Google Cloud OAuth app:

- Authorized redirect URI:
  - `https://<your-backend-service>.onrender.com/api/auth/google/callback`
- Authorized origin:
  - `https://<your-frontend-service>.onrender.com`

## 5) Smoke tests

- `GET https://<your-backend-service>.onrender.com/health`
- Login via Google from frontend
- Run a checkout and confirm Stripe webhook delivery is `2xx`
