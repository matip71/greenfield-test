import { test, expect } from '@playwright/test';
import { seedAuthSession, seedCartItem, seedOrder } from './helpers';

/**
 * Verify loading="lazy" on all non-hero images,
 * and that the hero image is NOT lazy-loaded.
 */

test.describe('Image lazy loading', () => {
  test('Landing page hero image is NOT lazy-loaded', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The hero section img should either have loading="eager" or no loading attribute at all
    const heroImg = page.locator('[class*="hero"] img, [class*="Hero"] img').first();
    if (await heroImg.count() > 0) {
      const loading = await heroImg.getAttribute('loading');
      expect(loading).not.toBe('lazy');
    }
  });

  test('Catalog page — product card images are lazy-loaded', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const productImgs = page.locator('[class*="ProductCard"] img, article img');
    const count = await productImgs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const loading = await productImgs.nth(i).getAttribute('loading');
      expect(loading).toBe('lazy');
    }
  });

  test('Cart page — cart item images are lazy-loaded', async ({ page }) => {
    await seedCartItem(page);
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');

    const cartImgs = page.locator('[class*="CartItem"] img, [class*="cartItem"] img');
    const count = await cartImgs.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const loading = await cartImgs.nth(i).getAttribute('loading');
        expect(loading).toBe('lazy');
      }
    }
  });

  test('Order detail page — item images are lazy-loaded', async ({ page }) => {
    await seedAuthSession(page);
    await seedOrder(page);
    await page.goto('/account/orders/order-test-001');
    await page.waitForLoadState('networkidle');

    const orderImgs = page.locator('[class*="itemImage"], [class*="item"] img');
    const count = await orderImgs.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const loading = await orderImgs.nth(i).getAttribute('loading');
        expect(loading).toBe('lazy');
      }
    }
  });
});
