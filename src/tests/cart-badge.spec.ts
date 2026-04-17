import { test, expect } from '@playwright/test';

/**
 * Verify cart badge count updates in real time on Landing, Catalog, and PDP pages.
 */

test.describe('Cart badge real-time updates', () => {
  test('Landing page — adding a featured product increments the cart badge', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Badge should start at 0 (not visible)
    const badge = page.locator('#header-cart-link [class*="cartBadge"]');
    await expect(badge).not.toBeVisible();

    // Click the first "Agregar al carrito" button on the landing page
    const addBtn = page.locator('button', { hasText: 'Agregar al carrito' }).first();
    await addBtn.click();

    // Badge should now show 1
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('Catalog page — adding a product increments the cart badge', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const badge = page.locator('#header-cart-link [class*="cartBadge"]');
    await expect(badge).not.toBeVisible();

    const addBtn = page.locator('button[id^="catalog-add-to-cart-"]').first();
    await addBtn.click();

    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('Catalog page — adding two different products shows count 2', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const addBtns = page.locator('button[id^="catalog-add-to-cart-"]');
    await addBtns.nth(0).click();
    await addBtns.nth(1).click();

    const badge = page.locator('#header-cart-link [class*="cartBadge"]');
    await expect(badge).toHaveText('2');
  });

  test('PDP page — add to cart updates header badge', async ({ page }) => {
    // Navigate to the first product
    await page.goto('/products');
    const firstCard = page.locator('a[id^="product-card-"]').first();
    const href = await firstCard.getAttribute('href');
    await page.goto(href!);
    await page.waitForLoadState('networkidle');

    const badge = page.locator('#header-cart-link [class*="cartBadge"]');
    await expect(badge).not.toBeVisible();

    // Select ALL size variants available (click the first one from each size group)
    const sizeVariants = page.locator('[id^="variant-size-"]');
    if (await sizeVariants.count() > 0) {
      await sizeVariants.first().click();
    }

    // Select ALL color variants available (click the first one from each color group)
    const colorVariants = page.locator('[id^="variant-color-"]');
    if (await colorVariants.count() > 0) {
      await colorVariants.first().click();
    }

    // Wait for button to become enabled
    const addToCartBtn = page.locator('#pdp-add-to-cart-btn');
    await expect(addToCartBtn).toBeEnabled({ timeout: 5000 });
    await addToCartBtn.click();

    await expect(badge).toBeVisible();
  });
});
