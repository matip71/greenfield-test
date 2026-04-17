## Context

The current iteration of the Landing Page components (HeroSection, CategoryGrid, FeaturedProducts) has started the transition toward a monochromatic aesthetic. However, to fully realize the "athletic retail cathedral" specifications outlined in `DESIGN.md`, we need to implement severe flat elevation (removing all `box-shadow` artifacts), dense retail spacing grids (tightening 24px gaps down to 4px-12px), edge-to-edge photography with zero border radius, and strict compliance with the typography roles (Helvetica Now Display at 0.90 line-height for massive impact).

## Goals / Non-Goals

**Goals:**
- Apply the 4px/8px tightly-packed grid gap spacing to product and category grids.
- Remove all instances of `box-shadow` and ensure elevation is conveyed solely through contrast shifts.
- Force all Hero and Category images to be full-bleed with `0px` border radius.
- Standardize all interactive buttons strictly to the completely rounded pill shape (30px/`9999px` radius) using the `500` font weight.

**Non-Goals:**
- Re-architecting the global `Header` or `Footer` components.
- Redesigning pages beyond the `LandingPage` (e.g. PLP, PDP).

## Decisions

- **Typography CSS Variables:** We will update the tokens in `HeroSection.module.css` and `CategoryGrid.module.css` to respect the newly defined hierarchy (e.g., scale Display up to 96px with 0.90 line height).
- **Dense Grids:** The `FeaturedProducts.module.css` and `CategoryGrid.module.css` grid `gap` properties will be explicitly narrowed. We will map `gap: var(--space-6)` (24px) down to `var(--space-2)` or `var(--space-3)` (8px/12px) to fulfill the dense athletic look.
- **Button Radius:** Anywhere a Button is used, it will be mapped to the `pill` variant.
- **Border Radius:** All `imageWrapper` and `.card` classes will have their `border-radius` reduced to `0px`.

## Risks / Trade-offs

- Tightly packed grids can hinder legibility if image contrast is poor. This will be mitigated by ensuring the vignette text overlays are sufficiently opaque.
- Removing border radius from cards might clash with other sections of the app that have not yet been updated. We are isolating these changes to the landing page structural modules.
