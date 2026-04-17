## 1. Landing & Navigation Translation

- [x] 1.1 Translate Global Navigation (`src/components/layout/Header`, `Footer`, etc.): links, buttons, and placeholders.
- [x] 1.2 Translate Landing Page (`src/pages/LandingPage` and child components): hero section, banners, category cards.
- [x] 1.3 Update Playwright E2E tests (`responsive-layout.spec.ts` or related) to expect the new Spanish titles or text on Landing.

## 2. Catalog & PDP Translation

- [x] 2.1 Translate Product Catalog (`src/pages/CatalogPage` and child components): filter headings, sort dropdowns, empty states.
- [x] 2.2 Translate Product Detail Page (`src/pages/ProductDetailPage` and child components): variants, "Add to cart" CTA, out of stock states.
- [x] 2.3 Update Playwright E2E tests (`cart-badge.spec.ts` etc.) interacting with Catalog/PDP elements by text.

## 3. Cart & Checkout Translation

- [x] 3.1 Translate Shopping Cart (`src/pages/CartPage` and child components): table headers, summary, empty cart messages.
- [x] 3.2 Translate Checkout Flow (`src/pages/CheckoutPage` and child components): form labels, checkout steps, payment details, "Place Order" CTA.
- [x] 3.3 Translate Order Confirmation (`src/pages/OrderConfirmationPage`): success messages, order instructions.
- [x] 3.4 Update Playwright E2E tests dealing with checkout flows to expect Spanish strings.

## 4. Auth & Account Translation

- [x] 4.1 Translate User Auth (`src/pages/SignInPage`, `SignUpPage`, `ForgotPasswordPage`): form fields, validation errors, CTAs.
- [x] 4.2 Translate User Account (`src/pages/AccountPage`, `OrderHistoryPage`, `OrderDetailPage`): profile headings, table columns.
- [x] 4.3 Update Playwright E2E tests (`route-guards.spec.ts` and `persistence.spec.ts`) asserting auth states using text.

## 5. Metadata

- [x] 5.1 Ensure all routes injected via React Router or `useEffect` update `document.title` to Spanish strings.
- [x] 5.2 Validate all Playwright E2E tests (including `document-titles.spec.ts`) successfully pass with translated content. 
