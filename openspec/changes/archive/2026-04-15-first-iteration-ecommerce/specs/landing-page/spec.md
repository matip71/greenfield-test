## ADDED Requirements

### Requirement: Landing page renders hero section
The page SHALL render a full-width hero section as the first visible element with a headline, sub-headline, and a primary CTA button linking to `/products`.

#### Scenario: Hero section is visible on load
- **WHEN** a user navigates to `/`
- **THEN** the hero section IS displayed with headline text, sub-headline, and a CTA button labeled "Shop Now" linking to `/products`

#### Scenario: Hero CTA navigates to catalog
- **WHEN** a user clicks the "Shop Now" CTA button in the hero
- **THEN** the browser navigates to `/products`

### Requirement: Landing page renders featured categories
The page SHALL render a section displaying at least 4 product categories, each as a clickable card that navigates to `/products?category=<slug>`.

#### Scenario: Categories are displayed
- **WHEN** a user views the landing page
- **THEN** at least 4 category cards ARE shown, each with a category image and label

#### Scenario: Category card navigates to filtered catalog
- **WHEN** a user clicks a category card
- **THEN** the browser navigates to `/products?category=<slug>` for that category

### Requirement: Landing page renders featured products
The page SHALL render a curated section of at least 6 products, each as a card with image, name, price, and an "Add to Cart" button.

#### Scenario: Featured products are displayed
- **WHEN** a user views the landing page
- **THEN** at least 6 product cards ARE shown in the featured products section

#### Scenario: Product card navigates to PDP
- **WHEN** a user clicks a product card image or name
- **THEN** the browser navigates to `/products/<slug>`

#### Scenario: Add to Cart from landing page
- **WHEN** a user clicks "Add to Cart" on a featured product card
- **THEN** the product IS added to the cart and the cart icon count updates

### Requirement: Landing page renders promotional banner
The page SHALL render at least one promotional banner between content sections with a headline, description, and a CTA linking to a relevant catalog URL.

#### Scenario: Promotional banner is visible
- **WHEN** a user scrolls through the landing page
- **THEN** at least one promotional banner IS visible between content sections

### Requirement: Landing page renders newsletter sign-up
The page SHALL render a newsletter sign-up section with an email input and a "Subscribe" button. On submission, the system SHALL display a success confirmation message.

#### Scenario: Newsletter form submission
- **WHEN** a user enters a valid email and clicks "Subscribe"
- **THEN** the form IS replaced with a success confirmation message

#### Scenario: Newsletter form validation
- **WHEN** a user clicks "Subscribe" with an empty or invalid email
- **THEN** an inline validation error IS shown and the form IS NOT submitted

### Requirement: Landing page is responsive
All landing page sections SHALL reflow correctly at MOBILE (≤480px), TABLET (481px–768px), and DESKTOP (≥769px) breakpoints.

#### Scenario: Mobile layout
- **WHEN** the viewport width is ≤480px
- **THEN** all sections stack vertically with no horizontal overflow
