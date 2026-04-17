## Context

This is a greenfield first iteration of an e-commerce SPA. There is no legacy system to migrate from. The platform targets all modern browsers and all device sizes (mobile-first). The stack is TypeScript + React with ESM modules, managed via pnpm.

At this stage, no real backend or payment processor is wired in. State is managed client-side. The goal is to ship a fully navigable, visually complete storefront that can be tested with real users and extended in future iterations.

## Goals / Non-Goals

**Goals:**
- Establish the complete page structure and routing for the storefront
- Implement a shared design system (tokens, components) used consistently across all pages
- Deliver a premium, modern landing page as the primary brand impression
- Implement client-side cart state (localStorage persistence)
- Implement client-side auth state (mock/localStorage — no real backend in v1)
- Ensure full responsiveness across mobile, tablet, and desktop
- Achieve fast perceived performance (code splitting per route)

**Non-Goals:**
- Real payment processing (Stripe, PayPal, etc.) — UI-only in v1
- Real backend API integration — all data is mocked/static in v1
- Admin dashboard or product management
- Internationalization (i18n) or multi-currency in v1
- SEO pre-rendering or SSR — SPA only in v1

## Decisions

### D1: React Router v6 for client-side routing
**Decision**: Use React Router v6 with `createBrowserRouter`.
**Rationale**: Industry standard for React SPAs; supports nested layouts (crucial for shared header/footer), lazy loading per route, and typed route params. No need for a more complex solution like TanStack Router for v1.
**Alternatives considered**: Next.js (App Router) — rejected because the project is explicitly a SPA (no SSR requirement in v1) and the stack specifies Vite + React.

### D2: Vite as the build tool
**Decision**: Bootstrap with `create-vite` (React + TypeScript template).
**Rationale**: Fastest dev server, native ESM, zero-config code splitting, straightforward pnpm integration.

### D3: Route-level code splitting
**Decision**: Every page component is lazy-loaded via `React.lazy` + `Suspense`.
**Rationale**: Prevents the full bundle from loading on landing; each page is fetched on first navigation. This is listed explicitly by name in a `ROUTES` constant (no pattern-based discovery).

```ts
// src/routes/index.tsx
const ROUTES = {
  LANDING:            { path: '/',                    component: lazy(() => import('../pages/LandingPage')) },
  CATALOG:            { path: '/products',            component: lazy(() => import('../pages/CatalogPage')) },
  PRODUCT_DETAIL:     { path: '/products/:slug',      component: lazy(() => import('../pages/ProductDetailPage')) },
  CART:               { path: '/cart',                component: lazy(() => import('../pages/CartPage')) },
  CHECKOUT:           { path: '/checkout',            component: lazy(() => import('../pages/CheckoutPage')) },
  ORDER_CONFIRMATION: { path: '/order/confirmation',  component: lazy(() => import('../pages/OrderConfirmationPage')) },
  SIGN_IN:            { path: '/auth/sign-in',        component: lazy(() => import('../pages/SignInPage')) },
  SIGN_UP:            { path: '/auth/sign-up',        component: lazy(() => import('../pages/SignUpPage')) },
  FORGOT_PASSWORD:    { path: '/auth/forgot-password',component: lazy(() => import('../pages/ForgotPasswordPage')) },
  ACCOUNT:            { path: '/account',             component: lazy(() => import('../pages/AccountPage')) },
  ORDER_HISTORY:      { path: '/account/orders',      component: lazy(() => import('../pages/OrderHistoryPage')) },
  ORDER_DETAIL:       { path: '/account/orders/:id',  component: lazy(() => import('../pages/OrderDetailPage')) },
} as const;
```

### D4: Global state via React Context + useReducer
**Decision**: Cart state and auth state each get their own Context + useReducer; no external state library in v1.
**Rationale**: v1 complexity does not justify Redux or Zustand. Context covers the use case with zero extra dependencies. Both contexts persist to `localStorage` on state change via a custom `usePersistentReducer` hook.
**Alternatives considered**: Zustand — deferred to v2 if Context shows performance issues at scale.

