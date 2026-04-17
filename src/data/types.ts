/* ============================================================
   Data Model Types
   These interfaces mirror the future API contract.
   All mock data conforms to these types.
   ============================================================ */

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description?: string;
  productCount: number;
}

export interface ProductVariant {
  id: string;
  type: 'size' | 'color';
  label: string;
  value: string;
  colorHex?: string; // Only for color variants
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number; // Original price for sale items
  images: string[];        // First image is the primary
  categoryId: string;
  categorySlug: string;
  variants: ProductVariant[];
  inStock: boolean;
  featured: boolean;
  createdAt: string; // ISO date string
  tags: string[];
}

export interface CartItem {
  id: string;            // Unique cart item ID (product+variant composite)
  productId: string;
  productName: string;
  productSlug: string;
  imageUrl: string;
  price: number;
  quantity: number;
  selectedVariants: Record<string, string>; // { size: 'M', color: 'Black' }
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShippingOption {
  id: string;
  label: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingOption: ShippingOption;
  paymentLast4: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string; // ISO date string
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string; // Simple hash for v1 mock
  createdAt: string;
}
