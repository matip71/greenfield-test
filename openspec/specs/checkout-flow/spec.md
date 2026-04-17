## ADDED Requirements

### Requirement: Checkout is a multi-step flow
The page at `/checkout` SHALL present three sequential steps: (1) Shipping Address, (2) Shipping Method, (3) Payment. A progress indicator SHALL show the current step.

#### Scenario: Checkout opens at step 1
- **WHEN** a user navigates to `/checkout`
- **THEN** Step 1 (Shipping Address) IS shown and the progress indicator highlights Step 1

### Requirement: Checkout Step 1 — Shipping Address form
Step 1 SHALL render a form with fields: First Name, Last Name, Address Line 1, Address Line 2 (optional), City, State/Region, Postal Code, Country (dropdown). All fields except Address Line 2 are required.

#### Scenario: Valid address proceeds to Step 2
- **WHEN** a user fills all required address fields and clicks "Continue"
- **THEN** the checkout advances to Step 2 (Shipping Method)

#### Scenario: Invalid address is blocked
- **WHEN** a user clicks "Continue" with one or more required fields empty
- **THEN** field-level validation errors ARE shown and the checkout DOES NOT advance

### Requirement: Checkout Step 2 — Shipping Method selection
Step 2 SHALL render at least two shipping options (e.g., "Standard – Free", "Express – $9.99") as selectable radio-style cards. A default option SHALL be pre-selected.

#### Scenario: Pre-selected default shipping method
- **WHEN** Step 2 is displayed
- **THEN** the lowest-cost shipping option IS pre-selected

#### Scenario: Selecting shipping method proceeds
- **WHEN** a user selects a shipping method and clicks "Continue"
- **THEN** the checkout advances to Step 3 (Payment) and the selected method IS reflected in the order summary

### Requirement: Checkout Step 3 — Payment method entry
Step 3 SHALL render a payment form with fields: Cardholder Name, Card Number (16 digits), Expiry (MM/YY), CVV (3–4 digits). No real processing occurs; submitting places a mock order.

#### Scenario: Valid payment form places mock order
- **WHEN** a user fills all payment fields with valid data and clicks "Place Order"
- **THEN** the cart IS cleared, the user IS navigated to `/order/confirmation`, and a mock order record IS stored in localStorage

#### Scenario: Invalid card number is blocked
- **WHEN** a user enters a card number that is not exactly 16 digits and clicks "Place Order"
- **THEN** a validation error IS shown on the card number field and the order IS NOT placed

### Requirement: Checkout order summary panel is persistent
A summary panel showing cart items, subtotal, selected shipping cost, and total SHALL be visible throughout all checkout steps.

#### Scenario: Summary updates on shipping selection
- **WHEN** a user selects a different shipping method in Step 2
- **THEN** the order summary shipping cost and total ARE updated immediately

### Requirement: Checkout redirects empty cart to cart page
If a user navigates to `/checkout` with an empty cart, the system SHALL redirect them to `/cart`.

#### Scenario: Empty cart redirect
- **WHEN** a user navigates to `/checkout` with no items in the cart
- **THEN** the browser IS redirected to `/cart`

### Requirement: Checkout is responsive
All checkout steps SHALL be usable on mobile with the order summary accessible (collapsed by default on mobile, expandable via a toggle).

#### Scenario: Mobile summary toggle
- **WHEN** the viewport width is ≤480px
- **THEN** the order summary IS collapsed by default with a "Show order summary" toggle visible

## ADDED Requirements

### Requirement: Checkout Spanish Content
All static, hardcoded texts visible to the user SHALL be translated to Spanish.

#### Scenario: User views checkout in Spanish
- **WHEN** a user navigates to the checkout flow
- **THEN** all address field labels, shipping option labels, summary headers, error messages, placeholders, title tags, and the 'Place Order' CTA button ARE rendered in Spanish

