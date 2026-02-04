## Repository Context – Kahani Storybooks Landing Experience

This document gives engineering context for how the Kahani Storybooks marketing / landing experience is put together, beyond what is covered in `README.md`.

---

### 1. Application Overview

- **Goal**: A polished, animated marketing experience where users can:
  - Browse personalized storybooks, figurines, and gift sets.
  - Add configured products to a lightweight cart.
  - Learn about Kahani via FAQs and supporting content.
- **Architecture**: Client‑side React SPA, bundled with Vite, styled with Tailwind CSS and a set of Radix‑based UI primitives.

Key entry points:

- `src/main.tsx` – Vite entry; renders the root React tree.
- `src/app/App.tsx` – Defines routing, global providers (cart context), and most of the landing experience.

---

### 2. Routing & Pages

Routing is set up using **`react-router-dom`** with a **hash router** (`createHashRouter`), which keeps URLs working even on static hosting (no server‑side route handling required).

Important routes:

- `/` – Main **landing page**:
  - Implemented as a composition of sections inside `App.tsx`.
  - Includes hero, product highlights, best sellers, trust badges, testimonials, etc.
- `/faqs` – **FAQ page** (`src/app/pages/FAQs.tsx`):
  - Contains a motion‑animated accordion of FAQ entries.
  - Linked from the landing experience (e.g. via header/footer or CTAs).
- Other routes such as `/cart` may be defined in `App.tsx` alongside the landing route; they share global providers and styling.

Note: `src/app/pages/Landing.tsx` currently exports a placeholder component. The actual landing layout and content live directly inside `App.tsx`.

---

### 3. State Management & Cart Flow

State is intentionally kept simple and colocated with UI where possible. The main shared state is the **cart**:

- **`CartContext`** in `App.tsx`:
  - Holds an array of `CartItem` objects with:
    - `id`, `title`, `image`
    - `customizations` (e.g. child name, age, pages, character)
    - `quantity`, `price`
  - Exposed operations:
    - `addToCart(item)`
    - `removeFromCart(id)`
    - `updateQuantity(id, quantity)`
    - `clearCart()`
- **`useCart` hook**:
  - Ensures components that need cart access are inside `CartProvider`.
  - Simplifies consumption in product cards, cart page, header badge, etc.

The header shows a cart icon with a badge that reflects `cartItems.length`. Product tiles and customization flows call `addToCart` with the relevant configuration.

---

### 4. Authentication UX (Login Modal)

There is no real backend authentication; instead, there is a **login / signup modal** that:

- Presents social login buttons (Google / Facebook) with simulated behavior.
- Locks body scroll and compensates for scrollbar width when open.
- Uses a React portal (`ReactDOM.createPortal`) to render at the document body level.

Components that need the user to be “logged in” (e.g. wishlist, account) currently:

- Check an `isLoggedIn` boolean.
- If false, open the `LoginModal` instead of navigating.

This keeps UX flows realistic while remaining front‑end only.

---

### 5. Animations & Motion

The project uses the **`motion`** library (Framer Motion v5 API, imported from `'motion/react'`) for:

- Scroll‑based effects via `useScroll` and `useTransform` (e.g. parallax in the hero).
- Section and component entrance animations (`initial` / `animate` props).
- Micro‑interactions on buttons, cards, and icons (`whileHover`, `whileTap`).

Patterns to follow:

- Keep animations **declarative and composable** (no manual `requestAnimationFrame`).
- Prefer subtle effects (opacity, translate, scale, rotation) over heavy motion.
- Use shared variants when animating lists of similar items.

---

### 6. Styling, Theming & UI Components

- **Tailwind CSS** is configured via:
  - `src/styles/tailwind.css` and `src/styles/index.css` for base layers and utilities.
  - `src/styles/theme.css` and `src/styles/fonts.css` for theme tokens and typography.
- **UI primitives** live in `src/app/components/ui`:
  - Buttons, dialogs, sheets, accordions, tabs, etc.
  - These are Radix‑based components (Shadcn‑style) wrapped with Tailwind classes.
- Layout & sections on the landing page mostly use Tailwind utility classes directly, occasionally composed with these primitives.

If you are adding new UI:

- Prefer reusing or extending components from `components/ui` rather than re‑inventing patterns.
- Keep spacing, radius, and color usage aligned with existing classes (e.g. gradients from rose → amber, rounded‑2xl cards, soft shadows).

---

### 7. FAQ Page Details

`src/app/pages/FAQs.tsx` implements a self‑contained FAQ experience:

- A local array of `FAQItem` objects drives the content (`question`, `answer`).
- Each row is wrapped in a `motion.div` for smooth expand / collapse.
- Open state is tracked by `openIndex` in the page component.

To add or modify FAQs:

- Edit the `faqs` array at the top of `FAQs.tsx`.
- Keep answers concise and friendly; this is customer‑facing copy.

---

### 8. Working with Images

`src/app/components/figma/ImageWithFallback.tsx` provides a helper for images that:

- Tries to load a primary source.
- Falls back to an alternate source or placeholder if the primary fails.

Use this component when you are rendering images that may originate from design exports or remote URLs, to avoid broken image states in the UI.

---

### 9. Extending the App

Some common extension points:

- **Add a new page**:
  - Create a component under `src/app/pages/YourPage.tsx`.
  - Register a route in the router configuration inside `App.tsx`.
  - Link to it from the header, footer, or CTA buttons using `Link` from `react-router-dom`.
- **Add a new product type / section**:
  - Add a new section component in `App.tsx` or a dedicated file.
  - Wire it into the cart using the `useCart` hook.
- **Integrate real auth or backend**:
  - Replace the simulated login modal handlers with real OAuth / API calls.
  - Persist cart and user data via your chosen backend or local storage.

This app is intentionally front‑end only and easy to host statically, so deeper integrations can be layered on as needed.

