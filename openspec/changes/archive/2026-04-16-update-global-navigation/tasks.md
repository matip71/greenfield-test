## 1. Global Navigation Refactoring (Header)

- [x] 1.1 Remove any `box-shadow` CSS properties from `Header.module.css` (specifically within pinned/sticky state classes).
- [x] 1.2 Implement a `1px` solid border on the bottom of the Header using `#CACACB` or `var(--color-border)` to maintain visual separation.
- [x] 1.3 Verify and set global nav anchor links to `Helvetica Now Text Medium` (weight `500`) with hover transitions restricted to color `#707072` (or `var(--color-text-secondary)`).

## 2. Reusable Component Alignment (Search Input)

- [x] 2.1 Update the Search input component (whether embedded in the Header or separate) to apply a `var(--radius-24)` (24px) border radius.
- [x] 2.2 Change the background color of the Search input to `#F5F5F5` (`var(--color-surface-alt)`) and ensure it has no internal drop-shadow.

## 3. Global Footer Flattening

- [x] 3.1 Audit `Footer.module.css` to confirm it operates strictly on black text / white background or inverted schemes with zero gradients.
- [x] 3.2 Ensure footer categorical links abide by the `500` font weight if interactive, or match `DESIGN.md` guidelines for Small/Text equivalents.

## 4. Verification

- [x] 4.1 Perform a scroll test across the site to guarantee the Header successfully utilizes its 1px bottom border without producing phantom shadows.
- [x] 4.2 Verify search input rendering on mobile navigation modes (hamburger menu) maintains the 24px pill shape.
