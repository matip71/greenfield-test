## Context

The global baseline rules for `DESIGN.md` have been merged, establishing a strict "retail cathedral" UI: completely flat zero-elevation layers, extreme monochromatic coloring (Main White / Main Black), and precise typographic tuning. While the Landing Page and Global Nav respect this, the internal functional pages (PDP, Catalog, Cart, Checkout, Auth, and Account) currently render with disjointed legacy visual settings like card shadows, generic rounded frames, and irregular spacing.

## Goals / Non-Goals

**Goals:**
- Systematically traverse every core page CSS module and component to enforce `box-shadow: none` globally.
- Strip `border-radius` variables (setting to `0px`) off every product image, container card, and banner across the entire site.
- Ensure grid and flex layout `gap` properties inside product lists (like Catalog grids) conform to the densified `4px` - `12px` range (`var(--space-1)` to `var(--space-3)`).
- Re-align inputs and interaction points within Checkout and Auth pages to match the 24px/30px pill geometric rule.
- Globally review all components in `src/components/*`, layouts in `src/layouts/*`, pages in `src/pages/*`, and styles in `src/styles/*` to ensure total compliance with the new design system.

**Non-Goals:**
- Major refactoring of the TypeScript logic, checkout state machines, or cart functionality.
- Changing the existing layout flow (DOM order) significantly beyond what CSS grid/flex densification requires.

## Decisions

- **Absolute Flatness Algorithm:** Any instance of `--shadow-`, `box-shadow`, or `--radius-` applied to a non-input container will be permanently removed. Elevation will be strictly achieved through `1px solid var(--color-border)` or solid grey (`#F5F5F5` to `#E5E5E5`) background offsets.
- **Image Rigidness:** Product photography wrapper bounds will strictly bind to `border-radius: 0`. No exceptions for internal detail pages or cart sidebars.
- **Button Normalization:** All forms, auth pages, and cart actions will migrate to the `.pill` or standard `30px` radius logic introduced during navigation updates.

## Risks / Trade-offs

- **Z-Index Contrast:** Heavy reliance on solid lines rather than shadows means overlapping elements might lose pop. We must ensure borders are clearly defined when white-on-white layering occurs (like Cart summary floating over a white main section).
