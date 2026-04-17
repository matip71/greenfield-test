## ADDED Requirements

### Requirement: Product detail page renders full product information
The page at `/products/:slug` SHALL render the product name, full description, price, all images in a gallery, available variants (size, color), stock status, and an "Add to Cart" button.

#### Scenario: Product page loads with correct data
- **WHEN** a user navigates to `/products/<slug>`
- **THEN** the page IS rendered with the product name, description, price, images, and variant selectors for that product

#### Scenario: Unknown product slug
- **WHEN** a user navigates to `/products/<nonexistent-slug>`
- **THEN** a "Product not found" error state IS shown with a link back to `/products`

### Requirement: Product image gallery supports navigation
The image gallery SHALL display the primary image prominently and provide thumbnail navigation to switch between multiple images.

#### Scenario: Thumbnail switches main image
- **WHEN** a user clicks a thumbnail image
- **THEN** the main image IS replaced with the selected thumbnail image

### Requirement: Product variant selection is required before add-to-cart
If a product has selectable variants (size, color), the user MUST select one of each before the "Add to Cart" button becomes active.

#### Scenario: Add to Cart blocked without variant selection
- **WHEN** a user clicks "Add to Cart" without selecting all required variants
- **THEN** the item IS NOT added to cart and a validation message IS shown prompting variant selection

#### Scenario: Add to Cart enabled after selection
- **WHEN** a user selects all required variants
- **THEN** the "Add to Cart" button IS enabled

### Requirement: Product can be added to cart from PDP
Clicking "Add to Cart" SHALL add the product (with selected variant and quantity 1) to the cart and visually confirm the action (e.g., cart icon count updates, toast notification).

#### Scenario: Successful add to cart
- **WHEN** a user selects all required variants and clicks "Add to Cart"
- **THEN** the product IS added to the cart, the cart item count IS incremented by 1, and a success toast IS shown

### Requirement: Product detail page shows stock status
The page SHALL display "In Stock" or "Out of Stock" based on the product's `inStock` field. The "Add to Cart" button SHALL be disabled when the product is out of stock.

#### Scenario: Out of stock product
- **WHEN** the product's `inStock` field is `false`
- **THEN** "Out of Stock" IS displayed and the "Add to Cart" button IS disabled

### Requirement: Product detail page is responsive
The layout SHALL switch from a side-by-side image/info layout (desktop) to a stacked layout (mobile/tablet) at the TABLET breakpoint.

#### Scenario: Mobile stacked layout
- **WHEN** the viewport width is ≤768px
- **THEN** the image gallery IS displayed above the product info in a single-column layout

## ADDED Requirements

### Requirement: Product Detail Spanish Content
All static, hardcoded texts visible to the user SHALL be translated to Spanish.

#### Scenario: User views product detail page in Spanish
- **WHEN** a user navigates to a product detail page
- **THEN** all variant selectors, 'Add to cart', 'Out of stock', 'Select Options' buttons, title tags, and static headings ARE rendered in Spanish

