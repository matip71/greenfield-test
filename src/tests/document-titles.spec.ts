import { test, expect } from '@playwright/test';
import { seedAuthSession, seedCartItem, seedOrder } from './helpers';

/**
 * Audit all pages for dynamic document titles via useEffect.
 */

test.describe('Dynamic document titles', () => {
  test('Landing page has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ShopCo/i);
  });

  test('Catalog page has correct title', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveTitle(/ShopCo/i);
  });

  test('Product Detail page title includes product name', async ({ page }) => {
    await page.goto('/products');
    const firstCard = page.locator('a[id^="product-card-"]').first();
    const href = await firstCard.getAttribute('href');
    await page.goto(href!);
    await page.waitForLoadState('networkidle');
    // Title should be "<Product Name> — ShopCo"
    const title = await page.title();
    expect(title).toMatch(/— ShopCo/i);
    expect(title.length).toBeGreaterThan('— ShopCo'.length);
  });

  test('Cart page has correct title', async ({ page }) => {
    await page.goto('/cart');
    await expect(page).toHaveTitle(/Carrito.*ShopCo/i);
  });

  test('Checkout page has correct title', async ({ page }) => {
    await seedCartItem(page);
    await page.goto('/checkout');
    await expect(page).toHaveTitle(/Pago.*ShopCo/i);
  });

  test('Sign In page has correct title', async ({ page }) => {
    await page.goto('/auth/sign-in');
    await expect(page).toHaveTitle(/Iniciar sesión.*ShopCo/i);
  });

  test('Sign Up page has correct title', async ({ page }) => {
    await page.goto('/auth/sign-up');
    await expect(page).toHaveTitle(/Crear cuenta.*ShopCo/i);
  });

  test('Forgot Password page has correct title', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await expect(page).toHaveTitle(/Olvidé.*ShopCo/i);
  });

  test('Account page has correct title', async ({ page }) => {
    await seedAuthSession(page);
    await page.goto('/account');
    await expect(page).toHaveTitle(/Mi cuenta.*ShopCo/i);
  });

  test('Order History page has correct title', async ({ page }) => {
    await seedAuthSession(page);
    await page.goto('/account/orders');
    await expect(page).toHaveTitle(/Historial de pedidos.*ShopCo/i);
  });

  test('Order Detail page has correct title', async ({ page }) => {
    await seedAuthSession(page);
    await seedOrder(page);
    await page.goto('/account/orders/order-test-001');
    await expect(page).toHaveTitle(/Detalles del pedido.*ShopCo/i);
  });
});
