## 1. Catalog Page Flattening

- [x] 1.1 In `CatalogPage.module.css`, enforce `border-radius: 0` on product image wrappers and any filter cards.
- [x] 1.2 Inspect the grid gaps in `.grid` or `.productList` and compress them to `var(--space-2)` (8px) for desktop and `var(--space-1)` (4px) for mobile.
- [x] 1.3 Ensure the FilterSidebar does not cast a `box-shadow` on the product listing, using a solid `1px` border instead if an edge is needed.

## 2. Product Detail Page (PDP) Restructuring

- [x] 2.1 In `ProductDetailPage.module.css`, strip any `border-radius` variables applied to the main `.imageWrapper` and gallery thumbnails.
- [x] 2.2 Verify the product `.title` maps precisely to `Helvetica Now Display Medium` with a `0.90` line-height via the `.text-display` utility class or native declaration.
- [x] 2.3 Confirm "Add to Cart" CTA inside PDP uniquely employs the `.pill` format and monochromatic background.

## 3. Cart & Checkout Densification

- [x] 3.1 Un-elevate the `CartPage.module.css` and `CheckoutPage.module.css` summary boxes by finding taking away `box-shadow` and setting `border-radius: 0`.
- [x] 3.2 Add a stark 1px solid border (`#CACACB`) outline to any isolated modules to replace lost shadow boundaries.
- [x] 3.3 Eliminate internal drop-shadows on quantity modifiers or input bounds across the checkout flow.

## 4. Auth & Account Monolith Alignment

- [x] 4.1 Rip out any floating frame `.card` shadow aesthetics in `Auth.module.css` (used for SignIn/SignUp pages) to maintain flat alignment.
- [x] 4.2 Validate that `Account.module.css` order history tables and profile blocks use solid lines without rounded table wrappings.

## 5. Global Components, Layouts & Styles

- [x] 5.1 Audit `src/layouts/*` and `src/components/layout/*` to align paddings, background colors, and structure with the new standard.
- [x] 5.2 Traverse `src/components/ui/*` and `src/components/shared/*` to apply the `24px`/`30px` pill logic and flatten any lingering component shadows.
- [x] 5.3 Review `src/styles/*` to ensure universal application of updated css variables, clearing any legacy shadow/radius variables.
- [x] 5.4 Purge violet (primary) color blocks from `src/components/layout/Header/Header.module.css` (e.g. cart badge).
- [x] 5.5 Sweep checkout step indicators and active labels in `src/components/checkout/CheckoutProgress/CheckoutProgress.module.css` and `src/components/checkout/steps/steps.module.css` to use monochromatic greyscale.
- [x] 5.6 Confirm all buttons in Cart and Checkout avoid the legacy primary purple palette.

## 6. Verification

- [x] 6.1 Navigate the entire `/products` flow up to Checkout on both emulated desktop and mobile viewpoints to check that `box-shadow` has entirely vanished.
- [x] 6.2 Confirm full-bleed visuals (sharp edges) persist on nested product photography.
- [x] 6.3 Perform an exhaustive check of all pages, including Auth and user Account views, to guarantee no component breaks the flat, monochromatic layout rules.
