## 1. Typographic & Global Foundation Updates

- [x] 1.1 Audit and update `.text-display` in global.css to ensure `line-height: 0.90` and font family specifically matching the requested massive display roles from `DESIGN.md`. 
- [x] 1.2 Verify `global.css` utilities use font weights mapping to `500` (Medium) anywhere interaction is implied.

## 2. Grid Densification (Landing Pages)

- [x] 2.1 Update `CategoryGrid.module.css` to reduce component layout gaps to 4px–12px (using token mapping like `var(--space-2)` or `var(--space-3)`).
- [x] 2.2 Reconfigure `FeaturedProducts.module.css` grid template to employ visually dense spacing identical to CategoryGrid.

## 3. Flat Elevation & Border Radius Refactoring

- [x] 3.1 Strip all instances of `box-shadow` or `border-radius` (set to `0px`) from product imagery and `.card` classes inside `FeaturedProducts.module.css`.
- [x] 3.2 Ensure `CategoryGrid.module.css` enforces `0px` radius on all `.imageWrapper` and `.row` declarations for edge-to-edge photography.
- [x] 3.3 Verify internal product elements (prices, labels, texts) do not deploy decorative dropshadows for legibility (use vignette overlay component instead).

## 4. Primitives Standardization

- [x] 4.1 Update the CTA Links inside `FeaturedProducts` and `CategoryGrid` to strictly utilize the Pill geometric properties.
- [x] 4.2 Validate that the `Button` usage natively sets a `30px` radius when variant="pill" and text labels scale correctly with the 500-weight constraint.
- [x] 4.3 Replace the CTA classes on the HeroSection to strictly leverage the newly-shaped `Button` component, dropping `.outlineLight` overrides if they contradict purely monochromatic rules.

## 5. Verification 

- [x] 5.1 Review full-viewport widths to verify `HeroSection` and product cards correctly render without side-margins (true full-bleed edge-to-edge).
- [x] 5.2 Validate across Chromium, WebKit, and Gecko engines that elements haven't accidentally collapsed under the tight grid layouts.
- [x] 5.3 Complete a mobile emulation test to assert that 4px–12px tight gaps do not impair touch-target usability limits (ensure buttons inside tight grids still satisfy minimum clickable heights).
