## ADDED Requirements

### Requirement: Product catalog displays product grid
The page at `/products` SHALL render all available products as a grid of cards, each showing image, name, price, and an "Add to Cart" button.

#### Scenario: Default catalog view
- **WHEN** a user navigates to `/products` with no query parameters
- **THEN** all products ARE shown in a responsive grid, sorted by default order (featured first)

### Requirement: Product catalog supports category filtering
The catalog SHALL filter products by category when the `category` query parameter is present (e.g., `/products?category=shoes`). The active category SHALL be highlighted in the filter UI.

#### Scenario: Category filter applied via URL
- **WHEN** the URL includes `?category=<slug>`
- **THEN** only products belonging to that category ARE shown and the matching category filter IS highlighted

#### Scenario: Category filter removed
- **WHEN** a user clicks an active (highlighted) category filter
- **THEN** the `category` parameter IS removed from the URL and all products ARE shown

### Requirement: Product catalog supports price range filtering
The catalog SHALL provide a price range filter UI (min/max inputs or a slider). Applying it SHALL update the URL with `?minPrice=<n>&maxPrice=<n>` and filter products accordingly.

#### Scenario: Price range filter applied
- **WHEN** a user sets a min and/or max price and applies the filter
- **THEN** only products within the specified price range ARE shown and URL IS updated

### Requirement: Product catalog supports sorting
The catalog SHALL provide a sort dropdown with options: `featured`, `price-asc`, `price-desc`, `newest`. Selecting an option SHALL update the URL with `?sort=<option>` and reorder the grid.

#### Scenario: Sort by price ascending
- **WHEN** a user selects "Price: Low to High" from the sort dropdown
- **THEN** products ARE reordered from lowest to highest price and URL IS updated with `?sort=price-asc`

### Requirement: Product catalog supports pagination
The catalog SHALL display at most 20 products per page. Pagination controls SHALL allow navigating between pages via `?page=<n>` in the URL.

#### Scenario: Pagination navigation
- **WHEN** there are more than 20 products and a user clicks "Next Page"
- **THEN** the next 20 products ARE displayed and URL IS updated with `?page=<n+1>`

### Requirement: Product catalog shows empty state
When no products match the active filters, the catalog SHALL display an empty-state UI with a message and a "Clear Filters" button.

#### Scenario: No results
- **WHEN** the applied filters result in zero matching products
- **THEN** an empty-state message IS shown and a "Clear Filters" button IS visible

#### Scenario: Clear filters from empty state
- **WHEN** a user clicks "Clear Filters" in the empty state
- **THEN** all filter and sort parameters ARE removed from the URL and all products ARE shown

### Requirement: Catalog is responsive
The product grid SHALL reflow from 4 columns (desktop) → 2 columns (tablet) → 1 column (mobile) at the standard breakpoints.

#### Scenario: Mobile grid layout
- **WHEN** the viewport width is ≤480px
- **THEN** products ARE displayed in a single-column grid

## ADDED Requirements

### Requirement: Product Catalog Spanish Content
All static, hardcoded texts visible to the user SHALL be translated to Spanish.

#### Scenario: User views product catalog in Spanish
- **WHEN** a user navigates to the product catalog
- **THEN** all filter labels, sort options, 'Add to cart' buttons, stock statuses, title tags, pagination controls, and headers ARE rendered in Spanish

