## 1. Project Setup & Design System

- [x] 1.1 Bootstrap Vite + React + TypeScript project using `pnpm create vite@latest . -- --template react-ts`
- [x] 1.2 Install dependencies: `react-router-dom`, `react-hook-form`; configure pnpm workspace
- [x] 1.3 Configure `vite.config.ts`: aliases (`@/` → `src/`), build output, base path
- [x] 1.4 Create `src/styles/tokens.css` with CSS custom properties for colors, spacing, typography, radii, shadows, and breakpoints
- [x] 1.5 Create `src/styles/global.css` with resets, base typography (Inter from Google Fonts), and scroll behavior
- [x] 1.6 Create `src/styles/breakpoints.ts` exporting named `BREAKPOINTS` constant `{ MOBILE: 480, TABLET: 768, DESKTOP: 1280 }`
- [x] 1.7 Create base UI components: `Button`, `Input`, `Select`, `Badge`, `Toast`, `Spinner`, `EmptyState`, `ErrorState`
- [x] 1.8 Write module CSS for each base component using design tokens only

## 2. Routing & Layout Infrastructure

- [x] 2.1 Create `src/routes/index.tsx` with `ROUTES` constant mapping all 12 routes to lazy-loaded page components
- [x] 2.2 Configure React Router `createBrowserRouter` using `ROUTES` constant; wrap with `Suspense` fallback spinner
- [x] 2.3 Create `RootLayout` component (`src/layouts/RootLayout.tsx`) rendering `<Header />`, `<Outlet />`, `<Footer />`
- [x] 2.4 Create `AuthLayout` component (`src/layouts/AuthLayout.tsx`) for centered auth pages (no header/footer nav links)
- [x] 2.5 Create `ProtectedRoute` component that reads auth context and redirects to `/auth/sign-in?redirect=<path>` when unauthenticated

## 3. Global State: Cart Context

