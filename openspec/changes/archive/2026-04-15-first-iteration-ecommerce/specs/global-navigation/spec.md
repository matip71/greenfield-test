## ADDED Requirements

### Requirement: Header displays logo
The header SHALL display the brand logo (text-based in v1: "ShopCo") as a link to `/`.

#### Scenario: Logo navigates to home
- **WHEN** a user clicks the logo in the header
- **THEN** the browser navigates to `/`

### Requirement: Header displays main navigation links
The header SHALL display navigation links: "Shop" → `/products`, "Account" → `/account` (or `/auth/sign-in` if unauthenticated).

#### Scenario: Shop link navigates to catalog
- **WHEN** a user clicks "Shop" in the header
- **THEN** the browser navigates to `/products`

#### Scenario: Account link for authenticated user
- **WHEN** an authenticated user clicks "Account" in the header
- **THEN** the browser navigates to `/account`

#### Scenario: Account link for unauthenticated user
- **WHEN** an unauthenticated user clicks "Account" in the header
- **THEN** the browser navigates to `/auth/sign-in`

### Requirement: Header displays cart icon with item count badge
The header SHALL display a cart icon that links to `/cart`. When the cart has one or more items, a badge SHALL display the total item count overlaid on the icon.

#### Scenario: Cart badge shows count
- **WHEN** the cart contains items
- **THEN** the cart icon displays a badge with the total item count

#### Scenario: Cart icon navigates to cart
- **WHEN** a user clicks the cart icon
- **THEN** the browser navigates to `/cart`

### Requirement: Header collapses to hamburger on mobile
On viewports ≤768px, the navigation links SHALL collapse into a side-drawer opened by a hamburger (☰) button. The drawer SHALL close when a link is selected or the user taps outside.

#### Scenario: Hamburger opens drawer
- **WHEN** the viewport width is ≤768px and a user taps the hamburger button
- **THEN** the navigation drawer IS shown

#### Scenario: Drawer closes on link tap
- **WHEN** the navigation drawer is open and a user taps a navigation link
- **THEN** the drawer IS closed and the browser navigates to the selected link's destination

### Requirement: Footer displays navigation links and legal text
The footer SHALL display grouped navigation links (Shop, Account, About), legal text ("© 2025 ShopCo. All rights reserved."), and the newsletter sign-up form (email input + subscribe button).

#### Scenario: Footer links are present
- **WHEN** a user views any page
- **THEN** the footer IS visible with navigation link groups and legal text

#### Scenario: Footer newsletter is functional
- **WHEN** a user submits a valid email in the footer newsletter form
- **THEN** a success confirmation IS shown inline within the footer
