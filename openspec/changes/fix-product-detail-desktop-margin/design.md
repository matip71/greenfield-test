## Context

On desktop resolutions, the product detail page uses a CSS grid layout to place the product gallery and the product info side-by-side. However, the user reports that the expected margin/gap between the images and details is lost on large desktop resolutions. 

## Goals / Non-Goals

**Goals:**
- Identify and fix the layout or CSS gap issue causing elements to overlap or lose margin on large desktop screens.
- Ensure the layout remains consistent with the "athletic retail cathedral" design system.

**Non-Goals:**
- Redesigning the entire Product Detail structure.
- Changing mobile or small tablet views.

## Decisions

- **Approach**: Adjust the `.galleryCol` in `ProductDetailPage.module.css` or ensure `min-width` / `max-width` properties in child components (like the gallery) aren't overriding the parent grid `gap`.
- **Rationale**: The established design system relies on the `gap` property in CSS grids along with flexbox to maintain spatial separation. apply fixed margin if necessary

## Risks / Trade-offs

- [Risk] CSS changes might affect tablet layouts if not properly scoped. → Any media-query adjustments will verify and preserve existing behavior for screens <= 1024px and <= 768px.
