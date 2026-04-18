## Why

When viewing the product detail page on large resolutions (desktop screens), the expected margin between the product image gallery and the product details section is lost. This results in the elements overlapping or sitting too close to each other, negatively impacting the user experience and violating the intended design system layout. This change is needed to restore proper spacing and alignment on desktop breakpoints.

## What Changes

- Add or fix CSS gap/margin between the product images and the product info on the product-detail page for large breakpoint resolutions.
- Ensure the layout matches the intended "athletic retail cathedral" design, maintaining a clear spatial distribution of elements on desktop.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `product-detail`: Updating the layout requirement for large (desktop) resolutions to ensure proper spacing between the image viewer and the product details.

## Impact

- **UI Components**: The main layout wrapper within the `product-detail` page (`src/pages/ProductDetail.tsx` or similar).
- **CSS**: The associated layout styles for desktop queries adding margin betweein the image gallery and the product info.
