
  # Kahani

  This is a code bundle for Kahani. The original project is available at https://www.figma.com/design/uAC1FqIhRxK5y7AGqJ0vBs/Kahani.

  ## Running the code

  Run `npm i` to install the dependencies.

  **For development with Slack notifications:**
  
  You need to run TWO servers:
  1. **Vite dev server** (frontend) - `npm run dev`
  2. **API server** (for Slack notifications) - `npm run dev:server`
  
  **Option 1: Run both together (recommended):**
  ```bash
  npm run dev:all
  ```
  
  **Option 2: Run separately in two terminals:**
  ```bash
  # Terminal 1
  npm run dev:server
  
  # Terminal 2
  npm run dev
  ```
  
  The API server runs on `http://localhost:3001` and the frontend on `http://localhost:3000`.

  ## Slack Order Notifications

  The app is configured to send order notifications to Slack when customers complete checkout.

  ### Setup Instructions:

  1. **Create a Slack App:**
     - Go to https://api.slack.com/apps
     - Click "Create New App" → "From scratch"
     - Name it (e.g., "Kahani Orders") and select your workspace
     - Click "Create App"

  2. **Enable Incoming Webhooks:**
     - In your app settings, go to "Incoming Webhooks"
     - Toggle "Activate Incoming Webhooks" to ON
     - Click "Add New Webhook to Workspace"
     - Select the channel where you want to receive notifications (e.g., #orders)
     - Click "Allow"
     - Copy the Webhook URL (starts with `https://hooks.slack.com/services/...`)

  3. **Configure Environment Variable:**
     - Create a `.env.local` file in the project root (if it doesn't exist)
     - Add your Slack webhook URL:
       ```
       VITE_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
       ```
     - Replace `YOUR/WEBHOOK/URL` with your actual webhook URL

  4. **Start Development Servers:**
     - The app requires TWO servers to run (to avoid CORS issues):
       - Frontend (Vite): `npm run dev` → http://localhost:3000
       - API Server: `npm run dev:server` → http://localhost:3001
     - **Easiest way:** Run both together with `npm run dev:all`
     - Or run them separately in two terminal windows

  ### Testing:

  When a customer completes checkout, you'll receive a formatted Slack message with:
  - Order number
  - Product name and price
  - Customer name and email
  - Shipping address

  **Note:** If the webhook URL is not configured, the app will continue to work normally but won't send notifications (you'll see a warning in the console).

  ## Vercel Deployment

  This project is configured for deployment on Vercel.

  ### Environment Variables for Production:

  **Important:** For Vercel serverless functions, use `SLACK_WEBHOOK_URL` (without the `VITE_` prefix) in your Vercel dashboard:

  1. Go to your Vercel project settings
  2. Navigate to **Environment Variables**
  3. Add a new variable:
     - **Name:** `SLACK_WEBHOOK_URL`
     - **Value:** `https://hooks.slack.com/services/YOUR/WEBHOOK/URL`
     - **Environment:** Production, Preview, and Development (or as needed)
  4. Redeploy your application

  **Why?** 
  - `VITE_` prefixed variables are exposed to client-side code (not secure for webhooks)
  - Serverless functions should use non-prefixed environment variables
  - The API function will check `SLACK_WEBHOOK_URL` first, then fall back to `VITE_SLACK_WEBHOOK_URL` if needed

  ### Deployment Notes:

  - The `api/` folder contains serverless functions that Vercel will automatically deploy
  - The `server.js` file is development-only and won't be used in production
  - Vite build output goes to `dist/` which Vercel will serve
  - The frontend will automatically use `/api/slack-notify` endpoint in production
  