import { type Page } from '@playwright/test';

// ─── Constants ────────────────────────────────────────────────────────────────
export const BASE_URL = 'http://localhost:5173';

export const TEST_USER = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@shopco.com',
  password: 'password123',
};

// Simple mock hash matching the one in users.ts (bit-twiddled djb2)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

// ─── localStorage seeds ───────────────────────────────────────────────────────

/** Seed a registered user into localStorage so sign-in works without going through the form. */
export async function seedUser(page: Page) {
  await page.addInitScript((user) => {
    const existingRaw = localStorage.getItem('shopco_users');
    const existing: object[] = existingRaw ? JSON.parse(existingRaw) : [];
    // avoid duplicates
    const already = (existing as Array<{ email: string }>).some(
      (u) => u.email === user.email
    );
    if (!already) {
      existing.push(user);
      localStorage.setItem('shopco_users', JSON.stringify(existing));
    }
  }, {
    id: 'test-user-id',
    firstName: TEST_USER.firstName,
    lastName: TEST_USER.lastName,
    email: TEST_USER.email,
    passwordHash: simpleHash(TEST_USER.password),
    createdAt: new Date().toISOString(),
  });
}

/** Seed the auth session directly so tests start already-signed-in. */
export async function seedAuthSession(page: Page) {
  await seedUser(page);
  await page.addInitScript((user) => {
    localStorage.setItem(
      'shopco_auth',
      JSON.stringify({ user, isAuthenticated: true })
    );
  }, {
    id: 'test-user-id',
    firstName: TEST_USER.firstName,
    lastName: TEST_USER.lastName,
    email: TEST_USER.email,
    passwordHash: simpleHash(TEST_USER.password),
    createdAt: new Date().toISOString(),
  });
}

/** Seed a minimal cart item into localStorage. */
export async function seedCartItem(page: Page) {
  await page.addInitScript(() => {
    const item = {
      id: 'test-item-id',
      productId: 'p1',
      productName: 'Test Product',
      productSlug: 'test-product',
      imageUrl: 'https://picsum.photos/seed/test/400/500',
      price: 49.99,
      quantity: 2,
      selectedVariants: { size: 'M', color: 'Black' },
    };
    localStorage.setItem('shopco_cart', JSON.stringify({ items: [item] }));
  });
}

/** Seed a completed order into localStorage. */
export async function seedOrder(page: Page) {
  await page.addInitScript(() => {
    const order = {
      id: 'order-test-001',
      userId: 'test-user-id',
      items: [
        {
          id: 'test-item-id',
          productId: 'p1',
          productName: 'Test Product',
          productSlug: 'test-product',
          imageUrl: 'https://picsum.photos/seed/test/400/500',
          price: 49.99,
          quantity: 2,
          selectedVariants: { size: 'M', color: 'Black' },
        },
      ],
      shippingAddress: {
        firstName: 'Test',
        lastName: 'User',
        addressLine1: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postalCode: '90210',
        country: 'US',
      },
      shippingOption: { id: 'standard', label: 'Standard', price: 0, description: 'Free', estimatedDays: '5-7' },
      paymentLast4: '4242',
      subtotal: 99.98,
      shippingCost: 0,
      total: 99.98,
      status: 'processing',
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('shopco_orders') || '[]');
    existing.push(order);
    localStorage.setItem('shopco_orders', JSON.stringify(existing));
  });
}
