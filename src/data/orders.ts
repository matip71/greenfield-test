import type { Order } from './types';

const ORDERS_STORAGE_KEY = 'shopco_orders';
const LAST_ORDER_KEY = 'shopco_last_order';

export function getOrdersFromStorage(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrderById(id: string): Order | undefined {
  return getOrdersFromStorage().find((o) => o.id === id);
}

export function getOrdersByUserId(userId: string): Order[] {
  return getOrdersFromStorage()
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function saveOrder(order: Order): void {
  const existing = getOrdersFromStorage();
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([...existing, order]));
}

export function getLastOrder(): Order | null {
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function setLastOrder(order: Order): void {
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}

export function clearLastOrder(): void {
  localStorage.removeItem(LAST_ORDER_KEY);
}
