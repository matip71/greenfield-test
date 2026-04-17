## ADDED Requirements

### Requirement: Cart displays all added items
The page at `/cart` SHALL display each cart item with its image, name, selected variant, unit price, quantity selector, line total, and a "Remove" button.

#### Scenario: Cart with items
- **WHEN** a user navigates to `/cart` and the cart contains items
- **THEN** all cart items ARE listed, each showing image, name, variant, unit price, quantity, line total, and remove option

### Requirement: Cart shows empty state
When the cart has no items, the page SHALL display an empty-state message and a "Shop Now" link to `/products`.

#### Scenario: Empty cart
- **WHEN** a user navigates to `/cart` and the cart is empty
- **THEN** an empty-state message IS shown and a "Shop Now" link to `/products` IS visible

### Requirement: Cart item quantity can be updated
Each cart item SHALL have increment (+) and decrement (−) controls. Decrementing to 0 SHALL remove the item. The cart state SHALL update in localStorage immediately.

#### Scenario: Increment item quantity
- **WHEN** a user clicks the "+" control on a cart item
- **THEN** the item's quantity IS increased by 1 and the line total and cart subtotal ARE recalculated

#### Scenario: Decrement item quantity to zero
- **WHEN** a user clicks "−" on a cart item with quantity 1
- **THEN** the item IS removed from the cart

### Requirement: Cart item can be removed
Clicking the "Remove" button on a cart item SHALL remove it from the cart immediately and update the cart icon count.

#### Scenario: Remove item
- **WHEN** a user clicks "Remove" on a cart item
- **THEN** the item IS removed from the cart, the cart icon count IS decremented, and the order summary IS updated

### Requirement: Cart displays order summary
The cart page SHALL display a summary panel with subtotal (sum of all line totals), estimated shipping, and estimated total.

#### Scenario: Order summary is correct
- **WHEN** the cart contains items
- **THEN** the subtotal IS the sum of all line totals, and the total IS subtotal + estimated shipping

### Requirement: Cart persists across sessions
Cart state SHALL be persisted to `localStorage` under the key `cart` and restored on page load.

#### Scenario: Cart restored after reload
- **WHEN** a user adds items to the cart and reloads the page
- **THEN** the same items ARE present in the cart

### Requirement: Cart page has checkout CTA
A "Proceed to Checkout" button SHALL be visible in the order summary. It SHALL link to `/checkout` and SHALL be disabled when the cart is empty.

#### Scenario: Checkout button navigates to checkout
- **WHEN** the cart has items and a user clicks "Proceed to Checkout"
- **THEN** the browser navigates to `/checkout`

### Requirement: Cart is responsive
The cart layout SHALL stack items and the summary panel vertically on mobile.

#### Scenario: Mobile stacked layout
- **WHEN** the viewport width is ≤480px
- **THEN** the cart items list and order summary ARE stacked vertically
