import { test, expect } from '@playwright/test';
import { seedAuthSession, seedCartItem, TEST_USER } from './helpers';

/**
 * Verify localStorage persistence: add items, reload, confirm cart and
 * auth session are restored.
 */

test.describe('localStorage persistence', () => {
  test('Cart survives a page reload', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Add first in-stock product to cart
    const addBtn = page.locator('button[id^="catalog-add-to-cart-"]').first();
    await addBtn.click();

    // Confirm badge shows 1
    const badge = page.locator('#header-cart-link [class*="cartBadge"]');
    await expect(badge).toHaveText('1');

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Badge should still show 1
    await expect(badge).toHaveText('1');
  });

  test('Cart item appears on /cart after reload', async ({ page }) => {
    await seedCartItem(page);
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');

    // Should see the cart item — not the empty state
    await expect(page.locator('text=Test Product')).toBeVisible();
    await expect(page.locator('[class*="emptyState"],[class*="EmptyState"]')).not.toBeVisible();
  });

  test('Auth session persists after reload — account page accessible', async ({ page }) => {
    await seedAuthSession(page);
    await page.goto('/account');
    await page.waitForLoadState('networkidle');

    // Should NOT be redirected to sign-in
    await expect(page).toHaveURL(/\/account/);
    // Should see user's name
    await expect(page.locator(`text=${TEST_USER.firstName}`).first()).toBeVisible();
  });

  test('Auth session persists after reload — header shows account (not sign-in)', async ({ page }) => {
    await seedAuthSession(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Account link should point to /account, not /auth/sign-in
    const accountLink = page.locator('#header-account-link');
    await expect(accountLink).toHaveAttribute('href', '/account');
  });
});
