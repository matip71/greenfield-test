## Why

The current landing page needs an layout update to follow the athletic retail monochromatic aesthetic, but requires further refinement to fully realize the "retail cathedral" vision defined in `DESIGN.md`. We need to tighten the product grid spacing to create a dense, abundant feel (4-12px gaps), expand hero photography to edge-to-edge full-bleed layouts, and ensure all UI elements conform perfectly to the Main Black (`#111111`) / Main White (`#FFFFFF`) palette with flat elevation tracking (no shadows).

## What Changes

- Update base unit grid spacing in Landing Page collections to 4-12px tight gaps (replacing any generous card spacing)
- Refactor landing page hero image to strictly 0px radius, full-bleed to screen edges, scaling perfectly on all viewports without bounds.
- Revise all category/product imagery within the landing scope to use edge-to-edge framing.
- Modify CTA buttons on the landing page to feature exactly a 30px pill radius and strict 500-weight typography for labels.
- Verify and remove any residual `box-shadow` styles across landing components, cementing the completely fat elevation model described by DESIGN.md.

## Capabilities

### New Capabilities
- `landing-page-visual-update`: Applies strict aesthetic parameters (flat elevation, dense product grid spacing, massive fluid typography scale) to all landing page modules.

### Modified Capabilities
- `<existing-name>`: 

## Impact

- `src/components/landing/*`
- `src/pages/LandingPage.tsx`
- Layout and Module CSS (Tokens and Overrides specific to Landing)