### D5: Design system with CSS custom properties (no CSS-in-JS)
**Decision**: All design tokens (colors, spacing, typography, radii, shadows) defined as CSS custom properties in `src/styles/tokens.css`. Components use these properties directly in module CSS or plain CSS classes.
**Rationale**: Best performance (no runtime style injection), easy theming (dark mode via `[data-theme="dark"]` attribute), fully compatible with all modern browsers.

### D6: Mock data via static TypeScript fixtures
**Decision**: All product, category, and order data is defined in `src/data/` as typed TypeScript arrays. No network calls in v1.
**Rationale**: Allows full UI development and testing without a backend. The data shape will mirror the future API contract, making the swap to real API calls mechanical in v2.

### D7: E2E testing with Playwright (no unit tests in v1)
**Decision**: Use `@playwright/test` for automated testing. No unit test framework (Vitest/Jest) in v1.
**Rationale**: Because all backend logic is mocked via `localStorage`, unit-testing data helpers would produce low-value tests that will be discarded when a real API is wired in v2. E2E tests, by contrast, test user-visible behavior (route guards, cart badge updates, form flows, page titles) and remain valid even after the mock layer is replaced. Tests reuse the running Vite dev server via `webServer.reuseExistingServer`.
**Test files** (`src/tests/`):
- `helpers.ts` — `addInitScript`-based seeders for user, auth session, cart item, and order state
- `responsive-layout.spec.ts` — no horizontal overflow at mobile/tablet/desktop viewports
- `cart-badge.spec.ts` — cart badge increments in real time on Landing, Catalog, and PDP
- `persistence.spec.ts` — cart and auth state survive a page reload
- `route-guards.spec.ts` — all redirect guards: `/account`, `/checkout`, `/order/confirmation`, and auth-page guards
- `lazy-loading.spec.ts` — hero images NOT lazy; all other `<img>` elements ARE lazy
- `document-titles.spec.ts` — dynamic `document.title` on all 11 routes
**Browser projects**: Chromium, Firefox, WebKit (Safari), Mobile Chrome (Pixel 5), Mobile Safari (iPhone 13), and Tablet (768px Chrome).
**Alternatives considered**: Vitest + React Testing Library — useful for reducer logic but deferred to v2 when components stabilize; Cypress — heavier install, Playwright preferred for v1.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Mock data limits realistic testing of edge cases (empty states, large catalogs, network errors) | Include explicit empty-state and error-state UI components even in v1 |
| localStorage cart state is not shared across devices | Acceptable limitation documented; synced cart is a v2 feature |
| No real auth means protected routes rely on client-side checks only | Routes guard based on auth context state; server enforcement deferred to v2. Automated by `route-guards.spec.ts` |
| Large product image assets can hurt LCP | Use `loading="lazy"` on all non-hero images; hero images are preloaded. Verified by `lazy-loading.spec.ts` |
| Responsive design regression across breakpoints | Define 3 standard breakpoints as named constants: `BREAKPOINTS = { MOBILE: 480, TABLET: 768, DESKTOP: 1280 }`. Verified by `responsive-layout.spec.ts` across mobile/tablet/desktop Playwright projects |

## Migration Plan

This is a greenfield build — no migration steps required. Deployment target is a static hosting service (e.g., Cloudflare Pages, Vercel, or S3). The SPA requires a catch-all redirect to `index.html` for client-side routing, which must be configured at the hosting layer.

## Open Questions

- **Product images**: Will we use generated/placeholder images in v1, or does the team have a design asset package? → Default to high-quality Unsplash URLs in static fixtures for v1.
- **Checkout form validation library**: Use HTML5 native validation or a library like `react-hook-form`? → Default to `react-hook-form` for consistent DX; lightweight and tree-shakeable.
- **Font**: Custom brand font or system font stack? → Default to `Inter` from Google Fonts for v1 as the design system font.
