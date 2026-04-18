## MODIFIED Requirements

### Requirement: Product detail page is responsive
The layout SHALL switch from a side-by-side image/info layout (desktop) to a stacked layout (mobile/tablet) at the TABLET breakpoint, and ensure proper spacing between image and info panels on desktop screens of all sizes without losing margins at larger resolutions.

#### Scenario: Mobile stacked layout
- **WHEN** the viewport width is ≤768px
- **THEN** the image gallery IS displayed above the product info in a single-column layout

#### Scenario: Desktop layout with margin
- **WHEN** the viewport width is >768px
- **THEN** the image gallery AND the product info ARE displayed side-by-side WITH a small margin in between them at large resolutions to avoid them touchin each other in display