- [x] 3.1 Create `src/context/CartContext.tsx` with `CartState` type, `cartReducer`, and `useCart` hook
- [x] 3.2 Implement `usePersistentReducer` hook that syncs reducer state to `localStorage` under a given key on every dispatch
- [x] 3.3 Implement cart actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`
- [x] 3.4 Add `ADD_ITEM` guard: if item+variant already in cart, increment quantity instead of duplicating
- [x] 3.5 Wire `CartProvider` into `main.tsx` wrapping the router

## 4. Global State: Auth Context

- [x] 4.1 Create `src/context/AuthContext.tsx` with `AuthState` type, `authReducer`, and `useAuth` hook
- [x] 4.2 Implement auth actions: `SIGN_IN`, `SIGN_UP`, `SIGN_OUT`, `UPDATE_PROFILE`
- [x] 4.3 Persist auth state to `localStorage` under key `authSession` via `usePersistentReducer`
- [x] 4.4 Wire `AuthProvider` into `main.tsx` wrapping the router (outside `CartProvider`)

## 5. Mock Data Layer

- [x] 5.1 Create `src/data/types.ts` defining `Product`, `Category`, `Order`, `CartItem`, `User` TypeScript interfaces
- [x] 5.2 Create `src/data/categories.ts` with at least 6 category records (id, name, slug, imageUrl)
- [x] 5.3 Create `src/data/products.ts` with at least 30 product records covering all categories, each with slug, images, variants, price, inStock
- [x] 5.4 Create `src/data/orders.ts` with helper functions: `getOrderById(id)`, `getOrdersByUserId(userId)`, `saveOrder(order)`
- [x] 5.5 Create `src/data/users.ts` with helper functions: `getUserByEmail(email)`, `saveUser(user)`, `updateUser(user)`

## 6. Global Navigation Components

- [x] 6.1 Build `<Header />` component with logo link, "Shop" nav link, auth-aware "Account" link, and cart icon with badge
- [x] 6.2 Implement mobile hamburger button and side-drawer (`<NavDrawer />`) in `<Header />`; drawer closes on link click or outside tap
- [x] 6.3 Build `<Footer />` component with three link groups (Shop, Account, About), legal text, and newsletter form
- [x] 6.4 Implement newsletter form in `<Footer />`: email validation via `react-hook-form`, inline success state on submit
- [x] 6.5 Write responsive module CSS for Header: full nav at ≥769px, hamburger + drawer at ≤768px
- [x] 6.6 Write responsive module CSS for Footer: multi-column at desktop, stacked at mobile

## 7. Landing Page

- [x] 7.1 Build `<HeroSection />` with full-width background, headline, sub-headline, and "Shop Now" CTA button linking to `/products`
- [x] 7.2 Build `<CategoryGrid />` fetching from `src/data/categories.ts`; each card links to `/products?category=<slug>`
- [x] 7.3 Build `<FeaturedProducts />` displaying 6 curated product cards from `src/data/products.ts`; cards support "Add to Cart" action dispatching to cart context
- [x] 7.4 Build `<PromoBanner />` component with configurable headline, description, and CTA link
- [x] 7.5 Build `<NewsletterSection />` with email form, `react-hook-form` validation, and inline success state
- [x] 7.6 Assemble `LandingPage.tsx` composing all sections in order: Hero → Categories → FeaturedProducts → PromoBanner → Newsletter
- [x] 7.7 Write responsive CSS for all landing sections; verify at 375px, 768px, and 1280px widths


## 8. Product Catalog Page

- [x] 8.1 Build `<ProductCard />` component with image, name, price, and "Add to Cart" button
- [x] 8.2 Build `<FilterSidebar />` with category checklist (from `categories.ts`) and price range inputs; updates URL query params on change
- [x] 8.3 Build `<SortDropdown />` with options mapped from `SORT_OPTIONS` constant: `[{ value: 'featured', label: 'Featured' }, { value: 'price-asc', label: 'Price: Low to High' }, { value: 'price-desc', label: 'Price: High to Low' }, { value: 'newest', label: 'Newest' }]`
- [x] 8.4 Implement `useProductFilters` hook that reads `category`, `minPrice`, `maxPrice`, `sort`, `page` from URL and returns filtered/sorted/paginated product array
- [x] 8.5 Build `<Pagination />` component that generates page links updating `?page=<n>` in URL
- [x] 8.6 Assemble `CatalogPage.tsx` with sidebar + product grid layout; include `<EmptyState />` when no results
- [x] 8.7 Verify responsive grid: 4 cols at ≥1280px, 2 cols at 481–768px, 1 col at ≤480px

## 9. Product Detail Page

- [x] 9.1 Build `<ImageGallery />` with main image display and clickable thumbnails; clicking thumbnail updates main image via local state
- [x] 9.2 Build `<VariantSelector />` for each variant dimension (size, color); tracks selected values in local state; emits validation state
- [x] 9.3 Build `<AddToCartButton />` that is disabled until all required variants are selected and product is in stock
- [x] 9.4 Assemble `ProductDetailPage.tsx`: load product by `slug` param from `products.ts`, render gallery + info side-by-side; show `<ErrorState />` for unknown slugs
- [x] 9.5 Implement add-to-cart dispatch from PDP: adds item with selected variants, shows success `<Toast />`
- [x] 9.6 Write responsive CSS: side-by-side layout at ≥769px, stacked at ≤768px

## 10. Shopping Cart Page

- [x] 10.1 Build `<CartItem />` component with image, name, variant info, unit price, quantity +/− controls, line total, and remove button
- [x] 10.2 Implement quantity decrement: dispatches `REMOVE_ITEM` when quantity reaches 0
- [x] 10.3 Build `<OrderSummary />` panel computing subtotal, estimated flat shipping ($5.99 constant), and total
- [x] 10.4 Assemble `CartPage.tsx`: render `<CartItem />` list or `<EmptyState />` when empty; render `<OrderSummary />` with "Proceed to Checkout" CTA (disabled when empty)
- [x] 10.5 Write responsive CSS: side-by-side items+summary at desktop, stacked at ≤480px

## 11. Checkout Page

- [x] 11.1 Build `<CheckoutProgress />` step indicator (3 steps); highlights current step via props
- [x] 11.2 Build `<ShippingAddressStep />` form with all required fields using `react-hook-form`; emits validated address on "Continue"
- [x] 11.3 Build `<ShippingMethodStep />` rendering `SHIPPING_OPTIONS` constant `[{ id: 'standard', label: 'Standard', price: 0 }, { id: 'express', label: 'Express', price: 9.99 }]` as selectable cards; pre-selects first option
- [x] 11.4 Build `<PaymentStep />` form with card fields using `react-hook-form`; validates card number as exactly 16 digits
- [x] 11.5 Implement place-order handler: validates step 3, clears cart, saves mock order to localStorage (`lastOrder` + appends to `orders`), navigates to `/order/confirmation`
- [x] 11.6 Build persistent `<CheckoutSummary />` sidebar; updates shipping cost when `ShippingMethodStep` emits selection
- [x] 11.7 Guard `/checkout` route: if cart is empty, redirect to `/cart`
- [x] 11.8 Implement mobile summary toggle: collapse `<CheckoutSummary />` at ≤480px behind "Show order summary" button

## 12. Order Confirmation Page

- [x] 12.1 Read `lastOrder` from localStorage on mount; redirect to `/` if not present
- [x] 12.2 Assemble `OrderConfirmationPage.tsx` displaying order number, items list, shipping address, shipping method, and total
- [x] 12.3 Add "Continue Shopping" CTA → `/` and "View Order History" CTA → `/account/orders`
- [x] 12.4 Clear `lastOrder` from localStorage after rendering (prevent stale confirmation on refresh)

## 13. User Authentication Pages

- [x] 13.1 Build `SignUpPage.tsx` with `react-hook-form`: all fields, password-match validation, email-already-exists check against `users.ts`, dispatch `SIGN_UP` on success, navigate to `/account`
- [x] 13.2 Build `SignInPage.tsx` with `react-hook-form`: email + password fields, credential validation against `users.ts`, dispatch `SIGN_IN` on success, navigate to `redirect` param or `/account`
- [x] 13.3 Build `ForgotPasswordPage.tsx` with email field; any valid email submission shows success message (no email sent)
- [x] 13.4 Add redirect guards to all auth pages: authenticated users → redirect to `/account`
- [x] 13.5 Write responsive CSS for auth pages: centered card layout usable at ≤375px

## 14. User Account Pages

- [x] 14.1 Build `AccountPage.tsx` (profile view/edit): display name + email; edit form for name fields; dispatch `UPDATE_PROFILE` on save; show success confirmation
- [x] 14.2 Build `OrderHistoryPage.tsx`: read orders from localStorage filtered by user ID; render list sorted newest-first; `<EmptyState />` with "Start Shopping" when empty
- [x] 14.3 Build `OrderDetailPage.tsx`: load order by `:id` param from localStorage; display full item list, shipping info, masked card (last 4 digits), totals; `<ErrorState />` for unknown ID
- [x] 14.4 Implement `<AccountSidebar />` with navigation links to Profile and Order History; collapses to horizontal tab bar at ≤480px
- [x] 14.5 Implement sign-out: button in `<AccountSidebar />`, dispatch `SIGN_OUT`, clear localStorage session, navigate to `/`
- [x] 14.6 Wrap all `/account/*` routes with `<ProtectedRoute />`

## 15. Cross-Platform Testing & Polish

- [x] 15.1 Test all pages at 375px (mobile), 768px (tablet), and 1280px (desktop) — fix any layout regressions
  - [x] Playwright config: enable `mobile-chrome`, `mobile-safari`, `tablet` projects
  - [x] E2E: `responsive-layout.spec.ts` — no horizontal overflow on Landing, Catalog, Cart, PDP, Checkout
- [x] 15.2 Test on Chrome, Firefox, and Safari (or Edge as Safari proxy) — fix any browser-specific CSS issues
  - [x] Playwright config: `chromium`, `firefox`, `webkit` projects all enabled
- [x] 15.3 Verify cart badge count updates in real time on Landing, Catalog, and PDP pages
  - [x] E2E: `cart-badge.spec.ts` — badge increments from 0→1 after Add to Cart on each page; all variant-aware via `#pdp-add-to-cart-btn`
- [x] 15.4 Verify localStorage persistence: add items, reload page, confirm cart and auth session are restored
  - [x] E2E: `persistence.spec.ts` — cart survives reload; seeded auth session keeps user on `/account`
- [x] 15.5 Verify all route guards: unauthenticated `/account` access, empty-cart `/checkout` access, direct `/order/confirmation` access
  - [x] E2E: `route-guards.spec.ts` — all redirect scenarios covered including `?redirect=` param preservation and auth-page guards
- [x] 15.6 Add `loading="lazy"` to all non-hero `<img>` elements; verify hero images are not lazy-loaded
  - [x] E2E: `lazy-loading.spec.ts` — hero img NOT lazy; product cards, cart items, order detail images ARE lazy
- [x] 15.7 Audit all pages for missing `<title>` tags and update document title dynamically per route using `useEffect`
  - [x] E2E: `document-titles.spec.ts` — all 11 pages/routes assert correct `document.title` pattern
- [x] 15.8 Set up Playwright infrastructure: `playwright.config.ts` with `webServer`, `baseURL`, all browser projects; `helpers.ts` with `seedUser`, `seedAuthSession`, `seedCartItem`, `seedOrder`

