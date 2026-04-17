## ADDED Requirements

### Requirement: Account page is protected — unauthenticated users are redirected
Any route under `/account/*` SHALL redirect unauthenticated users to `/auth/sign-in?redirect=<intended-path>`.

#### Scenario: Unauthenticated account access
- **WHEN** an unauthenticated user navigates to any `/account/*` route
- **THEN** the browser IS redirected to `/auth/sign-in?redirect=<intended-path>`

### Requirement: Account profile page displays and allows editing of user information
The page at `/account` SHALL display the user's first name, last name, and email. An "Edit Profile" form SHALL allow updating first name and last name (email is not editable in v1). On save, the updated record IS written back to localStorage.

#### Scenario: Profile is displayed
- **WHEN** an authenticated user navigates to `/account`
- **THEN** their first name, last name, and email ARE displayed

#### Scenario: Profile update succeeds
- **WHEN** a user edits their name fields and clicks "Save Changes"
- **THEN** the localStorage user record IS updated and a success confirmation IS shown

### Requirement: Order history page lists all past orders
The page at `/account/orders` SHALL display a list of all orders stored in localStorage (key: `orders`), sorted newest-first, each showing order number, date, total, and status.

#### Scenario: Orders listed
- **WHEN** an authenticated user navigates to `/account/orders` and has past orders
- **THEN** all orders ARE listed sorted by date descending, each with order number, date, total, and status

#### Scenario: No orders empty state
- **WHEN** an authenticated user navigates to `/account/orders` and has no past orders
- **THEN** an empty-state message IS shown with a "Start Shopping" link to `/products`

### Requirement: Order detail page shows full order breakdown
The page at `/account/orders/:id` SHALL display the full order: all items with images, quantities, and prices; shipping address; shipping method; payment method (masked card); and order total.

#### Scenario: Order detail is displayed
- **WHEN** an authenticated user navigates to `/account/orders/<id>` for an existing order
- **THEN** all order details ARE shown including items, shipping info, masked card (last 4 digits only), and totals

#### Scenario: Unknown order ID
- **WHEN** a user navigates to `/account/orders/<nonexistent-id>`
- **THEN** a "Order not found" error state IS shown with a link back to `/account/orders`

### Requirement: User can sign out from account pages
An account page SHALL include a "Sign Out" button. Clicking it SHALL clear the auth context and localStorage session, then redirect to `/`.

#### Scenario: Sign out
- **WHEN** an authenticated user clicks "Sign Out"
- **THEN** the auth context IS cleared, the localStorage session IS removed, and the browser IS navigated to `/`

### Requirement: Account pages are responsive
All account pages SHALL be usable on mobile with a sidebar navigation collapsing into a top tab or hamburger menu.

#### Scenario: Mobile account navigation
- **WHEN** the viewport width is ≤480px
- **THEN** the account sidebar IS replaced by a horizontal tab bar or dropdown navigation
