import { test, expect } from '@playwright/test';
import { seedAuthSession, seedCartItem } from './helpers';

/**
 * Verify all route guards:
 *   - Unauthenticated /account access → redirect to /auth/sign-in?redirect=…
 *   - Empty-cart /checkout access → redirect to /cart
 *   - Direct /order/confirmation access (no lastOrder) → redirect to /
 */

test.describe('Route guards', () => {
  // ── /account/* ──────────────────────────────────────────────────────────────

  test('Unauthenticated user visiting /account is redirected to /auth/sign-in', async ({ page }) => {
    // No auth seeded — fresh localStorage
    await page.goto('/account');
    await page.waitForURL(/\/auth\/sign-in/);
    expect(page.url()).toContain('/auth/sign-in');
  });

  test('Redirect param is preserved on /account guard', async ({ page }) => {
    await page.goto('/account');
    await page.waitForURL(/\/auth\/sign-in/);
    expect(page.url()).toContain('redirect=');
    expect(page.url()).toContain('%2Faccount');
  });

  test('Unauthenticated user visiting /account/orders is redirected to /auth/sign-in', async ({ page }) => {
    await page.goto('/account/orders');
    await page.waitForURL(/\/auth\/sign-in/);
    expect(page.url()).toContain('/auth/sign-in');
  });

  test('Authenticated user can visit /account', async ({ page }) => {
    await seedAuthSession(page);
    await page.goto('/account');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/account$/);
  });

  // ── /checkout (empty cart) ───────────────────────────────────────────────────

  test('Empty cart → /checkout redirects to /cart', async ({ page }) => {
    // No cart seeded
    await page.goto('/checkout');
    await page.waitForURL(/\/cart/);
    expect(page.url()).toContain('/cart');
  });

  test('Non-empty cart → /checkout is accessible', async ({ page }) => {
    await seedCartItem(page);
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/checkout/);
  });

  // ── /order/confirmation ───────────────────────────────────────────────────────

  test('Direct /order/confirmation without lastOrder → redirects to /', async ({ page }) => {
    // No order seeded in lastOrder
    await page.goto('/order/confirmation');
    await page.waitForURL('/');
    expect(page.url()).toMatch(/\/$/);
  });

  // ── Auth page guards (already-authenticated users) ───────────────────────────

  test('Authenticated user visiting /auth/sign-in is redirected to /account', async ({ page }) => {
    await seedAuthSession(page);
    await page.goto('/auth/sign-in');
    await page.waitForURL(/\/account/);
    expect(page.url()).toContain('/account');
  });

  test('Authenticated user visiting /auth/sign-up is redirected to /account', async ({ page }) => {
    await seedAuthSession(page);
    await page.goto('/auth/sign-up');
    await page.waitForURL(/\/account/);
    expect(page.url()).toContain('/account');
  });
});
