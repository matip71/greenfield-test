## ADDED Requirements

### Requirement: Layout Flatness & Densification
The landing page layout must adopt dense grid packing and zero-elevation layering. 

#### Scenario: Rendering featured grids
- **WHEN** the `FeaturedProducts` or `CategoryGrid` components render
- **THEN** grid `gap` CSS properties must map to `var(--space-2)` (8px) or `var(--space-3)` (12px), not larger
- **THEN** `border-radius` on product/category wrappers must be exactly `0px`
- **THEN** no element within the sections may possess a `box-shadow` property

### Requirement: Primitives Conformance
All interactive elements must conform precisely to the newly codified "Pill" geometry.

#### Scenario: Call-to-action rendering
- **WHEN** `Button` components are utilized within the Hero, Category, or Featured blocks
- **THEN** the `variant` prop must be strictly bound to `"pill"`
- **THEN** the `pill` class CSS definition must dictate `border-radius: var(--radius-pill)` (where `--radius-pill` is mapped to `30px` or `9999px`)
- **THEN** button labels must enforce `font-weight: 500` inside their respective `.module.css` definitions or token utilities.
