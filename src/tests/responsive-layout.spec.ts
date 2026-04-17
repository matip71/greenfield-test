import { test, expect } from '@playwright/test';

/**
 * Verify layouts at 375px (mobile), 768px (tablet), 1280px (desktop).
 * These tests run against the mobile-chrome, tablet, and chromium projects defined
 * in playwright.config.ts, so each is exercised at the correct viewport automatically.
 */

const pages = [
  { name: 'Landing', url: '/' },
  { name: 'Catalog', url: '/products' },
  { name: 'Cart (empty)', url: '/cart' },
];

for (const { name, url } of pages) {
  test(`${name} page — no horizontal overflow`, async ({ page }) => {
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);

    // If scrollWidth > innerWidth there is horizontal overflow
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 1); // +1 for rounding
  });

  test(`${name} page — title is set`, async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle(/ShopCo/i);
  });
}

test('Product Detail page — no horizontal overflow', async ({ page }) => {
  // Navigate to any product (grab the first card slug from catalog)
  await page.goto('/products');
  const firstCard = page.locator('a[id^="product-card-"]').first();
  const href = await firstCard.getAttribute('href');
  await page.goto(href!);
  await page.waitForLoadState('networkidle');

  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const windowWidth = await page.evaluate(() => window.innerWidth);
  expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 1);
});

test('Checkout page — no horizontal overflow (with cart item)', async ({ page }) => {
  await page.addInitScript(() => {
    const item = {
      id: 'test-item-id', productId: 'p1', productName: 'Test Product',
      productSlug: 'test-product', imageUrl: '', price: 49.99,
      quantity: 1, selectedVariants: {},
    };
    localStorage.setItem('shopco_cart', JSON.stringify({ items: [item] }));
  });
  await page.goto('/checkout');
  await page.waitForLoadState('networkidle');

  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const windowWidth = await page.evaluate(() => window.innerWidth);
  expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 1);
});
