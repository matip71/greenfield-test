# Greenfield eCommerce 

Welcome to the Greenfield eCommerce platform. This project is a modern, high-performance retail application constructed explicitly around the guidelines (flat-box, zero-elevation, monolithic layouts, monochromatic palettes, and colossal typography). 

## Tech Stack

This application is built with:
- **Core Framework:** React 19, TypeScript, Vite
- **Styling:** Vanilla CSS Modules driven by strict global tokens (`tokens.css`). This was chosen over utility libraries (like Tailwind) to painstakingly enforce custom geometry paradigms and avoid the leakage of generic web aesthetics.
- **Routing:** React Router v7
- **Architecture:** Component-driven design enforcing separation of concerns between `layouts/`, `pages/`, generic `ui/` primitives, and domain-specific blocks (e.g., `catalog/`, `checkout/`). Local and global states are managed seamlessly via custom hooks (`useCart`, `useAuth`) and React Context.

## The SDD Approach (Spec-Driven Development)

This project strictly follows the **OpenSpec** framework—a highly deterministic protocol for engineering ai software. Instead of ad-hoc coding, every structural alteration goes through a rigorous specification loop:
1. **Proposal (`/opsx-propose`)**: We outline the "Why" and "What" of an intended structural change.
2. **Specification (`spec.md`)**: Exact application state, DOM behavior, and UI restraints (governed by the `DESIGN.md` bible) are mapped out.
3. **Delegation (`tasks.md`)**: The specs generate a precise checklist of atomic code tasks.
4. **Execution (`/opsx-apply`)**: Code is refactored directly answering to the pre-approved tasks.
5. **Archiving (`/opsx-archive`)**: Completed tasks dictate that delta specs synchronize with the repository's living documentation, and the change is archived.

This workflow guarantees zero design drift, perpetually up-to-date documentation, and extreme consistency.

## Running the Application

Before beginning, ensure you have Node.js 24+ and npm installed, then install all project dependencies:
```bash
npm install
```

### Server Options

- **Development Server:**
  Spins up the Vite environment with Hot Module Replacement (HMR).
  ```bash
  npm run dev
  ```

- **Production Build:**
  Compiles the TypeScript and outputs optimized, minified bundles into the `/dist` directory.
  ```bash
  npm run build
  ```

- **Preview Production Build:**
  Allows you to serve and test the compiled `/dist` output locally to verify exact production behavior before deploying.
  ```bash
  npm run preview
  ```

## Testing System

We rely on **Playwright** for complete End-to-End (E2E) testing. The testing framework simulates real user behavior to guarantee that vital paths (Sign In, Cart manipulation, Checkout sequences) remain pristine.

**How to run the tests:**

```bash
# Run all tests headlessly across configured browsers (Standard CI/CD usage)
npm test

# Open the Playwright interactive UI runner (The best choice for visually debugging tests)
npm run test:ui

# Run tests visually strictly in the Chromium engine
npm run test:headed

# Isolate execution exclusively to Chromium without the UI
npx playwright test --project=chromium
```

Tests are kept in the `tests/` folder. All assertions and UI interactions map to Spanish content to mimic real presentation, and rely on rigid `data-testid` attributes or semantic accessible roles rather than CSS selectors, ensuring CSS redesigns never shatter the testing grid.