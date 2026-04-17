## Context

The global navigation elements (`Header`, `Footer`) and their child components currently possess the foundational structure of the page layout but retain older visual artifacts like box-shadows, non-monochromatic hover states, or improper font weighings that clash with the newly forged Bugatti-inspired `DESIGN.md`.

## Goals / Non-Goals

**Goals:**
- Strip all drop shadows (`box-shadow`) from the Header, replacing elevation with a `1px` `#E5E5E5` bottom border (the flat inset rule).
- Restructure the Header flex layout: Logo left, Categories centered, Search/Icons right.
- Ensure all standard Header links adhere to `16px/500 Helvetica Now Text Medium` and hover exclusively to `#707072`.
- Update the Search input nested in the header to use a `24px` border radius and a `#F5F5F5` background, matching the primitive rules.
- Simplify the Footer into a stark black-on-white layout, eradicating rounded bounding boxes for lists.

**Non-Goals:**
- Completely rewriting the underlying `react-router-dom` routing logic.
- Building the complex mega-menu logic from scratch (visual re-alignment takes precedence).

## Decisions

- **Sticky Header Elevation:** Instead of gaining a shadow when scrolling, the Header will persist purely through a `#FFFFFF` solid background and a bottom border `border-bottom: 1px solid var(--color-border);`.
- **Search Primitive:** Instead of a generic input, the search bar will specifically target the `radius-24` and `color-bg` (#F5F5F5) rules.
- **Top Promotional Banner:** Will be rigorously enforced as Main Black `#111111` with Main White text.

## Risks / Trade-offs

- Taking away drop shadows on a fixed header risks it blending into white page surfaces. A sharp 1px border is essential for preventing the header from bleeding into white HERO sections.
