# Kahani v2 Staging Setup

This guide sets up a public staging backend so Stripe webhooks can be validated end-to-end.

## 1) Choose staging URLs

- Frontend staging URL (example): `https://staging.kahanistorybooks.com`
- Backend staging URL (example): `https://api-staging.kahanistorybooks.com`

Your current production site is `https://www.kahanistorybooks.com`. Keep staging separate from production keys.

## 2) Backend environment variables (staging)

Set these on your backend host:

- `NODE_ENV=production`
- `PORT=8787` (or host-provided)
- `DATABASE_URL=<staging postgres url>`
- `BACKEND_PUBLIC_URL=https://api-staging.kahanistorybooks.com`
- `FRONTEND_URL=https://staging.kahanistorybooks.com`
- `FRONTEND_URLS=<optional comma-separated origins>`
- `GOOGLE_CLIENT_ID=<staging google oauth client id>`
- `GOOGLE_CLIENT_SECRET=<staging google oauth secret>`
- `AUTH_SESSION_SECRET=<long random secret, 32+ chars>`
- `ADMIN_BOOTSTRAP_EMAILS=<comma-separated admin emails>`
- `STRIPE_SECRET_KEY=<staging/test stripe secret>`
- `STRIPE_WEBHOOK_SECRET=<set after Stripe endpoint is created>`
- `RESEND_API_KEY=<optional for staging email tests>`

## 3) Database migration on staging

Run on backend deploy:

```bash
npm --prefix backend install
npm --prefix backend run build
npm --prefix backend run prisma:deploy
```

## 4) Stripe webhook (staging)

In Stripe Dashboard (test mode):

1. Add endpoint: `https://api-staging.kahanistorybooks.com/webhooks/stripe`
2. Subscribe events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
3. Copy signing secret (`whsec_...`) into backend env as `STRIPE_WEBHOOK_SECRET`

## 5) Google OAuth config (staging)

In Google Cloud OAuth client settings, add:

- Authorized redirect URI:
  - `https://api-staging.kahanistorybooks.com/api/auth/google/callback`
- Authorized JavaScript origins:
  - `https://staging.kahanistorybooks.com`
  - `https://www.kahanistorybooks.com` (if same client is reused)

## 6) Frontend env (Vercel staging project or preview env)

Set:

- `VITE_BACKEND_URL=https://api-staging.kahanistorybooks.com`
- `BACKEND_URL=https://api-staging.kahanistorybooks.com`

## 7) Smoke checks

- `GET https://api-staging.kahanistorybooks.com/health` should return healthy JSON
- Stripe webhook delivery should show `2xx` in Stripe logs
- Checkout from staging frontend should:
  - create `PAYMENT_PENDING` order
  - transition to `PAID` on webhook
  - set preview unlock
