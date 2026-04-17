## ADDED Requirements

### Requirement: Sign-up page allows new user registration
The page at `/auth/sign-up` SHALL render a form with fields: First Name, Last Name, Email, Password, Confirm Password. All fields are required. On valid submission, a mock user account IS created in localStorage (key: `users`) and the user IS signed in and redirected to `/account`.

#### Scenario: Successful registration
- **WHEN** a user fills all fields with valid data and clicks "Create Account"
- **THEN** a mock user record IS stored in localStorage, the auth context IS updated with the new user, and the browser IS navigated to `/account`

#### Scenario: Email already registered
- **WHEN** a user submits sign-up with an email already present in `localStorage.users`
- **THEN** an inline error IS shown: "An account with this email already exists"

#### Scenario: Password mismatch
- **WHEN** the Password and Confirm Password fields do not match and the user clicks "Create Account"
- **THEN** an inline error IS shown on the Confirm Password field and the form IS NOT submitted

#### Scenario: Redirect if already signed in
- **WHEN** a user navigates to `/auth/sign-up` while already authenticated
- **THEN** the browser IS redirected to `/account`

### Requirement: Sign-in page allows existing user authentication
The page at `/auth/sign-in` SHALL render a form with Email and Password fields. On valid submission matching a stored user, the auth context IS updated and the user IS redirected to their intended destination (or `/account` by default).

#### Scenario: Successful sign-in
- **WHEN** a user enters correct credentials and clicks "Sign In"
- **THEN** the auth context IS updated with the user session and the browser IS navigated to the intended destination or `/account`

#### Scenario: Invalid credentials
- **WHEN** a user enters an email/password combination that does not match any stored user
- **THEN** an inline error IS shown: "Invalid email or password"

#### Scenario: Redirect if already signed in
- **WHEN** a user navigates to `/auth/sign-in` while already authenticated
- **THEN** the browser IS redirected to `/account`

### Requirement: Forgot password page allows password reset request (mock)
The page at `/auth/forgot-password` SHALL render a form with an Email field. On submission with a known email, a success message IS shown (no actual email sent in v1). On unknown email, the same success message IS shown (to prevent email enumeration).

#### Scenario: Forgot password submission
- **WHEN** a user enters any email address and clicks "Send Reset Link"
- **THEN** the form IS replaced with a success message: "If that email is registered, you'll receive a reset link shortly"

#### Scenario: Empty email blocked
- **WHEN** a user clicks "Send Reset Link" with an empty email field
- **THEN** a validation error IS shown and the form IS NOT submitted

### Requirement: Auth pages are responsive
All auth forms SHALL be centered and usable on mobile, tablet, and desktop viewports.

#### Scenario: Mobile auth form
- **WHEN** the viewport width is ≤480px
- **THEN** the form IS displayed full-width with appropriate padding and no horizontal overflow

## ADDED Requirements

### Requirement: User Auth Spanish Content
All static, hardcoded texts visible to the user SHALL be translated to Spanish.

#### Scenario: User views auth flows in Spanish
- **WHEN** a user navigates to Sign In, Sign Up, or Forgot Password
- **THEN** all form labels, buttons, error messages, placeholders, title tags, and static descriptions ARE rendered in Spanish

