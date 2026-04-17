## Why

With the landing page and global navigation successfully migrated to the "athletic retail cathedral" design system, the remaining core e-commerce views (Catalog, Product Detail, Cart, Checkout, Auth, and Account) still suffer from legacy design dissonance. These pages currently employ outdated elements like rounded cards, drop-shadows on forms and product lists, gradients, and loose spacing that dilute the premium, monolithic aesthetic established by `DESIGN.md`. Unifying the entire application guarantees a seamless, uncompromising brand experience from entry point to checkout. Include all the components used in those core views to ensure a complete and cohesive update.

## What Changes

- **Product Catalog (Listing & Filters)**: Eradicate border radii on all product thumbnails (`0px`), strip shadows off the filter sidebar, and densify the grid gaps (4px-12px) to match the landing page.
- **Product Detail Page (PDP)**: Enforce a full-bleed or rigid-edge image gallery without rounded corners. Typography for product titles must transition to the massive display scale, and the layout must tighten.
- **Cart & Checkout Flows**: Flatten all order summary cards and form containers. Replace shadowy inputs and floating boxes with solid `1px` lines (`#E5E5E5`) and solid background fills (`#F5F5F5`).
- **Auth & Account Pages**: Realign auth bounds to minimal centered blocks without elevation (`box-shadow: none`), strictly utilizing Main White/Main Black styling, and matching inputs to the `24px` "pill" rule globally adopted for interactive fields.
- **Color Alignment Elimination**: Remove any lingering primary (violet) background colors or borders from interactive states (like the cart badge, checkout steps, and cart buttons) to ensure pure Main Black / Main White contrast everywhere.
- **Global Components**: Update all global components to match the new design system. This includes the header, footer, and any other components used in the core views.

## Capabilities

### New Capabilities
- `app-wide-visual-update`: Applies strict aesthetic parameters to all internal e-commerce and account pages established by `DESIGN.md`, permanently eliminating `box-shadow` and enforcing `border-radius: 0px` globally for photography.

### Modified Capabilities
- `<existing-name>`: 

## Impact

- `src/components/*`
- `src/pages/*`
- `src/layouts/*`
- `src/styles/*`
