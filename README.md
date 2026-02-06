
## Kahani Storybooks – Marketing Site & Landing Experience

This repo contains the marketing / e‑commerce landing experience for **Kahani Storybooks** – personalized children’s storybooks and gift sets.  
It is a **React + Vite** single‑page app with animated sections, a simple cart, and a dedicated FAQ page.

The original visual design comes from a Figma exploration:  
`https://www.figma.com/design/dlPOK5rvjp5bq6yNXtgztX/Landing-Page-Design`

---

### Tech Stack

- **Build tool**: Vite
- **UI library**: React 18
- **Styling**: Tailwind CSS 4 + custom theme files
- **Animations**: `motion` (Framer Motion v5 API)
- **Icons**: `lucide-react`
- **Routing**: `react-router-dom` (hash router)
- **UI primitives**: Radix‑based components (Shadcn‑style) in `src/app/components/ui`

---

### Getting Started

- **Install dependencies**

  ```bash
  npm install
  ```

- **Run the dev server**

  ```bash
  npm run dev
  ```

- **Build for production**

  ```bash
  npm run build
  ```

Vite will print the local dev URL and port in the terminal.

---

### Project Structure (high level)

- `src/main.tsx` – App bootstrap and Vite entry.
- `src/app/App.tsx` – Main application shell:
  - Sets up the React Router (hash router).
  - Provides `CartContext` for cart state.
  - Renders the primary landing page sections (hero, features, products, etc.).
- `src/app/pages/FAQs.tsx` – Standalone FAQ page with animated accordion.
- `src/app/pages/Landing.tsx` – Placeholder component; the real landing content currently lives in `App.tsx`.
- `src/app/components/ui/*` – Reusable UI primitives (buttons, cards, dialogs, etc.).
- `src/app/components/figma/ImageWithFallback.tsx` – Image helper with graceful fallback.
- `src/styles/*` – Tailwind, fonts, and theme configuration.

For more implementation details (routing, state management, components, and styling), see `context.md`.

  