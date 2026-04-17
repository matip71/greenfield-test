## Context

The initial first-iteration storefront was built entirely in English. To cater directly to a Spanish-speaking audience, the entire interface must be translated into Spanish. Currently, all texts are hardcoded within the React components (`src/pages/`, `src/components/`, `src/routes/index.ts` titles).

## Goals / Non-Goals

**Goals:**
- Replace all user-facing English strings with Spanish equivalents.
- Update `document.title` on all routes to Spanish page titles.
- Update existing Playwright E2E tests to assert the correct Spanish text.
- Provide a fully immersive Spanish UI experience.

**Non-Goals:**
- **No i18n framework**: We are NOT implementing an internationalization framework (like `react-i18next`). We are simply swapping hardcoded English for hardcoded Spanish. The prototype remains single-language (Spanish).
- No translation of code internals: Variables, component names, CSS class names, and code comments remain in English.

## Decisions

### D1: Hardcoded Text Replacement vs i18n Framework
**Decision**: In-place replacement of hardcoded English strings.
**Rationale**: At this prototype stage, adding an i18n framework adds unnecessary overhead. We do not need dynamic language switching; we just need the default language to be Spanish.

### D2: Test Suite Updates
**Decision**: Playwright E2E tests must be updated to expect Spanish text. Test IDs and element structure remain unchanged.
**Rationale**: Tests currently assert on specific English strings (e.g., `'Add to Cart'`, `/ShopCo — Premium Products/i`). These assertions will fail once the UI is translated, so the spec files must be updated strictly to match the new UI strings.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Missed translations (some text remains in English) | Comprehensive review of all files in `src/pages/` and `src/components/`. Use E2E tests to catch misses if tests are carefully updated. |
| Broken e2e tests due to text matching | Explicitly update `hasText` locators and `toHaveTitle` expectations in Playwright tests in parallel with component updates. |
