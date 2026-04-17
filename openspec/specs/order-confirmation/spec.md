## ADDED Requirements

### Requirement: Order confirmation page displays order summary
The page at `/order/confirmation` SHALL display the order number, list of purchased items with quantities and prices, shipping address, selected shipping method, and order total.

#### Scenario: Confirmation page shows order details
- **WHEN** a user is redirected to `/order/confirmation` after placing an order
- **THEN** the order number, all items, shipping info, and total ARE displayed

### Requirement: Order confirmation page has navigation CTAs
The page SHALL display two CTAs: "Continue Shopping" linking to `/` and "View Order History" linking to `/account/orders`.

#### Scenario: Continue shopping CTA
- **WHEN** a user clicks "Continue Shopping"
- **THEN** the browser navigates to `/`

#### Scenario: View order history CTA
- **WHEN** a user clicks "View Order History"
- **THEN** the browser navigates to `/account/orders`

### Requirement: Order confirmation is not accessible without a completed order
If a user navigates to `/order/confirmation` without a pending confirmation stored in localStorage (key: `lastOrder`), the page SHALL redirect to `/`.

#### Scenario: Direct navigation without order
- **WHEN** a user navigates to `/order/confirmation` and `lastOrder` IS NOT present in localStorage
- **THEN** the browser IS redirected to `/`

## ADDED Requirements

### Requirement: Order Confirmation Spanish Content
All static, hardcoded texts visible to the user SHALL be translated to Spanish.

#### Scenario: User views order confirmation in Spanish
- **WHEN** a user navigates to the order confirmation page
- **THEN** all success messages, summary headers, item details labels, title tags, and interactive buttons ARE rendered in Spanish

